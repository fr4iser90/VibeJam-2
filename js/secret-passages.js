/**
 * Fantasy OS - Secret Passages System
 * Handles hidden connections between rooms and discovery mechanics
 * Created: 2025-10-25T16:42:58.000Z
 */

class SecretPassages {
    constructor(roomProgression) {
        this.roomProgression = roomProgression;
        this.passages = this.initializePassages();
        this.discoveryTriggers = new Map();
        this.activePassages = new Set();
        
        // Setup discovery triggers
        this.setupDiscoveryTriggers();
        
        console.log('🚪 Secret Passages System initialized');
    }
    
    /**
     * Initialize secret passages configuration
     */
    initializePassages() {
        return {
            'living-room-to-kitchen': {
                id: 'living-room-to-kitchen',
                from: 'living-room',
                to: 'kitchen',
                name: 'Hidden Pantry Door',
                description: 'A concealed door behind the fireplace leads to the kitchen',
                discoveryMethod: 'object-interaction',
                discoveryObject: 'fireplace',
                discoveryAction: 'ignite',
                requiredLevel: 1,
                unlocked: false,
                discoveredAt: null,
                usageCount: 0
            },
            'kitchen-to-workshop': {
                id: 'kitchen-to-workshop',
                from: 'kitchen',
                to: 'workshop',
                name: 'Cauldron Portal',
                description: 'The magical cauldron creates a portal to the workshop',
                discoveryMethod: 'spell-cast',
                discoverySpell: 'brew potion',
                requiredLevel: 2,
                unlocked: false,
                discoveredAt: null,
                usageCount: 0
            },
            'bedroom-to-library': {
                id: 'bedroom-to-library',
                from: 'bedroom',
                to: 'library',
                name: 'Dream Portal',
                description: 'A mystical portal appears during rest mode',
                discoveryMethod: 'room-mastery',
                requiredMastery: 50,
                requiredLevel: 2,
                unlocked: false,
                discoveredAt: null,
                usageCount: 0
            },
            'library-to-garden': {
                id: 'library-to-garden',
                from: 'library',
                to: 'garden',
                name: 'Knowledge Gateway',
                description: 'Ancient knowledge opens a gateway to the garden',
                discoveryMethod: 'quest-completion',
                requiredQuest: 'credentials-recovery',
                requiredLevel: 3,
                unlocked: false,
                discoveredAt: null,
                usageCount: 0
            },
            'workshop-to-garden': {
                id: 'workshop-to-garden',
                from: 'workshop',
                to: 'garden',
                name: 'Craft Portal',
                description: 'Workshop tools create a portal to the garden',
                discoveryMethod: 'achievement',
                requiredAchievement: 'room-explorer',
                requiredLevel: 3,
                unlocked: false,
                discoveredAt: null,
                usageCount: 0
            }
        };
    }
    
    /**
     * Setup discovery triggers
     */
    setupDiscoveryTriggers() {
        // Object interaction triggers
        this.discoveryTriggers.set('object-interaction', (data) => {
            this.handleObjectInteractionDiscovery(data);
        });
        
        // Spell cast triggers
        this.discoveryTriggers.set('spell-cast', (data) => {
            this.handleSpellCastDiscovery(data);
        });
        
        // Room mastery triggers
        this.discoveryTriggers.set('room-mastery', (data) => {
            this.handleRoomMasteryDiscovery(data);
        });
        
        // Quest completion triggers
        this.discoveryTriggers.set('quest-completion', (data) => {
            this.handleQuestCompletionDiscovery(data);
        });
        
        // Achievement triggers
        this.discoveryTriggers.set('achievement', (data) => {
            this.handleAchievementDiscovery(data);
        });
    }
    
    /**
     * Handle object interaction discovery
     */
    handleObjectInteractionDiscovery(data) {
        const { objectType, action, roomId } = data;
        
        Object.values(this.passages).forEach(passage => {
            if (passage.discoveryMethod === 'object-interaction' &&
                passage.discoveryObject === objectType &&
                passage.discoveryAction === action &&
                passage.from === roomId &&
                !passage.unlocked) {
                
                this.discoverPassage(passage.id);
            }
        });
    }
    
    /**
     * Handle spell cast discovery
     */
    handleSpellCastDiscovery(data) {
        const { spellText, roomId } = data;
        
        Object.values(this.passages).forEach(passage => {
            if (passage.discoveryMethod === 'spell-cast' &&
                passage.discoverySpell === spellText &&
                passage.from === roomId &&
                !passage.unlocked) {
                
                this.discoverPassage(passage.id);
            }
        });
    }
    
    /**
     * Handle room mastery discovery
     */
    handleRoomMasteryDiscovery(data) {
        const { roomId, masteryPoints } = data;
        
        Object.values(this.passages).forEach(passage => {
            if (passage.discoveryMethod === 'room-mastery' &&
                passage.from === roomId &&
                masteryPoints >= passage.requiredMastery &&
                !passage.unlocked) {
                
                this.discoverPassage(passage.id);
            }
        });
    }
    
    /**
     * Handle quest completion discovery
     */
    handleQuestCompletionDiscovery(data) {
        const { questId, roomId } = data;
        
        Object.values(this.passages).forEach(passage => {
            if (passage.discoveryMethod === 'quest-completion' &&
                passage.requiredQuest === questId &&
                passage.from === roomId &&
                !passage.unlocked) {
                
                this.discoverPassage(passage.id);
            }
        });
    }
    
    /**
     * Handle achievement discovery
     */
    handleAchievementDiscovery(data) {
        const { achievementId, roomId } = data;
        
        Object.values(this.passages).forEach(passage => {
            if (passage.discoveryMethod === 'achievement' &&
                passage.requiredAchievement === achievementId &&
                passage.from === roomId &&
                !passage.unlocked) {
                
                this.discoverPassage(passage.id);
            }
        });
    }
    
    /**
     * Discover a secret passage
     */
    discoverPassage(passageId) {
        const passage = this.passages[passageId];
        if (!passage || passage.unlocked) return false;
        
        // Check if requirements are met
        if (!this.checkPassageRequirements(passage)) return false;
        
        passage.unlocked = true;
        passage.discoveredAt = new Date().toISOString();
        
        // Save to progression data
        this.savePassageData(passageId);
        
        // Show discovery notification
        this.showPassageDiscovery(passage);
        
        // Update UI
        this.updatePassageUI(passage);
        
        // Trigger discovery event
        this.triggerPassageEvent('passage-discovered', passage);
        
        console.log(`🚪 Secret passage discovered: ${passage.name}`);
        return true;
    }
    
    /**
     * Check passage requirements
     */
    checkPassageRequirements(passage) {
        // Check if both rooms are accessible
        if (!this.roomProgression.isRoomAccessible(passage.from) ||
            !this.roomProgression.isRoomAccessible(passage.to)) {
            return false;
        }
        
        // Check required level
        const fromRoomData = this.roomProgression.progressionData.rooms[passage.from];
        if (fromRoomData && fromRoomData.accessLevel < passage.requiredLevel) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Show passage discovery notification
     */
    showPassageDiscovery(passage) {
        const notification = document.createElement('div');
        notification.className = 'passage-discovery-notification';
        
        notification.innerHTML = `
            <div class="passage-icon">🚪</div>
            <div class="passage-content">
                <h3>Secret Passage Discovered!</h3>
                <p class="passage-name">${passage.name}</p>
                <p class="passage-description">${passage.description}</p>
                <div class="passage-rooms">
                    <span class="from-room">${this.getRoomDisplayName(passage.from)}</span>
                    <span class="passage-arrow">→</span>
                    <span class="to-room">${this.getRoomDisplayName(passage.to)}</span>
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #e94560;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #e94560;
            font-family: 'Cinzel', serif;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(233, 69, 96, 0.3);
            min-width: 450px;
            text-align: center;
            animation: passageDiscoveryAppear 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Play discovery sound
        this.playPassageSound('passage-discovered');
        
        // Show discovery effects
        this.showPassageDiscoveryEffects(passage);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    /**
     * Show passage discovery effects
     */
    showPassageDiscoveryEffects(passage) {
        const effectContainer = document.createElement('div');
        effectContainer.className = 'passage-discovery-effects';
        effectContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(effectContainer);
        
        // Create mystical portal effect
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'passage-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #e94560, #f27121);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: passageParticleFloat 3s ease-out forwards;
            `;
            effectContainer.appendChild(particle);
        }
        
        // Remove effects after animation
        setTimeout(() => {
            if (effectContainer.parentNode) {
                effectContainer.parentNode.removeChild(effectContainer);
            }
        }, 3000);
    }
    
    /**
     * Update passage UI
     */
    updatePassageUI(passage) {
        // Add passage indicator to room tabs
        const fromTab = document.querySelector(`[data-room="${passage.from}"]`);
        const toTab = document.querySelector(`[data-room="${passage.to}"]`);
        
        if (fromTab) {
            this.addPassageIndicator(fromTab, 'outgoing');
        }
        
        if (toTab) {
            this.addPassageIndicator(toTab, 'incoming');
        }
        
        // Add passage navigation option
        this.addPassageNavigation(passage);
    }
    
    /**
     * Add passage indicator to room tab
     */
    addPassageIndicator(roomTab, direction) {
        const indicator = document.createElement('div');
        indicator.className = `passage-indicator ${direction}`;
        indicator.innerHTML = direction === 'outgoing' ? '🚪' : '🔗';
        indicator.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            animation: passageIndicatorPulse 2s infinite;
        `;
        
        roomTab.style.position = 'relative';
        roomTab.appendChild(indicator);
    }
    
    /**
     * Add passage navigation option
     */
    addPassageNavigation(passage) {
        const fromRoom = document.getElementById(passage.from);
        if (!fromRoom) return;
        
        // Create passage button
        const passageButton = document.createElement('button');
        passageButton.className = 'passage-navigation-btn';
        passageButton.innerHTML = `
            <span class="passage-icon">🚪</span>
            <span class="passage-text">Go to ${this.getRoomDisplayName(passage.to)}</span>
        `;
        
        passageButton.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e94560 0%, #f27121 100%);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: 'Cinzel', serif;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(233, 69, 96, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        passageButton.addEventListener('click', () => {
            this.usePassage(passage.id);
        });
        
        passageButton.addEventListener('mouseenter', () => {
            passageButton.style.transform = 'scale(1.05)';
            passageButton.style.boxShadow = '0 6px 12px rgba(233, 69, 96, 0.4)';
        });
        
        passageButton.addEventListener('mouseleave', () => {
            passageButton.style.transform = 'scale(1)';
            passageButton.style.boxShadow = '0 4px 8px rgba(233, 69, 96, 0.3)';
        });
        
        fromRoom.appendChild(passageButton);
    }
    
    /**
     * Use a secret passage
     */
    usePassage(passageId) {
        const passage = this.passages[passageId];
        if (!passage || !passage.unlocked) return false;
        
        // Increment usage count
        passage.usageCount++;
        
        // Save usage data
        this.savePassageData(passageId);
        
        // Show passage transition effect
        this.showPassageTransition(passage);
        
        // Switch to destination room
        setTimeout(() => {
            if (typeof window !== 'undefined' && window.fantasyOS) {
                window.fantasyOS.switchRoom(passage.to);
            }
        }, 1000);
        
        // Trigger passage usage event
        this.triggerPassageEvent('passage-used', passage);
        
        console.log(`🚪 Using secret passage: ${passage.name}`);
        return true;
    }
    
    /**
     * Show passage transition effect
     */
    showPassageTransition(passage) {
        const transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'passage-transition-overlay';
        transitionOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(233, 69, 96, 0.8) 0%, rgba(242, 113, 33, 0.6) 50%, transparent 100%);
            z-index: 10000;
            animation: passageTransition 1s ease-in-out;
        `;
        
        document.body.appendChild(transitionOverlay);
        
        // Play transition sound
        this.playPassageSound('passage-transition');
        
        // Remove overlay after transition
        setTimeout(() => {
            if (transitionOverlay.parentNode) {
                transitionOverlay.parentNode.removeChild(transitionOverlay);
            }
        }, 1000);
    }
    
    /**
     * Get room display name
     */
    getRoomDisplayName(roomId) {
        const roomNames = {
            'living-room': 'Living Room',
            'kitchen': 'Kitchen',
            'bedroom': 'Bedroom',
            'workshop': 'Workshop',
            'library': 'Library',
            'garden': 'Garden'
        };
        return roomNames[roomId] || roomId;
    }
    
    /**
     * Play passage sound
     */
    playPassageSound(soundType) {
        if (typeof window !== 'undefined' && window.fantasyOS && window.fantasyOS.components.soundSystem) {
            const soundSystem = window.fantasyOS.components.soundSystem;
            soundSystem.play(soundType);
        }
    }
    
    /**
     * Save passage data
     */
    savePassageData(passageId) {
        const passage = this.passages[passageId];
        if (!passage) return;
        
        if (!this.roomProgression.progressionData.secretPassages) {
            this.roomProgression.progressionData.secretPassages = {};
        }
        
        this.roomProgression.progressionData.secretPassages[passageId] = {
            unlocked: passage.unlocked,
            discoveredAt: passage.discoveredAt,
            usageCount: passage.usageCount
        };
        
        this.roomProgression.saveProgressionData();
    }
    
    /**
     * Load passage data
     */
    loadPassageData() {
        if (!this.roomProgression.progressionData.secretPassages) return;
        
        Object.keys(this.passages).forEach(passageId => {
            const savedData = this.roomProgression.progressionData.secretPassages[passageId];
            if (savedData) {
                this.passages[passageId].unlocked = savedData.unlocked;
                this.passages[passageId].discoveredAt = savedData.discoveredAt;
                this.passages[passageId].usageCount = savedData.usageCount || 0;
            }
        });
    }
    
    /**
     * Trigger passage event
     */
    triggerPassageEvent(eventType, passage) {
        this.roomProgression.triggerEvent(eventType, { passage, passageId: passage.id });
    }
    
    /**
     * Get discovered passages
     */
    getDiscoveredPassages() {
        return Object.values(this.passages).filter(passage => passage.unlocked);
    }
    
    /**
     * Get passages from room
     */
    getPassagesFromRoom(roomId) {
        return Object.values(this.passages).filter(passage => 
            passage.from === roomId && passage.unlocked
        );
    }
    
    /**
     * Get passages to room
     */
    getPassagesToRoom(roomId) {
        return Object.values(this.passages).filter(passage => 
            passage.to === roomId && passage.unlocked
        );
    }
    
    /**
     * Get passage statistics
     */
    getPassageStats() {
        const stats = {
            totalPassages: Object.keys(this.passages).length,
            discoveredPassages: 0,
            totalUsage: 0,
            mostUsedPassage: null,
            maxUsage: 0
        };
        
        Object.values(this.passages).forEach(passage => {
            if (passage.unlocked) {
                stats.discoveredPassages++;
                stats.totalUsage += passage.usageCount;
                
                if (passage.usageCount > stats.maxUsage) {
                    stats.maxUsage = passage.usageCount;
                    stats.mostUsedPassage = passage.name;
                }
            }
        });
        
        return stats;
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for object interactions
        this.roomProgression.addEventHandler('object-interaction', (data) => {
            const trigger = this.discoveryTriggers.get('object-interaction');
            if (trigger) trigger(data);
        });
        
        // Listen for spell casts
        this.roomProgression.addEventHandler('spell-cast', (data) => {
            const trigger = this.discoveryTriggers.get('spell-cast');
            if (trigger) trigger(data);
        });
        
        // Listen for room mastery
        this.roomProgression.addEventHandler('room-mastered', (data) => {
            const trigger = this.discoveryTriggers.get('room-mastery');
            if (trigger) trigger(data);
        });
        
        // Listen for quest completion
        this.roomProgression.addEventHandler('quest-completed', (data) => {
            const trigger = this.discoveryTriggers.get('quest-completion');
            if (trigger) trigger(data);
        });
        
        // Listen for achievement completion
        this.roomProgression.addEventHandler('achievement-completed', (data) => {
            const trigger = this.discoveryTriggers.get('achievement');
            if (trigger) trigger(data);
        });
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecretPassages;
}
