/**
 * Book Window System for Fantasy OS
 * Shows beautiful book windows with spells and information
 */

class BookWindow {
    constructor() {
        this.isOpen = false;
    }
    
    /**
     * Show book window with portal spell
     */
    showBookWindow() {
        if (this.isOpen) return;
        
        console.log('📖 Opening book window...');
        this.isOpen = true;
        
        // Create book window overlay
        const bookWindow = document.createElement('div');
        bookWindow.className = 'book-window-overlay';
        bookWindow.style.cssText = `
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
        
        // Create book content
        const bookContent = document.createElement('div');
        bookContent.className = 'book-content';
        bookContent.style.cssText = `
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 4px solid #D4AF37;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            animation: bookOpen 0.5s ease-out;
        `;
        
        // Book title
        const bookTitle = document.createElement('h2');
        bookTitle.textContent = '📚 Ancient Spell Tome';
        bookTitle.style.cssText = `
            color: #D4AF37;
            font-family: 'MedievalSharp', cursive;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        `;
        
        // Spell content
        const spellContent = document.createElement('div');
        spellContent.innerHTML = `
            <div style="color: #F5F5DC; font-family: 'MedievalSharp', cursive; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    <strong>Chapter VII: Portal Magic</strong>
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #D4AF37;">
                    <p style="font-size: 18px; color: #D4AF37; margin: 0;">
                        <strong>Portal Opening Spell:</strong>
                    </p>
                    <p style="font-size: 20px; color: #FFD700; margin: 10px 0; font-weight: bold;">
                        "open portal to kitchen"
                    </p>
                    <p style="font-size: 14px; color: #F5F5DC; margin: 0;">
                        This ancient incantation opens a magical portal to the kitchen realm. 
                        Speak these words with conviction to unlock the passage.
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #F5F5DC;">
                    <em>Note: This spell requires the room to be properly illuminated and the caster's intent to be pure.</em>
                </p>
                
                <div style="background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #D4AF37;">
                    <p style="font-size: 14px; color: #D4AF37; margin: 0;">
                        <strong>Next Steps:</strong><br>
                        1. Cast the portal spell in the spell input<br>
                        2. The kitchen will be unlocked<br>
                        3. Continue your quest for the Hobbit's credentials
                    </p>
                </div>
            </div>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close Book';
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
            this.closeBookWindow(bookWindow);
        });
        
        // Assemble book
        bookContent.appendChild(bookTitle);
        bookContent.appendChild(spellContent);
        bookContent.appendChild(closeButton);
        bookWindow.appendChild(bookContent);
        
        // Add to page
        document.body.appendChild(bookWindow);
        
        // Add CSS animations
        this.addBookStyles();
        
        console.log('📖 Book window opened with portal spell!');
    }
    
    /**
     * Close book window
     */
    closeBookWindow(bookWindow) {
        this.isOpen = false;
        bookWindow.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (bookWindow.parentNode) {
                bookWindow.parentNode.removeChild(bookWindow);
            }
        }, 300);
    }
    
    /**
     * Add CSS animations for book window
     */
    addBookStyles() {
        if (!document.getElementById('book-window-styles')) {
            const styles = document.createElement('style');
            styles.id = 'book-window-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes bookOpen {
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
window.bookWindow = new BookWindow();
