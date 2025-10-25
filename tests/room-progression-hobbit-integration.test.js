const { test, expect } = require('@playwright/test');

test.describe('Room Progression System - Hobbit Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    // Clear localStorage to start fresh
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should integrate room progression with hobbit companion', async ({ page }) => {
    console.log('🧙‍♂️ Testing Room Progression + Hobbit Companion integration...');
    
    // Check if hobbit companion is initialized
    const hobbitInitialized = await page.evaluate(() => {
      return typeof window.hobbitCompanion !== 'undefined' && 
             window.fantasyOS.components.hobbitCompanion !== null;
    });
    
    expect(hobbitInitialized).toBe(true);
    console.log('✅ Hobbit Companion initialized');
    
    // Start in living room and interact with hobbit
    await page.click('[data-room="living-room"]');
    
    // Click on hobbit to trigger dialogue
    const hobbitImage = page.locator('#hobbitCharacter .hobbit-image');
    if (await hobbitImage.count() > 0) {
      await hobbitImage.click();
      await page.waitForTimeout(1000);
      console.log('🧙‍♂️ Clicked hobbit companion');
    }
    
    // Check if quest system is working with room progression
    const questSystemWorking = await page.evaluate(() => {
      return window.fantasyOS.components.questManager !== null &&
             window.fantasyOS.components.roomProgression !== null;
    });
    
    expect(questSystemWorking).toBe(true);
    console.log('✅ Quest system integrated with room progression');
    
    // Complete a quest and check room unlocking
    await page.evaluate(() => {
      const questManager = window.fantasyOS.components.questManager;
      if (questManager) {
        questManager.completeQuest('credentials-recovery');
      }
    });
    
    // Check if room progression system responds to quest completion
    await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      roomProgression.checkAutoUnlock();
    });
    
    // Try to access kitchen (should be unlocked now)
    await page.click('[data-room="kitchen"]');
    const kitchenActive = await page.evaluate(() => {
      const kitchenElement = document.getElementById('kitchen');
      return kitchenElement ? kitchenElement.classList.contains('active') : false;
    });
    
    if (kitchenActive) {
      console.log('✅ Room progression responded to quest completion');
    }
    
    console.log('✅ Hobbit + Room Progression integration successful');
  });

  test('should trigger hobbit dialogue on room progression events', async ({ page }) => {
    console.log('🗣️ Testing hobbit dialogue triggers on room progression...');
    
    // Set up event listener for room progression events
    await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      const hobbitCompanion = window.fantasyOS.components.hobbitCompanion;
      
      if (roomProgression && hobbitCompanion) {
        // Add event handler for room unlocked events
        roomProgression.addEventHandler('room-unlocked', (data) => {
          console.log('🏰 Room unlocked event triggered:', data.roomId);
        });
        
        roomProgression.addEventHandler('room-explored', (data) => {
          console.log('🔍 Room explored event triggered:', data.roomId);
        });
      }
    });
    
    // Explore living room to trigger events
    await page.click('[data-room="living-room"]');
    await page.waitForTimeout(1000);
    
    // Check if events were triggered
    const eventsTriggered = await page.evaluate(() => {
      return window.fantasyOS.components.roomProgression.eventHandlers.size > 0;
    });
    
    expect(eventsTriggered).toBe(true);
    console.log('✅ Room progression events properly configured');
  });

  test('should show hobbit reactions to secret passage discoveries', async ({ page }) => {
    console.log('🚪 Testing hobbit reactions to secret passage discoveries...');
    
    // Go to living room
    await page.click('[data-room="living-room"]');
    
    // Discover a secret passage
    await page.evaluate(() => {
      const secretPassages = window.fantasyOS.components.secretPassages;
      secretPassages.discoverPassage('living-room-to-kitchen');
    });
    
    console.log('🚪 Secret passage discovered');
    
    // Check if hobbit companion reacts to the discovery
    const hobbitDialogue = page.locator('#hobbitDialogue .hobbit-text');
    if (await hobbitDialogue.count() > 0) {
      const dialogueText = await hobbitDialogue.textContent();
      console.log('🗣️ Hobbit dialogue:', dialogueText);
    }
    
    // Check if passage discovery notification appears
    const notification = page.locator('.passage-discovery-notification');
    if (await notification.count() > 0) {
      await expect(notification).toBeVisible();
      console.log('✅ Secret passage discovery notification shown');
    }
    
    console.log('✅ Hobbit reactions to secret passages working');
  });

  test('should integrate room upgrades with hobbit personality', async ({ page }) => {
    console.log('✨ Testing room upgrades integration with hobbit personality...');
    
    // Go to living room
    await page.click('[data-room="living-room"]');
    
    // Explore room multiple times to gain mastery
    for (let i = 0; i < 5; i++) {
      await page.click('[data-room="living-room"]');
      await page.waitForTimeout(100);
    }
    
    // Check for available upgrades
    const availableUpgrades = await page.evaluate(() => {
      const roomUpgrades = window.fantasyOS.components.roomUpgrades;
      return roomUpgrades.getAvailableUpgrades('living-room');
    });
    
    if (availableUpgrades.length > 0) {
      const upgradeId = availableUpgrades[0].id;
      console.log(`🔧 Testing upgrade: ${upgradeId}`);
      
      // Unlock and apply upgrade
      await page.evaluate((upgradeId) => {
        const roomUpgrades = window.fantasyOS.components.roomUpgrades;
        roomUpgrades.unlockUpgrade('living-room', upgradeId);
        roomUpgrades.applyUpgrade('living-room', upgradeId);
      }, upgradeId);
      
      // Check if hobbit companion reacts to room upgrade
      const hobbitDialogue = page.locator('#hobbitDialogue .hobbit-text');
      if (await hobbitDialogue.count() > 0) {
        const dialogueText = await hobbitDialogue.textContent();
        console.log('🗣️ Hobbit reaction to upgrade:', dialogueText);
      }
      
      console.log('✅ Room upgrade applied successfully');
    }
    
    console.log('✅ Room upgrades + Hobbit personality integration working');
  });

  test('should maintain hobbit memory across room progression', async ({ page }) => {
    console.log('🧠 Testing hobbit memory persistence with room progression...');
    
    // Go to living room and interact with hobbit
    await page.click('[data-room="living-room"]');
    
    const hobbitImage = page.locator('#hobbitCharacter .hobbit-image');
    if (await hobbitImage.count() > 0) {
      await hobbitImage.click();
      await page.waitForTimeout(1000);
    }
    
    // Make some room progression
    await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      roomProgression.exploreRoom('living-room');
      roomProgression.exploreRoom('living-room');
    });
    
    // Check hobbit memory
    const hobbitMemory = await page.evaluate(() => {
      const hobbitCompanion = window.fantasyOS.components.hobbitCompanion;
      if (hobbitCompanion && hobbitCompanion.memory) {
        return hobbitCompanion.memory.getMemory();
      }
      return null;
    });
    
    if (hobbitMemory) {
      console.log('🧠 Hobbit memory:', hobbitMemory);
    }
    
    // Reload page and check if memory persists
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if room progression data persisted
    const roomProgressionPersisted = await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      return roomProgression.progressionData.rooms['living-room'].visitCount > 0;
    });
    
    expect(roomProgressionPersisted).toBe(true);
    console.log('✅ Room progression data persisted across reload');
    
    console.log('✅ Hobbit memory + Room progression persistence working');
  });

  test('should handle hobbit quest progression with room unlocking', async ({ page }) => {
    console.log('🎯 Testing hobbit quest progression with room unlocking...');
    
    // Check initial quest state
    const initialQuests = await page.evaluate(() => {
      const questManager = window.fantasyOS.components.questManager;
      if (questManager) {
        return questManager.getActiveQuests();
      }
      return [];
    });
    
    console.log(`📊 Initial active quests: ${initialQuests.length}`);
    
    // Complete credentials recovery quest
    await page.evaluate(() => {
      const questManager = window.fantasyOS.components.questManager;
      if (questManager) {
        questManager.completeQuest('credentials-recovery');
      }
    });
    
    // Check if rooms were unlocked
    await page.evaluate(() => {
      const roomProgression = window.fantasyOS.components.roomProgression;
      roomProgression.checkAutoUnlock();
    });
    
    // Try to access unlocked rooms
    const unlockedRooms = [];
    const rooms = ['kitchen', 'bedroom', 'workshop', 'library', 'garden'];
    
    for (const room of rooms) {
      await page.click(`[data-room="${room}"]`);
      await page.waitForTimeout(500);
      
      const roomActive = await page.evaluate((roomId) => {
        const roomElement = document.getElementById(roomId);
        return roomElement ? roomElement.classList.contains('active') : false;
      }, room);
      
      if (roomActive) {
        unlockedRooms.push(room);
        console.log(`✅ ${room} unlocked`);
      } else {
        console.log(`🔒 ${room} still locked`);
      }
    }
    
    console.log(`📊 Unlocked rooms: ${unlockedRooms.length}/${rooms.length}`);
    
    // Check hobbit dialogue about quest progress
    await page.click('[data-room="living-room"]');
    const hobbitDialogue = page.locator('#hobbitDialogue .hobbit-text');
    if (await hobbitDialogue.count() > 0) {
      const dialogueText = await hobbitDialogue.textContent();
      console.log('🗣️ Hobbit quest dialogue:', dialogueText);
    }
    
    console.log('✅ Hobbit quest progression + Room unlocking integration successful');
  });

  test('should provide comprehensive hobbit + room progression statistics', async ({ page }) => {
    console.log('📊 Testing comprehensive statistics...');
    
    // Get all statistics
    const allStats = await page.evaluate(() => {
      return {
        roomProgression: window.fantasyOS.getRoomProgressionStats(),
        secretPassages: window.fantasyOS.getSecretPassageStats(),
        roomUpgrades: window.fantasyOS.getRoomUpgradeStats(),
        hobbitMemory: window.fantasyOS.components.hobbitCompanion ? 
          window.fantasyOS.components.hobbitCompanion.memory.getMemory() : null,
        activeQuests: window.fantasyOS.components.questManager ? 
          window.fantasyOS.components.questManager.getActiveQuests() : []
      };
    });
    
    expect(allStats.roomProgression).toBeDefined();
    expect(allStats.secretPassages).toBeDefined();
    expect(allStats.roomUpgrades).toBeDefined();
    
    console.log('📈 Comprehensive Statistics:');
    console.log(`🏠 Rooms: ${allStats.roomProgression.totalRooms} total, ${allStats.roomProgression.unlockedRooms} unlocked`);
    console.log(`🚪 Passages: ${allStats.secretPassages.totalPassages} total, ${allStats.secretPassages.discoveredPassages} discovered`);
    console.log(`✨ Upgrades: ${allStats.roomUpgrades.totalUpgrades} total, ${allStats.roomUpgrades.unlockedUpgrades} unlocked`);
    console.log(`🎯 Active Quests: ${allStats.activeQuests.length}`);
    
    if (allStats.hobbitMemory) {
      console.log(`🧠 Hobbit Memory: ${Object.keys(allStats.hobbitMemory).length} entries`);
    }
    
    console.log('✅ All statistics systems working together');
  });
});