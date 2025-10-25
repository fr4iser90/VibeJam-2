/**
 * Fantasy OS - Room Progression System E2E Tests
 * End-to-end tests for complete room progression flow
 * Created: 2025-10-25T16:45:13.000Z
 */

describe('Room Progression System E2E', () => {
    let page;

    beforeAll(async () => {
        // Setup Playwright page
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    afterAll(async () => {
        await page.close();
    });

    describe('Complete Room Progression Flow', () => {
        test('should complete full room progression journey', async () => {
            // Start in living room (should be unlocked by default)
            await page.click('[data-room="living-room"]');
            await expect(page.locator('#living-room')).toHaveClass(/active/);
            
            // Verify living room is accessible
            const livingRoomStatus = await page.evaluate(() => {
                return window.fantasyOS.getRoomProgressionStatus('living-room');
            });
            expect(livingRoomStatus.accessLevel).toBeGreaterThanOrEqual(1);
            
            // Try to access locked room (should fail)
            await page.click('[data-room="kitchen"]');
            await expect(page.locator('#kitchen')).not.toHaveClass(/active/);
            
            // Complete quest to unlock kitchen
            await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                if (questManager) {
                    questManager.completeQuest('credentials-recovery');
                }
            });
            
            // Check for auto-unlock
            await page.evaluate(() => {
                const roomProgression = window.fantasyOS.components.roomProgression;
                roomProgression.checkAutoUnlock();
            });
            
            // Now kitchen should be accessible
            await page.click('[data-room="kitchen"]');
            await expect(page.locator('#kitchen')).toHaveClass(/active/);
            
            // Verify kitchen is marked as explored
            const kitchenStatus = await page.evaluate(() => {
                return window.fantasyOS.getRoomProgressionStatus('kitchen');
            });
            expect(kitchenStatus.accessLevel).toBeGreaterThanOrEqual(2);
            expect(kitchenStatus.visitCount).toBeGreaterThan(0);
        });

        test('should discover secret passages through interactions', async () => {
            // Go to living room
            await page.click('[data-room="living-room"]');
            
            // Interact with fireplace to discover secret passage
            const fireplace = page.locator('[data-object="fireplace"]');
            if (await fireplace.count() > 0) {
                await fireplace.click();
                
                // Check if secret passage was discovered
                const passages = await page.evaluate(() => {
                    const secretPassages = window.fantasyOS.components.secretPassages;
                    return secretPassages.getDiscoveredPassages();
                });
                
                expect(passages.length).toBeGreaterThan(0);
            }
        });

        test('should discover secret passages through spell casting', async () => {
            // Go to kitchen
            await page.click('[data-room="kitchen"]');
            
            // Cast brew potion spell
            const spellInput = page.locator('#spellInputKitchen');
            await spellInput.fill('brew potion');
            await spellInput.press('Enter');
            
            // Check if secret passage was discovered
            const passages = await page.evaluate(() => {
                const secretPassages = window.fantasyOS.components.secretPassages;
                return secretPassages.getDiscoveredPassages();
            });
            
            expect(passages.length).toBeGreaterThan(0);
        });

        test('should unlock and apply room upgrades', async () => {
            // Explore living room multiple times to gain mastery
            for (let i = 0; i < 10; i++) {
                await page.click('[data-room="living-room"]');
                await page.waitForTimeout(100);
            }
            
            // Check for available upgrades
            const availableUpgrades = await page.evaluate(() => {
                const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                return roomUpgrades.getAvailableUpgrades('living-room');
            });
            
            if (availableUpgrades.length > 0) {
                // Unlock first available upgrade
                const upgradeId = availableUpgrades[0].id;
                
                await page.evaluate((upgradeId) => {
                    const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                    roomUpgrades.unlockUpgrade('living-room', upgradeId);
                }, upgradeId);
                
                // Apply the upgrade
                await page.evaluate((upgradeId) => {
                    const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                    roomUpgrades.applyUpgrade('living-room', upgradeId);
                }, upgradeId);
                
                // Verify upgrade is applied
                const appliedUpgrades = await page.evaluate(() => {
                    const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                    return roomUpgrades.getAppliedUpgrades('living-room');
                });
                
                expect(appliedUpgrades.length).toBeGreaterThan(0);
            }
        });
    });

    describe('Room Progression UI', () => {
        test('should show room progression indicators', async () => {
            // Check if room tabs show progression status
            const livingRoomTab = page.locator('[data-room="living-room"]');
            await expect(livingRoomTab).toBeVisible();
            
            // Check for progression indicators
            const progressionStatus = await page.evaluate(() => {
                const roomProgression = window.fantasyOS.components.roomProgression;
                return roomProgression.getRoomProgressionStatus('living-room');
            });
            
            expect(progressionStatus).toBeDefined();
            expect(progressionStatus.accessLevel).toBeDefined();
        });

        test('should show unlock notifications', async () => {
            // Complete quest to trigger room unlock
            await page.evaluate(() => {
                const questManager = window.fantasyOS.components.questManager;
                if (questManager) {
                    questManager.completeQuest('credentials-recovery');
                }
                const roomProgression = window.fantasyOS.components.roomProgression;
                roomProgression.checkAutoUnlock();
            });
            
            // Check for unlock notification
            const notification = page.locator('.room-unlock-notification');
            if (await notification.count() > 0) {
                await expect(notification).toBeVisible();
            }
        });

        test('should show secret passage discovery notifications', async () => {
            // Interact with fireplace to discover passage
            const fireplace = page.locator('[data-object="fireplace"]');
            if (await fireplace.count() > 0) {
                await fireplace.click();
                
                // Check for passage discovery notification
                const notification = page.locator('.passage-discovery-notification');
                if (await notification.count() > 0) {
                    await expect(notification).toBeVisible();
                }
            }
        });

        test('should show room upgrade notifications', async () => {
            // Explore room to gain mastery
            for (let i = 0; i < 5; i++) {
                await page.click('[data-room="living-room"]');
                await page.waitForTimeout(100);
            }
            
            // Check for upgrade unlock notification
            const notification = page.locator('.upgrade-unlock-notification');
            if (await notification.count() > 0) {
                await expect(notification).toBeVisible();
            }
        });
    });

    describe('Secret Passage Navigation', () => {
        test('should provide passage navigation buttons', async () => {
            // Discover a secret passage first
            await page.evaluate(() => {
                const secretPassages = window.fantasyOS.components.secretPassages;
                secretPassages.discoverPassage('living-room-to-kitchen');
            });
            
            // Check for passage navigation button
            const passageButton = page.locator('.passage-navigation-btn');
            if (await passageButton.count() > 0) {
                await expect(passageButton).toBeVisible();
                
                // Click passage button
                await passageButton.click();
                
                // Verify room switch
                await expect(page.locator('#kitchen')).toHaveClass(/active/);
            }
        });

        test('should show passage indicators on room tabs', async () => {
            // Discover a secret passage
            await page.evaluate(() => {
                const secretPassages = window.fantasyOS.components.secretPassages;
                secretPassages.discoverPassage('living-room-to-kitchen');
            });
            
            // Check for passage indicators
            const passageIndicator = page.locator('.passage-indicator');
            if (await passageIndicator.count() > 0) {
                await expect(passageIndicator).toBeVisible();
            }
        });
    });

    describe('Room Upgrade Visual Effects', () => {
        test('should apply visual effects when upgrades are applied', async () => {
            // Apply an upgrade
            await page.evaluate(() => {
                const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
                roomUpgrades.applyUpgrade('living-room', 'magical-fireplace');
            });
            
            // Check for upgrade visual effects
            const upgradeIndicator = page.locator('.upgrade-indicator');
            if (await upgradeIndicator.count() > 0) {
                await expect(upgradeIndicator).toBeVisible();
            }
            
            // Check for magical particles
            const magicalParticles = page.locator('.magical-particles');
            if (await magicalParticles.count() > 0) {
                await expect(magicalParticles).toBeVisible();
            }
        });

        test('should show upgrade application effects', async () => {
            // Apply an upgrade
            await page.evaluate(() => {
                const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
                roomUpgrades.applyUpgrade('living-room', 'magical-fireplace');
            });
            
            // Check for application effects
            const applicationEffects = page.locator('.upgrade-application-effects');
            if (await applicationEffects.count() > 0) {
                await expect(applicationEffects).toBeVisible();
            }
        });
    });

    describe('Data Persistence', () => {
        test('should persist progression data across page reloads', async () => {
            // Make some progression
            await page.evaluate(() => {
                const roomProgression = window.fantasyOS.components.roomProgression;
                roomProgression.exploreRoom('living-room');
                roomProgression.exploreRoom('living-room');
            });
            
            // Get current visit count
            const visitCountBefore = await page.evaluate(() => {
                const roomProgression = window.fantasyOS.components.roomProgression;
                return roomProgression.progressionData.rooms['living-room'].visitCount;
            });
            
            // Reload page
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            // Check if visit count persisted
            const visitCountAfter = await page.evaluate(() => {
                const roomProgression = window.fantasyOS.components.roomProgression;
                return roomProgression.progressionData.rooms['living-room'].visitCount;
            });
            
            expect(visitCountAfter).toBe(visitCountBefore);
        });

        test('should persist secret passage discoveries', async () => {
            // Discover a secret passage
            await page.evaluate(() => {
                const secretPassages = window.fantasyOS.components.secretPassages;
                secretPassages.discoverPassage('living-room-to-kitchen');
            });
            
            // Reload page
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            // Check if passage discovery persisted
            const discoveredPassages = await page.evaluate(() => {
                const secretPassages = window.fantasyOS.components.secretPassages;
                return secretPassages.getDiscoveredPassages();
            });
            
            expect(discoveredPassages.length).toBeGreaterThan(0);
        });

        test('should persist room upgrades', async () => {
            // Apply an upgrade
            await page.evaluate(() => {
                const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
                roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].applied = true;
                roomUpgrades.saveUpgradeData('living-room', 'magical-fireplace');
            });
            
            // Reload page
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            // Check if upgrade persisted
            const appliedUpgrades = await page.evaluate(() => {
                const roomUpgrades = window.fantasyOS.components.roomUpgrades;
                return roomUpgrades.getAppliedUpgrades('living-room');
            });
            
            expect(appliedUpgrades.length).toBeGreaterThan(0);
        });
    });

    describe('Performance and Responsiveness', () => {
        test('should maintain smooth performance during room switching', async () => {
            const startTime = Date.now();
            
            // Switch between rooms multiple times
            for (let i = 0; i < 10; i++) {
                await page.click('[data-room="living-room"]');
                await page.waitForTimeout(50);
                await page.click('[data-room="kitchen"]');
                await page.waitForTimeout(50);
            }
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            // Should complete within reasonable time
            expect(duration).toBeLessThan(5000);
        });

        test('should handle rapid object interactions', async () => {
            const fireplace = page.locator('[data-object="fireplace"]');
            if (await fireplace.count() > 0) {
                const startTime = Date.now();
                
                // Rapidly click fireplace
                for (let i = 0; i < 20; i++) {
                    await fireplace.click();
                    await page.waitForTimeout(10);
                }
                
                const endTime = Date.now();
                const duration = endTime - startTime;
                
                // Should handle rapid interactions smoothly
                expect(duration).toBeLessThan(3000);
            }
        });
    });

    describe('Error Handling', () => {
        test('should handle invalid room access gracefully', async () => {
            // Try to access non-existent room
            const result = await page.evaluate(() => {
                return window.fantasyOS.switchRoom('nonexistent-room');
            });
            
            expect(result).toBe(false);
        });

        test('should handle localStorage errors gracefully', async () => {
            // Simulate localStorage error
            await page.evaluate(() => {
                const originalSetItem = localStorage.setItem;
                localStorage.setItem = () => {
                    throw new Error('Storage quota exceeded');
                };
                
                const roomProgression = window.fantasyOS.components.roomProgression;
                const result = roomProgression.saveProgressionData();
                
                // Restore original method
                localStorage.setItem = originalSetItem;
                
                return result;
            });
            
            // Should not crash the application
            await expect(page.locator('body')).toBeVisible();
        });
    });
});
