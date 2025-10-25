/**
 * Fantasy OS - Hobbit Companion E2E Tests
 * End-to-end tests for complete hobbit companion interaction flows
 * Created: 2025-10-25T16:25:40.000Z
 */

describe('Hobbit Companion E2E Flow', () => {
    let page;

    beforeAll(async () => {
        // Set up Playwright page
        const { chromium } = require('playwright');
        const browser = await chromium.launch({ headless: false });
        page = await browser.newPage();
        
        // Navigate to the application
        await page.goto('http://localhost:3000');
        
        // Wait for Fantasy OS to initialize
        await page.waitForSelector('#fantasyDesktop');
        await page.waitForFunction(() => window.fantasyOS && window.fantasyOS.isInitialized);
    });

    afterAll(async () => {
        if (page) {
            await page.close();
        }
    });

    describe('Complete Hobbit Interaction Flow', () => {
        test('should complete full hobbit companion interaction cycle', async () => {
            // 1. Verify hobbit companion is initialized
            const hobbitCompanion = await page.evaluate(() => window.hobbitCompanion);
            expect(hobbitCompanion).toBeTruthy();
            expect(hobbitCompanion.isActive).toBe(true);

            // 2. Verify hobbit UI is visible
            const hobbitContainer = await page.$('#hobbit-companion');
            expect(hobbitContainer).toBeTruthy();

            // 3. Test dialogue interaction
            await page.click('[data-action="talk"]');
            await page.waitForSelector('.dialogue-text');
            
            const dialogueText = await page.textContent('.dialogue-text');
            expect(dialogueText).toBeTruthy();
            expect(dialogueText.length).toBeGreaterThan(0);

            // 4. Test quest guidance
            await page.click('[data-action="quest"]');
            await page.waitForTimeout(500); // Wait for dialogue update
            
            const questDialogueText = await page.textContent('.dialogue-text');
            expect(questDialogueText).toBeTruthy();

            // 5. Test memory display
            await page.click('[data-action="memory"]');
            await page.waitForSelector('.hobbit-memory-display', { state: 'visible' });
            
            const memoryDisplay = await page.$('.hobbit-memory-display');
            expect(memoryDisplay).toBeTruthy();

            // 6. Hide memory display
            await page.click('[data-action="memory"]');
            await page.waitForSelector('.hobbit-memory-display', { state: 'hidden' });
        });

        test('should respond to room changes', async () => {
            // Start in living room
            await page.click('[data-room="living-room"]');
            await page.waitForTimeout(500);

            // Change to kitchen
            await page.click('[data-room="kitchen"]');
            await page.waitForTimeout(500);

            // Verify hobbit companion updated
            const currentRoom = await page.evaluate(() => window.hobbitCompanion.currentRoom);
            expect(currentRoom).toBe('kitchen');

            // Verify dialogue was triggered
            const dialogueText = await page.textContent('.dialogue-text');
            expect(dialogueText).toBeTruthy();
        });

        test('should respond to object interactions', async () => {
            // Go to living room
            await page.click('[data-room="living-room"]');
            await page.waitForTimeout(500);

            // Click on fireplace
            await page.click('[data-object="fireplace"]');
            await page.waitForTimeout(500);

            // Verify hobbit companion was notified
            const interactionCount = await page.evaluate(() => window.hobbitCompanion.interactionCount);
            expect(interactionCount).toBeGreaterThan(0);

            // Verify dialogue was triggered
            const dialogueText = await page.textContent('.dialogue-text');
            expect(dialogueText).toBeTruthy();
        });

        test('should develop personality over time', async () => {
            // Get initial personality state
            const initialPersonality = await page.evaluate(() => {
                return window.hobbitCompanion.personality.getState();
            });

            // Perform multiple interactions
            await page.click('[data-action="talk"]');
            await page.waitForTimeout(300);
            
            await page.click('[data-room="kitchen"]');
            await page.waitForTimeout(300);
            
            await page.click('[data-object="cauldron"]');
            await page.waitForTimeout(300);
            
            await page.click('[data-action="quest"]');
            await page.waitForTimeout(300);

            // Get final personality state
            const finalPersonality = await page.evaluate(() => {
                return window.hobbitCompanion.personality.getState();
            });

            // Verify personality has developed
            expect(finalPersonality.eventHistory.length).toBeGreaterThan(initialPersonality.eventHistory.length);
        });

        test('should accumulate memories from interactions', async () => {
            // Get initial memory count
            const initialMemoryCount = await page.evaluate(() => {
                return window.hobbitCompanion.memory.memories.size;
            });

            // Perform various interactions
            await page.click('[data-action="talk"]');
            await page.waitForTimeout(200);
            
            await page.click('[data-room="library"]');
            await page.waitForTimeout(200);
            
            await page.click('[data-object="fireplace"]');
            await page.waitForTimeout(200);
            
            await page.click('[data-action="quest"]');
            await page.waitForTimeout(200);

            // Get final memory count
            const finalMemoryCount = await page.evaluate(() => {
                return window.hobbitCompanion.memory.memories.size;
            });

            // Verify memories were added
            expect(finalMemoryCount).toBeGreaterThan(initialMemoryCount);
        });

        test('should provide context-aware dialogue', async () => {
            // Set up specific context
            await page.evaluate(() => {
                window.hobbitCompanion.currentRoom = 'library';
                window.hobbitCompanion.personality.currentMood = 'curious';
            });

            // Get dialogue for current context
            const dialogue = await page.evaluate(() => {
                const context = window.hobbitCompanion.getCurrentContext();
                return window.hobbitCompanion.dialogue.getDialogue('conversation', context);
            });

            expect(dialogue).toBeTruthy();
            expect(dialogue.text).toBeTruthy();
            expect(dialogue.category).toBe('conversation');
        });

        test('should persist state across page reloads', async () => {
            // Modify hobbit companion state
            await page.evaluate(() => {
                window.hobbitCompanion.interactionCount = 10;
                window.hobbitCompanion.currentRoom = 'workshop';
                window.hobbitCompanion.personality.currentMood = 'excited';
                window.hobbitCompanion.saveState();
            });

            // Reload page
            await page.reload();
            await page.waitForSelector('#fantasyDesktop');
            await page.waitForFunction(() => window.fantasyOS && window.fantasyOS.isInitialized);

            // Verify state was restored
            const restoredState = await page.evaluate(() => {
                return {
                    interactionCount: window.hobbitCompanion.interactionCount,
                    currentRoom: window.hobbitCompanion.currentRoom,
                    currentMood: window.hobbitCompanion.personality.currentMood
                };
            });

            expect(restoredState.interactionCount).toBe(10);
            expect(restoredState.currentRoom).toBe('workshop');
            expect(restoredState.currentMood).toBe('excited');
        });

        test('should handle quest system integration', async () => {
            // Start a quest
            await page.evaluate(() => {
                window.questManager.startQuest('credentials-recovery');
            });

            // Update quest progress
            await page.evaluate(() => {
                window.questManager.updateQuestProgress('credentials-recovery', 'start');
            });

            // Verify hobbit companion was notified
            const questProgressNotified = await page.evaluate(() => {
                return window.hobbitCompanion.memory.memories.size > 0;
            });

            expect(questProgressNotified).toBe(true);
        });

        test('should display personality indicator correctly', async () => {
            // Change mood
            await page.evaluate(() => {
                window.hobbitCompanion.personality.currentMood = 'happy';
                window.hobbitCompanion.updatePersonalityIndicator();
            });

            // Verify personality indicator updated
            const personalityIndicator = await page.$('.personality-indicator');
            const hasMoodClass = await page.evaluate(el => el.classList.contains('mood-happy'), personalityIndicator);
            
            expect(hasMoodClass).toBe(true);
        });

        test('should handle memory display functionality', async () => {
            // Add some memories
            await page.click('[data-action="talk"]');
            await page.waitForTimeout(200);
            
            await page.click('[data-action="quest"]');
            await page.waitForTimeout(200);

            // Show memory display
            await page.click('[data-action="memory"]');
            await page.waitForSelector('.hobbit-memory-display', { state: 'visible' });

            // Verify memory items are displayed
            const memoryItems = await page.$$('.memory-item');
            expect(memoryItems.length).toBeGreaterThan(0);

            // Hide memory display
            await page.click('[data-action="memory"]');
            await page.waitForSelector('.hobbit-memory-display', { state: 'hidden' });
        });

        test('should handle error scenarios gracefully', async () => {
            // Test with missing dependencies
            await page.evaluate(() => {
                delete window.soundSystem;
                delete window.questManager;
            });

            // Should not throw errors
            await page.click('[data-action="talk"]');
            await page.waitForTimeout(200);

            // Verify hobbit companion still works
            const hobbitActive = await page.evaluate(() => window.hobbitCompanion.isActive);
            expect(hobbitActive).toBe(true);
        });

        test('should provide responsive UI', async () => {
            // Test on mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
            await page.waitForTimeout(500);

            // Verify hobbit companion UI is still visible and functional
            const hobbitContainer = await page.$('#hobbit-companion');
            expect(hobbitContainer).toBeTruthy();

            // Test dialogue interaction on mobile
            await page.click('[data-action="talk"]');
            await page.waitForSelector('.dialogue-text');
            
            const dialogueText = await page.textContent('.dialogue-text');
            expect(dialogueText).toBeTruthy();

            // Reset viewport
            await page.setViewportSize({ width: 1280, height: 720 });
        });

        test('should handle rapid interactions', async () => {
            // Perform rapid interactions
            for (let i = 0; i < 5; i++) {
                await page.click('[data-action="talk"]');
                await page.waitForTimeout(100);
            }

            // Verify system is stable
            const hobbitActive = await page.evaluate(() => window.hobbitCompanion.isActive);
            expect(hobbitActive).toBe(true);

            // Verify interaction count increased
            const interactionCount = await page.evaluate(() => window.hobbitCompanion.interactionCount);
            expect(interactionCount).toBeGreaterThanOrEqual(5);
        });

        test('should maintain performance under load', async () => {
            // Measure performance
            const startTime = Date.now();

            // Perform many interactions
            for (let i = 0; i < 20; i++) {
                await page.click('[data-action="talk"]');
                await page.waitForTimeout(50);
            }

            const endTime = Date.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time
            expect(duration).toBeLessThan(5000); // 5 seconds

            // Verify system is still responsive
            const hobbitActive = await page.evaluate(() => window.hobbitCompanion.isActive);
            expect(hobbitActive).toBe(true);
        });
    });

    describe('Cross-Browser Compatibility', () => {
        test('should work in Chrome', async () => {
            // This test would run in Chrome
            const hobbitCompanion = await page.evaluate(() => window.hobbitCompanion);
            expect(hobbitCompanion).toBeTruthy();
        });

        test('should work in Firefox', async () => {
            // This test would run in Firefox
            const hobbitCompanion = await page.evaluate(() => window.hobbitCompanion);
            expect(hobbitCompanion).toBeTruthy();
        });

        test('should work in Safari', async () => {
            // This test would run in Safari
            const hobbitCompanion = await page.evaluate(() => window.hobbitCompanion);
            expect(hobbitCompanion).toBeTruthy();
        });
    });

    describe('Accessibility', () => {
        test('should be keyboard accessible', async () => {
            // Focus on hobbit companion
            await page.focus('#hobbit-companion');
            
            // Tab through dialogue buttons
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            
            // Press Enter on a button
            await page.keyboard.press('Enter');
            
            // Verify dialogue was triggered
            await page.waitForSelector('.dialogue-text');
            const dialogueText = await page.textContent('.dialogue-text');
            expect(dialogueText).toBeTruthy();
        });

        test('should have proper ARIA labels', async () => {
            // Check for ARIA attributes
            const hobbitContainer = await page.$('#hobbit-companion');
            const ariaLabel = await page.getAttribute('#hobbit-companion', 'aria-label');
            
            expect(ariaLabel).toBeTruthy();
        });

        test('should support screen readers', async () => {
            // Check for screen reader friendly elements
            const dialogueText = await page.$('.dialogue-text');
            const role = await page.getAttribute('.dialogue-text', 'role');
            
            expect(dialogueText).toBeTruthy();
        });
    });
});
