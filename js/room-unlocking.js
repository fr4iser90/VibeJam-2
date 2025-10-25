/**
 * Fantasy OS - Room Unlocking System
 * Handles room unlocking mechanics and access control
 * Created: 2025-10-25T16:42:58.000Z
 */

class RoomUnlocking {
    constructor(roomProgression) {
        this.roomProgression = roomProgression;
        this.unlockAnimations = new Map();
        this.unlockEffects = new Map();
        
        // Unlock animation configurations
        this.setupUnlockAnimations();
        
        console.log('🔓 Room Unlocking System initialized');
    }
    
    /**
     * Setup unlock animations
     */
    setupUnlockAnimations() {
        this.unlockAnimations.set('default', {
            duration: 2000,
            effect: 'fade-in',
            sound: 'room-unlock',
            particles: true
        });
        
        this.unlockAnimations.set('quest-based', {
            duration: 3000,
            effect: 'magical-reveal',
            sound: 'quest-complete',
            particles: true,
            glow: true
        });
        
        this.unlockAnimations.set('achievement-based', {
            duration: 2500,
            effect: 'trophy-reveal',
            sound: 'achievement-unlock',
            particles: true,
            sparkles: true
        });
    }
    
    /**
     * Attempt to unlock a room
     */
    attemptUnlockRoom(roomId, unlockType = 'default') {
        if (!this.roomProgression.canUnlockRoom(roomId)) {
            this.showUnlockFailure(roomId);
            return false;
        }
        
        const success = this.roomProgression.unlockRoom(roomId);
        if (success) {
            this.showUnlockSuccess(roomId, unlockType);
            this.updateRoomUI(roomId);
            this.triggerUnlockEffects(roomId, unlockType);
        }
        
        return success;
    }
    
    /**
     * Show unlock success animation
     */
    showUnlockSuccess(roomId, unlockType) {
        const animation = this.unlockAnimations.get(unlockType) || this.unlockAnimations.get('default');
        
        // Create unlock notification
        const notification = this.createUnlockNotification(roomId, unlockType);
        document.body.appendChild(notification);
        
        // Play unlock sound
        this.playUnlockSound(animation.sound);
        
        // Show particle effects
        if (animation.particles) {
            this.showUnlockParticles(roomId);
        }
        
        // Show glow effect
        if (animation.glow) {
            this.showUnlockGlow(roomId);
        }
        
        // Show sparkles
        if (animation.sparkles) {
            this.showUnlockSparkles(roomId);
        }
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, animation.duration);
    }
    
    /**
     * Create unlock notification element
     */
    createUnlockNotification(roomId, unlockType) {
        const notification = document.createElement('div');
        notification.className = 'room-unlock-notification';
        
        const roomName = this.getRoomDisplayName(roomId);
        const unlockMessage = this.getUnlockMessage(unlockType);
        
        notification.innerHTML = `
            <div class="unlock-icon">🔓</div>
            <div class="unlock-content">
                <h3>Room Unlocked!</h3>
                <p>${roomName}</p>
                <span class="unlock-message">${unlockMessage}</span>
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
            border: 2px solid #8b4513;
            font-family: 'Cinzel', serif;
            font-size: 18px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            min-width: 400px;
            text-align: center;
            animation: roomUnlockAppear 0.5s ease-out;
        `;
        
        return notification;
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
     * Get unlock message based on type
     */
    getUnlockMessage(unlockType) {
        const messages = {
            'default': 'A new room has been discovered!',
            'quest-based': 'Quest completed! Room unlocked!',
            'achievement-based': 'Achievement unlocked! Room revealed!',
            'secret-passage': 'Secret passage discovered!',
            'mastery': 'Room mastery achieved!'
        };
        return messages[unlockType] || messages['default'];
    }
    
    /**
     * Show unlock failure message
     */
    showUnlockFailure(roomId) {
        const notification = document.createElement('div');
        notification.className = 'room-unlock-failure';
        
        const roomName = this.getRoomDisplayName(roomId);
        const requirements = this.roomProgression.roomRequirements[roomId];
        
        let failureMessage = 'Requirements not met:';
        if (requirements.requiredQuests.length > 0) {
            failureMessage += `\n• Complete quests: ${requirements.requiredQuests.join(', ')}`;
        }
        if (requirements.requiredAchievements.length > 0) {
            failureMessage += `\n• Earn achievements: ${requirements.requiredAchievements.join(', ')}`;
        }
        if (requirements.requiredRooms.length > 0) {
            failureMessage += `\n• Unlock rooms: ${requirements.requiredRooms.join(', ')}`;
        }
        
        notification.innerHTML = `
            <div class="unlock-icon">🔒</div>
            <div class="unlock-content">
                <h3>Room Locked</h3>
                <p>${roomName}</p>
                <span class="unlock-message">${failureMessage}</span>
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
            border: 2px solid #8b4513;
            font-family: 'Cinzel', serif;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            min-width: 400px;
            text-align: center;
            animation: roomUnlockAppear 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Play failure sound
        this.playUnlockSound('room-locked');
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);
    }
    
    /**
     * Update room UI after unlock
     */
    updateRoomUI(roomId) {
        const roomTab = document.querySelector(`[data-room="${roomId}"]`);
        if (roomTab) {
            // Remove locked state
            roomTab.classList.remove('locked');
            roomTab.classList.add('unlocked');
            
            // Add unlock animation
            roomTab.style.animation = 'roomTabUnlock 1s ease-out';
            
            // Update tab content
            const roomIcon = roomTab.querySelector('.room-icon');
            if (roomIcon) {
                roomIcon.style.filter = 'none';
            }
        }
    }
    
    /**
     * Trigger unlock effects
     */
    triggerUnlockEffects(roomId, unlockType) {
        const animation = this.unlockAnimations.get(unlockType) || this.unlockAnimations.get('default');
        
        // Create effect container
        const effectContainer = document.createElement('div');
        effectContainer.className = 'room-unlock-effects';
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
        
        // Apply effects based on type
        if (animation.effect === 'magical-reveal') {
            this.createMagicalRevealEffect(effectContainer);
        } else if (animation.effect === 'trophy-reveal') {
            this.createTrophyRevealEffect(effectContainer);
        } else {
            this.createDefaultRevealEffect(effectContainer);
        }
        
        // Remove effects after animation
        setTimeout(() => {
            if (effectContainer.parentNode) {
                effectContainer.parentNode.removeChild(effectContainer);
            }
        }, animation.duration);
    }
    
    /**
     * Create magical reveal effect
     */
    createMagicalRevealEffect(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'magical-particle';
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #ffd700, #ff6b35);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: magicalParticleFloat 3s ease-out forwards;
            `;
            container.appendChild(particle);
        }
    }
    
    /**
     * Create trophy reveal effect
     */
    createTrophyRevealEffect(container) {
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'trophy-sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #ffd700;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: trophySparkle 2.5s ease-out forwards;
            `;
            container.appendChild(sparkle);
        }
    }
    
    /**
     * Create default reveal effect
     */
    createDefaultRevealEffect(container) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
            animation: defaultReveal 2s ease-out forwards;
        `;
        container.appendChild(overlay);
    }
    
    /**
     * Show unlock particles
     */
    showUnlockParticles(roomId) {
        const roomTab = document.querySelector(`[data-room="${roomId}"]`);
        if (!roomTab) return;
        
        const rect = roomTab.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'unlock-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: unlockParticleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }
    
    /**
     * Show unlock glow effect
     */
    showUnlockGlow(roomId) {
        const roomTab = document.querySelector(`[data-room="${roomId}"]`);
        if (roomTab) {
            roomTab.style.boxShadow = '0 0 20px #ffd700, 0 0 40px #ff6b35';
            roomTab.style.transition = 'box-shadow 0.5s ease-out';
            
            setTimeout(() => {
                roomTab.style.boxShadow = '';
            }, 3000);
        }
    }
    
    /**
     * Show unlock sparkles
     */
    showUnlockSparkles(roomId) {
        const roomTab = document.querySelector(`[data-room="${roomId}"]`);
        if (!roomTab) return;
        
        const rect = roomTab.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'unlock-sparkle';
            sparkle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #ffd700;
                border-radius: 50%;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: unlockSparkle 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }
    }
    
    /**
     * Play unlock sound
     */
    playUnlockSound(soundType) {
        if (typeof window !== 'undefined' && window.fantasyOS && window.fantasyOS.components.soundSystem) {
            const soundSystem = window.fantasyOS.components.soundSystem;
            soundSystem.play(soundType);
        }
    }
    
    /**
     * Check for quest-based unlocks
     */
    checkQuestBasedUnlocks() {
        const questManager = this.roomProgression.getQuestManager();
        if (!questManager) return;
        
        const completedQuests = questManager.getCompletedQuests();
        
        Object.keys(this.roomProgression.roomRequirements).forEach(roomId => {
            const requirements = this.roomProgression.roomRequirements[roomId];
            
            if (requirements.requiredQuests.length > 0) {
                const allQuestsCompleted = requirements.requiredQuests.every(questId => 
                    completedQuests.includes(questId)
                );
                
                if (allQuestsCompleted && !this.roomProgression.isRoomAccessible(roomId)) {
                    this.attemptUnlockRoom(roomId, 'quest-based');
                }
            }
        });
    }
    
    /**
     * Check for achievement-based unlocks
     */
    checkAchievementBasedUnlocks() {
        const achievementSystem = this.roomProgression.getAchievementSystem();
        if (!achievementSystem) return;
        
        const completedAchievements = achievementSystem.getCompletedAchievements();
        
        Object.keys(this.roomProgression.roomRequirements).forEach(roomId => {
            const requirements = this.roomProgression.roomRequirements[roomId];
            
            if (requirements.requiredAchievements.length > 0) {
                const allAchievementsCompleted = requirements.requiredAchievements.every(achievementId => 
                    completedAchievements.includes(achievementId)
                );
                
                if (allAchievementsCompleted && !this.roomProgression.isRoomAccessible(roomId)) {
                    this.attemptUnlockRoom(roomId, 'achievement-based');
                }
            }
        });
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for quest completion events
        this.roomProgression.addEventHandler('quest-completed', (data) => {
            this.checkQuestBasedUnlocks();
        });
        
        // Listen for achievement completion events
        this.roomProgression.addEventHandler('achievement-completed', (data) => {
            this.checkAchievementBasedUnlocks();
        });
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomUnlocking;
}
