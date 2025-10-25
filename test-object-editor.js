const { chromium } = require('playwright');

async function testObjectEditor() {
    console.log('🎯 Starting Object Editor Test...');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Enable console logging
    page.on('console', msg => {
        console.log(`Browser Console: ${msg.text()}`);
    });
    
    try {
        // Navigate to object-editor.html
        console.log('📄 Loading object-editor.html...');
        await page.goto('file:///home/fr4iser/Documents/Git/VibeJam-2/object-editor.html');
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        console.log('✅ Page loaded');
        
        // Wait for click handler setup
        await page.waitForFunction(() => {
            return document.querySelector('.room-background') !== null;
        });
        console.log('✅ Room background element found');
        
        // Test click on IMAGE specifically (like identifier)
        console.log('🖱️ Clicking on room IMAGE...');
        const roomImage = page.locator('#roomImage');
        
        // Force click without waiting for stability
        await roomImage.click({ 
            position: { x: 300, y: 200 },
            force: true,
            timeout: 10000
        });
        
        console.log('✅ Click completed');
        
        // Wait for coordinates update
        await page.waitForFunction(() => {
            const coords = document.getElementById('coordinates');
            return coords && coords.textContent !== 'Klicke auf das Bild';
        }, { timeout: 2000 });
        
        // Check if coordinates were updated
        const coordinates = await page.locator('#coordinates').textContent();
        console.log('📍 Coordinates display:', coordinates);
        
        // Check if click indicator appeared
        const indicator = await page.locator('#clickIndicator');
        const isVisible = await indicator.isVisible();
        console.log('🔴 Click indicator visible:', isVisible);
        
        console.log('📊 Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

testObjectEditor();
