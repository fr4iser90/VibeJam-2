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
            roomObjectOverlay: null,
            spellParser: null,
            gestureRecognition: null,
            particleSystem: null,
            soundSystem: null,
            questManager: null,
            achievementSystem: null
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
        
        // Initialize room object overlay
        if (typeof RoomObjectOverlay !== 'undefined') {
            this.components.roomObjectOverlay = new RoomObjectOverlay();
            console.log('🎯 Room Object Overlay System initialized');
            
            // Make it globally available for debugging
            window.roomObjectOverlay = this.components.roomObjectOverlay;
        }
        
        // Initialize spell parser
        if (typeof SpellParser !== 'undefined') {
            this.components.spellParser = new SpellParser();
        }
        
        // Initialize gesture recognition
        if (typeof GestureRecognition !== 'undefined') {
            this.components.gestureRecognition = new GestureRecognition();
            this.components.gestureRecognition.init();
        }
        
        // Initialize particle system
        if (typeof ParticleSystem !== 'undefined') {
            this.components.particleSystem = new ParticleSystem();
        }
        
        // Initialize sound system
        if (typeof SoundSystem !== 'undefined') {
            this.components.soundSystem = new SoundSystem();
        }
        
        // Initialize quest manager
        if (typeof QuestManager !== 'undefined') {
            this.components.questManager = new QuestManager();
            console.log('🎯 Quest Manager System initialized');
        }
        
        // Initialize achievement system
        if (typeof AchievementSystem !== 'undefined') {
            this.components.achievementSystem = new AchievementSystem();
            console.log('🏆 Achievement System initialized');
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
        const questBtn = document.getElementById('questBtn');
        const achievementBtn = document.getElementById('achievementBtn');
        const closeHelp = document.getElementById('closeHelp');
        const closeSettings = document.getElementById('closeSettings');
        
        if (helpBtn) helpBtn.addEventListener('click', () => this.showHelp());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettings());
        if (questBtn) questBtn.addEventListener('click', () => this.showQuestSystem());
        if (achievementBtn) achievementBtn.addEventListener('click', () => this.showAchievementSystem());
        if (closeHelp) closeHelp.addEventListener('click', () => this.hideHelp());
        if (closeSettings) closeSettings.addEventListener('click', () => this.hideSettings());
        
        // Object interactions are now handled by RoomObjectOverlay system
        // No need for individual object event listeners
        
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
        
        // Initialize gesture recognition for all rooms
        if (this.components.gestureRecognition) {
            this.initializeGestureRecognition();
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
        
        // Update room backgrounds based on lighting state
        if (this.components.roomObjectOverlay) {
            this.components.roomObjectOverlay.updateRoomBackgrounds();
        }
        
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
            this.hideQuestSystem();
            this.hideAchievementSystem();
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
        
        // Ctrl+Q opens quest system
        if (event.ctrlKey && event.key === 'q') {
            event.preventDefault();
            this.showQuestSystem();
        }
        
        // Ctrl+A opens achievement system
        if (event.ctrlKey && event.key === 'a') {
            event.preventDefault();
            this.showAchievementSystem();
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
     * Show quest system
     */
    showQuestSystem() {
        const questSystem = document.getElementById('quest-system');
        if (questSystem) {
            questSystem.style.display = questSystem.style.display === 'none' ? 'block' : 'none';
            
            // Update quest progress when showing
            if (questSystem.style.display === 'block' && this.components.questManager) {
                this.components.questManager.updateQuestProgressUI();
            }
        }
    }
    
    /**
     * Show achievement system
     */
    showAchievementSystem() {
        const achievementSystem = document.getElementById('achievement-system');
        if (achievementSystem) {
            achievementSystem.style.display = achievementSystem.style.display === 'none' ? 'block' : 'none';
            
            // Update achievement progress when showing
            if (achievementSystem.style.display === 'block' && this.components.achievementSystem) {
                this.components.achievementSystem.updateAchievementProgressUI();
            }
        }
    }
    
    /**
     * Hide quest system
     */
    hideQuestSystem() {
        const questSystem = document.getElementById('quest-system');
        if (questSystem) {
            questSystem.style.display = 'none';
        }
    }
    
    /**
     * Hide achievement system
     */
    hideAchievementSystem() {
        const achievementSystem = document.getElementById('achievement-system');
        if (achievementSystem) {
            achievementSystem.style.display = 'none';
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
                'living-room': 'Living Room',
                'kitchen': 'Kitchen',
                'bedroom': 'Bedroom',
                'workshop': 'Workshop',
                'library': 'Library',
                'garden': 'Garden'
            };
            currentRoomElement.textContent = roomNames[this.currentRoom] || this.currentRoom;
        }
        
        if (magicLevelElement) {
            magicLevelElement.textContent = `Magie: ${this.magicLevel}%`;
        }
        
        if (lastSpellElement) {
            lastSpellElement.textContent = `Last Spell: ${this.lastSpell || '-'}`;
        }
    }
    
    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        console.log('🎉 Welcome to Fantasy OS!');
        console.log('📖 Use Ctrl+H for help, Ctrl+S for settings');
        console.log('🎯 Use Ctrl+Q for quests, Ctrl+A for achievements');
        console.log('🔮 Type spells in the spell input to cast magic');
        console.log('🏠 Click room tabs to navigate between rooms');
        console.log('🎯 Click objects to interact with them');
        
        // Start the first quest automatically
        if (this.components.questManager) {
            setTimeout(() => {
                this.startQuest('credentials-recovery');
            }, 2000);
        }
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
    
    /**
     * Initialize gesture recognition for all rooms
     */
    initializeGestureRecognition() {
        // Initialize the main gesture canvas
        if (this.components.gestureRecognition) {
            this.components.gestureRecognition.init();
            console.log('🎨 Global gesture recognition initialized');
        }
    }
    
    /**
     * Get gesture recognition statistics
     */
    getGestureStats() {
        if (this.components.gestureRecognition) {
            return this.components.gestureRecognition.getGestureStats();
        }
        return null;
    }
    
    /**
     * Enable/disable gesture recognition
     */
    setGestureRecognitionEnabled(enabled) {
        if (this.components.gestureRecognition) {
            this.components.gestureRecognition.setEnabled(enabled);
        }
    }
    
    /**
     * Add custom gesture pattern
     */
    addCustomGesturePattern(type, pattern) {
        if (this.components.gestureRecognition) {
            this.components.gestureRecognition.addCustomPattern(type, pattern);
        }
    }
    
    /**
     * Export gesture data
     */
    exportGestureData() {
        if (this.components.gestureRecognition) {
            return this.components.gestureRecognition.exportData();
        }
        return null;
    }
    
    /**
     * Import gesture data
     */
    importGestureData(data) {
        if (this.components.gestureRecognition) {
            this.components.gestureRecognition.importData(data);
        }
    }
    
    /**
     * Reset gesture system
     */
    resetGestureSystem() {
        if (this.components.gestureRecognition) {
            this.components.gestureRecognition.reset();
        }
    }
    
    /**
     * Get quest manager
     */
    getQuestManager() {
        return this.components.questManager;
    }
    
    /**
     * Get achievement system
     */
    getAchievementSystem() {
        return this.components.achievementSystem;
    }
    
    /**
     * Start a quest
     */
    startQuest(questId) {
        if (this.components.questManager) {
            return this.components.questManager.startQuest(questId);
        }
        return false;
    }
    
    /**
     * Update quest progress
     */
    updateQuestProgress(questId, stepId) {
        if (this.components.questManager) {
            return this.components.questManager.updateQuestProgress(questId, stepId);
        }
        return false;
    }
    
    /**
     * Check achievement progress
     */
    checkAchievementProgress(achievementId, action, data = {}) {
        if (this.components.achievementSystem) {
            return this.components.achievementSystem.checkAchievementProgress(achievementId, action, data);
        }
        return false;
    }
    
    /**
     * Get quest information
     */
    getQuestInfo(questId) {
        if (this.components.questManager) {
            return this.components.questManager.getQuestInfo(questId);
        }
        return null;
    }
    
    /**
     * Get achievement information
     */
    getAchievementInfo(achievementId) {
        if (this.components.achievementSystem) {
            return this.components.achievementSystem.getAchievementInfo(achievementId);
        }
        return null;
    }
    
    /**
     * Get active quests
     */
    getActiveQuests() {
        if (this.components.questManager) {
            return this.components.questManager.getActiveQuests();
        }
        return [];
    }
    
    /**
     * Get completed quests
     */
    getCompletedQuests() {
        if (this.components.questManager) {
            return this.components.questManager.getCompletedQuests();
        }
        return [];
    }
    
    /**
     * Get completed achievements
     */
    getCompletedAchievements() {
        if (this.components.achievementSystem) {
            return this.components.achievementSystem.getCompletedAchievements();
        }
        return [];
    }
    
    /**
     * Reset quest system
     */
    resetQuestSystem() {
        if (this.components.questManager) {
            this.components.questManager.resetQuestSystem();
        }
    }
    
    /**
     * Reset achievement system
     */
    resetAchievementSystem() {
        if (this.components.achievementSystem) {
            this.components.achievementSystem.resetAchievementSystem();
        }
    }
}

// Hobbit Companion Functions are now defined in index.html

// Initialize Fantasy OS when script loads
const fantasyOS = new FantasyOS();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FantasyOS;
}
