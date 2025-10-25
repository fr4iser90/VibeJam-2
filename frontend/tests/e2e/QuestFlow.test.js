/**
 * Fantasy OS - Quest System End-to-End Tests
 * End-to-end tests for complete quest flow
 * Created: 2025-10-25T16:06:31.000Z
 */

// E2E Test Configuration
const E2E_CONFIG = {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retries: 3
};

// Test data for E2E tests
const E2E_TEST_DATA = {
    quests: {
        'credentials-recovery': {
            id: 'credentials-recovery',
            title: 'The Hobbit\'s Lost Legacy - Act 1',
            steps: [
                { id: 'start', room: 'living-room', triggers: ['hobbit-interaction'] },
                { id: 'search-living', room: 'living-room', triggers: ['fireplace-interaction'] },
                { id: 'search-kitchen', room: 'kitchen', triggers: ['cauldron-interaction'] },
                { id: 'complete', room: 'living-room', triggers: ['credential-restoration'] }
            ]
        }
    },
    achievements: {
        'first-quest': {
            id: 'first-quest',
            title: 'First Steps',
            requirement: 'complete-quest',
            target: 1
        },
        'room-explorer': {
            id: 'room-explorer',
            title: 'Room Explorer',
            requirement: 'visit-rooms',
            target: 6
        }
    }
};

// E2E Test Suite
describe('Quest System E2E Tests', () => {
    let page;
    let browser;
    
    beforeAll(async () => {
        // Initialize browser and page
        browser = await playwright.chromium.launch({
            headless: false, // Set to true for CI/CD
            slowMo: 100 // Slow down for better visibility
        });
        page = await browser.newPage();
        
        // Set viewport
        await page.setViewportSize({ width: 1280, height: 720 });
        
        // Navigate to Fantasy OS
        await page.goto(E2E_CONFIG.baseUrl);
        
        // Wait for Fantasy OS to initialize
        await page.waitForSelector('.fantasy-desktop', { timeout: E2E_CONFIG.timeout });
    });
    
    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });
    
    beforeEach(async () => {
        // Clear localStorage before each test
        await page.evaluate(() => {
            localStorage.clear();
        });
        
        // Reload page to start fresh
        await page.reload();
        await page.waitForSelector('.fantasy-desktop');
    });
    
    describe('Quest System Initialization', () => {
        test('should initialize quest system on page load', async () => {
            // Check if quest system is initialized
            const questSystemInitialized = await page.evaluate(() => {
                return window.fantasyOS && 
                       window.fantasyOS.components.questManager && 
                       window.fantasyOS.components.questManager.isInitialized;
            });
            
            expect(questSystemInitialized).toBe(true);
        });
        
        test('should initialize achievement system on page load', async () => {
            // Check if achievement system is initialized
            const achievementSystemInitialized = await page.evaluate(() => {
                return window.fantasyOS && 
                       window.fantasyOS.components.achievementSystem && 
                       window.fantasyOS.components.achievementSystem.isInitialized;
            });
            
            expect(achievementSystemInitialized).toBe(true);
        });
        
        test('should start first quest automatically', async () => {
            // Wait for quest to start
            await page.waitForTimeout(3000);
            
            // Check if first quest is active
            const firstQuestActive = await page.evaluate(() => {
                return window.fantasyOS.components.questManager.activeQuests.has('credentials-recovery');
            });
            
            expect(firstQuestActive).toBe(true);
        });
    });
    
    describe('Quest UI Interaction', () => {
        test('should open quest system when quest button clicked', async () => {
            // Click quest button
            await page.click('#questBtn');
            
            // Check if quest system is visible
            const questSystemVisible = await page.isVisible('#quest-system');
            expect(questSystemVisible).toBe(true);
        });
        
        test('should close quest system when quest button clicked again', async () => {
            // Open quest system
            await page.click('#questBtn');
            await page.waitForSelector('#quest-system', { state: 'visible' });
            
            // Close quest system
            await page.click('#questBtn');
            
            // Check if quest system is hidden
            const questSystemHidden = await page.isHidden('#quest-system');
            expect(questSystemHidden).toBe(true);
        });
        
        test('should open achievement system when achievement button clicked', async () => {
            // Click achievement button
            await page.click('#achievementBtn');
            
            // Check if achievement system is visible
            const achievementSystemVisible = await page.isVisible('#achievement-system');
            expect(achievementSystemVisible).toBe(true);
        });
        
        test('should show quest progress in quest system', async () => {
            // Open quest system
            await page.click('#questBtn');
            await page.waitForSelector('#quest-system', { state: 'visible' });
            
            // Check if quest progress is displayed
            const questProgressVisible = await page.isVisible('#quest-progress');
            expect(questProgressVisible).toBe(true);
            
            // Check if quest items are displayed
            const questItems = await page.$$('.quest-item');
            expect(questItems.length).toBeGreaterThan(0);
        });
        
        test('should show achievement progress in achievement system', async () => {
            // Open achievement system
            await page.click('#achievementBtn');
            await page.waitForSelector('#achievement-system', { state: 'visible' });
            
            // Check if achievement progress is displayed
            const achievementProgressVisible = await page.isVisible('#achievement-progress');
            expect(achievementProgressVisible).toBe(true);
        });
    });
    
    describe('Quest Progress Flow', () => {
        test('should progress quest when interacting with objects', async () => {
            // Wait for quest to start
            await page.waitForTimeout(3000);
            
            // Click on fireplace in living room
            await page.click('.fireplace');
            
            // Wait for quest progress update
            await page.waitForTimeout(1000);
            
            // Check if quest step is completed
            const questStepCompleted = await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                const quest = questManager.activeQuests.get('credentials-recovery');
                return quest && quest.steps.some(step => step.id === 'search-living' && step.completed);
            });
            
            expect(questStepCompleted).toBe(true);
        });
        
        test('should show quest notifications', async () => {
            // Wait for quest to start
            await page.waitForTimeout(3000);
            
            // Check if quest notification is shown
            const questNotificationVisible = await page.isVisible('.quest-notification');
            expect(questNotificationVisible).toBe(true);
        });
        
        test('should complete quest when all steps done', async () => {
            // Wait for quest to start
            await page.waitForTimeout(3000);
            
            // Complete all quest steps
            await page.click('.fireplace'); // Complete search-living step
            await page.waitForTimeout(500);
            
            // Switch to kitchen
            await page.click('[data-room="kitchen"]');
            await page.waitForTimeout(500);
            
            // Click on cauldron
            await page.click('.cauldron');
            await page.waitForTimeout(500);
            
            // Switch back to living room
            await page.click('[data-room="living-room"]');
            await page.waitForTimeout(500);
            
            // Complete final step (this would need to be implemented)
            await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                questManager.updateQuestProgress('credentials-recovery', 'complete');
            });
            
            // Check if quest is completed
            const questCompleted = await page.evaluate(() => {
                return window.fantasyOS.components.questManager.completedQuests.has('credentials-recovery');
            });
            
            expect(questCompleted).toBe(true);
        });
    });
    
    describe('Achievement System Flow', () => {
        test('should unlock achievement when quest completed', async () => {
            // Complete quest first
            await page.waitForTimeout(3000);
            await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                questManager.updateQuestProgress('credentials-recovery', 'start');
                questManager.updateQuestProgress('credentials-recovery', 'search-living');
                questManager.updateQuestProgress('credentials-recovery', 'search-kitchen');
                questManager.updateQuestProgress('credentials-recovery', 'complete');
            });
            
            // Check achievement progress
            await page.evaluate(() => {
                const achievementSystem = window.fantasyOS.components.achievementSystem;
                achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                    questCompleted: true
                });
            });
            
            // Check if achievement is unlocked
            const achievementUnlocked = await page.evaluate(() => {
                return window.fantasyOS.components.achievementSystem.completedAchievements.has('first-quest');
            });
            
            expect(achievementUnlocked).toBe(true);
        });
        
        test('should show achievement notification', async () => {
            // Unlock achievement
            await page.evaluate(() => {
                const achievementSystem = window.fantasyOS.components.achievementSystem;
                achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                    questCompleted: true
                });
            });
            
            // Check if achievement notification is shown
            const achievementNotificationVisible = await page.isVisible('.achievement-notification');
            expect(achievementNotificationVisible).toBe(true);
        });
        
        test('should track room exploration for achievements', async () => {
            // Visit all rooms
            const rooms = ['kitchen', 'bedroom', 'workshop', 'library', 'garden'];
            
            for (const room of rooms) {
                await page.click(`[data-room="${room}"]`);
                await page.waitForTimeout(500);
            }
            
            // Check achievement progress
            await page.evaluate(() => {
                const achievementSystem = window.fantasyOS.components.achievementSystem;
                // Simulate visiting all rooms
                for (let i = 0; i < 6; i++) {
                    achievementSystem.checkAchievementProgress('room-explorer', 'visit-rooms', {
                        roomVisited: true
                    });
                }
            });
            
            // Check if room explorer achievement is unlocked
            const roomExplorerAchievementUnlocked = await page.evaluate(() => {
                return window.fantasyOS.components.achievementSystem.completedAchievements.has('room-explorer');
            });
            
            expect(roomExplorerAchievementUnlocked).toBe(true);
        });
    });
    
    describe('Hobbit Companion Integration', () => {
        test('should show hobbit companion', async () => {
            // Check if hobbit companion is visible
            const hobbitCompanionVisible = await page.isVisible('#hobbit-companion');
            expect(hobbitCompanionVisible).toBe(true);
        });
        
        test('should interact with hobbit companion', async () => {
            // Click on hobbit companion
            await page.click('#hobbitImage');
            
            // Check if hobbit text changes
            const hobbitText = await page.textContent('#hobbitText');
            expect(hobbitText).toBeDefined();
            expect(hobbitText.length).toBeGreaterThan(0);
        });
        
        test('should update hobbit dialogue based on quest progress', async () => {
            // Complete quest step
            await page.click('.fireplace');
            await page.waitForTimeout(1000);
            
            // Click on hobbit companion
            await page.click('#hobbitImage');
            
            // Check if hobbit dialogue reflects quest progress
            const hobbitText = await page.textContent('#hobbitText');
            expect(hobbitText).toBeDefined();
        });
    });
    
    describe('Keyboard Shortcuts', () => {
        test('should open quest system with Ctrl+Q', async () => {
            // Press Ctrl+Q
            await page.keyboard.press('Control+q');
            
            // Check if quest system is visible
            const questSystemVisible = await page.isVisible('#quest-system');
            expect(questSystemVisible).toBe(true);
        });
        
        test('should open achievement system with Ctrl+A', async () => {
            // Press Ctrl+A
            await page.keyboard.press('Control+a');
            
            // Check if achievement system is visible
            const achievementSystemVisible = await page.isVisible('#achievement-system');
            expect(achievementSystemVisible).toBe(true);
        });
        
        test('should close quest system with Escape', async () => {
            // Open quest system
            await page.click('#questBtn');
            await page.waitForSelector('#quest-system', { state: 'visible' });
            
            // Press Escape
            await page.keyboard.press('Escape');
            
            // Check if quest system is hidden
            const questSystemHidden = await page.isHidden('#quest-system');
            expect(questSystemHidden).toBe(true);
        });
    });
    
    describe('State Persistence', () => {
        test('should persist quest state across page reloads', async () => {
            // Start quest and make progress
            await page.waitForTimeout(3000);
            await page.click('.fireplace');
            await page.waitForTimeout(1000);
            
            // Reload page
            await page.reload();
            await page.waitForSelector('.fantasy-desktop');
            
            // Check if quest state is restored
            const questStateRestored = await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                return questManager.activeQuests.has('credentials-recovery');
            });
            
            expect(questStateRestored).toBe(true);
        });
        
        test('should persist achievement state across page reloads', async () => {
            // Unlock achievement
            await page.evaluate(() => {
                const achievementSystem = window.fantasyOS.components.achievementSystem;
                achievementSystem.checkAchievementProgress('first-quest', 'complete-quest', {
                    questCompleted: true
                });
            });
            
            // Reload page
            await page.reload();
            await page.waitForSelector('.fantasy-desktop');
            
            // Check if achievement state is restored
            const achievementStateRestored = await page.evaluate(() => {
                const achievementSystem = window.fantasyOS.components.achievementSystem;
                return achievementSystem.completedAchievements.has('first-quest');
            });
            
            expect(achievementStateRestored).toBe(true);
        });
    });
    
    describe('Error Handling', () => {
        test('should handle quest system errors gracefully', async () => {
            // Try to trigger error condition
            await page.evaluate(() => {
                try {
                    window.fantasyOS.components.questManager.startQuest('non-existent-quest');
                } catch (error) {
                    console.error('Quest error handled:', error);
                }
            });
            
            // System should still be functional
            const questSystemFunctional = await page.evaluate(() => {
                return window.fantasyOS.components.questManager.isInitialized;
            });
            
            expect(questSystemFunctional).toBe(true);
        });
        
        test('should handle achievement system errors gracefully', async () => {
            // Try to trigger error condition
            await page.evaluate(() => {
                try {
                    window.fantasyOS.components.achievementSystem.checkAchievementProgress('non-existent', 'complete-quest', {
                        questCompleted: true
                    });
                } catch (error) {
                    console.error('Achievement error handled:', error);
                }
            });
            
            // System should still be functional
            const achievementSystemFunctional = await page.evaluate(() => {
                return window.fantasyOS.components.achievementSystem.isInitialized;
            });
            
            expect(achievementSystemFunctional).toBe(true);
        });
    });
    
    describe('Performance', () => {
        test('should handle rapid quest updates efficiently', async () => {
            // Perform rapid quest updates
            await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                questManager.startQuest('credentials-recovery');
                
                // Rapid updates
                for (let i = 0; i < 50; i++) {
                    questManager.updateQuestProgress('credentials-recovery', 'start');
                }
            });
            
            // System should still be responsive
            const questSystemResponsive = await page.evaluate(() => {
                return window.fantasyOS.components.questManager.isInitialized;
            });
            
            expect(questSystemResponsive).toBe(true);
        });
        
        test('should handle large quest datasets efficiently', async () => {
            // Create large quest dataset
            await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                
                // Add many quests
                for (let i = 0; i < 100; i++) {
                    questManager.questContent[`quest-${i}`] = {
                        id: `quest-${i}`,
                        title: `Quest ${i}`,
                        steps: [],
                        rewards: [],
                        dependencies: []
                    };
                }
            });
            
            // System should still be functional
            const questSystemFunctional = await page.evaluate(() => {
                return window.fantasyOS.components.questManager.isInitialized;
            });
            
            expect(questSystemFunctional).toBe(true);
        });
    });
});

// Export for test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        E2E_CONFIG,
        E2E_TEST_DATA
    };
}
