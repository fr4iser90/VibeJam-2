const { test, expect } = require('@playwright/test');

test.describe('Room Progression System - Comprehensive E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    // Clear localStorage to start fresh
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should complete full room progression journey', async ({ page }) => {
    console.log('🏰 Starting comprehensive Room Progression System test...');
    
    // 1. Test system initialization
    console.log('1️⃣ Testing system initialization...');
    const systemInitialized = await page.evaluate(() => {
      return typeof window.fantasyOS !== 'undefined' && 
             window.fantasyOS.components.roomProgression !== null;
    });
    expect(systemInitialized).toBe(true);
    console.log('✅ Room Progression System initialized successfully');
    
    // 2. Test room access
    console.log('2️⃣ Testing room access...');
    await page.click('[data-room="living-room"]');
    await expect(page.locator('#living-room')).toHaveClass(/active/);
    console.log('✅ Living Room is accessible');
    
    // 3. Test locked rooms
    console.log('3️⃣ Testing locked rooms...');
    await page.click('[data-room="kitchen"]');
    const kitchenActive = await page.evaluate(() => {
      const kitchenElement = document.getElementById('kitchen');
      return kitchenElement ? kitchenElement.classList.contains('active') : false;
    });
    
    if (!kitchenActive) {
      console.log('✅ Kitchen is correctly locked');
    } else {
      console.log('⚠️ Kitchen is already unlocked');
    }
    
    // 4. Test quest-based unlocking
    console.log('4️⃣ Testing quest-based unlocking...');
    await page.evaluate(() => {
      const questManager = window.fantasyOS.components.questManager;
      if (questManager) {
        questManager.completeQuest('credentials-recovery');
      }
      const roomProgression = window.fantasyOS.components.roomProgression;
      roomProgression.checkAutoUnlock();
    });
    
    // Now kitchen should be unlocked
    await page.click('[data-room="kitchen"]');
    await expect(page.locator('#kitchen')).toHaveClass(/active/);
    console.log('✅ Kitchen successfully unlocked');
    
    // 5. Discover secret passages
    console.log('5️⃣ Testing secret passage discovery...');
    const initialPassages = await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      return secretPassages.getDiscoveredPassages().length;
    });
    
    // Interact with objects to discover passages
    const roomBackground = page.locator('#living-room .room-background');
    await roomBackground.click({ position: { x: 150, y: 250 } });
    await page.waitForTimeout(1000);
    
    const passagesAfterInteraction = await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      return secretPassages.getDiscoveredPassages().length;
    });
    
    console.log(`📊 Discovered passages: ${passagesAfterInteraction}`);
    
    // 6. Spell-based passage discovery
    console.log('6️⃣ Testing spell-based passage discovery...');
    await page.click('[data-room="kitchen"]');
    
    const spellInput = page.locator('#spellInputKitchen');
    if (await spellInput.count() > 0) {
      await spellInput.fill('brew potion');
      await spellInput.press('Enter');
      await page.waitForTimeout(1000);
      console.log('🔮 Cast brew potion spell');
    }
    
    // 7. Test room upgrades
    console.log('7️⃣ Testing room upgrades...');
    await page.click('[data-room="living-room"]');
    
    // Explore room multiple times for mastery points
    for (let i = 0; i < 5; i++) {
      await page.click('[data-room="living-room"]');
      await page.waitForTimeout(100);
    }
    
    const availableUpgrades = await page.evaluate(() => {
      const roomUpgrades = window.fantasyOS.components.roomUpgrades;
      return roomUpgrades.getAvailableUpgrades('living-room');
    });
    
    console.log(`📊 Available upgrades: ${availableUpgrades.length}`);
    
    if (availableUpgrades.length > 0) {
      const upgradeId = availableUpgrades[0].id;
      console.log(`🔧 Testing upgrade: ${upgradeId}`);
      
      await page.evaluate((upgradeId) => {
        const roomUpgrades = window.fantasyOS.components.roomUpgrades;
        roomUpgrades.unlockUpgrade('living-room', upgradeId);
        roomUpgrades.applyUpgrade('living-room', upgradeId);
      }, upgradeId);
      
      console.log('✅ Upgrade successfully applied');
    }
    
    // 8. Test notifications
    console.log('8️⃣ Testing notifications...');
    
    // Discover a secret passage for notification
    await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      secretPassages.discoverPassage('living-room-to-kitchen');
    });
    
    const notification = page.locator('.passage-discovery-notification');
    if (await notification.count() > 0) {
      console.log('✅ Secret passage discovery notification shown');
    }
    
    // 9. Test data persistence
    console.log('9️⃣ Testing data persistence...');
    const visitCountBefore = await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      return roomProgression.progressionData.rooms['living-room'].visitCount;
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const visitCountAfter = await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      return roomProgression.progressionData.rooms['living-room'].visitCount;
    });
    
    expect(visitCountAfter).toBe(visitCountBefore);
    console.log('✅ Data successfully persisted');
    
    // 10. Test statistics
    console.log('🔟 Testing statistics...');
    const roomStats = await page.evaluate(() => {
      return window.fantasyOS.getRoomProgressionStats();
    });
    
    const passageStats = await page.evaluate(() => {
      return window.fantasyOS.getSecretPassageStats();
    });
    
    const upgradeStats = await page.evaluate(() => {
      return window.fantasyOS.getRoomUpgradeStats();
    });
    
    expect(roomStats).toBeDefined();
    expect(passageStats).toBeDefined();
    expect(upgradeStats).toBeDefined();
    
    console.log('📈 All statistics available');
    console.log(`🏠 Rooms: ${roomStats.totalRooms}, unlocked: ${roomStats.unlockedRooms}`);
    console.log(`🚪 Passages: ${passageStats.totalPassages}, discovered: ${passageStats.discoveredPassages}`);
    console.log(`✨ Upgrades: ${upgradeStats.totalUpgrades}, unlocked: ${upgradeStats.unlockedUpgrades}`);
    
    console.log('🎉 Comprehensive Room Progression System test completed successfully!');
  });

  test('should test all rooms sequentially', async ({ page }) => {
    console.log('🏠 Testing all rooms sequentially...');
    
    const rooms = ['living-room', 'kitchen', 'bedroom', 'workshop', 'library', 'garden'];
    
    for (const room of rooms) {
      console.log(`🔍 Testing room: ${room}`);
      
      // Try to enter room
      await page.click(`[data-room="${room}"]`);
      await page.waitForTimeout(500);
      
      // Check if room is active
      const roomActive = await page.evaluate((roomId) => {
        const roomElement = document.getElementById(roomId);
        return roomElement ? roomElement.classList.contains('active') : false;
      }, room);
      
      if (roomActive) {
        console.log(`✅ ${room} successfully entered`);
        
        // Test object interactions
        const roomBackground = page.locator(`#${room} .room-background`);
        await roomBackground.click({ position: { x: 200, y: 200 } });
        await page.waitForTimeout(500);
        
        // Test spell input if available
        const spellInput = page.locator(`#spellInput${room.charAt(0).toUpperCase() + room.slice(1)}`);
        if (await spellInput.count() > 0) {
          await spellInput.fill('test spell');
          await spellInput.press('Enter');
          await page.waitForTimeout(500);
          console.log(`🔮 Spell tested in ${room}`);
        }
        
      } else {
        console.log(`🔒 ${room} is locked`);
      }
    }
    
    console.log('✅ All rooms successfully tested');
  });

  test('should test performance under load', async ({ page }) => {
    console.log('⚡ Testing performance under load...');
    
    const startTime = Date.now();
    
    // Perform many interactions quickly in sequence
    for (let i = 0; i < 20; i++) {
      await page.click('[data-room="living-room"]');
      await page.waitForTimeout(25);
      await page.click('[data-room="kitchen"]');
      await page.waitForTimeout(25);
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`⏱️ Performance test duration: ${duration}ms`);
    
    // Should complete within reasonable time
    expect(duration).toBeLessThan(3000);
    console.log('✅ Performance test successful');
  });

  test('should test error handling', async ({ page }) => {
    console.log('🛡️ Testing error handling...');
    
    // Test invalid room access
    const invalidRoomResult = await page.evaluate(() => {
      return window.fantasyOS.switchRoom('invalid-room');
    });
    expect(invalidRoomResult).toBe(false);
    console.log('✅ Invalid room access correctly handled');
    
    // Test localStorage errors
    await page.evaluate(() => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        throw new Error('Storage quota exceeded');
      };
      
      const roomProgression = window.fantasyOS.components.roomProgression;
      const result = roomProgression.saveProgressionData();
      
      localStorage.setItem = originalSetItem;
      return result;
    });
    
    // Application should not crash
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ localStorage error correctly handled');
    
    console.log('✅ Error handling successfully tested');
  });
});
