const { test, expect } = require('@playwright/test');

test.describe('Room Progression System - Step by Step Walkthrough', () => {
  test('should walk through the entire room progression system', async ({ page }) => {
    console.log('🏰 Starting Room Progression System Walkthrough...');
    
    // Go to the application
    await page.goto('http://localhost:8000');
    
    // Wait for everything to load properly
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Extra wait for system initialization
    
    console.log('1️⃣ Page loaded, checking system initialization...');
    
    // Check if FantasyOS is loaded
    const fantasyOSLoaded = await page.evaluate(() => {
      return typeof window.fantasyOS !== 'undefined';
    });
    
    if (!fantasyOSLoaded) {
      console.log('❌ FantasyOS not loaded, waiting more...');
      await page.waitForTimeout(3000);
    }
    
    // Check room progression system
    const roomProgressionLoaded = await page.evaluate(() => {
      return window.fantasyOS && 
             window.fantasyOS.components && 
             window.fantasyOS.components.roomProgression !== null;
    });
    
    console.log(`📊 Room Progression System loaded: ${roomProgressionLoaded}`);
    
    // Start in Living Room (should always be accessible)
    console.log('2️⃣ Testing Living Room access...');
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(1000);
    
    const livingRoomActive = await page.evaluate(() => {
      const element = document.getElementById('living-room');
      return element ? element.classList.contains('active') : false;
    });
    
    console.log(`✅ Living Room active: ${livingRoomActive}`);
    
    // Test Hobbit Companion interaction
    console.log('3️⃣ Testing Hobbit Companion...');
    const hobbitImage = page.locator('#hobbitCharacter .hobbit-image');
    if (await hobbitImage.count() > 0) {
      await hobbitImage.click();
      await page.waitForTimeout(1000);
      console.log('✅ Hobbit Companion clicked');
    }
    
    // Test object interaction (avoid gesture canvas)
    console.log('4️⃣ Testing object interaction...');
    // Click on a specific area that's not covered by gesture canvas
    await page.click('#living-room', { position: { x: 50, y: 50 } });
    await page.waitForTimeout(1000);
    console.log('✅ Object interaction tested');
    
    // Test spell casting
    console.log('5️⃣ Testing spell casting...');
    const spellInput = page.locator('#spellInputLiving-room');
    if (await spellInput.count() > 0) {
      await spellInput.fill('ignite fire');
      await spellInput.press('Enter');
      await page.waitForTimeout(1000);
      console.log('✅ Spell cast: ignite fire');
    }
    
    // Test Kitchen access (should be locked initially)
    console.log('6️⃣ Testing Kitchen access (should be locked)...');
    await page.click('[data-room="kitchen"]');
    await page.waitForTimeout(1000);
    
    const kitchenActive = await page.evaluate(() => {
      const element = document.getElementById('kitchen');
      return element ? element.classList.contains('active') : false;
    });
    
    console.log(`🔒 Kitchen active: ${kitchenActive} (should be false)`);
    
    // Complete quest to unlock kitchen
    console.log('7️⃣ Completing quest to unlock kitchen...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.questManager) {
        window.fantasyOS.components.questManager.completeQuest('credentials-recovery');
        console.log('Quest completed: credentials-recovery');
      }
    });
    
    // Check if kitchen is now unlocked
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.roomProgression) {
        window.fantasyOS.components.roomProgression.checkAutoUnlock();
      }
    });
    
    // Try to access kitchen again
    await page.click('[data-room="kitchen"]');
    await page.waitForTimeout(1000);
    
    const kitchenUnlocked = await page.evaluate(() => {
      const element = document.getElementById('kitchen');
      return element ? element.classList.contains('active') : false;
    });
    
    console.log(`🔓 Kitchen unlocked: ${kitchenUnlocked}`);
    
    if (kitchenUnlocked) {
      console.log('8️⃣ Testing Kitchen features...');
      
      // Test kitchen spell
      const kitchenSpellInput = page.locator('#spellInputKitchen');
      if (await kitchenSpellInput.count() > 0) {
        await kitchenSpellInput.fill('brew potion');
        await kitchenSpellInput.press('Enter');
        await page.waitForTimeout(1000);
        console.log('✅ Kitchen spell cast: brew potion');
      }
      
      // Test kitchen object interaction
      await page.click('#kitchen', { position: { x: 50, y: 50 } });
      await page.waitForTimeout(1000);
      console.log('✅ Kitchen object interaction tested');
    }
    
    // Test other rooms
    console.log('9️⃣ Testing other rooms...');
    const rooms = ['bedroom', 'workshop', 'library', 'garden'];
    
    for (const room of rooms) {
      console.log(`🔍 Testing ${room}...`);
      await page.click(`[data-room="${room}"]`);
      await page.waitForTimeout(500);
      
      const roomActive = await page.evaluate((roomId) => {
        const element = document.getElementById(roomId);
        return element ? element.classList.contains('active') : false;
      }, room);
      
      console.log(`${roomActive ? '✅' : '🔒'} ${room}: ${roomActive ? 'accessible' : 'locked'}`);
    }
    
    // Test secret passage discovery
    console.log('🔟 Testing secret passage discovery...');
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(1000);
    
    // Discover a secret passage manually
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.secretPassages) {
        window.fantasyOS.components.secretPassages.discoverPassage('living-room-to-kitchen');
        console.log('Secret passage discovered: living-room-to-kitchen');
      }
    });
    
    // Check if notification appears
    const notification = page.locator('.passage-discovery-notification');
    if (await notification.count() > 0) {
      console.log('✅ Secret passage discovery notification shown');
    }
    
    // Test room upgrades
    console.log('1️⃣1️⃣ Testing room upgrades...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.roomUpgrades) {
        const upgrades = window.fantasyOS.components.roomUpgrades.getAvailableUpgrades('living-room');
        console.log(`Available upgrades for living-room: ${upgrades.length}`);
        
        if (upgrades.length > 0) {
          const upgrade = upgrades[0];
          window.fantasyOS.components.roomUpgrades.unlockUpgrade('living-room', upgrade.id);
          window.fantasyOS.components.roomUpgrades.applyUpgrade('living-room', upgrade.id);
          console.log(`Upgrade applied: ${upgrade.name}`);
        }
      }
    });
    
    // Get final statistics
    console.log('1️⃣2️⃣ Getting final statistics...');
    const stats = await page.evaluate(() => {
      if (window.fantasyOS) {
        return {
          roomProgression: window.fantasyOS.getRoomProgressionStats ? window.fantasyOS.getRoomProgressionStats() : null,
          secretPassages: window.fantasyOS.getSecretPassageStats ? window.fantasyOS.getSecretPassageStats() : null,
          roomUpgrades: window.fantasyOS.getRoomUpgradeStats ? window.fantasyOS.getRoomUpgradeStats() : null
        };
      }
      return null;
    });
    
    if (stats) {
      console.log('📊 Final Statistics:');
      if (stats.roomProgression) {
        console.log(`🏠 Rooms: ${stats.roomProgression.totalRooms} total, ${stats.roomProgression.unlockedRooms} unlocked`);
      }
      if (stats.secretPassages) {
        console.log(`🚪 Passages: ${stats.secretPassages.totalPassages} total, ${stats.secretPassages.discoveredPassages} discovered`);
      }
      if (stats.roomUpgrades) {
        console.log(`✨ Upgrades: ${stats.roomUpgrades.totalUpgrades} total, ${stats.roomUpgrades.unlockedUpgrades} unlocked`);
      }
    }
    
    console.log('🎉 Room Progression System walkthrough completed!');
    
    // Take a final screenshot
    await page.screenshot({ path: 'room-progression-walkthrough-final.png', fullPage: true });
    console.log('📸 Final screenshot saved');
  });
});
