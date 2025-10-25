/**
 * Fantasy OS - Hobbit Companion Unit Tests
 * Unit tests for hobbit companion system components
 * Created: 2025-10-25T16:25:40.000Z
 */

describe('HobbitCompanion', () => {
    let hobbitCompanion;
    let mockPersonality;
    let mockDialogue;
    let mockMemory;

    beforeEach(() => {
        // Mock dependencies
        mockPersonality = {
            init: jest.fn().mockResolvedValue(),
            getCurrentMood: jest.fn().mockReturnValue('happy'),
            getPersonalityTraits: jest.fn().mockReturnValue(['curious', 'friendly']),
            updateFromInteraction: jest.fn(),
            updateFromRoomChange: jest.fn(),
            updateFromQuestProgress: jest.fn(),
            updateFromObjectInteraction: jest.fn(),
            getState: jest.fn().mockReturnValue({}),
            setState: jest.fn()
        };

        mockDialogue = {
            init: jest.fn().mockResolvedValue(),
            getDialogue: jest.fn().mockReturnValue({
                id: 'test-dialogue',
                text: 'Hello there!',
                category: 'conversation'
            })
        };

        mockMemory = {
            init: jest.fn().mockResolvedValue(),
            addMemory: jest.fn(),
            getRecentMemories: jest.fn().mockReturnValue([]),
            getState: jest.fn().mockReturnValue({}),
            setState: jest.fn()
        };

        // Mock DOM elements
        document.body.innerHTML = '<div id="test-container"></div>';
        
        // Mock window.soundSystem
        window.soundSystem = {
            play: jest.fn()
        };

        // Mock window.questManager
        window.questManager = {
            activeQuests: new Map(),
            completedQuests: new Set(),
            getCurrentQuestStep: jest.fn().mockReturnValue(null)
        };

        // Create hobbit companion with mocked dependencies
        hobbitCompanion = new HobbitCompanion();
        hobbitCompanion.personality = mockPersonality;
        hobbitCompanion.dialogue = mockDialogue;
        hobbitCompanion.memory = mockMemory;
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        test('should initialize successfully', async () => {
            await hobbitCompanion.init();
            
            expect(mockPersonality.init).toHaveBeenCalled();
            expect(mockDialogue.init).toHaveBeenCalled();
            expect(mockMemory.init).toHaveBeenCalled();
            expect(hobbitCompanion.isActive).toBe(true);
        });

        test('should create UI elements', async () => {
            await hobbitCompanion.init();
            
            expect(document.querySelector('#hobbit-companion')).toBeTruthy();
            expect(document.querySelector('.hobbit-dialogue-box')).toBeTruthy();
            expect(document.querySelector('.personality-indicator')).toBeTruthy();
        });

        test('should set up event handlers', async () => {
            await hobbitCompanion.init();
            
            expect(hobbitCompanion.eventHandlers.has('room-changed')).toBe(true);
            expect(hobbitCompanion.eventHandlers.has('quest-progress')).toBe(true);
            expect(hobbitCompanion.eventHandlers.has('object-interaction')).toBe(true);
        });
    });

    describe('Dialogue Actions', () => {
        beforeEach(async () => {
            await hobbitCompanion.init();
        });

        test('should handle talk action', () => {
            hobbitCompanion.handleDialogueAction('talk');
            
            expect(mockDialogue.getDialogue).toHaveBeenCalledWith('conversation', expect.any(Object));
            expect(mockMemory.addMemory).toHaveBeenCalledWith('conversation', expect.any(Object));
            expect(mockPersonality.updateFromInteraction).toHaveBeenCalledWith('talk');
        });

        test('should handle quest action', () => {
            hobbitCompanion.handleDialogueAction('quest');
            
            expect(mockDialogue.getDialogue).toHaveBeenCalledWith('quest-guidance', expect.any(Object));
            expect(mockMemory.addMemory).toHaveBeenCalledWith('guidance', expect.any(Object));
            expect(mockPersonality.updateFromInteraction).toHaveBeenCalledWith('quest');
        });

        test('should handle memory action', () => {
            hobbitCompanion.handleDialogueAction('memory');
            
            expect(mockMemory.getRecentMemories).toHaveBeenCalledWith(5);
        });

        test('should update interaction count', () => {
            const initialCount = hobbitCompanion.interactionCount;
            hobbitCompanion.handleDialogueAction('talk');
            
            expect(hobbitCompanion.interactionCount).toBe(initialCount + 1);
            expect(hobbitCompanion.lastInteraction).toBeTruthy();
        });
    });

    describe('Event Handling', () => {
        beforeEach(async () => {
            await hobbitCompanion.init();
        });

        test('should handle room change events', () => {
            const roomId = 'kitchen';
            hobbitCompanion.onRoomChanged(roomId);
            
            expect(hobbitCompanion.currentRoom).toBe(roomId);
            expect(mockPersonality.updateFromRoomChange).toHaveBeenCalledWith(roomId);
            expect(mockDialogue.getDialogue).toHaveBeenCalledWith('room-greeting', expect.any(Object));
        });

        test('should handle quest progress events', () => {
            const questId = 'test-quest';
            const stepId = 'test-step';
            hobbitCompanion.onQuestProgress(questId, stepId);
            
            expect(mockPersonality.updateFromQuestProgress).toHaveBeenCalledWith(questId, stepId);
            expect(mockDialogue.getDialogue).toHaveBeenCalledWith('quest-progress', expect.any(Object));
        });

        test('should handle object interaction events', () => {
            const objectType = 'fireplace';
            const room = 'living-room';
            hobbitCompanion.onObjectInteraction(objectType, room);
            
            expect(mockPersonality.updateFromObjectInteraction).toHaveBeenCalledWith(objectType, room);
            expect(mockDialogue.getDialogue).toHaveBeenCalledWith('object-interaction', expect.any(Object));
        });
    });

    describe('Context Generation', () => {
        beforeEach(async () => {
            await hobbitCompanion.init();
        });

        test('should generate correct context', () => {
            const context = hobbitCompanion.getCurrentContext();
            
            expect(context).toHaveProperty('room');
            expect(context).toHaveProperty('mood');
            expect(context).toHaveProperty('questProgress');
            expect(context).toHaveProperty('interactionCount');
            expect(context).toHaveProperty('timeOfDay');
        });

        test('should get quest progress correctly', () => {
            const questProgress = hobbitCompanion.getQuestProgress();
            
            expect(questProgress).toHaveProperty('activeQuests');
            expect(questProgress).toHaveProperty('completedQuests');
            expect(questProgress).toHaveProperty('currentStep');
        });

        test('should get time of day correctly', () => {
            const timeOfDay = hobbitCompanion.getTimeOfDay();
            
            expect(['night', 'morning', 'afternoon', 'evening']).toContain(timeOfDay);
        });
    });

    describe('State Management', () => {
        beforeEach(async () => {
            await hobbitCompanion.init();
        });

        test('should save state', () => {
            const saveSpy = jest.spyOn(Storage.prototype, 'setItem');
            hobbitCompanion.saveState();
            
            expect(saveSpy).toHaveBeenCalledWith('hobbit-companion-state', expect.any(String));
        });

        test('should load state', () => {
            const mockState = {
                personality: {},
                memory: {},
                interactionCount: 5,
                lastInteraction: '2025-10-25T16:00:00.000Z',
                currentRoom: 'kitchen'
            };
            
            jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockState));
            
            hobbitCompanion.loadState();
            
            expect(mockPersonality.setState).toHaveBeenCalledWith(mockState.personality);
            expect(mockMemory.setState).toHaveBeenCalledWith(mockState.memory);
            expect(hobbitCompanion.interactionCount).toBe(5);
            expect(hobbitCompanion.currentRoom).toBe('kitchen');
        });

        test('should get status', () => {
            const status = hobbitCompanion.getStatus();
            
            expect(status).toHaveProperty('isActive');
            expect(status).toHaveProperty('name');
            expect(status).toHaveProperty('personality');
            expect(status).toHaveProperty('memory');
            expect(status).toHaveProperty('interactionCount');
            expect(status).toHaveProperty('currentRoom');
        });

        test('should reset to default state', () => {
            const removeSpy = jest.spyOn(Storage.prototype, 'removeItem');
            
            hobbitCompanion.reset();
            
            expect(mockPersonality.reset).toHaveBeenCalled();
            expect(mockMemory.reset).toHaveBeenCalled();
            expect(hobbitCompanion.interactionCount).toBe(0);
            expect(removeSpy).toHaveBeenCalledWith('hobbit-companion-state');
        });
    });
});

describe('HobbitPersonality', () => {
    let hobbitPersonality;

    beforeEach(() => {
        hobbitPersonality = new HobbitPersonality();
    });

    describe('Initialization', () => {
        test('should initialize with default traits', () => {
            expect(hobbitPersonality.currentTraits).toHaveProperty('curiosity');
            expect(hobbitPersonality.currentTraits).toHaveProperty('friendliness');
            expect(hobbitPersonality.currentTraits).toHaveProperty('wisdom');
            expect(hobbitPersonality.currentTraits).toHaveProperty('playfulness');
            expect(hobbitPersonality.currentTraits).toHaveProperty('caution');
            expect(hobbitPersonality.currentTraits).toHaveProperty('loyalty');
        });

        test('should have default mood', () => {
            expect(hobbitPersonality.currentMood).toBe('neutral');
        });

        test('should initialize personality development', () => {
            expect(hobbitPersonality.personalityDevelopment.level).toBe(1);
            expect(hobbitPersonality.personalityDevelopment.experience).toBe(0);
        });
    });

    describe('Trait Updates', () => {
        test('should update traits from interaction', () => {
            const initialFriendliness = hobbitPersonality.currentTraits.friendliness;
            hobbitPersonality.updateFromInteraction('talk');
            
            expect(hobbitPersonality.currentTraits.friendliness).toBeGreaterThan(initialFriendliness);
        });

        test('should update traits from room change', () => {
            const initialCuriosity = hobbitPersonality.currentTraits.curiosity;
            hobbitPersonality.updateFromRoomChange('library');
            
            expect(hobbitPersonality.currentTraits.curiosity).toBeGreaterThan(initialCuriosity);
        });

        test('should update traits from quest progress', () => {
            const initialWisdom = hobbitPersonality.currentTraits.wisdom;
            hobbitPersonality.updateFromQuestProgress('test-quest', 'test-step');
            
            expect(hobbitPersonality.currentTraits.wisdom).toBeGreaterThan(initialWisdom);
        });

        test('should update traits from object interaction', () => {
            const initialCuriosity = hobbitPersonality.currentTraits.curiosity;
            hobbitPersonality.updateFromObjectInteraction('crystal-ball', 'living-room');
            
            expect(hobbitPersonality.currentTraits.curiosity).toBeGreaterThan(initialCuriosity);
        });
    });

    describe('Mood System', () => {
        test('should update mood based on traits', () => {
            hobbitPersonality.currentTraits.curiosity = 0.9;
            hobbitPersonality.currentTraits.playfulness = 0.8;
            hobbitPersonality.updateMood();
            
            expect(['excited', 'curious']).toContain(hobbitPersonality.currentMood);
        });

        test('should track mood history', () => {
            hobbitPersonality.updateMood();
            
            expect(hobbitPersonality.moodHistory.length).toBeGreaterThan(0);
        });

        test('should get current mood', () => {
            const mood = hobbitPersonality.getCurrentMood();
            expect(typeof mood).toBe('string');
        });

        test('should get personality traits', () => {
            const traits = hobbitPersonality.getPersonalityTraits();
            expect(Array.isArray(traits)).toBe(true);
        });
    });

    describe('Personality Development', () => {
        test('should gain experience from interactions', () => {
            const initialExp = hobbitPersonality.personalityDevelopment.experience;
            hobbitPersonality.updatePersonalityDevelopment();
            
            expect(hobbitPersonality.personalityDevelopment.experience).toBe(initialExp + 1);
        });

        test('should level up when experience threshold is reached', () => {
            hobbitPersonality.personalityDevelopment.experience = 9;
            hobbitPersonality.personalityDevelopment.level = 1;
            
            hobbitPersonality.updatePersonalityDevelopment();
            
            expect(hobbitPersonality.personalityDevelopment.level).toBe(2);
            expect(hobbitPersonality.personalityDevelopment.experience).toBe(0);
        });
    });

    describe('State Management', () => {
        test('should get state', () => {
            const state = hobbitPersonality.getState();
            
            expect(state).toHaveProperty('traits');
            expect(state).toHaveProperty('currentMood');
            expect(state).toHaveProperty('moodHistory');
            expect(state).toHaveProperty('personalityDevelopment');
        });

        test('should set state', () => {
            const newState = {
                traits: { curiosity: 0.9, friendliness: 0.8 },
                currentMood: 'excited',
                moodHistory: [],
                personalityDevelopment: { level: 2, experience: 5, milestones: [] },
                eventHistory: []
            };
            
            hobbitPersonality.setState(newState);
            
            expect(hobbitPersonality.currentTraits.curiosity).toBe(0.9);
            expect(hobbitPersonality.currentMood).toBe('excited');
            expect(hobbitPersonality.personalityDevelopment.level).toBe(2);
        });

        test('should reset to default state', () => {
            hobbitPersonality.currentTraits.curiosity = 0.9;
            hobbitPersonality.currentMood = 'excited';
            
            hobbitPersonality.reset();
            
            expect(hobbitPersonality.currentTraits.curiosity).toBe(0.8); // base value
            expect(hobbitPersonality.currentMood).toBe('neutral');
        });
    });
});

describe('HobbitDialogue', () => {
    let hobbitDialogue;

    beforeEach(() => {
        hobbitDialogue = new HobbitDialogue();
    });

    describe('Initialization', () => {
        test('should initialize dialogue content', () => {
            expect(hobbitDialogue.dialogueContent).toHaveProperty('conversation');
            expect(hobbitDialogue.dialogueContent).toHaveProperty('quest-guidance');
            expect(hobbitDialogue.dialogueContent).toHaveProperty('room-greeting');
        });

        test('should initialize response patterns', () => {
            expect(hobbitDialogue.responsePatterns.has('quest-help')).toBe(true);
            expect(hobbitDialogue.responsePatterns.has('memory-request')).toBe(true);
        });
    });

    describe('Dialogue Selection', () => {
        test('should get dialogue by category', () => {
            const context = {
                room: 'living-room',
                mood: 'happy',
                questProgress: { activeQuests: [], completedQuests: [] },
                timeOfDay: 'afternoon'
            };
            
            const dialogue = hobbitDialogue.getDialogue('conversation', context);
            
            expect(dialogue).toHaveProperty('id');
            expect(dialogue).toHaveProperty('text');
            expect(dialogue).toHaveProperty('category');
        });

        test('should filter dialogues by context', () => {
            const context = {
                room: 'kitchen',
                mood: 'curious',
                questProgress: { activeQuests: [], completedQuests: [] },
                timeOfDay: 'morning'
            };
            
            const dialogues = hobbitDialogue.dialogueContent['room-greeting'];
            const filtered = hobbitDialogue.filterDialoguesByContext(dialogues, context);
            
            expect(filtered.length).toBeLessThanOrEqual(dialogues.length);
        });

        test('should return fallback dialogue for unknown category', () => {
            const context = { room: 'living-room', mood: 'neutral' };
            const dialogue = hobbitDialogue.getDialogue('unknown-category', context);
            
            expect(dialogue).toHaveProperty('id');
            expect(dialogue).toHaveProperty('text');
        });
    });

    describe('Dialogue History', () => {
        test('should add dialogue to history', () => {
            const context = { room: 'living-room', mood: 'happy' };
            const dialogue = { id: 'test', text: 'Hello', category: 'conversation' };
            
            hobbitDialogue.addToHistory('conversation', dialogue, context);
            
            expect(hobbitDialogue.dialogueHistory.length).toBe(1);
            expect(hobbitDialogue.dialogueHistory[0].category).toBe('conversation');
        });

        test('should maintain history limit', () => {
            const context = { room: 'living-room', mood: 'happy' };
            const dialogue = { id: 'test', text: 'Hello', category: 'conversation' };
            
            // Add more than max history size
            for (let i = 0; i < hobbitDialogue.maxHistorySize + 5; i++) {
                hobbitDialogue.addToHistory('conversation', dialogue, context);
            }
            
            expect(hobbitDialogue.dialogueHistory.length).toBeLessThanOrEqual(hobbitDialogue.maxHistorySize);
        });

        test('should get recent usage count', () => {
            const context = { room: 'living-room', mood: 'happy' };
            const dialogue = { id: 'test', text: 'Hello', category: 'conversation' };
            
            hobbitDialogue.addToHistory('conversation', dialogue, context);
            hobbitDialogue.addToHistory('conversation', dialogue, context);
            
            const usageCount = hobbitDialogue.getRecentUsageCount('test');
            expect(usageCount).toBe(2);
        });
    });

    describe('Dialogue Statistics', () => {
        test('should get dialogue stats', () => {
            const context = { room: 'living-room', mood: 'happy' };
            const dialogue = { id: 'test', text: 'Hello', category: 'conversation' };
            
            hobbitDialogue.addToHistory('conversation', dialogue, context);
            
            const stats = hobbitDialogue.getDialogueStats();
            
            expect(stats).toHaveProperty('totalDialogues');
            expect(stats).toHaveProperty('categories');
            expect(stats).toHaveProperty('moods');
            expect(stats).toHaveProperty('recentActivity');
        });

        test('should clear dialogue history', () => {
            const context = { room: 'living-room', mood: 'happy' };
            const dialogue = { id: 'test', text: 'Hello', category: 'conversation' };
            
            hobbitDialogue.addToHistory('conversation', dialogue, context);
            expect(hobbitDialogue.dialogueHistory.length).toBe(1);
            
            hobbitDialogue.clearDialogueHistory();
            expect(hobbitDialogue.dialogueHistory.length).toBe(0);
        });
    });
});

describe('HobbitMemory', () => {
    let hobbitMemory;

    beforeEach(() => {
        hobbitMemory = new HobbitMemory();
    });

    describe('Initialization', () => {
        test('should initialize with empty memories', () => {
            expect(hobbitMemory.memories.size).toBe(0);
        });

        test('should initialize memory types', () => {
            expect(hobbitMemory.memoryTypes).toHaveProperty('conversation');
            expect(hobbitMemory.memoryTypes).toHaveProperty('quest-guidance');
            expect(hobbitMemory.memoryTypes).toHaveProperty('object-interaction');
        });

        test('should initialize categories', () => {
            expect(hobbitMemory.categories).toHaveProperty('personal');
            expect(hobbitMemory.categories).toHaveProperty('quest');
            expect(hobbitMemory.categories).toHaveProperty('magic');
        });
    });

    describe('Memory Management', () => {
        test('should add memory', () => {
            const content = {
                type: 'conversation',
                content: 'Hello there!',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const memoryId = hobbitMemory.addMemory('conversation', content);
            
            expect(memoryId).toBeTruthy();
            expect(hobbitMemory.memories.has(memoryId)).toBe(true);
        });

        test('should categorize memory correctly', () => {
            const content = {
                type: 'quest-guidance',
                content: 'Help with quest',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const memoryId = hobbitMemory.addMemory('quest-guidance', content);
            const memory = hobbitMemory.memories.get(memoryId);
            
            expect(memory.category).toBe('quest');
        });

        test('should extract tags from content', () => {
            const content = {
                type: 'object-interaction',
                content: 'Interacted with fireplace in living-room',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const memoryId = hobbitMemory.addMemory('object-interaction', content);
            const memory = hobbitMemory.memories.get(memoryId);
            
            expect(memory.tags).toContain('fireplace');
            expect(memory.tags).toContain('living-room');
            expect(memory.tags).toContain('object-interaction');
        });
    });

    describe('Memory Retrieval', () => {
        beforeEach(() => {
            // Add some test memories
            const memories = [
                { type: 'conversation', content: 'Hello', context: { room: 'living-room' } },
                { type: 'quest-guidance', content: 'Quest help', context: { room: 'kitchen' } },
                { type: 'object-interaction', content: 'Fireplace interaction', context: { room: 'living-room' } }
            ];
            
            memories.forEach(memory => {
                hobbitMemory.addMemory(memory.type, {
                    ...memory,
                    timestamp: new Date().toISOString()
                });
            });
        });

        test('should get memories by criteria', () => {
            const memories = hobbitMemory.getMemories({ type: 'conversation' });
            
            expect(memories.length).toBe(1);
            expect(memories[0].type).toBe('conversation');
        });

        test('should get recent memories', () => {
            const recentMemories = hobbitMemory.getRecentMemories(2);
            
            expect(recentMemories.length).toBeLessThanOrEqual(2);
            expect(recentMemories.length).toBeGreaterThan(0);
        });

        test('should search memories by content', () => {
            const searchResults = hobbitMemory.searchMemories('fireplace');
            
            expect(searchResults.length).toBeGreaterThan(0);
            expect(searchResults[0].content.content).toContain('fireplace');
        });
    });

    describe('Memory Associations', () => {
        test('should create associations between memories', () => {
            const content1 = {
                type: 'conversation',
                content: 'Talked about fireplace in living-room',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const content2 = {
                type: 'object-interaction',
                content: 'Interacted with fireplace in living-room',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const memoryId1 = hobbitMemory.addMemory('conversation', content1);
            const memoryId2 = hobbitMemory.addMemory('object-interaction', content2);
            
            const memory1 = hobbitMemory.memories.get(memoryId1);
            const memory2 = hobbitMemory.memories.get(memoryId2);
            
            expect(memory1.associations).toContain(memoryId2);
            expect(memory2.associations).toContain(memoryId1);
        });

        test('should get associated memories', () => {
            const content1 = {
                type: 'conversation',
                content: 'Talked about fireplace',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const content2 = {
                type: 'object-interaction',
                content: 'Fireplace interaction',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const memoryId1 = hobbitMemory.addMemory('conversation', content1);
            hobbitMemory.addMemory('object-interaction', content2);
            
            const associatedMemories = hobbitMemory.getAssociatedMemories(memoryId1);
            
            expect(associatedMemories.length).toBeGreaterThan(0);
        });
    });

    describe('Memory Maintenance', () => {
        test('should perform memory maintenance', () => {
            // Add a memory with low strength
            const content = {
                type: 'conversation',
                content: 'Test memory',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            const memoryId = hobbitMemory.addMemory('conversation', content);
            const memory = hobbitMemory.memories.get(memoryId);
            memory.strength = 0.05; // Very low strength
            
            hobbitMemory.performMemoryMaintenance();
            
            // Memory should be removed due to low strength
            expect(hobbitMemory.memories.has(memoryId)).toBe(false);
        });

        test('should maintain memory limit', () => {
            // Add more memories than the limit
            for (let i = 0; i < hobbitMemory.maxMemories + 10; i++) {
                const content = {
                    type: 'conversation',
                    content: `Test memory ${i}`,
                    context: { room: 'living-room' },
                    timestamp: new Date().toISOString()
                };
                
                hobbitMemory.addMemory('conversation', content);
            }
            
            expect(hobbitMemory.memories.size).toBeLessThanOrEqual(hobbitMemory.maxMemories);
        });
    });

    describe('Memory Statistics', () => {
        test('should get memory statistics', () => {
            const content = {
                type: 'conversation',
                content: 'Test memory',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            hobbitMemory.addMemory('conversation', content);
            
            const stats = hobbitMemory.getMemoryStats();
            
            expect(stats).toHaveProperty('totalMemories');
            expect(stats).toHaveProperty('memoryTypes');
            expect(stats).toHaveProperty('categories');
            expect(stats).toHaveProperty('averageStrength');
        });
    });

    describe('State Management', () => {
        test('should get state', () => {
            const state = hobbitMemory.getState();
            
            expect(state).toHaveProperty('memories');
            expect(state).toHaveProperty('patterns');
            expect(state).toHaveProperty('associations');
        });

        test('should set state', () => {
            const newState = {
                memories: [],
                patterns: {},
                associations: {}
            };
            
            hobbitMemory.setState(newState);
            
            expect(hobbitMemory.memories.size).toBe(0);
        });

        test('should reset memory system', () => {
            const content = {
                type: 'conversation',
                content: 'Test memory',
                context: { room: 'living-room' },
                timestamp: new Date().toISOString()
            };
            
            hobbitMemory.addMemory('conversation', content);
            expect(hobbitMemory.memories.size).toBe(1);
            
            hobbitMemory.reset();
            expect(hobbitMemory.memories.size).toBe(0);
        });
    });
});
