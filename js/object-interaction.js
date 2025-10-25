/**
 * Fantasy OS - Object Interaction System
 * Handles interactions with fantasy objects in rooms
 * Created: 2025-10-25T12:04:17.000Z
 */

class ObjectInteraction {
    constructor() {
        this.objects = {
            fireplace: {
                name: 'Kamin',
                description: 'Fireplace - Brightness/Energy',
                action: 'ignite',
                effects: ['fire', 'warmth', 'light'],
                sound: 'fireplace',
                animation: 'fireFlicker'
            },
            lamp: {
                name: 'Lampe',
                description: 'Lamp - Lighting',
                action: 'illuminate',
                effects: ['light', 'warmth'],
                sound: 'lamp',
                animation: 'lightGlow'
            },
            chest: {
                name: 'Chest',
                description: 'Chest - Store files',
                action: 'open',
                effects: ['storage', 'treasure'],
                sound: 'chest',
                animation: 'treasureSparkle'
            },
            'crystal-ball': {
                name: 'Crystal Ball',
                description: 'Crystal Ball - Monitor/Display',
                action: 'gaze',
                effects: ['vision', 'magic', 'display'],
                sound: 'crystal',
                animation: 'magicPulse'
            },
            'spell-book': {
                name: 'Spell Book',
                description: 'Spell Book - Help/Documentation',
                action: 'read',
                effects: ['knowledge', 'help', 'magic'],
                sound: 'book',
                animation: 'bookGlow'
            },
            cauldron: {
                name: 'Cauldron',
                description: 'Cauldron - Downloads/Processing',
                action: 'brew',
                effects: ['brewing', 'processing', 'magic'],
                sound: 'cauldron',
                animation: 'brewBubble'
            }
        };
        
        this.activeObjects = new Set();
        this.interactionHistory = [];
        this.maxHistorySize = 20;
    }
    
    /**
     * Handle object click event
     */
    handleObjectClick(objectType) {
        const object = this.objects[objectType];
        if (!object) {
            console.warn(`Object ${objectType} not found`);
            return false;
        }
        
        console.log(`🎯 Interacting with ${object.name}`);
        
        // Add to interaction history
        this.addToHistory(objectType, 'click');
        
        // Execute object action
        this.executeObjectAction(objectType);
        
        // Play interaction sound
        this.playObjectSound(objectType);
        
        // Trigger object animation
        this.triggerObjectAnimation(objectType);
        
        // Show interaction feedback
        this.showInteractionFeedback(objectType);
        
        // Check quest progress
        this.checkQuestProgress(objectType);
        
        // Check achievement progress
        this.checkAchievementProgress(objectType);
        
        return true;
    }
    
    /**
     * Execute the action for an object
     */
    executeObjectAction(objectType) {
        const object = this.objects[objectType];
        if (!object) return;
        
        switch (object.action) {
            case 'ignite':
                this.igniteFireplace();
                break;
            case 'illuminate':
                this.illuminateLamp();
                break;
            case 'open':
                this.openChest();
                break;
            case 'gaze':
                this.gazeIntoCrystalBall();
                break;
            case 'read':
                this.readSpellBook();
                break;
            case 'brew':
                this.brewInCauldron();
                break;
            default:
                console.log(`Unknown action: ${object.action}`);
        }
    }
    
    /**
     * Ignite fireplace action
     */
    igniteFireplace() {
        const fireplace = document.querySelector('.fireplace');
        if (fireplace) {
            fireplace.classList.toggle('active');
            const isActive = fireplace.classList.contains('active');
            
            if (isActive) {
                console.log('🔥 Fireplace ignited!');
                this.showMessage('Fireplace ignited! Warmth spreads through the room.');
            } else {
                console.log('❄️ Fireplace extinguished');
                this.showMessage('Fireplace extinguished. The room grows colder.');
            }
        }
    }
    
    /**
     * Illuminate lamp action
     */
    illuminateLamp() {
        const lamp = document.querySelector('.lamp');
        if (lamp) {
            lamp.classList.toggle('active');
            const isActive = lamp.classList.contains('active');
            
            if (isActive) {
                console.log('💡 Lamp illuminated!');
                this.showMessage('Lamp illuminated! The room is filled with warm light.');
            } else {
                console.log('🌙 Lamp dimmed');
                this.showMessage('Lamp dimmed. Shadows dance in the corners.');
            }
        }
    }
    
    /**
     * Open chest action
     */
    openChest() {
        const chest = document.querySelector('.chest');
        if (chest) {
            chest.classList.toggle('active');
            const isActive = chest.classList.contains('active');
            
            if (isActive) {
                console.log('📦 Chest opened!');
                this.showMessage('Chest opened! You can now store and retrieve files.');
                this.showFileManager();
            } else {
                console.log('🔒 Chest closed');
                this.showMessage('Chest closed. Your files are safely stored.');
            }
        }
    }
    
    /**
     * Gaze into crystal ball action
     */
    gazeIntoCrystalBall() {
        console.log('🔮 Gazing into crystal ball...');
        this.showMessage('The crystal ball shows visions of the digital realm...');
        
        // Show crystal ball interface
        this.showCrystalBallInterface();
    }
    
    /**
     * Read spell book action
     */
    readSpellBook() {
        console.log('📖 Reading spell book...');
        this.showMessage('Ancient knowledge flows through your mind...');
        
        // Show help modal
        const helpModal = document.getElementById('helpModal');
        if (helpModal) {
            helpModal.classList.add('active');
        }
    }
    
    /**
     * Brew in cauldron action
     */
    brewInCauldron() {
        const cauldron = document.querySelector('.cauldron');
        if (cauldron) {
            cauldron.classList.toggle('active');
            const isActive = cauldron.classList.contains('active');
            
            if (isActive) {
                console.log('🧪 Cauldron brewing!');
                this.showMessage('Cauldron bubbling! Processing downloads...');
                this.showDownloadManager();
            } else {
                console.log('⏹️ Cauldron stopped');
                this.showMessage('Cauldron stopped. Downloads paused.');
            }
        }
    }
    
    /**
     * Play object-specific sound
     */
    playObjectSound(objectType) {
        const object = this.objects[objectType];
        if (!object || !object.sound) return;
        
        if (typeof FantasySounds !== 'undefined') {
            FantasySounds.play(object.sound);
        }
    }
    
    /**
     * Trigger object-specific animation
     */
    triggerObjectAnimation(objectType) {
        const object = this.objects[objectType];
        if (!object || !object.animation) return;
        
        const objectElement = document.querySelector(`.${objectType.replace('-', '.')}`);
        if (!objectElement) return;
        
        if (typeof FantasyAnimations !== 'undefined') {
            FantasyAnimations.applyAnimation(objectElement, object.animation);
        }
    }
    
    /**
     * Show interaction feedback message
     */
    showInteractionFeedback(objectType) {
        const object = this.objects[objectType];
        if (!object) return;
        
        const message = `Interacting with ${object.name}: ${object.description}`;
        this.showMessage(message);
    }
    
    /**
     * Show a message to the user
     */
    showMessage(message, duration = 3000) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = 'interaction-message';
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--magic-purple);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-family: 'MedievalSharp', cursive;
            font-size: 14px;
            z-index: 3000;
            max-width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageElement);
        
        // Remove after duration
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 300);
            }
        }, duration);
    }
    
    /**
     * Show file manager interface
     */
    showFileManager() {
        // This would integrate with a file management system
        console.log('📁 File manager opened');
        this.showMessage('File manager interface would open here');
    }
    
    /**
     * Show crystal ball interface
     */
    showCrystalBallInterface() {
        // This would show a monitor/display interface
        console.log('🖥️ Crystal ball interface opened');
        this.showMessage('Crystal ball display interface would open here');
    }
    
    /**
     * Show download manager interface
     */
    showDownloadManager() {
        // This would show download progress and management
        console.log('⬇️ Download manager opened');
        this.showMessage('Download manager interface would open here');
    }
    
    /**
     * Add interaction to history
     */
    addToHistory(objectType, action) {
        const interaction = {
            objectType,
            action,
            timestamp: new Date().toISOString(),
            room: this.getCurrentRoom()
        };
        
        this.interactionHistory.unshift(interaction);
        
        // Limit history size
        if (this.interactionHistory.length > this.maxHistorySize) {
            this.interactionHistory = this.interactionHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get current room (helper method)
     */
    getCurrentRoom() {
        // This would integrate with RoomManager
        const activeTab = document.querySelector('.room-tab.active');
        return activeTab ? activeTab.dataset.room : 'unknown';
    }
    
    /**
     * Get interaction history
     */
    getInteractionHistory() {
        return [...this.interactionHistory];
    }
    
    /**
     * Get object information
     */
    getObjectInfo(objectType) {
        return this.objects[objectType] ? { ...this.objects[objectType] } : null;
    }
    
    /**
     * Get all available objects
     */
    getAllObjects() {
        return Object.keys(this.objects).map(type => ({
            type,
            ...this.objects[type]
        }));
    }
    
    /**
     * Check if object is active
     */
    isObjectActive(objectType) {
        const objectElement = document.querySelector(`.${objectType.replace('-', '.')}`);
        return objectElement ? objectElement.classList.contains('active') : false;
    }
    
    /**
     * Set object active state
     */
    setObjectActive(objectType, active) {
        const objectElement = document.querySelector(`.${objectType.replace('-', '.')}`);
        if (objectElement) {
            if (active) {
                objectElement.classList.add('active');
            } else {
                objectElement.classList.remove('active');
            }
        }
    }
    
    /**
     * Check quest progress based on object interaction
     */
    checkQuestProgress(objectType) {
        // Get current room
        const currentRoom = this.getCurrentRoom();
        
        // Check if FantasyOS quest manager is available
        if (typeof window.fantasyOS !== 'undefined' && window.fantasyOS.components.questManager) {
            const questManager = window.fantasyOS.components.questManager;
            
            // Check active quests for progress
            const activeQuests = questManager.getActiveQuests();
            
            activeQuests.forEach(questId => {
                const quest = questManager.getQuestInfo(questId);
                if (quest && quest.steps) {
                    // Find steps that match this object interaction
                    quest.steps.forEach(step => {
                        if (step.room === currentRoom && step.triggers && step.triggers.includes(`${objectType}-interaction`)) {
                            if (!step.completed) {
                                questManager.updateQuestProgress(questId, step.id);
                            }
                        }
                    });
                }
            });
        }
    }
    
    /**
     * Check achievement progress based on object interaction
     */
    checkAchievementProgress(objectType) {
        // Check if FantasyOS achievement system is available
        if (typeof window.fantasyOS !== 'undefined' && window.fantasyOS.components.achievementSystem) {
            const achievementSystem = window.fantasyOS.components.achievementSystem;
            
            // Check for room explorer achievement
            achievementSystem.checkAchievementProgress('room-explorer', 'visit-rooms', {
                roomVisited: true
            });
            
            // Check for object interaction achievements
            achievementSystem.checkAchievementProgress('object-master', 'interact-objects', {
                objectInteracted: objectType
            });
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ObjectInteraction;
}
