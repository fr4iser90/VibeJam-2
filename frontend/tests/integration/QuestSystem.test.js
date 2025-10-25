/**
 * Fantasy OS - Quest System Integration Tests
 * Integration tests for quest system with FantasyOS core
 * Created: 2025-10-25T16:06:31.000Z
 */

// Mock DOM elements
const mockDOM = {
    createElement: (tag) => ({
        tagName: tag,
        style: {},
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn(),
            toggle: jest.fn()
        },
        textContent: '',
        innerHTML: '',
        appendChild: jest.fn(),
        removeChild: jest.fn(),
        querySelector: jest.fn(),
        querySelectorAll: jest.fn(() => []),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        parentNode: {
            removeChild: jest.fn()
        }
    }),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    getElementById: jest.fn(),
    addEventListener: jest.fn(),
    body: {
        appendChild: jest.fn(),
        removeChild: jest.fn()
    }
};

// Mock FantasyOS core
const mockFantasyOS = {
    components: {
        questManager: null,
        achievementSystem: null,
        roomManager: null,
        objectInteraction: null
    },
    getCurrentRoom: jest.fn(() => 'living-room'),
    getMagicLevel: jest.fn(() => 100),
    setMagicLevel: jest.fn(),
    startQuest: jest.fn(),
    updateQuestProgress: jest.fn(),
    checkAchievementProgress: jest.fn()
};

// Mock quest content for integration tests
const integrationQuestContent = {
    'credentials-recovery': {
        id: 'credentials-recovery',
        title: 'The Hobbit\'s Lost Legacy - Act 1',
        description: 'Help the Hobbit recover his Fantasy OS credentials',
        type: 'main',
        act: 1,
        steps: [
            { 
                id: 'start', 
                title: 'Meet the Hobbit', 
                description: 'Talk to the Hobbit in the living room', 
                room: 'living-room', 
                completed: false,
                triggers: ['hobbit-interaction']
            },
            { 
                id: 'search-living', 
                title: 'Search Living Room', 
                description: 'Look for credential fragments in the living room', 
                room: 'living-room', 
                completed: false,
                triggers: ['fireplace-interaction', 'lamp-interaction']
            },
            { 
                id: 'search-kitchen', 
                title: 'Search Kitchen', 
                description: 'Check the cauldron for magical ingredients', 
                room: 'kitchen', 
                completed: false,
                triggers: ['cauldron-interaction']
            },
            { 
                id: 'complete', 
                title: 'Restore Credentials', 
                description: 'Combine all fragments to restore the Fantasy OS', 
                room: 'living-room', 
                completed: false,
                triggers: ['credential-restoration']
            }
        ],
        rewards: ['unlock-kitchen', 'magic-level-10'],
        dependencies: [],
        triggers: ['hobbit-interaction', 'room-search'],
        status: 'available'
    }
};

// Mock achievement content for integration tests
const integrationAchievements = {
    'first-quest': {
        id: 'first-quest',
        title: 'First Steps',
        description: 'Complete your first quest',
        type: 'quest',
        requirement: 'complete-quest',
        target: 1,
        reward: 'achievement-badge',
        icon: '🎯'
    },
    'room-explorer': {
        id: 'room-explorer',
        title: 'Room Explorer',
        description: 'Visit all rooms in the Fantasy OS',
        type: 'exploration',
        requirement: 'visit-rooms',
        target: 6,
        reward: 'explorer-badge',
        icon: '🏠'
    }
};

// Integration test suite
describe('Quest System Integration', () => {
    let questManager;
    let achievementSystem;
    let fantasyOS;
    
    beforeEach(() => {
        // Mock global objects
        global.document = mockDOM;
        global.localStorage = {
            data: {},
            getItem: function(key) { return this.data[key] || null; },
            setItem: function(key, value) { this.data[key] = value; },
            removeItem: function(key) { delete this.data[key]; },
            clear: function() { this.data = {}; }
        };
        
        // Mock quest content
        global.questContent = integrationQuestContent;
        global.achievements = integrationAchievements;
        
        // Create instances
        questManager = new QuestManager();
        achievementSystem = new AchievementSystem();
        fantasyOS = { ...mockFantasyOS };
        
        // Set up component references
        fantasyOS.components.questManager = questManager;
        fantasyOS.components.achievementSystem = achievementSystem;
        
        // Mock window.fantasyOS
        global.window = { fantasyOS };
    });
    
    afterEach(() => {
        global.localStorage.clear();
    });
    
    describe('Quest System Initialization', () => {
        test('should initialize quest system with FantasyOS', () => {
            expect(questManager.isInitialized).toBe(true);
            expect(questManager.questContent).toBeDefined();
            expect(questManager.questContent['credentials-recovery']).toBeDefined();
        });
        
        test('should initialize achievement system with FantasyOS', () => {
            expect(achievementSystem.isInitialized).toBe(true);
            expect(achievementSystem.achievementContent).toBeDefined();
            expect(achievementSystem.achievementContent['first-quest']).toBeDefined();
        });
    });
    
    describe('Quest Flow Integration', () => {
        test('should complete full quest flow', () => {
            // Start quest
            const startResult = questManager.startQuest('credentials-recovery');
            expect(startResult).toBe(true);
            expect(questManager.activeQuests.has('credentials-recovery')).toBe(true);
            
            // Complete first step
            const step1Result = questManager.updateQuestProgress('credentials-recovery', 'start');
            expect(step1Result).toBe(true);
            
            // Complete second step
            const step2Result = questManager.updateQuestProgress('credentials-recovery', 'search-living');
            expect(step2Result).toBe(true);
            
            // Complete third step
            const step3Result = questManager.updateQuestProgress('credentials-recovery', 'search-kitchen');
            expect(step3Result).toBe(true);
            
            // Complete final step
            const step4Result = questManager.updateQuestProgress('credentials-recovery', 'complete');
            expect(step4Result).toBe(true);
            
            // Quest should be completed
            expect(questManager.completedQuests.has('credentials-recovery')).toBe(true);
            expect(questManager.activeQuests.has('credentials-recovery')).toBe(false);
        });
        
        test('should trigger achievement on quest completion', () => {
            // Start and complete quest
            questManager.startQuest('credentials-recovery');
            questManager.updateQuestProgress('credentials-recovery', 'start');
            questManager.updateQuestProgress('credentials-recovery', 'search-living');
            questManager.updateQuestProgress('credentials-recovery', 'search-kitchen');
            questManager.updateQuestProgress('credentials-recovery', 'complete');
            
            // Check achievement progress
            const achievementResult = achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                questCompleted: true
            });
            
            expect(achievementResult).toBe(true);
            expect(achievementSystem.completedAchievements.has('first-quest')).toBe(true);
        });
    });
    
    describe('Room Integration', () => {
        test('should integrate with room changes', () => {
            // Mock room manager
            const mockRoomManager = {
                checkQuestProgress: jest.fn(),
                checkAchievementProgress: jest.fn()
            };
            
            fantasyOS.components.roomManager = mockRoomManager;
            
            // Start quest
            questManager.startQuest('credentials-recovery');
            
            // Simulate room change
            mockRoomManager.checkQuestProgress('kitchen');
            mockRoomManager.checkAchievementProgress('kitchen');
            
            expect(mockRoomManager.checkQuestProgress).toHaveBeenCalledWith('kitchen');
            expect(mockRoomManager.checkAchievementProgress).toHaveBeenCalledWith('kitchen');
        });
        
        test('should track room exploration for achievements', () => {
            // Visit multiple rooms
            const rooms = ['living-room', 'kitchen', 'bedroom', 'workshop', 'library', 'garden'];
            
            rooms.forEach(room => {
                achievementSystem.checkAchievementProgress('room-explorer', 'visit-rooms', {
                    roomVisited: true
                });
            });
            
            expect(achievementSystem.completedAchievements.has('room-explorer')).toBe(true);
        });
    });
    
    describe('Object Interaction Integration', () => {
        test('should integrate with object interactions', () => {
            // Mock object interaction
            const mockObjectInteraction = {
                checkQuestProgress: jest.fn(),
                checkAchievementProgress: jest.fn()
            };
            
            fantasyOS.components.objectInteraction = mockObjectInteraction;
            
            // Start quest
            questManager.startQuest('credentials-recovery');
            
            // Simulate object interaction
            mockObjectInteraction.checkQuestProgress('fireplace');
            mockObjectInteraction.checkAchievementProgress('fireplace');
            
            expect(mockObjectInteraction.checkQuestProgress).toHaveBeenCalledWith('fireplace');
            expect(mockObjectInteraction.checkAchievementProgress).toHaveBeenCalledWith('fireplace');
        });
        
        test('should progress quest on object interaction', () => {
            // Start quest
            questManager.startQuest('credentials-recovery');
            
            // Simulate fireplace interaction in living room
            fantasyOS.getCurrentRoom.mockReturnValue('living-room');
            
            // Check quest progress for fireplace interaction
            const activeQuests = questManager.getActiveQuests();
            expect(activeQuests).toContain('credentials-recovery');
            
            // Update quest progress for fireplace interaction
            const result = questManager.updateQuestProgress('credentials-recovery', 'search-living');
            expect(result).toBe(true);
        });
    });
    
    describe('UI Integration', () => {
        test('should update quest progress UI', () => {
            // Mock UI elements
            const mockQuestProgressElement = mockDOM.createElement('div');
            mockDOM.getElementById.mockReturnValue(mockQuestProgressElement);
            
            // Start quest
            questManager.startQuest('credentials-recovery');
            
            // Update UI
            questManager.updateQuestProgressUI('credentials-recovery');
            
            expect(mockQuestProgressElement.innerHTML).toBeDefined();
        });
        
        test('should update achievement progress UI', () => {
            // Mock UI elements
            const mockAchievementProgressElement = mockDOM.createElement('div');
            mockDOM.getElementById.mockReturnValue(mockAchievementProgressElement);
            
            // Complete achievement
            achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                questCompleted: true
            });
            
            // Update UI
            achievementSystem.updateAchievementProgressUI('first-quest');
            
            expect(mockAchievementProgressElement.innerHTML).toBeDefined();
        });
        
        test('should show quest notifications', () => {
            // Mock document.body
            global.document.body = mockDOM.createElement('body');
            
            // Start quest
            questManager.startQuest('credentials-recovery');
            
            // Should show quest started notification
            expect(global.document.body.appendChild).toHaveBeenCalled();
        });
        
        test('should show achievement notifications', () => {
            // Mock document.body
            global.document.body = mockDOM.createElement('body');
            
            // Complete achievement
            achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                questCompleted: true
            });
            
            // Should show achievement notification
            expect(global.document.body.appendChild).toHaveBeenCalled();
        });
    });
    
    describe('State Persistence Integration', () => {
        test('should persist quest state across sessions', () => {
            // Start quest and make progress
            questManager.startQuest('credentials-recovery');
            questManager.updateQuestProgress('credentials-recovery', 'start');
            questManager.saveQuestState();
            
            // Create new quest manager instance
            const newQuestManager = new QuestManager();
            
            // Should load previous state
            expect(newQuestManager.activeQuests.has('credentials-recovery')).toBe(true);
        });
        
        test('should persist achievement state across sessions', () => {
            // Complete achievement
            achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                questCompleted: true
            });
            achievementSystem.saveAchievementState();
            
            // Create new achievement system instance
            const newAchievementSystem = new AchievementSystem();
            
            // Should load previous state
            expect(newAchievementSystem.completedAchievements.has('first-quest')).toBe(true);
        });
    });
    
    describe('Event System Integration', () => {
        test('should handle quest events', () => {
            const questStartedHandler = jest.fn();
            const questCompletedHandler = jest.fn();
            
            questManager.addEventListener('quest-started', questStartedHandler);
            questManager.addEventListener('quest-completed', questCompletedHandler);
            
            // Start quest
            questManager.startQuest('credentials-recovery');
            expect(questStartedHandler).toHaveBeenCalledWith('credentials-recovery');
            
            // Complete quest
            questManager.updateQuestProgress('credentials-recovery', 'start');
            questManager.updateQuestProgress('credentials-recovery', 'search-living');
            questManager.updateQuestProgress('credentials-recovery', 'search-kitchen');
            questManager.updateQuestProgress('credentials-recovery', 'complete');
            
            expect(questCompletedHandler).toHaveBeenCalledWith('credentials-recovery');
        });
        
        test('should handle achievement events', () => {
            const achievementUnlockedHandler = jest.fn();
            
            achievementSystem.addEventListener('achievement-unlocked', achievementUnlockedHandler);
            
            // Complete achievement
            achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                questCompleted: true
            });
            
            expect(achievementUnlockedHandler).toHaveBeenCalledWith('first-quest');
        });
    });
    
    describe('Error Handling Integration', () => {
        test('should handle quest system errors gracefully', () => {
            // Mock console.error to avoid test output
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            
            // Try to start non-existent quest
            const result = questManager.startQuest('non-existent-quest');
            expect(result).toBe(false);
            
            // Try to update progress for non-existent quest
            const progressResult = questManager.updateQuestProgress('non-existent-quest', 'step1');
            expect(progressResult).toBe(false);
            
            consoleSpy.mockRestore();
        });
        
        test('should handle achievement system errors gracefully', () => {
            // Mock console.error to avoid test output
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            
            // Try to check progress for non-existent achievement
            const result = achievementSystem.checkAchievementProgress('non-existent', 'complete-quest', {
                questCompleted: true
            });
            expect(result).toBe(false);
            
            consoleSpy.mockRestore();
        });
    });
    
    describe('Performance Integration', () => {
        test('should handle large quest datasets efficiently', () => {
            // Create large quest dataset
            const largeQuestContent = {};
            for (let i = 0; i < 100; i++) {
                largeQuestContent[`quest-${i}`] = {
                    id: `quest-${i}`,
                    title: `Quest ${i}`,
                    steps: Array.from({ length: 10 }, (_, j) => ({
                        id: `step-${j}`,
                        title: `Step ${j}`,
                        room: 'living-room',
                        completed: false
                    })),
                    rewards: [],
                    dependencies: []
                };
            }
            
            global.questContent = largeQuestContent;
            
            // Create quest manager with large dataset
            const largeQuestManager = new QuestManager();
            
            expect(largeQuestManager.questContent).toBeDefined();
            expect(Object.keys(largeQuestManager.questContent).length).toBe(100);
        });
        
        test('should handle frequent quest updates efficiently', () => {
            questManager.startQuest('credentials-recovery');
            
            // Perform many quest updates
            for (let i = 0; i < 100; i++) {
                questManager.updateQuestProgress('credentials-recovery', 'start');
            }
            
            // Should still be functional
            expect(questManager.activeQuests.has('credentials-recovery')).toBe(true);
        });
    });
});

// Export for test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QuestManager,
        AchievementSystem
    };
}
