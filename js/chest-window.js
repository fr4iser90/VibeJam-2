/**
 * Chest Window System for Fantasy OS
 * Shows beautiful chest window with magical recipes and workshop portal spell
 */

class ChestWindow {
    constructor() {
        this.isOpen = false;
    }
    
    /**
     * Show chest window with workshop portal spell
     */
    showChestWindow() {
        if (this.isOpen) return;
        
        console.log('📦 Opening chest window...');
        this.isOpen = true;
        
        // Create chest window overlay
        const chestWindow = document.createElement('div');
        chestWindow.className = 'chest-window-overlay';
        chestWindow.style.cssText = `
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
        
        // Create chest content
        const chestContent = document.createElement('div');
        chestContent.className = 'chest-content';
        chestContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: chestOpen 0.5s ease-out;
        `;
        
        // Chest title
        const chestTitle = document.createElement('h2');
        chestTitle.textContent = '📦 Magical Recipe Chest';
        chestTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Recipe content
        const recipeContent = document.createElement('div');
        recipeContent.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Chapter XII: Workshop Portal Magic</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Workshop Portal Opening Spell:</strong>
                    </p>
                    <p style="font-size: 20px; color: #FFD700; margin: 10px 0; font-weight: bold;">
                        "open portal to workshop"
                    </p>
                    <p style="font-size: 14px; color: #F5F5DC; margin: 0;">
                        This powerful incantation opens a magical portal to the workshop realm. 
                        The chest contains ancient recipes that unlock the crafting dimension.
                    </p>
                </div>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Magical Recipes Found:</strong><br>
                        ✨ Enchanted Tool Crafting<br>
                        🔥 Fire-forged Weapons<br>
                        ⚡ Lightning-fast Repairs<br>
                        🌿 Nature-infused Materials<br>
                        💎 Crystal Enhancement Rituals
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>Note: These recipes require the workshop to be unlocked and the caster's crafting knowledge to be sufficient.</em>
                </p>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Next Steps:</strong><br>
                        1. Cast the workshop portal spell in the spell input<br>
                        2. The workshop will be unlocked<br>
                        3. Use the crafting recipes to help the Hobbit<br>
                        4. Continue your quest for the Fantasy OS credentials
                    </p>
                </div>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Chest';
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
            this.closeChestWindow(chestWindow);
        });
        
        // Assemble chest
        chestContent.appendChild(chestTitle);
        chestContent.appendChild(recipeContent);
        chestContent.appendChild(closeButton);
        chestWindow.appendChild(chestContent);
        
        // Add to page
        document.body.appendChild(chestWindow);
        
        // Add CSS animations
        this.addChestStyles();
        
        console.log('📦 Chest window opened with workshop portal spell!');
    }
    
    /**
     * Close chest window
     */
    closeChestWindow(chestWindow) {
        this.isOpen = false;
        chestWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (chestWindow.parentNode) {
                chestWindow.parentNode.removeChild(chestWindow);
            }
        }, 300);
    }
    
    /**
     * Add CSS animations for chest window
     */
    addChestStyles() {
        if (!document.getElementById('chest-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'chest-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes chestOpen {
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
window.chestWindow = new ChestWindow();
