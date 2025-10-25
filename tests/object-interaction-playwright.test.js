const { test, expect } = require('@playwright/test');

test.describe('Fantasy OS Object Interaction Tests', () => {
  test('should detect object clicks in living room', async ({ page }) => {
    // Navigate to the main page
    await page.goto('http://localhost:8000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the room object overlay system is initialized
    const overlayInitialized = await page.evaluate(() => {
      return typeof window.roomObjectOverlay !== 'undefined';
    });
    
    expect(overlayInitialized).toBe(true);
    
    // Get the living room background element
    const livingRoomBackground = page.locator('#living-room .room-background');
    await expect(livingRoomBackground).toBeVisible();
    
    // Test clicking on fireplace area
    console.log('🔥 Testing fireplace click...');
    await livingRoomBackground.click({ 
      position: { x: 150, y: 250 } // Center of fireplace area
    });
    
    // Wait for interaction to process
    await page.waitForTimeout(1000);
    
    // Check if interaction was logged
    const interactionHistory = await page.evaluate(() => {
      if (window.roomObjectOverlay) {
        return window.roomObjectOverlay.getInteractionHistory();
      }
      return [];
    });
    
    console.log(`📊 Interaction History Length: ${interactionHistory.length}`);
    
    if (interactionHistory.length > 0) {
      console.log('✅ Fireplace click detected!');
      console.log('📝 Last Interaction:', interactionHistory[0]);
    } else {
      console.log('❌ No fireplace interaction detected');
    }
    
    // Test clicking on lamp area
    console.log('💡 Testing lamp click...');
    await livingRoomBackground.click({ 
      position: { x: 140, y: 210 } // Center of lamp area
    });
    
    await page.waitForTimeout(1000);
    
    const updatedHistory = await page.evaluate(() => {
      if (window.roomObjectOverlay) {
        return window.roomObjectOverlay.getInteractionHistory();
      }
      return [];
    });
    
    console.log(`📊 Updated Interaction History Length: ${updatedHistory.length}`);
    
    if (updatedHistory.length > interactionHistory.length) {
      console.log('✅ Lamp click detected!');
      console.log('📝 Latest Interaction:', updatedHistory[0]);
    } else {
      console.log('❌ No lamp interaction detected');
    }
  });
  
  test('should show tooltips on hover', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    const livingRoomBackground = page.locator('#living-room .room-background');
    
    // Test hover on fireplace
    console.log('🖱️ Testing hover...');
    await livingRoomBackground.hover({ 
      position: { x: 150, y: 250 } 
    });
    
    await page.waitForTimeout(500);
    
    // Check if tooltip appeared
    const tooltipExists = await page.evaluate(() => {
      return document.querySelector('.object-tooltip') !== null;
    });
    
    if (tooltipExists) {
      console.log('✅ Tooltip appeared on hover!');
    } else {
      console.log('❌ No tooltip detected');
    }
  });
  
  test('should handle gesture canvas interference', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    // Test if gesture canvas interferes with object clicks
    const gestureInterference = await page.evaluate(() => {
      const gestureCanvas = document.querySelector('.gesture-canvas');
      const roomBackground = document.querySelector('#living-room .room-background');
      
      if (!gestureCanvas || !roomBackground) return false;
      
      // Check z-index values
      const gestureZIndex = window.getComputedStyle(gestureCanvas).zIndex;
      const roomZIndex = window.getComputedStyle(roomBackground).zIndex;
      
      return {
        gestureZIndex: parseInt(gestureZIndex),
        roomZIndex: parseInt(roomZIndex),
        gestureBlocksRoom: parseInt(gestureZIndex) > parseInt(roomZIndex)
      };
    });
    
    console.log('Gesture interference test:', gestureInterference);
    
    // The gesture canvas should not block room interactions
    expect(gestureInterference.gestureBlocksRoom).toBe(false);
  });
  
  test('should work in all rooms', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
    
    const rooms = ['kitchen', 'library', 'workshop', 'bedroom', 'garden'];
    
    for (const room of rooms) {
      console.log(`🏠 Testing room: ${room}`);
      
      // Click on room tab
      await page.click(`[data-room="${room}"]`);
      await page.waitForTimeout(500);
      
      // Check if room is active
      const roomActive = await page.evaluate((roomId) => {
        const roomElement = document.getElementById(roomId);
        return roomElement ? roomElement.classList.contains('active') : false;
      }, room);
      
      expect(roomActive).toBe(true);
      
      // Test clicking on room background
      const roomBackground = page.locator(`#${room} .room-background`);
      await roomBackground.click({ 
        position: { x: 200, y: 200 } // Center of room
      });
      
      await page.waitForTimeout(500);
      
      console.log(`✅ Room ${room} interaction test completed`);
    }
  });
});
