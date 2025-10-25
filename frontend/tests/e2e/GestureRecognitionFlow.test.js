/**
 * Fantasy OS - Gesture Recognition E2E Tests
 * End-to-end tests for gesture recognition user flows
 * Created: 2025-10-25T12:23:56.000Z
 */

describe('Gesture Recognition E2E Tests', () => {
    let page;
    
    beforeAll(async () => {
        // Launch browser
        page = await browser.newPage();
        
        // Navigate to Fantasy OS
        await page.goto('http://localhost:3000');
        
        // Wait for page to load
        await page.waitForSelector('#gestureCanvas');
    });
    
    afterAll(async () => {
        await page.close();
    });
    
    describe('Basic Gesture Recognition Flow', () => {
        test('should recognize circle gesture and execute action', async () => {
            // Get gesture canvas
            const canvas = await page.$('#gestureCanvas');
            expect(canvas).toBeTruthy();
            
            // Draw a circle gesture
            await drawCircleGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeTruthy();
            
            const messageText = await page.evaluate(el => el.textContent, successMessage);
            expect(messageText).toContain('Circle recognized');
        });
        
        test('should recognize zigzag gesture and execute action', async () => {
            // Get gesture canvas
            const canvas = await page.$('#gestureCanvas');
            expect(canvas).toBeTruthy();
            
            // Draw a zigzag gesture
            await drawZigzagGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeTruthy();
            
            const messageText = await page.evaluate(el => el.textContent, successMessage);
            expect(messageText).toContain('Zigzag recognized');
        });
        
        test('should recognize spiral gesture and execute action', async () => {
            // Get gesture canvas
            const canvas = await page.$('#gestureCanvas');
            expect(canvas).toBeTruthy();
            
            // Draw a spiral gesture
            await drawSpiralGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeTruthy();
            
            const messageText = await page.evaluate(el => el.textContent, successMessage);
            expect(messageText).toContain('Spiral recognized');
        });
        
        test('should recognize heart gesture and execute action', async () => {
            // Get gesture canvas
            const canvas = await page.$('#gestureCanvas');
            expect(canvas).toBeTruthy();
            
            // Draw a heart gesture
            await drawHeartGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeTruthy();
            
            const messageText = await page.evaluate(el => el.textContent, successMessage);
            expect(messageText).toContain('Heart recognized');
        });
    });
    
    describe('Multi-Room Gesture Recognition', () => {
        test('should work in different rooms', async () => {
            // Switch to kitchen
            await page.click('[data-room="kitchen"]');
            await page.waitForTimeout(500);
            
            // Get kitchen gesture canvas
            const kitchenCanvas = await page.$('#gestureCanvasKitchen');
            expect(kitchenCanvas).toBeTruthy();
            
            // Draw a circle in kitchen
            await drawCircleGesture(page, kitchenCanvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeTruthy();
            
            // Switch to bedroom
            await page.click('[data-room="bedroom"]');
            await page.waitForTimeout(500);
            
            // Get bedroom gesture canvas
            const bedroomCanvas = await page.$('#gestureCanvasBedroom');
            expect(bedroomCanvas).toBeTruthy();
            
            // Draw a zigzag in bedroom
            await drawZigzagGesture(page, bedroomCanvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage2 = await page.$('.gesture-message');
            expect(successMessage2).toBeTruthy();
        });
    });
    
    describe('Gesture Recognition Settings', () => {
        test('should enable/disable gesture recognition', async () => {
            // Open settings
            await page.click('#settingsBtn');
            await page.waitForSelector('#settingsModal');
            
            // Find gesture recognition checkbox
            const gestureCheckbox = await page.$('#gestureRecognition');
            expect(gestureCheckbox).toBeTruthy();
            
            // Disable gesture recognition
            await page.click('#gestureRecognition');
            
            // Close settings
            await page.click('#closeSettings');
            
            // Try to draw a gesture
            const canvas = await page.$('#gestureCanvas');
            await drawCircleGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Should not show success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeFalsy();
            
            // Re-enable gesture recognition
            await page.click('#settingsBtn');
            await page.waitForSelector('#settingsModal');
            await page.click('#gestureRecognition');
            await page.click('#closeSettings');
            
            // Try to draw a gesture again
            await drawCircleGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Should show success message
            const successMessage2 = await page.$('.gesture-message');
            expect(successMessage2).toBeTruthy();
        });
    });
    
    describe('Gesture Recognition with Spell Casting', () => {
        test('should cast spells through gestures', async () => {
            // Draw a circle gesture (should open portal)
            const canvas = await page.$('#gestureCanvas');
            await drawCircleGesture(page, canvas);
            
            // Wait for recognition and action
            await page.waitForTimeout(2000);
            
            // Check if room changed (portal opened)
            const currentRoom = await page.evaluate(() => {
                const activeRoom = document.querySelector('.room.active');
                return activeRoom ? activeRoom.id : null;
            });
            
            // Should be in a different room or show portal effect
            expect(currentRoom).toBeTruthy();
        });
        
        test('should show spell effects for gestures', async () => {
            // Draw a zigzag gesture (should summon light)
            const canvas = await page.$('#gestureCanvas');
            await drawZigzagGesture(page, canvas);
            
            // Wait for recognition and action
            await page.waitForTimeout(2000);
            
            // Check for light effect
            const lightEffect = await page.$('.light-mode');
            expect(lightEffect).toBeTruthy();
        });
    });
    
    describe('Gesture Recognition Error Handling', () => {
        test('should handle unrecognized gestures gracefully', async () => {
            // Draw a random gesture
            const canvas = await page.$('#gestureCanvas');
            await drawRandomGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Should not show success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeFalsy();
        });
        
        test('should handle very short gestures', async () => {
            // Draw a very short gesture
            const canvas = await page.$('#gestureCanvas');
            await drawShortGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Should not show success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeFalsy();
        });
    });
    
    describe('Performance and Responsiveness', () => {
        test('should respond quickly to gestures', async () => {
            const canvas = await page.$('#gestureCanvas');
            
            // Measure response time
            const startTime = Date.now();
            
            // Draw a circle gesture
            await drawCircleGesture(page, canvas);
            
            // Wait for recognition
            await page.waitForSelector('.gesture-message', { timeout: 2000 });
            
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            // Should respond within 2 seconds
            expect(responseTime).toBeLessThan(2000);
        });
        
        test('should handle multiple rapid gestures', async () => {
            const canvas = await page.$('#gestureCanvas');
            
            // Draw multiple gestures rapidly
            for (let i = 0; i < 3; i++) {
                await drawCircleGesture(page, canvas);
                await page.waitForTimeout(500);
            }
            
            // Should handle all gestures without crashing
            const successMessages = await page.$$('.gesture-message');
            expect(successMessages.length).toBeGreaterThan(0);
        });
    });
    
    describe('Cross-Browser Compatibility', () => {
        test('should work with touch events on mobile', async () => {
            // Simulate mobile device
            await page.setViewport({ width: 375, height: 667 });
            
            const canvas = await page.$('#gestureCanvas');
            
            // Draw gesture using touch events
            await drawGestureWithTouch(page, canvas);
            
            // Wait for recognition
            await page.waitForTimeout(1000);
            
            // Check for success message
            const successMessage = await page.$('.gesture-message');
            expect(successMessage).toBeTruthy();
        });
    });
});

// Helper functions for drawing gestures
async function drawCircleGesture(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;
    const radius = 50;
    
    // Start drawing
    await page.mouse.move(centerX + radius, centerY);
    await page.mouse.down();
    
    // Draw circle
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        await page.mouse.move(x, y);
    }
    
    // Close circle
    await page.mouse.move(centerX + radius, centerY);
    await page.mouse.up();
}

async function drawZigzagGesture(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    const startX = boundingBox.x + 50;
    const startY = boundingBox.y + 100;
    const width = 200;
    const height = 100;
    
    // Start drawing
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    
    // Draw zigzag
    for (let i = 0; i <= 10; i++) {
        const x = startX + (i / 10) * width;
        const y = startY + (i % 2 === 0 ? 0 : height);
        await page.mouse.move(x, y);
    }
    
    await page.mouse.up();
}

async function drawSpiralGesture(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;
    const maxRadius = 60;
    
    // Start drawing
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    
    // Draw spiral
    for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * 4 * Math.PI;
        const radius = (i / 30) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        await page.mouse.move(x, y);
    }
    
    await page.mouse.up();
}

async function drawHeartGesture(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;
    
    // Start drawing
    await page.mouse.move(centerX, centerY - 20);
    await page.mouse.down();
    
    // Draw heart shape
    const heartPoints = [
        { x: centerX, y: centerY - 20 },
        { x: centerX - 20, y: centerY - 10 },
        { x: centerX - 20, y: centerY + 10 },
        { x: centerX, y: centerY + 20 },
        { x: centerX + 20, y: centerY + 10 },
        { x: centerX + 20, y: centerY - 10 },
        { x: centerX, y: centerY - 20 }
    ];
    
    for (const point of heartPoints) {
        await page.mouse.move(point.x, point.y);
    }
    
    await page.mouse.up();
}

async function drawRandomGesture(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    
    // Start drawing
    await page.mouse.move(boundingBox.x + 50, boundingBox.y + 50);
    await page.mouse.down();
    
    // Draw random path
    for (let i = 0; i < 10; i++) {
        const x = boundingBox.x + Math.random() * boundingBox.width;
        const y = boundingBox.y + Math.random() * boundingBox.height;
        await page.mouse.move(x, y);
    }
    
    await page.mouse.up();
}

async function drawShortGesture(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    
    // Start drawing
    await page.mouse.move(boundingBox.x + 50, boundingBox.y + 50);
    await page.mouse.down();
    
    // Draw very short path
    await page.mouse.move(boundingBox.x + 60, boundingBox.y + 60);
    
    await page.mouse.up();
}

async function drawGestureWithTouch(page, canvas) {
    const boundingBox = await canvas.boundingBox();
    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;
    const radius = 50;
    
    // Start touch
    await page.touchscreen.tap(centerX + radius, centerY);
    
    // Draw circle with touch
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        await page.touchscreen.tap(x, y);
    }
}
