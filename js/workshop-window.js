/**
 * Workshop Window System for Fantasy OS
 * Shows beautiful workshop windows with crafting tools and recipes
 */

class WorkshopWindow {
    constructor() {
        this.isOpen = false;
    }
    
    /**
     * Show hammer window with magical properties
     */
    showHammerWindow() {
        if (this.isOpen) return;
        
        console.log('🔨 Opening hammer window...');
        this.isOpen = true;
        
        // Create hammer window overlay
        const hammerWindow = document.createElement('div');
        hammerWindow.className = 'hammer-window-overlay';
        hammerWindow.style.cssText = `
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
        
        // Create hammer content
        const hammerContent = document.createElement('div');
        hammerContent.className = 'hammer-content';
        hammerContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: hammerOpen 0.5s ease-out;
        `;
        
        // Hammer title
        const hammerTitle = document.createElement('h2');
        hammerTitle.textContent = '🔨 Enchanted Hammer';
        hammerTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Hammer content
        const hammerInfo = document.createElement('div');
        hammerInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Magical Properties:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Enchanted Hammer Features:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>✨ Self-sharpening blade</li>
                        <li>🔥 Fire-resistant handle</li>
                        <li>⚡ Lightning-fast strikes</li>
                        <li>💎 Diamond-hard head</li>
                        <li>🌿 Nature-infused wood</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Crafting Abilities:</strong><br>
                        • Forge magical weapons<br>
                        • Repair enchanted items<br>
                        • Create protective armor<br>
                        • Enhance existing tools<br>
                        • Channel elemental magic
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>This hammer has been blessed by the ancient smiths and can channel magical energy into any crafted item.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Hammer';
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
            this.closeHammerWindow(hammerWindow);
        });
        
        // Assemble hammer
        hammerContent.appendChild(hammerTitle);
        hammerContent.appendChild(hammerInfo);
        hammerContent.appendChild(closeButton);
        hammerWindow.appendChild(hammerContent);
        
        // Add to page
        document.body.appendChild(hammerWindow);
        
        // Add CSS animations
        this.addHammerStyles();
        
        console.log('🔨 Hammer window opened!');
    }
    
    /**
     * Show workbench window with crafting recipes
     */
    showWorkbenchWindow() {
        if (this.isOpen) return;
        
        console.log('🔧 Opening workbench window...');
        this.isOpen = true;
        
        // Create workbench window overlay
        const workbenchWindow = document.createElement('div');
        workbenchWindow.className = 'workbench-window-overlay';
        workbenchWindow.style.cssText = `
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
        
        // Create workbench content
        const workbenchContent = document.createElement('div');
        workbenchContent.className = 'workbench-content';
        workbenchContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: workbenchOpen 0.5s ease-out;
        `;
        
        // Workbench title
        const workbenchTitle = document.createElement('h2');
        workbenchTitle.textContent = '🔧 Magical Workbench';
        workbenchTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Workbench content
        const workbenchInfo = document.createElement('div');
        workbenchInfo.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Crafting Recipes:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Available Crafting Recipes:</strong>
                    </p>
                    <ul style="font-size: 14px; color: #F5F5DC; margin: 10px 0; padding-left: 20px;">
                        <li>⚔️ Enchanted Sword (Iron + Magic Crystal)</li>
                        <li>🛡️ Protective Shield (Oak Wood + Silver)</li>
                        <li>🏹 Magical Bow (Elven Wood + Feather)</li>
                        <li>💍 Power Ring (Gold + Gemstone)</li>
                        <li>🔮 Crystal Orb (Glass + Stardust)</li>
                    </ul>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Library Portal Unlocked!</strong><br>
                        The workbench has revealed the library portal spell:<br>
                        <strong style="color: #FFD700;">"open portal to library"</strong>
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>This workbench is imbued with ancient crafting magic and can create items of incredible power.</em>
                </p>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Workbench';
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
            this.closeWorkbenchWindow(workbenchWindow);
        });
        
        // Assemble workbench
        workbenchContent.appendChild(workbenchTitle);
        workbenchContent.appendChild(workbenchInfo);
        workbenchContent.appendChild(closeButton);
        workbenchWindow.appendChild(workbenchContent);
        
        // Add to page
        document.body.appendChild(workbenchWindow);
        
        // Add CSS animations
        this.addWorkbenchStyles();
        
        console.log('🔧 Workbench window opened!');
    }
    
    /**
     * Close hammer window
     */
    closeHammerWindow(hammerWindow) {
        this.isOpen = false;
        hammerWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (hammerWindow.parentNode) {
                hammerWindow.parentNode.removeChild(hammerWindow);
            }
        }, 300);
    }
    
    /**
     * Close workbench window
     */
    closeWorkbenchWindow(workbenchWindow) {
        this.isOpen = false;
        workbenchWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (workbenchWindow.parentNode) {
                workbenchWindow.parentNode.removeChild(workbenchWindow);
            }
        }, 300);
    }
    
    /**
     * Add CSS animations for workshop windows
     */
    addHammerStyles() {
        if (!document.getElementById('hammer-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'hammer-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes hammerOpen {
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
    
    addWorkbenchStyles() {
        if (!document.getElementById('workbench-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'workbench-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes workbenchOpen {
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
window.workshopWindow = new WorkshopWindow();
