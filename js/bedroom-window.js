/**
 * Bedroom Window System for Fantasy OS
 * Shows beautiful bedroom windows with dreams and memories
 */

class BedroomWindow {
    constructor() {
        this.isOpen = false;
    }
    
    /**
     * Show bed window with dream memories
     */
    showBedWindow() {
        if (this.isOpen) return;
        
        console.log('🛏️ Opening bed window...');
        this.isOpen = true;
        
        // Create bed window overlay
        const bedWindow = document.createElement('div');
        bedWindow.className = 'bed-window-overlay';
        bedWindow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-in;
        `;
        
        // Create bed content
        const bedContent = document.createElement('div');
        bedContent.className = 'bed-content';
        bedContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: bedOpen 0.5s ease-out;
        `;
        
        // Bed title
        const bedTitle = document.createElement('h2');
        bedTitle.textContent = '🛏️ Dream Memory Bed';
        bedTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Bed content
        const bedInfo = document.createElement('div');
        bedInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Dream Memories:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Recovered Dream Fragments:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>🌙 Moonlit adventures in the garden</li>
                        <li>⭐ Starlight conversations with nature</li>
                        <li>🌸 Flower memories from childhood</li>
                        <li>🌅 Sunrise moments of hope</li>
                        <li>🌺 Garden gate to the outside world</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Dream Insights:</strong><br>
                        The bed holds memories of peaceful nights and magical dreams. 
                        These memories are connected to the garden and the outside world.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>This bed has witnessed countless dreams and holds the key to understanding the Hobbit's connection to nature.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Bed';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #D4AF37;
            color: #8B4513;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'MedievalSharp', cursive;
            font-weight: bold;
            font-size: 14px;
        `;
        
        closeButton.addEventListener('click', () => {
            this.closeBedWindow(bedWindow);
        });
        
        // Assemble bed
        bedContent.appendChild(bedTitle);
        bedContent.appendChild(bedInfo);
        bedContent.appendChild(closeButton);
        bedWindow.appendChild(bedContent);
        
        // Add to page
        document.body.appendChild(bedWindow);
        
        // Add CSS animations
        this.addBedStyles();
        
        console.log('🛏️ Bed window opened!');
    }
    
    /**
     * Show drawer window with personal items
     */
    showDrawerWindow() {
        if (this.isOpen) return;
        
        console.log('🗄️ Opening drawer window...');
        this.isOpen = true;
        
        // Create drawer window overlay
        const drawerWindow = document.createElement('div');
        drawerWindow.className = 'drawer-window-overlay';
        drawerWindow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-in;
        `;
        
        // Create drawer content
        const drawerContent = document.createElement('div');
        drawerContent.className = 'drawer-content';
        drawerContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: drawerOpen 0.5s ease-out;
        `;
        
        // Drawer title
        const drawerTitle = document.createElement('h2');
        drawerTitle.textContent = '🗄️ Personal Memory Drawer';
        drawerTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Drawer content
        const drawerInfo = document.createElement('div');
        drawerInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Personal Items Found:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Memory Artifacts:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>📸 Old photographs of the garden</li>
                        <li>🌿 Pressed flowers from childhood</li>
                        <li>📜 Letters from nature spirits</li>
                        <li>🔑 Small key to the garden gate</li>
                        <li>💎 Crystal that glows in moonlight</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Memory Connection:</strong><br>
                        These items reveal a deep connection to the garden and nature. 
                        The Hobbit has always been drawn to the natural world.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>This drawer contains precious memories that connect the Hobbit to the garden and the outside world.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Drawer';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #D4AF37;
            color: #8B4513;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'MedievalSharp', cursive;
            font-weight: bold;
            font-size: 14px;
        `;
        
        closeButton.addEventListener('click', () => {
            this.closeDrawerWindow(drawerWindow);
        });
        
        // Assemble drawer
        drawerContent.appendChild(drawerTitle);
        drawerContent.appendChild(drawerInfo);
        drawerContent.appendChild(closeButton);
        drawerWindow.appendChild(drawerContent);
        
        // Add to page
        document.body.appendChild(drawerWindow);
        
        // Add CSS animations
        this.addDrawerStyles();
        
        console.log('🗄️ Drawer window opened!');
    }
    
    /**
     * Show star window with dream realm access
     */
    showStarWindow() {
        if (this.isOpen) return;
        
        console.log('⭐ Opening star window...');
        this.isOpen = true;
        
        // Create star window overlay
        const starWindow = document.createElement('div');
        starWindow.className = 'star-window-overlay';
        starWindow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-in;
        `;
        
        // Create star content
        const starContent = document.createElement('div');
        starContent.className = 'star-content';
        starContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: starOpen 0.5s ease-out;
        `;
        
        // Star title
        const starTitle = document.createElement('h2');
        starTitle.textContent = '⭐ Dream Realm Star';
        starTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Star content
        const starInfo = document.createElement('div');
        starInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Dream Realm Portal:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Star Portal Activation:</strong>
                    </p>
                    <p style="font-size: 20px; color: #FFD700; margin: 10px 0; font-weight: bold;">
                        "open portal to garden"
                    </p>
                    <p style="font-size: 14px; color: #F5F5DC; margin: 0;">
                        This star connects to the dream realm and reveals the garden portal spell. 
                        Touch it to unlock the path to nature.
                    </p>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Dream Realm Connection:</strong><br>
                        The star is a gateway to the dream realm where memories of the garden 
                        and nature are strongest. It holds the key to the garden portal.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>This star has been touched by dream magic and can transport you to the realm of nature.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Star';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #D4AF37;
            color: #8B4513;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'MedievalSharp', cursive;
            font-weight: bold;
            font-size: 14px;
        `;
        
        closeButton.addEventListener('click', () => {
            this.closeStarWindow(starWindow);
        });
        
        // Assemble star
        starContent.appendChild(starTitle);
        starContent.appendChild(starInfo);
        starContent.appendChild(closeButton);
        starWindow.appendChild(starContent);
        
        // Add to page
        document.body.appendChild(starWindow);
        
        // Add CSS animations
        this.addStarStyles();
        
        console.log('⭐ Star window opened!');
    }
    
    /**
     * Close windows
     */
    closeBedWindow(bedWindow) {
        this.isOpen = false;
        bedWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (bedWindow.parentNode) {
                bedWindow.parentNode.removeChild(bedWindow);
            }
        }, 300);
    }
    
    closeDrawerWindow(drawerWindow) {
        this.isOpen = false;
        drawerWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (drawerWindow.parentNode) {
                drawerWindow.parentNode.removeChild(drawerWindow);
            }
        }, 300);
    }
    
    closeStarWindow(starWindow) {
        this.isOpen = false;
        starWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (starWindow.parentNode) {
                starWindow.parentNode.removeChild(starWindow);
            }
        }, 300);
    }
    
    /**
     * Add CSS animations for bedroom windows
     */
    addBedStyles() {
        if (!document.getElementById('bed-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'bed-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes bedOpen {
                    from { 
                        transform: scale(0.8) rotateY(-10deg);
                        opacity: 0;
                    }
                    to { 
                        transform: scale(1) rotateY(0deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    addDrawerStyles() {
        if (!document.getElementById('drawer-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'drawer-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes drawerOpen {
                    from { 
                        transform: scale(0.8) rotateY(-10deg);
                        opacity: 0;
                    }
                    to { 
                        transform: scale(1) rotateY(0deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    addStarStyles() {
        if (!document.getElementById('star-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'star-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes starOpen {
                    from { 
                        transform: scale(0.8) rotateY(-10deg);
                        opacity: 0;
                    }
                    to { 
                        transform: scale(1) rotateY(0deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// Create global instance
window.bedroomWindow = new BedroomWindow();
