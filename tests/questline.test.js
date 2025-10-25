const { test, expect } = require('@playwright/test');

test.describe('Room Progression System - Complete Questline Test', () => {
  test('should complete entire questline and unlock all rooms', async ({ page }) => {
    console.log('🎭 COMPLETE QUESTLINE TEST STARTING...');
    
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    // Clear localStorage to start fresh
    await page.evaluate(() => {
      localStorage.clear();
      console.log('🗑️ localStorage cleared - starting fresh');
    });
    
    await page.waitForTimeout(3000);
    
    console.log('1️⃣ INITIAL STATE CHECK...');
    
    // Check initial room visibility
    const initialRooms = await page.evaluate(() => {
      const rooms = ['living-room', 'kitchen', 'bedroom', 'workshop', 'library', 'garden'];
      return rooms.map(roomId => {
        const tab = document.querySelector(`[data-room="${roomId}"]`);
        return {
          roomId,
          visible: tab && tab.style.display !== 'none' && tab.style.visibility !== 'hidden'
        };
      });
    });
    
    console.log('📊 INITIAL ROOM STATUS:');
    initialRooms.forEach(room => {
      console.log(`${room.roomId}: ${room.visible ? 'VISIBLE' : 'HIDDEN'}`);
    });
    
    // Only Living Room should be visible
    expect(initialRooms[0].visible).toBe(true); // living-room
    expect(initialRooms[1].visible).toBe(false); // kitchen
    expect(initialRooms[2].visible).toBe(false); // bedroom
    expect(initialRooms[3].visible).toBe(false); // workshop
    expect(initialRooms[4].visible).toBe(false); // library
    expect(initialRooms[5].visible).toBe(false); // garden
    
    console.log('2️⃣ STARTING QUESTLINE - CREDENTIALS RECOVERY...');
    
    // Click on hobbit to start quest
    const hobbitImage = page.locator('#hobbitCharacter .hobbit-image');
    if (await hobbitImage.count() > 0) {
      await hobbitImage.click();
      await page.waitForTimeout(1000);
      console.log('🧙‍♂️ Hobbit clicked - quest started');
    }
    
    // Check hobbit dialogue
    const hobbitDialogue = page.locator('#hobbitDialogue .hobbit-text');
    if (await hobbitDialogue.count() > 0) {
      const dialogueText = await hobbitDialogue.textContent();
      console.log(`🧙‍♂️ Hobbit says: ${dialogueText}`);
    }
    
    // Complete credentials-recovery quest
    console.log('📋 Completing credentials-recovery quest...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.questManager) {
        window.fantasyOS.components.questManager.completeQuest('credentials-recovery');
        console.log('✅ Quest completed: credentials-recovery');
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('3️⃣ TESTING KITCHEN UNLOCK...');
    
    // Try portal spell to kitchen
    const spellInput = page.locator('#spellInputLiving-room');
    if (await spellInput.count() > 0) {
      await spellInput.fill('open portal to kitchen');
      await spellInput.press('Enter');
      await page.waitForTimeout(1000);
      console.log('🔮 Portal spell: open portal to kitchen');
    }
    
    // Check if kitchen is now visible
    const kitchenVisible = await page.evaluate(() => {
      const kitchenTab = document.querySelector('[data-room="kitchen"]');
      return kitchenTab && kitchenTab.style.display !== 'none' && kitchenTab.style.visibility !== 'hidden';
    });
    
    console.log(`🍳 Kitchen visible: ${kitchenVisible} (should be true)`);
    expect(kitchenVisible).toBe(true);
    
    // Test kitchen access
    await page.click('[data-room="kitchen"]');
    await page.waitForTimeout(500);
    
    const kitchenActive = await page.evaluate(() => {
      const kitchenElement = document.getElementById('kitchen');
      return kitchenElement ? kitchenElement.classList.contains('active') : false;
    });
    
    console.log(`🍳 Kitchen active: ${kitchenActive} (should be true)`);
    expect(kitchenActive).toBe(true);
    
    console.log('4️⃣ STARTING QUESTLINE - DREAM EXPLORATION...');
    
    // Complete dream-exploration quest
    console.log('📋 Completing dream-exploration quest...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.questManager) {
        window.fantasyOS.components.questManager.completeQuest('dream-exploration');
        console.log('✅ Quest completed: dream-exploration');
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('5️⃣ TESTING BEDROOM UNLOCK...');
    
    // Go back to living room
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(500);
    
    // Try portal spell to bedroom
    await spellInput.fill('open portal to bedroom');
    await spellInput.press('Enter');
    await page.waitForTimeout(1000);
    console.log('🔮 Portal spell: open portal to bedroom');
    
    // Check if bedroom is now visible
    const bedroomVisible = await page.evaluate(() => {
      const bedroomTab = document.querySelector('[data-room="bedroom"]');
      return bedroomTab && bedroomTab.style.display !== 'none' && bedroomTab.style.visibility !== 'hidden';
    });
    
    console.log(`🛏️ Bedroom visible: ${bedroomVisible} (should be true)`);
    expect(bedroomVisible).toBe(true);
    
    // Test bedroom access
    await page.click('[data-room="bedroom"]');
    await page.waitForTimeout(500);
    
    const bedroomActive = await page.evaluate(() => {
      const bedroomElement = document.getElementById('bedroom');
      return bedroomElement ? bedroomElement.classList.contains('active') : false;
    });
    
    console.log(`🛏️ Bedroom active: ${bedroomActive} (should be true)`);
    expect(bedroomActive).toBe(true);
    
    console.log('6️⃣ STARTING QUESTLINE - CRAFTING MASTERY...');
    
    // Complete crafting-mastery quest
    console.log('📋 Completing crafting-mastery quest...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.questManager) {
        window.fantasyOS.components.questManager.completeQuest('crafting-mastery');
        console.log('✅ Quest completed: crafting-mastery');
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('7️⃣ TESTING WORKSHOP UNLOCK...');
    
    // Go back to living room
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(500);
    
    // Try portal spell to workshop
    await spellInput.fill('open portal to workshop');
    await spellInput.press('Enter');
    await page.waitForTimeout(1000);
    console.log('🔮 Portal spell: open portal to workshop');
    
    // Check if workshop is now visible
    const workshopVisible = await page.evaluate(() => {
      const workshopTab = document.querySelector('[data-room="workshop"]');
      return workshopTab && workshopTab.style.display !== 'none' && workshopTab.style.visibility !== 'hidden';
    });
    
    console.log(`🔨 Workshop visible: ${workshopVisible} (should be true)`);
    expect(workshopVisible).toBe(true);
    
    // Test workshop access
    await page.click('[data-room="workshop"]');
    await page.waitForTimeout(500);
    
    const workshopActive = await page.evaluate(() => {
      const workshopElement = document.getElementById('workshop');
      return workshopElement ? workshopElement.classList.contains('active') : false;
    });
    
    console.log(`🔨 Workshop active: ${workshopActive} (should be true)`);
    expect(workshopActive).toBe(true);
    
    console.log('8️⃣ STARTING QUESTLINE - KNOWLEDGE SEEKING...');
    
    // Complete knowledge-seeking quest
    console.log('📋 Completing knowledge-seeking quest...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.questManager) {
        window.fantasyOS.components.questManager.completeQuest('knowledge-seeking');
        console.log('✅ Quest completed: knowledge-seeking');
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('9️⃣ TESTING LIBRARY UNLOCK...');
    
    // Go back to living room
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(500);
    
    // Try portal spell to library
    await spellInput.fill('open portal to library');
    await spellInput.press('Enter');
    await page.waitForTimeout(1000);
    console.log('🔮 Portal spell: open portal to library');
    
    // Check if library is now visible
    const libraryVisible = await page.evaluate(() => {
      const libraryTab = document.querySelector('[data-room="library"]');
      return libraryTab && libraryTab.style.display !== 'none' && libraryTab.style.visibility !== 'hidden';
    });
    
    console.log(`📚 Library visible: ${libraryVisible} (should be true)`);
    expect(libraryVisible).toBe(true);
    
    // Test library access
    await page.click('[data-room="library"]');
    await page.waitForTimeout(500);
    
    const libraryActive = await page.evaluate(() => {
      const libraryElement = document.getElementById('library');
      return libraryElement ? libraryElement.classList.contains('active') : false;
    });
    
    console.log(`📚 Library active: ${libraryActive} (should be true)`);
    expect(libraryActive).toBe(true);
    
    console.log('🔟 STARTING QUESTLINE - NATURE CONNECTION...');
    
    // Complete nature-connection quest
    console.log('📋 Completing nature-connection quest...');
    await page.evaluate(() => {
      if (window.fantasyOS && window.fantasyOS.components.questManager) {
        window.fantasyOS.components.questManager.completeQuest('nature-connection');
        console.log('✅ Quest completed: nature-connection');
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('1️⃣1️⃣ TESTING GARDEN UNLOCK...');
    
    // Go back to living room
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(500);
    
    // Try portal spell to garden
    await spellInput.fill('open portal to garden');
    await spellInput.press('Enter');
    await page.waitForTimeout(1000);
    console.log('🔮 Portal spell: open portal to garden');
    
    // Check if garden is now visible
    const gardenVisible = await page.evaluate(() => {
      const gardenTab = document.querySelector('[data-room="garden"]');
      return gardenTab && gardenTab.style.display !== 'none' && gardenTab.style.visibility !== 'hidden';
    });
    
    console.log(`🌿 Garden visible: ${gardenVisible} (should be true)`);
    expect(gardenVisible).toBe(true);
    
    // Test garden access
    await page.click('[data-room="garden"]');
    await page.waitForTimeout(500);
    
    const gardenActive = await page.evaluate(() => {
      const gardenElement = document.getElementById('garden');
      return gardenElement ? gardenElement.classList.contains('active') : false;
    });
    
    console.log(`🌿 Garden active: ${gardenActive} (should be true)`);
    expect(gardenActive).toBe(true);
    
    console.log('1️⃣2️⃣ FINAL ROOM STATUS CHECK...');
    
    // Check final room visibility
    const finalRooms = await page.evaluate(() => {
      const rooms = ['living-room', 'kitchen', 'bedroom', 'workshop', 'library', 'garden'];
      return rooms.map(roomId => {
        const tab = document.querySelector(`[data-room="${roomId}"]`);
        return {
          roomId,
          visible: tab && tab.style.display !== 'none' && tab.style.visibility !== 'hidden'
        };
      });
    });
    
    console.log('📊 FINAL ROOM STATUS:');
    finalRooms.forEach(room => {
      console.log(`${room.roomId}: ${room.visible ? 'VISIBLE' : 'HIDDEN'}`);
    });
    
    // All rooms should be visible now
    finalRooms.forEach(room => {
      expect(room.visible).toBe(true);
    });
    
    console.log('1️⃣3️⃣ CACHE & PERSISTENCE CHECK...');
    
    // Check localStorage data
    const localStorageData = await page.evaluate(() => {
      const data = localStorage.getItem('fantasyOS_roomProgression');
      return data ? JSON.parse(data) : null;
    });
    
    if (localStorageData && localStorageData.rooms) {
      console.log('💾 ROOM PROGRESSION DATA IN CACHE:');
      Object.keys(localStorageData.rooms).forEach(roomId => {
        const roomData = localStorageData.rooms[roomId];
        console.log(`  ${roomId}: accessLevel=${roomData.accessLevel}, unlockedAt=${roomData.unlockedAt}, visitCount=${roomData.visitCount}`);
      });
      
      // Check that all rooms are unlocked
      const unlockedRooms = Object.values(localStorageData.rooms).filter(room => room.accessLevel > 0);
      console.log(`🔓 Unlocked rooms in cache: ${unlockedRooms.length}/6`);
      expect(unlockedRooms.length).toBe(6);
    }
    
    // Check quest completion in cache
    const questData = await page.evaluate(() => {
      const data = localStorage.getItem('fantasy-os-quest-state');
      return data ? JSON.parse(data) : null;
    });
    
    if (questData) {
      console.log('🎯 QUEST DATA IN CACHE:');
      console.log(`  Completed quests: ${questData.completedQuests ? questData.completedQuests.length : 0}`);
      console.log(`  Active quests: ${questData.activeQuests ? Object.keys(questData.activeQuests).length : 0}`);
    }
    
    console.log('1️⃣4️⃣ PAGE RELOAD PERSISTENCE TEST...');
    
    // Reload page to test persistence
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check if all rooms are still visible after reload
    const roomsAfterReload = await page.evaluate(() => {
      const rooms = ['living-room', 'kitchen', 'bedroom', 'workshop', 'library', 'garden'];
      return rooms.map(roomId => {
        const tab = document.querySelector(`[data-room="${roomId}"]`);
        return {
          roomId,
          visible: tab && tab.style.display !== 'none' && tab.style.visibility !== 'hidden'
        };
      });
    });
    
    console.log('📊 ROOMS AFTER RELOAD:');
    roomsAfterReload.forEach(room => {
      console.log(`${room.roomId}: ${room.visible ? 'VISIBLE' : 'HIDDEN'}`);
    });
    
    // All rooms should still be visible after reload
    roomsAfterReload.forEach(room => {
      expect(room.visible).toBe(true);
    });
    
    console.log('1️⃣5️⃣ FINAL STATISTICS...');
    
    // Get final statistics
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
      console.log('📈 FINAL STATISTICS:');
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
    
    console.log('1️⃣6️⃣ FINAL SCREENSHOT...');
    await page.screenshot({ path: 'complete-questline-test-final.png', fullPage: true });
    
    console.log('🎉 COMPLETE QUESTLINE TEST FINISHED SUCCESSFULLY!');
    console.log('✅ All quests completed');
    console.log('✅ All rooms unlocked');
    console.log('✅ Cache working properly');
    console.log('✅ Persistence working');
    console.log('✅ Portal system working');
  });
});
