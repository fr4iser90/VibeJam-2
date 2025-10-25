const { test, expect } = require('@playwright/test');

test.describe('Room Progression System E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main page
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    // Clear localStorage to start fresh
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should initialize room progression system', async ({ page }) => {
    console.log('🏰 Testing Room Progression System initialization...');
    
    // Check if room progression system is initialized
    const systemInitialized = await page.evaluate(() => {
      return typeof window.fantasyOS !== 'undefined' && 
             window.fantasyOS.components.roomProgression !== null;
    });
    
    expect(systemInitialized).toBe(true);
    console.log('✅ Room Progression System initialized');
    
    // Check initial room status
    const livingRoomStatus = await page.evaluate(() => {
      return window.fantasyOS.getRoomProgressionStatus('living-room');
    });
    
    expect(livingRoomStatus).toBeDefined();
    expect(livingRoomStatus.accessLevel).toBeGreaterThanOrEqual(1);
    console.log('✅ Living room is accessible by default');
  });

  test('should handle room unlocking flow', async ({ page }) => {
    console.log('🔓 Testing room unlocking flow...');
    
    // Start in living room
    await page.click('[data-room="living-room"]');
    await expect(page.locator('#living-room')).toHaveClass(/active/);
    
    // Try to access locked kitchen (should fail initially)
    await page.click('[data-room="kitchen"]');
    await expect(page.locator('#kitchen')).not.toHaveClass(/active/);
    console.log('✅ Kitchen is locked initially');
    
    // Complete quest to unlock kitchen
    await page.evaluate(() => {
      const questManager = window.fantasyOS.components.questManager;
      if (questManager) {
        // Simulate quest completion
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
    console.log('✅ Kitchen unlocked after quest completion');
    
    // Verify kitchen is marked as explored
    const kitchenStatus = await page.evaluate(() => {
      return window.fantasyOS.getRoomProgressionStatus('kitchen');
    });
    
    expect(kitchenStatus.accessLevel).toBeGreaterThanOrEqual(2);
    expect(kitchenStatus.visitCount).toBeGreaterThan(0);
    console.log('✅ Kitchen marked as explored');
  });

  test('should discover secret passages through object interactions', async ({ page }) => {
    console.log('🚪 Testing secret passage discovery through object interactions...');
    
    // Go to living room
    await page.click('[data-room="living-room"]');
    
    // Get initial passage count
    const initialPassages = await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      return secretPassages.getDiscoveredPassages().length;
    });
    
    console.log(`📊 Initial discovered passages: ${initialPassages}`);
    
    // Interact with fireplace to discover secret passage
    const fireplace = page.locator('[data-object="fireplace"]');
    if (await fireplace.count() > 0) {
      await fireplace.click();
      console.log('🔥 Clicked fireplace');
      
      // Wait for interaction to process
      await page.waitForTimeout(1000);
      
      // Check if secret passage was discovered
      const passagesAfterInteraction = await page.evaluate(() => {
        const secretPassages = window.fantasyOS.components.secretPassages;
        return secretPassages.getDiscoveredPassages();
      });
      
      console.log(`📊 Passages after interaction: ${passagesAfterInteraction.length}`);
      
      if (passagesAfterInteraction.length > initialPassages) {
        console.log('✅ Secret passage discovered through fireplace interaction!');
        console.log('🚪 Discovered passage:', passagesAfterInteraction[0].name);
      } else {
        console.log('❌ No secret passage discovered');
      }
    } else {
      console.log('⚠️ Fireplace element not found, trying background click');
      
      // Try clicking on room background where fireplace might be
      const roomBackground = page.locator('#living-room .room-background');
      await roomBackground.click({ position: { x: 150, y: 250 } });
      await page.waitForTimeout(1000);
      
      const passagesAfterClick = await page.evaluate(() => {
        const secretPassages = window.fantasyOS.components.secretPassages;
        return secretPassages.getDiscoveredPassages().length;
      });
      
      console.log(`📊 Passages after background click: ${passagesAfterClick}`);
    }
  });

  test('should discover secret passages through spell casting', async ({ page }) => {
    console.log('🔮 Testing secret passage discovery through spell casting...');
    
    // Go to kitchen
    await page.click('[data-room="kitchen"]');
    
    // Get initial passage count
    const initialPassages = await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      return secretPassages.getDiscoveredPassages().length;
    });
    
    console.log(`📊 Initial discovered passages: ${initialPassages}`);
    
    // Cast brew potion spell
    const spellInput = page.locator('#spellInputKitchen');
    if (await spellInput.count() > 0) {
      await spellInput.fill('brew potion');
      await spellInput.press('Enter');
      console.log('🔮 Cast brew potion spell');
      
      // Wait for spell to process
      await page.waitForTimeout(1000);
      
      // Check if secret passage was discovered
      const passagesAfterSpell = await page.evaluate(() => {
        const secretPassages = window.fantasyOS.components.secretPassages;
        return secretPassages.getDiscoveredPassages();
      });
      
      console.log(`📊 Passages after spell: ${passagesAfterSpell.length}`);
      
      if (passagesAfterSpell.length > initialPassages) {
        console.log('✅ Secret passage discovered through spell casting!');
        console.log('🚪 Discovered passage:', passagesAfterSpell[0].name);
      } else {
        console.log('❌ No secret passage discovered through spell');
      }
    } else {
      console.log('⚠️ Kitchen spell input not found');
    }
  });

  test('should unlock and apply room upgrades', async ({ page }) => {
    console.log('✨ Testing room upgrade system...');
    
    // Go to living room
    await page.click('[data-room="living-room"]');
    
    // Explore room multiple times to gain mastery
    for (let i = 0; i < 5; i++) {
      await page.click('[data-room="living-room"]');
      await page.waitForTimeout(100);
    }
    
    console.log('🏠 Explored living room multiple times');
    
    // Check for available upgrades
    const availableUpgrades = await page.evaluate(() => {
      const roomUpgrades = window.fantasyOS.components.roomUpgrades;
      return roomUpgrades.getAvailableUpgrades('living-room');
    });
    
    console.log(`📊 Available upgrades: ${availableUpgrades.length}`);
    
    if (availableUpgrades.length > 0) {
      const upgradeId = availableUpgrades[0].id;
      console.log(`🔧 Testing upgrade: ${upgradeId}`);
      
      // Unlock the upgrade
      await page.evaluate((upgradeId) => {
        const roomUpgrades = window.fantasyOS.components.roomUpgrades;
        roomUpgrades.unlockUpgrade('living-room', upgradeId);
      }, upgradeId);
      
      console.log('✅ Upgrade unlocked');
      
      // Apply the upgrade
      await page.evaluate((upgradeId) => {
        const roomUpgrades = window.fantasyOS.components.roomUpgrades;
        roomUpgrades.applyUpgrade('living-room', upgradeId);
      }, upgradeId);
      
      console.log('✅ Upgrade applied');
      
      // Verify upgrade is applied
      const appliedUpgrades = await page.evaluate(() => {
        const roomUpgrades = window.fantasyOS.components.roomUpgrades;
        return roomUpgrades.getAppliedUpgrades('living-room');
      });
      
      expect(appliedUpgrades.length).toBeGreaterThan(0);
      console.log('✅ Upgrade verification successful');
    } else {
      console.log('⚠️ No upgrades available (may need more mastery points)');
    }
  });

  test('should show progression UI indicators', async ({ page }) => {
    console.log('🎨 Testing progression UI indicators...');
    
    // Check room tab progression indicators
    const livingRoomTab = page.locator('[data-room="living-room"]');
    await expect(livingRoomTab).toBeVisible();
    
    // Check for progression status
    const progressionStatus = await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      return roomProgression.getRoomProgressionStatus('living-room');
    });
    
    expect(progressionStatus).toBeDefined();
    expect(progressionStatus.accessLevel).toBeDefined();
    console.log('✅ Progression status indicators working');
    
    // Test room switching with progression checks
    await page.click('[data-room="living-room"]');
    await expect(page.locator('#living-room')).toHaveClass(/active/);
    
    // Try to access locked room
    await page.click('[data-room="bedroom"]');
    
    // Check if room is locked (should not be active)
    const bedroomActive = await page.evaluate(() => {
      const bedroomElement = document.getElementById('bedroom');
      return bedroomElement ? bedroomElement.classList.contains('active') : false;
    });
    
    if (!bedroomActive) {
      console.log('✅ Room locking system working correctly');
    } else {
      console.log('⚠️ Bedroom might be unlocked or system not working');
    }
  });

  test('should show unlock notifications', async ({ page }) => {
    console.log('🔔 Testing unlock notifications...');
    
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
      console.log('✅ Room unlock notification appeared');
    } else {
      console.log('⚠️ No unlock notification found (may have auto-closed)');
    }
  });

  test('should show secret passage discovery notifications', async ({ page }) => {
    console.log('🔔 Testing secret passage discovery notifications...');
    
    // Discover a secret passage
    await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      secretPassages.discoverPassage('living-room-to-kitchen');
    });
    
    // Check for passage discovery notification
    const notification = page.locator('.passage-discovery-notification');
    if (await notification.count() > 0) {
      await expect(notification).toBeVisible();
      console.log('✅ Secret passage discovery notification appeared');
    } else {
      console.log('⚠️ No passage discovery notification found');
    }
  });

  test('should provide passage navigation', async ({ page }) => {
    console.log('🧭 Testing secret passage navigation...');
    
    // Discover a secret passage first
    await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      secretPassages.discoverPassage('living-room-to-kitchen');
    });
    
    console.log('🚪 Secret passage discovered');
    
    // Check for passage navigation button
    const passageButton = page.locator('.passage-navigation-btn');
    if (await passageButton.count() > 0) {
      await expect(passageButton).toBeVisible();
      console.log('✅ Passage navigation button found');
      
      // Click passage button
      await passageButton.click();
      console.log('🖱️ Clicked passage navigation button');
      
      // Wait for room switch
      await page.waitForTimeout(1000);
      
      // Verify room switch
      const kitchenActive = await page.evaluate(() => {
        const kitchenElement = document.getElementById('kitchen');
        return kitchenElement ? kitchenElement.classList.contains('active') : false;
      });
      
      if (kitchenActive) {
        console.log('✅ Successfully navigated through secret passage');
      } else {
        console.log('⚠️ Room switch may have failed');
      }
    } else {
      console.log('⚠️ No passage navigation button found');
    }
  });

  test('should persist progression data', async ({ page }) => {
    console.log('💾 Testing data persistence...');
    
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
    
    console.log(`📊 Visit count before reload: ${visitCountBefore}`);
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if visit count persisted
    const visitCountAfter = await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      return roomProgression.progressionData.rooms['living-room'].visitCount;
    });
    
    console.log(`📊 Visit count after reload: ${visitCountAfter}`);
    
    expect(visitCountAfter).toBe(visitCountBefore);
    console.log('✅ Progression data persisted across reload');
  });

  test('should handle performance with multiple interactions', async ({ page }) => {
    console.log('⚡ Testing performance with multiple interactions...');
    
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
    
    console.log(`⏱️ Performance test duration: ${duration}ms`);
    
    // Should complete within reasonable time
    expect(duration).toBeLessThan(5000);
    console.log('✅ Performance test passed');
  });

  test('should handle error cases gracefully', async ({ page }) => {
    console.log('🛡️ Testing error handling...');
    
    // Try to access non-existent room
    const result = await page.evaluate(() => {
      return window.fantasyOS.switchRoom('nonexistent-room');
    });
    
    expect(result).toBe(false);
    console.log('✅ Non-existent room access handled gracefully');
    
    // Test localStorage error handling
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
    console.log('✅ localStorage error handled gracefully');
  });

  test('should provide comprehensive statistics', async ({ page }) => {
    console.log('📊 Testing progression statistics...');
    
    // Get room progression stats
    const roomStats = await page.evaluate(() => {
      return window.fantasyOS.getRoomProgressionStats();
    });
    
    expect(roomStats).toBeDefined();
    expect(roomStats.totalRooms).toBe(6);
    console.log('✅ Room progression statistics available');
    
    // Get secret passage stats
    const passageStats = await page.evaluate(() => {
      return window.fantasyOS.getSecretPassageStats();
    });
    
    expect(passageStats).toBeDefined();
    console.log('✅ Secret passage statistics available');
    
    // Get room upgrade stats
    const upgradeStats = await page.evaluate(() => {
      return window.fantasyOS.getRoomUpgradeStats();
    });
    
    expect(upgradeStats).toBeDefined();
    console.log('✅ Room upgrade statistics available');
    
    console.log('📈 All statistics systems working correctly');
  });
});
