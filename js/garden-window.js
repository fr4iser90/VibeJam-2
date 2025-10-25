/**
 * Garden Window System for Fantasy OS
 * Shows beautiful garden windows with nature and external world connections
 */

class GardenWindow {
    constructor() {
        this.isOpen = false;
    }
    
    /**
     * Show far away window with horizon secrets
     */
    showFarAwayWindow() {
        if (this.isOpen) return;
        
        console.log('🌅 Opening far away window...');
        this.isOpen = true;
        
        // Create far away window overlay
        const farAwayWindow = document.createElement('div');
        farAwayWindow.className = 'far-away-window-overlay';
        farAwayWindow.style.cssText = `
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
        
        // Create far away content
        const farAwayContent = document.createElement('div');
        farAwayContent.className = 'far-away-content';
        farAwayContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: farAwayOpen 0.5s ease-out;
        `;
        
        // Far away title
        const farAwayTitle = document.createElement('h2');
        farAwayTitle.textContent = '🌅 Distant Horizon';
        farAwayTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Far away content
        const farAwayInfo = document.createElement('div');
        farAwayInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Horizon Secrets:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Distant Lands Revealed:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>🏔️ Mountain ranges beyond the garden</li>
                        <li>🌊 Ocean waves in the distance</li>
                        <li>🌲 Ancient forests waiting to be explored</li>
                        <li>🏰 Mysterious castles on the horizon</li>
                        <li>🌟 Starlight paths to other realms</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>External World Connection:</strong><br>
                        The horizon holds the promise of adventure and discovery. 
                        Beyond the garden lies a vast world waiting to be explored.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>The distant horizon represents the connection between the magical realm and the outside world.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Horizon';
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
            this.closeFarAwayWindow(farAwayWindow);
        });
        
        // Assemble far away
        farAwayContent.appendChild(farAwayTitle);
        farAwayContent.appendChild(farAwayInfo);
        farAwayContent.appendChild(closeButton);
        farAwayWindow.appendChild(farAwayContent);
        
        // Add to page
        document.body.appendChild(farAwayWindow);
        
        // Add CSS animations
        this.addFarAwayStyles();
        
        console.log('🌅 Far away window opened!');
    }
    
    /**
     * Show white flowers window with purity
     */
    showWhiteFlowersWindow() {
        if (this.isOpen) return;
        
        console.log('🌸 Opening white flowers window...');
        this.isOpen = true;
        
        // Create white flowers window overlay
        const whiteFlowersWindow = document.createElement('div');
        whiteFlowersWindow.className = 'white-flowers-window-overlay';
        whiteFlowersWindow.style.cssText = `
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
        
        // Create white flowers content
        const whiteFlowersContent = document.createElement('div');
        whiteFlowersContent.className = 'white-flowers-content';
        whiteFlowersContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: whiteFlowersOpen 0.5s ease-out;
        `;
        
        // White flowers title
        const whiteFlowersTitle = document.createElement('h2');
        whiteFlowersTitle.textContent = '🌸 White Purity Flowers';
        whiteFlowersTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // White flowers content
        const whiteFlowersInfo = document.createElement('div');
        whiteFlowersInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Flower of Purity:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>White Flower Properties:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>✨ Represents purity and innocence</li>
                        <li>🌙 Glows softly in moonlight</li>
                        <li>💧 Cleanses negative energy</li>
                        <li>🕊️ Brings peace and tranquility</li>
                        <li>🌟 Connects to the celestial realm</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Nature's Blessing:</strong><br>
                        These white flowers are blessed by nature spirits and represent 
                        the pure connection between the garden and the outside world.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>These flowers bloom eternally and serve as a bridge between the magical realm and nature.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Flowers';
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
            this.closeWhiteFlowersWindow(whiteFlowersWindow);
        });
        
        // Assemble white flowers
        whiteFlowersContent.appendChild(whiteFlowersTitle);
        whiteFlowersContent.appendChild(whiteFlowersInfo);
        whiteFlowersContent.appendChild(closeButton);
        whiteFlowersWindow.appendChild(whiteFlowersContent);
        
        // Add to page
        document.body.appendChild(whiteFlowersWindow);
        
        // Add CSS animations
        this.addWhiteFlowersStyles();
        
        console.log('🌸 White flowers window opened!');
    }
    
    /**
     * Show red flowers window with passion
     */
    showRedFlowersWindow() {
        if (this.isOpen) return;
        
        console.log('🌺 Opening red flowers window...');
        this.isOpen = true;
        
        // Create red flowers window overlay
        const redFlowersWindow = document.createElement('div');
        redFlowersWindow.className = 'red-flowers-window-overlay';
        redFlowersWindow.style.cssText = `
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
        
        // Create red flowers content
        const redFlowersContent = document.createElement('div');
        redFlowersContent.className = 'red-flowers-content';
        redFlowersContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: redFlowersOpen 0.5s ease-out;
        `;
        
        // Red flowers title
        const redFlowersTitle = document.createElement('h2');
        redFlowersTitle.textContent = '🌺 Red Passion Flowers';
        redFlowersTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Red flowers content
        const redFlowersInfo = document.createElement('div');
        redFlowersInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Flower of Passion:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Red Flower Properties:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>🔥 Represents passion and energy</li>
                        <li>☀️ Absorbs sunlight and warmth</li>
                        <li>💪 Strengthens determination</li>
                        <li>❤️ Brings love and courage</li>
                        <li>⚡ Channels fiery magic</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Nature's Fire:</strong><br>
                        These red flowers burn with the passion of nature and represent 
                        the fiery energy that connects all living things.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>These flowers pulse with life energy and serve as a beacon of passion in the garden.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Flowers';
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
            this.closeRedFlowersWindow(redFlowersWindow);
        });
        
        // Assemble red flowers
        redFlowersContent.appendChild(redFlowersTitle);
        redFlowersContent.appendChild(redFlowersInfo);
        redFlowersContent.appendChild(closeButton);
        redFlowersWindow.appendChild(redFlowersContent);
        
        // Add to page
        document.body.appendChild(redFlowersWindow);
        
        // Add CSS animations
        this.addRedFlowersStyles();
        
        console.log('🌺 Red flowers window opened!');
    }
    
    /**
     * Close windows
     */
    closeFarAwayWindow(farAwayWindow) {
        this.isOpen = false;
        farAwayWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (farAwayWindow.parentNode) {
                farAwayWindow.parentNode.removeChild(farAwayWindow);
            }
        }, 300);
    }
    
    closeWhiteFlowersWindow(whiteFlowersWindow) {
        this.isOpen = false;
        whiteFlowersWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (whiteFlowersWindow.parentNode) {
                whiteFlowersWindow.parentNode.removeChild(whiteFlowersWindow);
            }
        }, 300);
    }
    
    closeRedFlowersWindow(redFlowersWindow) {
        this.isOpen = false;
        redFlowersWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (redFlowersWindow.parentNode) {
                redFlowersWindow.parentNode.removeChild(redFlowersWindow);
            }
        }, 300);
    }
    
    /**
     * Add CSS animations for garden windows
     */
    addFarAwayStyles() {
        if (!document.getElementById('far-away-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'far-away-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes farAwayOpen {
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
    
    addWhiteFlowersStyles() {
        if (!document.getElementById('white-flowers-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'white-flowers-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes whiteFlowersOpen {
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
    
    addRedFlowersStyles() {
        if (!document.getElementById('red-flowers-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'red-flowers-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes redFlowersOpen {
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
window.gardenWindow = new GardenWindow();
