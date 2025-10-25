/**
 * Fantasy OS - Main Application Controller
 * Main entry point for the Fantasy OS application
 * Created: 2025-10-25T12:04:17.000Z
 */

class FantasyOS {
    constructor() {
        this.version = '1.0.0';
        this.isInitialized = false;
        this.currentRoom = 'living-room';
        this.magicLevel = 100;
        this.lastSpell = '';
        
        // Component references
        this.components = {
            roomManager: null,
            objectInteraction: null,
            spellParser: null,
            gestureRecognition: null,
            particleSystem: null,
            soundSystem: null
        };
        
        // Event handlers
        this.eventHandlers = new Map();
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    /**
     * Initialize the Fantasy OS application
     */
    async init() {
        try {
            console.log('🧙‍♂️ Initializing Fantasy OS...');
            
            // Initialize core components
            await this.initializeComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize UI state
            this.initializeUI();
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('✨ Fantasy OS initialized successfully!');
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('💥 Failed to initialize Fantasy OS:', error);
            this.showErrorMessage('Failed to initialize Fantasy OS. Please refresh the page.');
        }
    }
    
    /**
     * Initialize all core components
     */
    async initializeComponents() {
        // Initialize room manager
        if (typeof RoomManager !== 'undefined') {
            this.components.roomManager = new RoomManager();
        }
        
        // Initialize object interaction
        if (typeof ObjectInteraction !== 'undefined') {
            this.components.objectInteraction = new ObjectInteraction();
        }
        
        // Initialize spell parser
        if (typeof SpellParser !== 'undefined') {
            this.components.spellParser = new SpellParser();
        }
        
        // Initialize gesture recognition
        if (typeof GestureRecognition !== 'undefined') {
            this.components.gestureRecognition = new GestureRecognition();
        }
        
        // Initialize particle system
        if (typeof ParticleSystem !== 'undefined') {
            this.components.particleSystem = new ParticleSystem();
        }
        
        // Initialize sound system
        if (typeof SoundSystem !== 'undefined') {
            this.components.soundSystem = new SoundSystem();
        }
    }
    
    /**
     * Set up event listeners for the application
     */
    setupEventListeners() {
        // Room navigation
        const roomTabs = document.querySelectorAll('.room-tab');
        roomTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleRoomChange(e));
        });
        
        // Spell casting
        const spellInput = document.getElementById('spellInput');
        const castSpellBtn = document.getElementById('castSpell');
        
        if (spellInput) {
            spellInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.castSpell();
                }
            });
        }
        
        if (castSpellBtn) {
            castSpellBtn.addEventListener('click', () => this.castSpell());
        }
        
        // Help and settings modals
        const helpBtn = document.getElementById('helpBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const closeHelp = document.getElementById('closeHelp');
        const closeSettings = document.getElementById('closeSettings');
        
        if (helpBtn) helpBtn.addEventListener('click', () => this.showHelp());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettings());
        if (closeHelp) closeHelp.addEventListener('click', () => this.hideHelp());
        if (closeSettings) closeSettings.addEventListener('click', () => this.hideSettings());
        
        // Object interactions
        const objects = document.querySelectorAll('.object');
        objects.forEach(object => {
            object.addEventListener('click', (e) => this.handleObjectClick(e));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }
    
    /**
     * Initialize UI state
     */
    initializeUI() {
        // Set initial room
        this.switchRoom(this.currentRoom);
        
        // Update status bar
        this.updateStatusBar();
        
        // Initialize particle effects
        if (this.components.particleSystem) {
            this.components.particleSystem.start();
        }
    }
    
    /**
     * Handle room change events
     */
    handleRoomChange(event) {
        const roomId = event.currentTarget.dataset.room;
        if (roomId) {
            this.switchRoom(roomId);
        }
    }
    
    /**
     * Switch to a different room
     */
    switchRoom(roomId) {
        // Update active tab
        document.querySelectorAll('.room-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-room="${roomId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Update room content
        document.querySelectorAll('.room').forEach(room => {
            room.classList.remove('active');
        });
        
        const targetRoom = document.getElementById(roomId);
        if (targetRoom) {
            targetRoom.classList.add('active');
        }
        
        // Update current room
        this.currentRoom = roomId;
        
        // Update status bar
        this.updateStatusBar();
        
        // Play room change sound
        if (this.components.soundSystem) {
            this.components.soundSystem.playRoomChange();
        }
        
        console.log(`🏠 Switched to room: ${roomId}`);
    }
    
    /**
     * Handle object click events
     */
    handleObjectClick(event) {
        const objectType = event.currentTarget.dataset.object;
        console.log(`🎯 Object clicked: ${objectType}`);
        
        // Trigger object-specific behavior
        if (this.components.objectInteraction) {
            this.components.objectInteraction.handleObjectClick(objectType);
        }
    }
    
    /**
     * Cast a spell from the input field
     */
    castSpell() {
        const spellInput = document.getElementById('spellInput');
        if (!spellInput) return;
        
        const spellText = spellInput.value.trim();
        if (!spellText) return;
        
        console.log(`🔮 Casting spell: ${spellText}`);
        
        // Parse and execute spell
        if (this.components.spellParser) {
            const result = this.components.spellParser.parseSpell(spellText);
            this.handleSpellResult(result);
        }
        
        // Update last spell
        this.lastSpell = spellText;
        
        // Clear input
        spellInput.value = '';
        
        // Update status bar
        this.updateStatusBar();
        
        // Play spell sound
        if (this.components.soundSystem) {
            this.components.soundSystem.playSpellCast();
        }
    }
    
    /**
     * Handle spell execution result
     */
    handleSpellResult(result) {
        if (result.success) {
            console.log(`✨ Spell successful: ${result.message}`);
            this.showSpellEffect(result.effect);
        } else {
            console.log(`💥 Spell failed: ${result.message}`);
            this.showSpellError(result.message);
        }
    }
    
    /**
     * Show spell effect
     */
    showSpellEffect(effect) {
        // Create temporary effect element
        const effectElement = document.createElement('div');
        effectElement.className = 'spell-effect';
        effectElement.textContent = effect;
        effectElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--magic-purple);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: 'MedievalSharp', cursive;
            font-size: 18px;
            z-index: 3000;
            animation: spellEffect 2s ease-out forwards;
        `;
        
        document.body.appendChild(effectElement);
        
        // Remove after animation
        setTimeout(() => {
            if (effectElement.parentNode) {
                effectElement.parentNode.removeChild(effectElement);
            }
        }, 2000);
    }
    
    /**
     * Show spell error
     */
    showSpellError(message) {
        this.showSpellEffect(`❌ ${message}`);
    }
    
    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Escape key closes modals
        if (event.key === 'Escape') {
            this.hideHelp();
            this.hideSettings();
        }
        
        // Ctrl+H opens help
        if (event.ctrlKey && event.key === 'h') {
            event.preventDefault();
            this.showHelp();
        }
        
        // Ctrl+S opens settings
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.showSettings();
        }
    }
    
    /**
     * Show help modal
     */
    showHelp() {
        const helpModal = document.getElementById('helpModal');
        if (helpModal) {
            helpModal.classList.add('active');
        }
    }
    
    /**
     * Hide help modal
     */
    hideHelp() {
        const helpModal = document.getElementById('helpModal');
        if (helpModal) {
            helpModal.classList.remove('active');
        }
    }
    
    /**
     * Show settings modal
     */
    showSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.classList.add('active');
        }
    }
    
    /**
     * Hide settings modal
     */
    hideSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.classList.remove('active');
        }
    }
    
    /**
     * Update status bar information
     */
    updateStatusBar() {
        const currentRoomElement = document.querySelector('.current-room');
        const magicLevelElement = document.querySelector('.magic-level');
        const lastSpellElement = document.querySelector('.last-spell');
        
        if (currentRoomElement) {
            const roomNames = {
                'living-room': 'Wohnzimmer',
                'kitchen': 'Küche',
                'bedroom': 'Schlafzimmer',
                'workshop': 'Werkstatt',
                'library': 'Bibliothek',
                'garden': 'Garten'
            };
            currentRoomElement.textContent = roomNames[this.currentRoom] || this.currentRoom;
        }
        
        if (magicLevelElement) {
            magicLevelElement.textContent = `Magie: ${this.magicLevel}%`;
        }
        
        if (lastSpellElement) {
            lastSpellElement.textContent = `Letzter Zauberspruch: ${this.lastSpell || '-'}`;
        }
    }
    
    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        console.log('🎉 Welcome to Fantasy OS!');
        console.log('📖 Use Ctrl+H for help, Ctrl+S for settings');
        console.log('🔮 Type spells in the spell input to cast magic');
        console.log('🏠 Click room tabs to navigate between rooms');
        console.log('🎯 Click objects to interact with them');
    }
    
    /**
     * Show error message
     */
    showErrorMessage(message) {
        console.error('💥 Error:', message);
        // Could implement a toast notification system here
    }
    
    /**
     * Get application version
     */
    getVersion() {
        return this.version;
    }
    
    /**
     * Get current room
     */
    getCurrentRoom() {
        return this.currentRoom;
    }
    
    /**
     * Get magic level
     */
    getMagicLevel() {
        return this.magicLevel;
    }
    
    /**
     * Set magic level
     */
    setMagicLevel(level) {
        this.magicLevel = Math.max(0, Math.min(100, level));
        this.updateStatusBar();
    }
}

// Initialize Fantasy OS when script loads
const fantasyOS = new FantasyOS();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FantasyOS;
}
