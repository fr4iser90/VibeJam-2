/**
 * Fantasy OS - Hobbit Companion Integration Tests
 * Integration tests for hobbit companion system with other components
 * Created: 2025-10-25T16:25:40.000Z
 */

describe('Hobbit Companion Integration', () => {
    let fantasyOS;
    let hobbitCompanion;
    let questManager;
    let roomManager;

    beforeEach(async () => {
        // Set up DOM
        document.body.innerHTML = `
            <div id="fantasyDesktop">
                <nav class="room-navigation">
                    <div class="room-tabs">
                        <button class="room-tab active" data-room="living-room">
                            <span class="room-icon">🏠</span>
                            <span class="room-name">Living Room</span>
                        </button>
                        <button class="room-tab" data-room="kitchen">
                            <span class="room-icon">🍳</span>
                            <span class="room-name">Kitchen</span>
                        </button>
                    </div>
                </nav>
                <div class="room" id="living-room">
                    <div class="fantasy-object" data-object="fireplace">Fireplace</div>
                </div>
                <div class="room" id="kitchen">
                    <div class="fantasy-object" data-object="cauldron">Cauldron</div>
                </div>
            </div>
        `;

        // Mock sound system
        window.soundSystem = {
            play: jest.fn(),
            playRoomChange: jest.fn()
        };

        // Initialize Fantasy OS
        fantasyOS = new FantasyOS();
        await fantasyOS.init();

        // Get component references
        hobbitCompanion = fantasyOS.components.hobbitCompanion;
        questManager = fantasyOS.components.questManager;
        roomManager = fantasyOS.components.roomManager;
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('Room Change Integration', () => {
        test('should notify hobbit companion when room changes', async () => {
            const roomChangeSpy = jest.spyOn(hobbitCompanion, 'onRoomChanged');
            
            // Simulate room change
            const kitchenTab = document.querySelector('[data-room="kitchen"]');
            kitchenTab.click();
            
            expect(roomChangeSpy).toHaveBeenCalledWith('kitchen');
            expect(hobbitCompanion.currentRoom).toBe('kitchen');
        });

        test('should update hobbit personality based on room', async () => {
            const updateFromRoomChangeSpy = jest.spyOn(hobbitCompanion.personality, 'updateFromRoomChange');
            
            // Change to library room
            hobbitCompanion.onRoomChanged('library');
            
            expect(updateFromRoomChangeSpy).toHaveBeenCalledWith('library');
        });

        test('should show room-specific dialogue', async () => {
            const getDialogueSpy = jest.spyOn(hobbitCompanion.dialogue, 'getDialogue');
            
            hobbitCompanion.onRoomChanged('kitchen');
            
            expect(getDialogueSpy).toHaveBeenCalledWith('room-greeting', expect.objectContaining({
                room: 'kitchen'
            }));
        });
    });

    describe('Quest System Integration', () => {
        test('should notify hobbit companion of quest progress', async () => {
            const questProgressSpy = jest.spyOn(hobbitCompanion, 'onQuestProgress');
            
            // Start a quest
            questManager.startQuest('credentials-recovery');
            
            // Update quest progress
            questManager.updateQuestProgress('credentials-recovery', 'start');
            
            expect(questProgressSpy).toHaveBeenCalledWith('credentials-recovery', 'start');
        });

        test('should update hobbit personality from quest progress', async () => {
            const updateFromQuestProgressSpy = jest.spyOn(hobbitCompanion.personality, 'updateFromQuestProgress');
            
            hobbitCompanion.onQuestProgress('credentials-recovery', 'start');
            
            expect(updateFromQuestProgressSpy).toHaveBeenCalledWith('credentials-recovery', 'start');
        });

        test('should provide quest guidance dialogue', async () => {
            const getDialogueSpy = jest.spyOn(hobbitCompanion.dialogue, 'getDialogue');
            
            hobbitCompanion.provideQuestGuidance();
            
            expect(getDialogueSpy).toHaveBeenCalledWith('quest-guidance', expect.any(Object));
        });

        test('should add quest guidance to memory', async () => {
            const addMemorySpy = jest.spyOn(hobbitCompanion.memory, 'addMemory');
            
            hobbitCompanion.provideQuestGuidance();
            
            expect(addMemorySpy).toHaveBeenCalledWith('guidance', expect.objectContaining({
                type: 'quest-guidance'
            }));
        });
    });

    describe('Object Interaction Integration', () => {
        test('should notify hobbit companion of object interactions', async () => {
            const objectInteractionSpy = jest.spyOn(hobbitCompanion, 'onObjectInteraction');
            
            // Simulate object click
            const fireplace = document.querySelector('[data-object="fireplace"]');
            fireplace.click();
            
            expect(objectInteractionSpy).toHaveBeenCalledWith('fireplace', 'living-room');
        });

        test('should update hobbit personality from object interaction', async () => {
            const updateFromObjectInteractionSpy = jest.spyOn(hobbitCompanion.personality, 'updateFromObjectInteraction');
            
            hobbitCompanion.onObjectInteraction('fireplace', 'living-room');
            
            expect(updateFromObjectInteractionSpy).toHaveBeenCalledWith('fireplace', 'living-room');
        });

        test('should show object-specific dialogue', async () => {
            const getDialogueSpy = jest.spyOn(hobbitCompanion.dialogue, 'getDialogue');
            
            hobbitCompanion.onObjectInteraction('fireplace', 'living-room');
            
            expect(getDialogueSpy).toHaveBeenCalledWith('object-interaction', expect.objectContaining({
                room: 'living-room'
            }));
        });

        test('should add object interaction to memory', async () => {
            const addMemorySpy = jest.spyOn(hobbitCompanion.memory, 'addMemory');
            
            hobbitCompanion.onObjectInteraction('fireplace', 'living-room');
            
            expect(addMemorySpy).toHaveBeenCalledWith('object-interaction', expect.objectContaining({
                type: 'object-interaction',
                object: 'fireplace',
                room: 'living-room'
            }));
        });
    });

    describe('Personality Development Integration', () => {
        test('should develop personality through interactions', async () => {
            const initialCuriosity = hobbitCompanion.personality.currentTraits.curiosity;
            
            // Multiple interactions
            hobbitCompanion.handleDialogueAction('talk');
            hobbitCompanion.onObjectInteraction('crystal-ball', 'living-room');
            hobbitCompanion.onRoomChanged('library');
            
            const finalCuriosity = hobbitCompanion.personality.currentTraits.curiosity;
            expect(finalCuriosity).toBeGreaterThan(initialCuriosity);
        });

        test('should change mood based on interactions', async () => {
            const initialMood = hobbitCompanion.personality.currentMood;
            
            // Increase curiosity and playfulness
            hobbitCompanion.personality.currentTraits.curiosity = 0.9;
            hobbitCompanion.personality.currentTraits.playfulness = 0.8;
            hobbitCompanion.personality.updateMood();
            
            const finalMood = hobbitCompanion.personality.currentMood;
            expect(['excited', 'curious']).toContain(finalMood);
        });

        test('should track personality development milestones', async () => {
            const initialLevel = hobbitCompanion.personality.personalityDevelopment.level;
            
            // Add enough experience to level up
            hobbitCompanion.personality.personalityDevelopment.experience = 9;
            hobbitCompanion.personality.updatePersonalityDevelopment();
            
            const finalLevel = hobbitCompanion.personality.personalityDevelopment.level;
            expect(finalLevel).toBeGreaterThan(initialLevel);
        });
    });

    describe('Memory System Integration', () => {
        test('should accumulate memories from all interactions', async () => {
            const initialMemoryCount = hobbitCompanion.memory.memories.size;
            
            // Various interactions
            hobbitCompanion.handleDialogueAction('talk');
            hobbitCompanion.handleDialogueAction('quest');
            hobbitCompanion.onRoomChanged('kitchen');
            hobbitCompanion.onObjectInteraction('cauldron', 'kitchen');
            hobbitCompanion.onQuestProgress('test-quest', 'test-step');
            
            const finalMemoryCount = hobbitCompanion.memory.memories.size;
            expect(finalMemoryCount).toBeGreaterThan(initialMemoryCount);
        });

        test('should create associations between related memories', async () => {
            // Add related memories
            hobbitCompanion.onObjectInteraction('fireplace', 'living-room');
            hobbitCompanion.handleDialogueAction('talk');
            
            const memories = Array.from(hobbitCompanion.memory.memories.values());
            const memoryWithAssociations = memories.find(m => m.associations.length > 0);
            
            expect(memoryWithAssociations).toBeTruthy();
        });

        test('should retrieve relevant memories for dialogue', async () => {
            // Add some memories
            hobbitCompanion.handleDialogueAction('talk');
            hobbitCompanion.onObjectInteraction('fireplace', 'living-room');
            
            // Search for fireplace-related memories
            const fireplaceMemories = hobbitCompanion.memory.searchMemories('fireplace');
            
            expect(fireplaceMemories.length).toBeGreaterThan(0);
            expect(fireplaceMemories[0].content.content).toContain('fireplace');
        });
    });

    describe('Dialogue System Integration', () => {
        test('should provide context-aware dialogue', async () => {
            // Set up context
            hobbitCompanion.currentRoom = 'library';
            hobbitCompanion.personality.currentMood = 'curious';
            
            const dialogue = hobbitCompanion.dialogue.getDialogue('conversation', hobbitCompanion.getCurrentContext());
            
            expect(dialogue).toHaveProperty('text');
            expect(dialogue).toHaveProperty('category');
        });

        test('should adapt dialogue based on personality', async () => {
            // Set personality traits
            hobbitCompanion.personality.currentTraits.curiosity = 0.9;
            hobbitCompanion.personality.currentTraits.wisdom = 0.8;
            hobbitCompanion.personality.updateMood();
            
            const context = hobbitCompanion.getCurrentContext();
            const dialogue = hobbitCompanion.dialogue.getDialogue('conversation', context);
            
            expect(dialogue).toBeTruthy();
        });

        test('should maintain dialogue history', async () => {
            const initialHistoryLength = hobbitCompanion.dialogue.dialogueHistory.length;
            
            // Multiple dialogue interactions
            hobbitCompanion.startConversation();
            hobbitCompanion.provideQuestGuidance();
            hobbitCompanion.startConversation();
            
            const finalHistoryLength = hobbitCompanion.dialogue.dialogueHistory.length;
            expect(finalHistoryLength).toBeGreaterThan(initialHistoryLength);
        });
    });

    describe('UI Integration', () => {
        test('should display hobbit companion UI', () => {
            const hobbitContainer = document.querySelector('#hobbit-companion');
            expect(hobbitContainer).toBeTruthy();
        });

        test('should handle dialogue button clicks', async () => {
            const talkButton = document.querySelector('[data-action="talk"]');
            const startConversationSpy = jest.spyOn(hobbitCompanion, 'startConversation');
            
            talkButton.click();
            
            expect(startConversationSpy).toHaveBeenCalled();
        });

        test('should update personality indicator', async () => {
            const personalityIndicator = document.querySelector('.personality-indicator');
            
            // Change mood
            hobbitCompanion.personality.currentMood = 'excited';
            hobbitCompanion.updatePersonalityIndicator();
            
            expect(personalityIndicator.classList.contains('mood-excited')).toBe(true);
        });

        test('should show and hide memory display', async () => {
            const memoryDisplay = document.querySelector('.hobbit-memory-display');
            
            // Initially hidden
            expect(memoryDisplay.style.display).toBe('none');
            
            // Show memory
            hobbitCompanion.showMemory();
            expect(memoryDisplay.style.display).toBe('block');
            
            // Hide memory
            hobbitCompanion.showMemory();
            expect(memoryDisplay.style.display).toBe('none');
        });
    });

    describe('State Persistence Integration', () => {
        test('should save and load hobbit companion state', async () => {
            // Modify state
            hobbitCompanion.interactionCount = 5;
            hobbitCompanion.currentRoom = 'kitchen';
            hobbitCompanion.personality.currentMood = 'excited';
            
            // Save state
            hobbitCompanion.saveState();
            
            // Create new hobbit companion
            const newHobbitCompanion = new HobbitCompanion();
            await newHobbitCompanion.init();
            
            // Load state
            newHobbitCompanion.loadState();
            
            expect(newHobbitCompanion.interactionCount).toBe(5);
            expect(newHobbitCompanion.currentRoom).toBe('kitchen');
            expect(newHobbitCompanion.personality.currentMood).toBe('excited');
        });

        test('should persist personality development', async () => {
            // Develop personality
            hobbitCompanion.personality.personalityDevelopment.level = 3;
            hobbitCompanion.personality.personalityDevelopment.experience = 15;
            
            // Save and load
            hobbitCompanion.saveState();
            
            const newHobbitCompanion = new HobbitCompanion();
            await newHobbitCompanion.init();
            newHobbitCompanion.loadState();
            
            expect(newHobbitCompanion.personality.personalityDevelopment.level).toBe(3);
            expect(newHobbitCompanion.personality.personalityDevelopment.experience).toBe(15);
        });

        test('should persist memory system', async () => {
            // Add memories
            hobbitCompanion.handleDialogueAction('talk');
            hobbitCompanion.onObjectInteraction('fireplace', 'living-room');
            
            const initialMemoryCount = hobbitCompanion.memory.memories.size;
            
            // Save and load
            hobbitCompanion.saveState();
            
            const newHobbitCompanion = new HobbitCompanion();
            await newHobbitCompanion.init();
            newHobbitCompanion.loadState();
            
            expect(newHobbitCompanion.memory.memories.size).toBe(initialMemoryCount);
        });
    });

    describe('Error Handling Integration', () => {
        test('should handle missing dependencies gracefully', async () => {
            // Remove sound system
            delete window.soundSystem;
            
            // Should not throw error
            expect(() => {
                hobbitCompanion.playDialogueSound();
            }).not.toThrow();
        });

        test('should handle missing quest manager gracefully', async () => {
            // Remove quest manager
            delete window.questManager;
            
            // Should not throw error
            expect(() => {
                hobbitCompanion.getQuestProgress();
            }).not.toThrow();
        });

        test('should handle invalid dialogue categories gracefully', async () => {
            // Should return fallback dialogue
            const dialogue = hobbitCompanion.dialogue.getDialogue('invalid-category', {});
            
            expect(dialogue).toHaveProperty('text');
            expect(dialogue).toHaveProperty('category');
        });
    });
});
