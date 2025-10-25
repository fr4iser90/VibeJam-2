/**
 * Vase Window System for Fantasy OS
 * Shows beautiful vase examination window with credentials discovery
 */

class VaseWindow {
    constructor() {
        this.isOpen = false;
    }
    
    /**
     * Show vase window with credentials discovery
     */
    showVaseWindow() {
        if (this.isOpen) return;
        
        console.log('🏺 Opening vase examination window...');
        this.isOpen = true;
        
        // Create vase window overlay
        const vaseWindow = document.createElement('div');
        vaseWindow.className = 'vase-window-overlay';
        vaseWindow.style.cssText = `
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
        
        // Create vase content
        const vaseContent = document.createElement('div');
        vaseContent.className = 'vase-content';
        vaseContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: vaseOpen 0.5s ease-out;
        `;
        
        // Vase title
        const vaseTitle = document.createElement('h2');
        vaseTitle.textContent = '🏺 Ancient Vase Examination';
        vaseTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Vase content
        const vaseText = document.createElement('div');
        vaseText.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Examination Results:</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>🎉 CREDENTIALS FOUND!</strong>
                    </p>
                    <p style="font-size: 16px; color: #FFD700; margin: 10px 0; font-weight: bold;">
                        The Hobbit's Fantasy OS credentials are hidden inside this ancient vase!
                    </p>
                    <p style="font-size: 14px; color: #F5F5DC; margin: 0;">
                        The magical access keys have been restored. The Hobbit can now access all magical systems again!
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>Note: The vase contains powerful magical energy that was preserving the credentials.</em>
                </p>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Quest Complete:</strong><br>
                        ✅ Credentials Recovery Quest completed<br>
                        ✅ Kitchen portal now accessible<br>
                        ✅ Fantasy OS fully restored
                    </p>
                </div>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Examination';
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
            this.closeVaseWindow(vaseWindow);
        });
        
        // Assemble vase
        vaseContent.appendChild(vaseTitle);
        vaseContent.appendChild(vaseText);
        vaseContent.appendChild(closeButton);
        vaseWindow.appendChild(vaseContent);
        
        // Add to page
        document.body.appendChild(vaseWindow);
        
        // Add CSS animations
        this.addVaseStyles();
        
        console.log('🏺 Vase examination window opened with credentials discovery!');
    }
    
    /**
     * Close vase window
     */
    closeVaseWindow(vaseWindow) {
        this.isOpen = false;
        vaseWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (vaseWindow.parentNode) {
                vaseWindow.parentNode.removeChild(vaseWindow);
            }
        }, 300);
    }
    
    /**
     * Add CSS animations for vase window
     */
    addVaseStyles() {
        if (!document.getElementById('vase-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'vase-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes vaseOpen {
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
window.vaseWindow = new VaseWindow();
