/**
 * Fantasy OS - Quest Manager Unit Tests
 * Unit tests for the quest management system
 * Created: 2025-10-25T16:06:31.000Z
 */

// Mock dependencies
const mockLocalStorage = {
    data: {},
    getItem: function(key) {
        return this.data[key] || null;
    },
    setItem: function(key, value) {
        this.data[key] = value;
    },
    removeItem: function(key) {
        delete this.data[key];
    },
    clear: function() {
        this.data = {};
    }
};

// Mock quest content
const mockQuestContent = {
    'test-quest': {
        id: 'test-quest',
        title: 'Test Quest',
        description: 'A test quest for unit testing',
        type: 'main',
        act: 1,
        steps: [
            { id: 'step1', title: 'Step 1', description: 'First step', room: 'living-room', completed: false },
            { id: 'step2', title: 'Step 2', description: 'Second step', room: 'kitchen', completed: false }
        ],
        rewards: ['test-reward'],
        dependencies: [],
        triggers: ['test-trigger'],
        status: 'available'
    }
};

// Mock achievement content
const mockAchievements = {
    'test-achievement': {
        id: 'test-achievement',
        title: 'Test Achievement',
        description: 'A test achievement',
        type: 'quest',
        requirement: 'complete-quest',
        target: 1,
        reward: 'test-badge',
        icon: '🎯'
    }
};

// Test suite for QuestManager
describe('QuestManager', () => {
    let questManager;
    
    beforeEach(() => {
        // Mock localStorage
        global.localStorage = mockLocalStorage;
        mockLocalStorage.clear();
        
        // Mock quest content
        global.questContent = mockQuestContent;
        global.achievements = mockAchievements;
        
        // Create new QuestManager instance
        questManager = new QuestManager();
    });
    
    afterEach(() => {
        mockLocalStorage.clear();
    });
    
    describe('Initialization', () => {
        test('should initialize with empty state', () => {
            expect(questManager.activeQuests.size).toBe(0);
            expect(questManager.completedQuests.size).toBe(0);
            expect(questManager.questProgress.size).toBe(0);
        });
        
        test('should load quest content', () => {
            expect(questManager.questContent).toBeDefined();
            expect(questManager.questContent['test-quest']).toBeDefined();
        });
    });
    
    describe('Quest Management', () => {
        test('should start a quest successfully', () => {
            const result = questManager.startQuest('test-quest');
            expect(result).toBe(true);
            expect(questManager.activeQuests.has('test-quest')).toBe(true);
        });
        
        test('should not start quest if already active', () => {
            questManager.startQuest('test-quest');
            const result = questManager.startQuest('test-quest');
            expect(result).toBe(false);
        });
        
        test('should not start quest if not found', () => {
            const result = questManager.startQuest('non-existent-quest');
            expect(result).toBe(false);
        });
        
        test('should update quest progress', () => {
            questManager.startQuest('test-quest');
            const result = questManager.updateQuestProgress('test-quest', 'step1');
            expect(result).toBe(true);
            
            const progress = questManager.getQuestProgress('test-quest');
            expect(progress.completedSteps).toContain('step1');
        });
        
        test('should complete quest when all steps done', () => {
            questManager.startQuest('test-quest');
            questManager.updateQuestProgress('test-quest', 'step1');
            questManager.updateQuestProgress('test-quest', 'step2');
            
            expect(questManager.completedQuests.has('test-quest')).toBe(true);
            expect(questManager.activeQuests.has('test-quest')).toBe(false);
        });
    });
    
    describe('Quest State Persistence', () => {
        test('should save quest state to localStorage', () => {
            questManager.startQuest('test-quest');
            questManager.saveQuestState();
            
            const savedState = JSON.parse(mockLocalStorage.getItem('fantasy-os-quest-state'));
            expect(savedState).toBeDefined();
            expect(savedState.activeQuests.length).toBe(1);
        });
        
        test('should load quest state from localStorage', async () => {
            // Save initial state
            questManager.startQuest('test-quest');
            questManager.saveQuestState();
            
            // Create new instance
            const newQuestManager = new QuestManager();
            await newQuestManager.loadQuestState();
            
            expect(newQuestManager.activeQuests.has('test-quest')).toBe(true);
        });
    });
    
    describe('Quest Information', () => {
        test('should get quest information', () => {
            const questInfo = questManager.getQuestInfo('test-quest');
            expect(questInfo).toBeDefined();
            expect(questInfo.title).toBe('Test Quest');
        });
        
        test('should return null for non-existent quest', () => {
            const questInfo = questManager.getQuestInfo('non-existent');
            expect(questInfo).toBeNull();
        });
        
        test('should get active quests', () => {
            questManager.startQuest('test-quest');
            const activeQuests = questManager.getActiveQuests();
            expect(activeQuests).toContain('test-quest');
        });
        
        test('should get completed quests', () => {
            questManager.startQuest('test-quest');
            questManager.updateQuestProgress('test-quest', 'step1');
            questManager.updateQuestProgress('test-quest', 'step2');
            
            const completedQuests = questManager.getCompletedQuests();
            expect(completedQuests).toContain('test-quest');
        });
    });
    
    describe('Quest Dependencies', () => {
        test('should check quest dependencies', () => {
            const hasDependencies = questManager.checkQuestDependencies('test-quest');
            expect(hasDependencies).toBe(true);
        });
        
        test('should handle quests with dependencies', () => {
            // Add a quest with dependencies
            questManager.questContent['dependent-quest'] = {
                id: 'dependent-quest',
                title: 'Dependent Quest',
                dependencies: ['test-quest'],
                steps: [],
                rewards: []
            };
            
            questManager.initializeQuestDependencies();
            
            // Should not be available until dependency is completed
            const hasDependencies = questManager.checkQuestDependencies('dependent-quest');
            expect(hasDependencies).toBe(false);
            
            // Complete the dependency
            questManager.completedQuests.add('test-quest');
            const hasDependenciesAfter = questManager.checkQuestDependencies('dependent-quest');
            expect(hasDependenciesAfter).toBe(true);
        });
    });
    
    describe('Quest Rewards', () => {
        test('should process quest rewards', () => {
            questManager.startQuest('test-quest');
            questManager.updateQuestProgress('test-quest', 'step1');
            questManager.updateQuestProgress('test-quest', 'step2');
            
            // Quest should be completed and rewards processed
            expect(questManager.completedQuests.has('test-quest')).toBe(true);
        });
        
        test('should handle unknown rewards', () => {
            questManager.processReward('unknown-reward');
            // Should not throw error
            expect(true).toBe(true);
        });
    });
    
    describe('Event System', () => {
        test('should add event listeners', () => {
            const handler = jest.fn();
            questManager.addEventListener('test-event', handler);
            
            expect(questManager.eventHandlers.has('test-event')).toBe(true);
        });
        
        test('should trigger events', () => {
            const handler = jest.fn();
            questManager.addEventListener('test-event', handler);
            questManager.triggerEvent('test-event', 'test-data');
            
            expect(handler).toHaveBeenCalledWith('test-data');
        });
        
        test('should remove event listeners', () => {
            const handler = jest.fn();
            questManager.addEventListener('test-event', handler);
            questManager.removeEventListener('test-event', handler);
            
            expect(questManager.eventHandlers.get('test-event')).toHaveLength(0);
        });
    });
    
    describe('Quest Reset', () => {
        test('should reset quest system', () => {
            questManager.startQuest('test-quest');
            questManager.resetQuestSystem();
            
            expect(questManager.activeQuests.size).toBe(0);
            expect(questManager.completedQuests.size).toBe(0);
            expect(questManager.questProgress.size).toBe(0);
        });
    });
});

// Test suite for AchievementSystem
describe('AchievementSystem', () => {
    let achievementSystem;
    
    beforeEach(() => {
        // Mock localStorage
        global.localStorage = mockLocalStorage;
        mockLocalStorage.clear();
        
        // Mock achievement content
        global.achievements = mockAchievements;
        
        // Create new AchievementSystem instance
        achievementSystem = new AchievementSystem();
    });
    
    afterEach(() => {
        mockLocalStorage.clear();
    });
    
    describe('Initialization', () => {
        test('should initialize with empty state', () => {
            expect(achievementSystem.completedAchievements.size).toBe(0);
            expect(achievementSystem.achievementProgress.size).toBe(0);
        });
        
        test('should load achievement content', () => {
            expect(achievementSystem.achievementContent).toBeDefined();
            expect(achievementSystem.achievementContent['test-achievement']).toBeDefined();
        });
    });
    
    describe('Achievement Progress', () => {
        test('should check achievement progress', () => {
            const result = achievementSystem.checkAchievementProgress('test-achievement', 'complete-quest', {
                questCompleted: true
            });
            expect(result).toBe(true);
        });
        
        test('should not check progress for non-existent achievement', () => {
            const result = achievementSystem.checkAchievementProgress('non-existent', 'complete-quest', {
                questCompleted: true
            });
            expect(result).toBe(false);
        });
        
        test('should not check progress for completed achievement', () => {
            achievementSystem.completedAchievements.add('test-achievement');
            const result = achievementSystem.checkAchievementProgress('test-achievement', 'complete-quest', {
                questCompleted: true
            });
            expect(result).toBe(false);
        });
    });
    
    describe('Achievement Completion', () => {
        test('should award achievement when target reached', () => {
            achievementSystem.checkAchievementProgress('test-achievement', 'complete-quest', {
                questCompleted: true
            });
            
            expect(achievementSystem.completedAchievements.has('test-achievement')).toBe(true);
        });
        
        test('should not award achievement if not found', () => {
            const result = achievementSystem.awardAchievement('non-existent');
            expect(result).toBe(false);
        });
    });
    
    describe('Achievement Information', () => {
        test('should get achievement information', () => {
            const achievementInfo = achievementSystem.getAchievementInfo('test-achievement');
            expect(achievementInfo).toBeDefined();
            expect(achievementInfo.title).toBe('Test Achievement');
        });
        
        test('should return null for non-existent achievement', () => {
            const achievementInfo = achievementSystem.getAchievementInfo('non-existent');
            expect(achievementInfo).toBeNull();
        });
        
        test('should get completed achievements', () => {
            achievementSystem.completedAchievements.add('test-achievement');
            const completedAchievements = achievementSystem.getCompletedAchievements();
            expect(completedAchievements).toContain('test-achievement');
        });
        
        test('should get achievement count', () => {
            achievementSystem.completedAchievements.add('test-achievement');
            const count = achievementSystem.getAchievementCount();
            expect(count.total).toBe(1);
            expect(count.completed).toBe(1);
            expect(count.progress).toBe(100);
        });
    });
    
    describe('Achievement State Persistence', () => {
        test('should save achievement state to localStorage', () => {
            achievementSystem.completedAchievements.add('test-achievement');
            achievementSystem.saveAchievementState();
            
            const savedState = JSON.parse(mockLocalStorage.getItem('fantasy-os-achievements'));
            expect(savedState).toBeDefined();
            expect(savedState.completedAchievements).toContain('test-achievement');
        });
        
        test('should load achievement state from localStorage', async () => {
            // Save initial state
            achievementSystem.completedAchievements.add('test-achievement');
            achievementSystem.saveAchievementState();
            
            // Create new instance
            const newAchievementSystem = new AchievementSystem();
            await newAchievementSystem.loadAchievementState();
            
            expect(newAchievementSystem.completedAchievements.has('test-achievement')).toBe(true);
        });
    });
    
    describe('Achievement Reset', () => {
        test('should reset achievement system', () => {
            achievementSystem.completedAchievements.add('test-achievement');
            achievementSystem.resetAchievementSystem();
            
            expect(achievementSystem.completedAchievements.size).toBe(0);
            expect(achievementSystem.achievementProgress.size).toBe(0);
        });
    });
});

// Test suite for HobbitPersonality
describe('HobbitPersonality', () => {
    let hobbitPersonality;
    
    beforeEach(() => {
        hobbitPersonality = new HobbitPersonality();
    });
    
    describe('Dialogue System', () => {
        test('should get dialogue based on mood', () => {
            const dialogue = hobbitPersonality.getDialogue('greeting', 'living-room');
            expect(dialogue).toBeDefined();
            expect(typeof dialogue).toBe('string');
        });
        
        test('should update mood based on context', () => {
            hobbitPersonality.updateMood('quest-completed');
            expect(hobbitPersonality.currentMood).toBe('excited');
        });
        
        test('should add to memory', () => {
            hobbitPersonality.addToMemory('dialogue', 'test dialogue');
            expect(hobbitPersonality.memory.size).toBe(1);
        });
        
        test('should limit memory size', () => {
            // Add more than max memory size
            for (let i = 0; i < 60; i++) {
                hobbitPersonality.addToMemory('test', `test-${i}`);
            }
            
            expect(hobbitPersonality.memory.size).toBeLessThanOrEqual(hobbitPersonality.maxMemorySize);
        });
    });
});

// Export for test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QuestManager,
        AchievementSystem,
        HobbitPersonality
    };
}
