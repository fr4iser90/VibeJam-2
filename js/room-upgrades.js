/**
 * Fantasy OS - Room Upgrades System
 * Handles room enhancement and customization mechanics
 * Created: 2025-10-25T16:42:58.000Z
 */

class RoomUpgrades {
    constructor(roomProgression) {
        this.roomProgression = roomProgression;
        this.upgrades = this.initializeUpgrades();
        this.artifacts = this.initializeArtifacts();
        this.customizations = new Map();
        
        // Load existing customizations
        this.loadCustomizations();
        
        console.log('✨ Room Upgrades System initialized');
    }
    
    /**
     * Initialize room upgrades configuration
     */
    initializeUpgrades() {
        return {
            'living-room': {
                upgrades: {
                    'magical-fireplace': {
                        id: 'magical-fireplace',
                        name: 'Magical Fireplace',
                        description: 'A fireplace that never goes out and provides warmth',
                        cost: 50,
                        requirements: {
                            masteryPoints: 30,
                            artifacts: ['fire-crystal']
                        },
                        effects: {
                            lighting: 'enhanced',
                            warmth: true,
                            magical: true
                        },
                        unlocked: false,
                        applied: false
                    },
                    'enchanted-lamp': {
                        id: 'enchanted-lamp',
                        name: 'Enchanted Lamp',
                        description: 'A lamp that provides magical illumination',
                        cost: 30,
                        requirements: {
                            masteryPoints: 20,
                            artifacts: ['light-crystal']
                        },
                        effects: {
                            lighting: 'magical',
                            ambiance: 'mystical'
                        },
                        unlocked: false,
                        applied: false
                    }
                }
            },
            'kitchen': {
                upgrades: {
                    'magical-cauldron': {
                        id: 'magical-cauldron',
                        name: 'Magical Cauldron',
                        description: 'A cauldron that brews potions automatically',
                        cost: 75,
                        requirements: {
                            masteryPoints: 40,
                            artifacts: ['brew-crystal']
                        },
                        effects: {
                            automation: true,
                            potionBrewing: true,
                            magical: true
                        },
                        unlocked: false,
                        applied: false
                    }
                }
            },
            'bedroom': {
                upgrades: {
                    'dream-bed': {
                        id: 'dream-bed',
                        name: 'Dream Bed',
                        description: 'A bed that enhances rest and provides dream portals',
                        cost: 60,
                        requirements: {
                            masteryPoints: 35,
                            artifacts: ['dream-crystal']
                        },
                        effects: {
                            restEnhancement: true,
                            dreamPortal: true,
                            magical: true
                        },
                        unlocked: false,
                        applied: false
                    }
                }
            },
            'workshop': {
                upgrades: {
                    'enchanted-tools': {
                        id: 'enchanted-tools',
                        name: 'Enchanted Tools',
                        description: 'Tools that work with magical precision',
                        cost: 80,
                        requirements: {
                            masteryPoints: 45,
                            artifacts: ['craft-crystal']
                        },
                        effects: {
                            precision: 'magical',
                            efficiency: 'enhanced',
                            magical: true
                        },
                        unlocked: false,
                        applied: false
                    }
                }
            },
            'library': {
                upgrades: {
                    'ancient-tome': {
                        id: 'ancient-tome',
                        name: 'Ancient Tome',
                        description: 'A tome that contains infinite knowledge',
                        cost: 100,
                        requirements: {
                            masteryPoints: 50,
                            artifacts: ['knowledge-crystal']
                        },
                        effects: {
                            knowledge: 'infinite',
                            spellAccess: true,
                            magical: true
                        },
                        unlocked: false,
                        applied: false
                    }
                }
            },
            'garden': {
                upgrades: {
                    'magical-portal': {
                        id: 'magical-portal',
                        name: 'Magical Portal',
                        description: 'A portal that connects to other realms',
                        cost: 120,
                        requirements: {
                            masteryPoints: 60,
                            artifacts: ['portal-crystal']
                        },
                        effects: {
                            portalAccess: true,
                            realmConnection: true,
                            magical: true
                        },
                        unlocked: false,
                        applied: false
                    }
                }
            }
        };
    }
    
    /**
     * Initialize artifacts system
     */
    initializeArtifacts() {
        return {
            'fire-crystal': {
                id: 'fire-crystal',
                name: 'Fire Crystal',
                description: 'A crystal imbued with fire magic',
                rarity: 'common',
                source: 'quest-reward',
                requiredQuest: 'credentials-recovery'
            },
            'light-crystal': {
                id: 'light-crystal',
                name: 'Light Crystal',
                description: 'A crystal that glows with inner light',
                rarity: 'common',
                source: 'achievement-reward',
                requiredAchievement: 'room-explorer'
            },
            'brew-crystal': {
                id: 'brew-crystal',
                name: 'Brew Crystal',
                description: 'A crystal that enhances brewing magic',
                rarity: 'uncommon',
                source: 'room-discovery',
                requiredRoom: 'kitchen'
            },
            'dream-crystal': {
                id: 'dream-crystal',
                name: 'Dream Crystal',
                description: 'A crystal that connects to the dream realm',
                rarity: 'uncommon',
                source: 'room-discovery',
                requiredRoom: 'bedroom'
            },
            'craft-crystal': {
                id: 'craft-crystal',
                name: 'Craft Crystal',
                description: 'A crystal that enhances crafting abilities',
                rarity: 'rare',
                source: 'room-discovery',
                requiredRoom: 'workshop'
            },
            'knowledge-crystal': {
                id: 'knowledge-crystal',
                name: 'Knowledge Crystal',
                description: 'A crystal that contains ancient knowledge',
                rarity: 'rare',
                source: 'room-discovery',
                requiredRoom: 'library'
            },
            'portal-crystal': {
                id: 'portal-crystal',
                name: 'Portal Crystal',
                description: 'A crystal that opens portals to other realms',
                rarity: 'legendary',
                source: 'room-discovery',
                requiredRoom: 'garden'
            }
        };
    }
    
    /**
     * Check if upgrade can be unlocked
     */
    canUnlockUpgrade(roomId, upgradeId) {
        const roomUpgrades = this.upgrades[roomId];
        if (!roomUpgrades || !roomUpgrades.upgrades[upgradeId]) return false;
        
        const upgrade = roomUpgrades.upgrades[upgradeId];
        if (upgrade.unlocked) return false;
        
        const roomData = this.roomProgression.progressionData.rooms[roomId];
        if (!roomData) return false;
        
        // Check mastery points requirement
        if (roomData.masteryPoints < upgrade.requirements.masteryPoints) {
            return false;
        }
        
        // Check artifact requirements
        if (upgrade.requirements.artifacts) {
            for (const artifactId of upgrade.requirements.artifacts) {
                if (!this.hasArtifact(artifactId)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    /**
     * Unlock an upgrade
     */
    unlockUpgrade(roomId, upgradeId) {
        if (!this.canUnlockUpgrade(roomId, upgradeId)) {
            console.warn(`🚫 Cannot unlock upgrade ${upgradeId} for room ${roomId}`);
            return false;
        }
        
        const upgrade = this.upgrades[roomId].upgrades[upgradeId];
        upgrade.unlocked = true;
        
        // Save upgrade data
        this.saveUpgradeData(roomId, upgradeId);
        
        // Show unlock notification
        this.showUpgradeUnlockNotification(roomId, upgrade);
        
        // Trigger upgrade unlocked event
        this.triggerUpgradeEvent('upgrade-unlocked', { roomId, upgrade });
        
        console.log(`✨ Upgrade unlocked: ${upgrade.name} for ${roomId}`);
        return true;
    }
    
    /**
     * Apply an upgrade to a room
     */
    applyUpgrade(roomId, upgradeId) {
        const upgrade = this.upgrades[roomId].upgrades[upgradeId];
        if (!upgrade || !upgrade.unlocked || upgrade.applied) {
            console.warn(`🚫 Cannot apply upgrade ${upgradeId} for room ${roomId}`);
            return false;
        }
        
        upgrade.applied = true;
        
        // Apply visual effects
        this.applyUpgradeVisualEffects(roomId, upgrade);
        
        // Apply functional effects
        this.applyUpgradeFunctionalEffects(roomId, upgrade);
        
        // Save upgrade data
        this.saveUpgradeData(roomId, upgradeId);
        
        // Show application notification
        this.showUpgradeApplicationNotification(roomId, upgrade);
        
        // Trigger upgrade applied event
        this.triggerUpgradeEvent('upgrade-applied', { roomId, upgrade });
        
        console.log(`✨ Upgrade applied: ${upgrade.name} to ${roomId}`);
        return true;
    }
    
    /**
     * Apply upgrade visual effects
     */
    applyUpgradeVisualEffects(roomId, upgrade) {
        const roomElement = document.getElementById(roomId);
        if (!roomElement) return;
        
        // Add upgrade class
        roomElement.classList.add(`upgraded-${upgrade.id}`);
        
        // Apply specific visual effects based on upgrade
        if (upgrade.effects.lighting === 'enhanced') {
            roomElement.style.filter = 'brightness(1.2) saturate(1.1)';
        }
        
        if (upgrade.effects.lighting === 'magical') {
            roomElement.style.filter = 'brightness(1.3) saturate(1.2) hue-rotate(20deg)';
        }
        
        if (upgrade.effects.magical) {
            this.addMagicalParticles(roomElement);
        }
        
        // Add upgrade indicator
        this.addUpgradeIndicator(roomElement, upgrade);
    }
    
    /**
     * Apply upgrade functional effects
     */
    applyUpgradeFunctionalEffects(roomId, upgrade) {
        // Store functional effects for later use
        if (!this.customizations.has(roomId)) {
            this.customizations.set(roomId, new Map());
        }
        
        this.customizations.get(roomId).set(upgrade.id, upgrade.effects);
    }
    
    /**
     * Add magical particles to room
     */
    addMagicalParticles(roomElement) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'magical-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Create floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'magical-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ffd700, #ff6b35);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: magicalParticleFloat 4s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        roomElement.appendChild(particleContainer);
    }
    
    /**
     * Add upgrade indicator
     */
    addUpgradeIndicator(roomElement, upgrade) {
        const indicator = document.createElement('div');
        indicator.className = 'upgrade-indicator';
        indicator.innerHTML = '✨';
        indicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            animation: upgradeIndicatorPulse 2s infinite;
            z-index: 10;
        `;
        
        roomElement.style.position = 'relative';
        roomElement.appendChild(indicator);
    }
    
    /**
     * Show upgrade unlock notification
     */
    showUpgradeUnlockNotification(roomId, upgrade) {
        const notification = document.createElement('div');
        notification.className = 'upgrade-unlock-notification';
        
        notification.innerHTML = `
            <div class="upgrade-icon">✨</div>
            <div class="upgrade-content">
                <h3>Upgrade Available!</h3>
                <p class="upgrade-name">${upgrade.name}</p>
                <p class="upgrade-description">${upgrade.description}</p>
                <div class="upgrade-room">Room: ${this.getRoomDisplayName(roomId)}</div>
                <button class="apply-upgrade-btn" onclick="roomUpgrades.applyUpgrade('${roomId}', '${upgrade.id}')">
                    Apply Upgrade
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #2c1810 0%, #3d2817 100%);
            color: #f4e4c1;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #ffd700;
            font-family: 'Cinzel', serif;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
            min-width: 400px;
            text-align: center;
            animation: upgradeUnlockAppear 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Play unlock sound
        this.playUpgradeSound('upgrade-unlocked');
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 8000);
    }
    
    /**
     * Show upgrade application notification
     */
    showUpgradeApplicationNotification(roomId, upgrade) {
        const notification = document.createElement('div');
        notification.className = 'upgrade-application-notification';
        
        notification.innerHTML = `
            <div class="upgrade-icon">✨</div>
            <div class="upgrade-content">
                <h3>Upgrade Applied!</h3>
                <p class="upgrade-name">${upgrade.name}</p>
                <p class="upgrade-description">${upgrade.description}</p>
                <div class="upgrade-room">Room: ${this.getRoomDisplayName(roomId)}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #2c1810 0%, #3d2817 100%);
            color: #f4e4c1;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #ffd700;
            font-family: 'Cinzel', serif;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
            min-width: 400px;
            text-align: center;
            animation: upgradeApplicationAppear 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Play application sound
        this.playUpgradeSound('upgrade-applied');
        
        // Show application effects
        this.showUpgradeApplicationEffects(roomId, upgrade);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);
    }
    
    /**
     * Show upgrade application effects
     */
    showUpgradeApplicationEffects(roomId, upgrade) {
        const roomElement = document.getElementById(roomId);
        if (!roomElement) return;
        
        // Create upgrade effect overlay
        const effectOverlay = document.createElement('div');
        effectOverlay.className = 'upgrade-application-effects';
        effectOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
            animation: upgradeApplicationEffect 2s ease-out forwards;
            pointer-events: none;
            z-index: 5;
        `;
        
        roomElement.appendChild(effectOverlay);
        
        // Remove effect overlay after animation
        setTimeout(() => {
            if (effectOverlay.parentNode) {
                effectOverlay.parentNode.removeChild(effectOverlay);
            }
        }, 2000);
    }
    
    /**
     * Check if player has artifact
     */
    hasArtifact(artifactId) {
        const artifact = this.artifacts[artifactId];
        if (!artifact) return false;
        
        // Check quest requirement
        if (artifact.source === 'quest-reward' && artifact.requiredQuest) {
            const questManager = this.roomProgression.getQuestManager();
            if (questManager && !questManager.isQuestCompleted(artifact.requiredQuest)) {
                return false;
            }
        }
        
        // Check achievement requirement
        if (artifact.source === 'achievement-reward' && artifact.requiredAchievement) {
            const achievementSystem = this.roomProgression.getAchievementSystem();
            if (achievementSystem && !achievementSystem.isAchievementCompleted(artifact.requiredAchievement)) {
                return false;
            }
        }
        
        // Check room requirement
        if (artifact.source === 'room-discovery' && artifact.requiredRoom) {
            const roomData = this.roomProgression.progressionData.rooms[artifact.requiredRoom];
            if (!roomData || roomData.accessLevel < this.roomProgression.accessLevels.EXPLORED) {
                return false;
            }
        }
        
        return true;
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
     * Play upgrade sound
     */
    playUpgradeSound(soundType) {
        if (typeof window !== 'undefined' && window.fantasyOS && window.fantasyOS.components.soundSystem) {
            const soundSystem = window.fantasyOS.components.soundSystem;
            soundSystem.play(soundType);
        }
    }
    
    /**
     * Save upgrade data
     */
    saveUpgradeData(roomId, upgradeId) {
        if (!this.roomProgression.progressionData.roomUpgrades) {
            this.roomProgression.progressionData.roomUpgrades = {};
        }
        
        if (!this.roomProgression.progressionData.roomUpgrades[roomId]) {
            this.roomProgression.progressionData.roomUpgrades[roomId] = {};
        }
        
        const upgrade = this.upgrades[roomId].upgrades[upgradeId];
        this.roomProgression.progressionData.roomUpgrades[roomId][upgradeId] = {
            unlocked: upgrade.unlocked,
            applied: upgrade.applied
        };
        
        this.roomProgression.saveProgressionData();
    }
    
    /**
     * Load customizations
     */
    loadCustomizations() {
        if (!this.roomProgression.progressionData.roomUpgrades) return;
        
        Object.keys(this.roomProgression.progressionData.roomUpgrades).forEach(roomId => {
            const roomUpgrades = this.roomProgression.progressionData.roomUpgrades[roomId];
            
            Object.keys(roomUpgrades).forEach(upgradeId => {
                const savedData = roomUpgrades[upgradeId];
                const upgrade = this.upgrades[roomId].upgrades[upgradeId];
                
                if (upgrade) {
                    upgrade.unlocked = savedData.unlocked;
                    upgrade.applied = savedData.applied;
                    
                    // Apply visual effects if upgrade is applied
                    if (upgrade.applied) {
                        const roomElement = document.getElementById(roomId);
                        if (roomElement) {
                            this.applyUpgradeVisualEffects(roomId, upgrade);
                        }
                    }
                }
            });
        });
    }
    
    /**
     * Trigger upgrade event
     */
    triggerUpgradeEvent(eventType, data) {
        this.roomProgression.triggerEvent(eventType, data);
    }
    
    /**
     * Get available upgrades for room
     */
    getAvailableUpgrades(roomId) {
        const roomUpgrades = this.upgrades[roomId];
        if (!roomUpgrades) return [];
        
        return Object.values(roomUpgrades.upgrades).filter(upgrade => 
            this.canUnlockUpgrade(roomId, upgrade.id)
        );
    }
    
    /**
     * Get applied upgrades for room
     */
    getAppliedUpgrades(roomId) {
        const roomUpgrades = this.upgrades[roomId];
        if (!roomUpgrades) return [];
        
        return Object.values(roomUpgrades.upgrades).filter(upgrade => 
            upgrade.applied
        );
    }
    
    /**
     * Get upgrade statistics
     */
    getUpgradeStats() {
        const stats = {
            totalUpgrades: 0,
            unlockedUpgrades: 0,
            appliedUpgrades: 0,
            totalArtifacts: Object.keys(this.artifacts).length,
            availableArtifacts: 0
        };
        
        Object.values(this.upgrades).forEach(roomUpgrades => {
            Object.values(roomUpgrades.upgrades).forEach(upgrade => {
                stats.totalUpgrades++;
                if (upgrade.unlocked) stats.unlockedUpgrades++;
                if (upgrade.applied) stats.appliedUpgrades++;
            });
        });
        
        Object.values(this.artifacts).forEach(artifact => {
            if (this.hasArtifact(artifact.id)) {
                stats.availableArtifacts++;
            }
        });
        
        return stats;
    }
    
    /**
     * Check for auto-unlock opportunities
     */
    checkAutoUnlockUpgrades() {
        Object.keys(this.upgrades).forEach(roomId => {
            const roomUpgrades = this.upgrades[roomId];
            Object.keys(roomUpgrades.upgrades).forEach(upgradeId => {
                if (this.canUnlockUpgrade(roomId, upgradeId)) {
                    this.unlockUpgrade(roomId, upgradeId);
                }
            });
        });
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomUpgrades;
}
