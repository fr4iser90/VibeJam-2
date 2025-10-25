/**
 * Fantasy OS - Gesture Action Mapping
 * Maps recognized gestures to Fantasy OS actions and spells
 * Created: 2025-10-25T12:22:24.000Z
 */

class GestureActions {
    constructor() {
        this.actionMappings = {
            circle: {
                primary: 'open portal',
                secondary: 'create portal',
                tertiary: 'portal navigation',
                category: 'navigation',
                priority: 'high',
                cooldown: 1000,
                requirements: ['room-manager']
            },
            zigzag: {
                primary: 'summon light',
                secondary: 'lightning spell',
                tertiary: 'energy burst',
                category: 'elemental',
                priority: 'medium',
                cooldown: 500,
                requirements: ['particle-system']
            },
            spiral: {
                primary: 'ignite fireplace',
                secondary: 'fire spell',
                tertiary: 'heat generation',
                category: 'elemental',
                priority: 'medium',
                cooldown: 2000,
                requirements: ['sound-system']
            },
            heart: {
                primary: 'cast protection spell',
                secondary: 'favorites',
                tertiary: 'love magic',
                category: 'protective',
                priority: 'high',
                cooldown: 3000,
                requirements: []
            },
            star: {
                primary: 'summon magic',
                secondary: 'star power',
                tertiary: 'cosmic energy',
                category: 'cosmic',
                priority: 'high',
                cooldown: 5000,
                requirements: ['particle-system', 'sound-system']
            },
            triangle: {
                primary: 'cast stability',
                secondary: 'balance',
                tertiary: 'grounding',
                category: 'stability',
                priority: 'medium',
                cooldown: 1500,
                requirements: []
            },
            square: {
                primary: 'cast protection',
                secondary: 'shield',
                tertiary: 'barrier',
                category: 'protective',
                priority: 'high',
                cooldown: 2000,
                requirements: []
            },
            infinity: {
                primary: 'cast eternal',
                secondary: 'infinite loop',
                tertiary: 'perpetual motion',
                category: 'cosmic',
                priority: 'very-high',
                cooldown: 10000,
                requirements: ['particle-system', 'sound-system', 'room-manager']
            }
        };
        
        this.actionHistory = [];
        this.cooldowns = new Map();
        this.maxHistorySize = 100;
        this.confidenceThreshold = 0.5;
    }
    
    /**
     * Map gesture to action
     */
    mapGestureToAction(gestureType, confidence, context = {}) {
        const mapping = this.actionMappings[gestureType];
        if (!mapping) {
            console.warn(`No action mapping found for gesture: ${gestureType}`);
            return null;
        }
        
        // Check confidence threshold
        if (confidence < this.confidenceThreshold) {
            console.warn(`Gesture confidence too low: ${confidence}`);
            return null;
        }
        
        // Check cooldown
        if (this.isOnCooldown(gestureType)) {
            console.warn(`Gesture ${gestureType} is on cooldown`);
            return null;
        }
        
        // Check requirements
        if (!this.checkRequirements(mapping.requirements)) {
            console.warn(`Requirements not met for gesture: ${gestureType}`);
            return null;
        }
        
        const action = {
            type: gestureType,
            action: mapping.primary,
            secondary: mapping.secondary,
            tertiary: mapping.tertiary,
            category: mapping.category,
            priority: mapping.priority,
            confidence,
            context,
            timestamp: new Date().toISOString(),
            executed: false
        };
        
        // Set cooldown
        this.setCooldown(gestureType, mapping.cooldown);
        
        // Add to history
        this.addToHistory(action);
        
        return action;
    }
    
    /**
     * Execute gesture action
     */
    executeAction(action) {
        if (!action || action.executed) {
            return false;
        }
        
        try {
            console.log(`🎯 Executing gesture action: ${action.action}`);
            
            // Execute based on action type
            const result = this.executeActionByType(action);
            
            if (result.success) {
                action.executed = true;
                action.result = result;
                console.log(`✅ Gesture action successful: ${action.action}`);
                
                // Play success sound
                this.playActionSound(action, 'success');
                
                // Show action feedback
                this.showActionFeedback(action, 'success');
                
                return true;
            } else {
                console.error(`❌ Gesture action failed: ${action.action}`);
                
                // Play failure sound
                this.playActionSound(action, 'failure');
                
                // Show action feedback
                this.showActionFeedback(action, 'failure');
                
                return false;
            }
        } catch (error) {
            console.error(`💥 Error executing gesture action:`, error);
            return false;
        }
    }
    
    /**
     * Execute action based on type
     */
    executeActionByType(action) {
        switch (action.action) {
            case 'open portal':
                return this.executeOpenPortal(action);
            case 'summon light':
                return this.executeSummonLight(action);
            case 'ignite fireplace':
                return this.executeIgniteFireplace(action);
            case 'cast protection spell':
                return this.executeProtectionSpell(action);
            case 'summon magic':
                return this.executeSummonMagic(action);
            case 'cast stability':
                return this.executeStability(action);
            case 'cast protection':
                return this.executeProtection(action);
            case 'cast eternal':
                return this.executeEternal(action);
            default:
                return { success: false, message: 'Unknown action' };
        }
    }
    
    /**
     * Execute open portal action
     */
    executeOpenPortal(action) {
        try {
            // Use room manager if available
            if (typeof RoomManager !== 'undefined') {
                const roomManager = new RoomManager();
                const rooms = roomManager.getAvailableRooms();
                const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
                
                roomManager.switchToRoom(randomRoom);
                
                return {
                    success: true,
                    message: `Portal opened to ${randomRoom}`,
                    data: { room: randomRoom }
                };
            }
            
            return {
                success: true,
                message: 'Portal opened successfully',
                data: { type: 'portal' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Portal opening failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute summon light action
     */
    executeSummonLight(action) {
        try {
            // Use particle system if available
            if (typeof ParticleSystem !== 'undefined') {
                const particleSystem = new ParticleSystem();
                particleSystem.createLightEffect();
            }
            
            // Toggle light effects
            document.body.classList.toggle('light-mode');
            
            return {
                success: true,
                message: 'Light summoned successfully',
                data: { type: 'light' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Light summoning failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute ignite fireplace action
     */
    executeIgniteFireplace(action) {
        try {
            // Find fireplace object
            const fireplace = document.querySelector('.object.fireplace');
            if (fireplace) {
                fireplace.classList.add('active');
                
                // Start fire effect
                const fireEffect = fireplace.querySelector('.fire-effect');
                if (fireEffect) {
                    fireEffect.style.animation = 'fire-burn 2s ease-in-out infinite';
                }
            }
            
            // Play fireplace sound
            if (typeof FantasySounds !== 'undefined') {
                FantasySounds.play('fireplace');
            }
            
            return {
                success: true,
                message: 'Fireplace ignited successfully',
                data: { type: 'fire' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Fireplace ignition failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute protection spell action
     */
    executeProtectionSpell(action) {
        try {
            // Add protection class to body
            document.body.classList.add('protection-mode');
            
            // Create protection effect
            const protectionEffect = document.createElement('div');
            protectionEffect.className = 'protection-effect';
            protectionEffect.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(147, 112, 219, 0.1) 0%, transparent 70%);
                pointer-events: none;
                z-index: 1000;
                animation: protection-pulse 3s ease-in-out;
            `;
            
            document.body.appendChild(protectionEffect);
            
            // Remove after animation
            setTimeout(() => {
                if (protectionEffect.parentNode) {
                    protectionEffect.parentNode.removeChild(protectionEffect);
                }
            }, 3000);
            
            return {
                success: true,
                message: 'Protection spell cast successfully',
                data: { type: 'protection' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Protection spell failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute summon magic action
     */
    executeSummonMagic(action) {
        try {
            // Use particle system for magic effects
            if (typeof ParticleSystem !== 'undefined') {
                const particleSystem = new ParticleSystem();
                particleSystem.createMagicEffect();
            }
            
            // Add magic class to body
            document.body.classList.add('magic-mode');
            
            // Play magic sound
            if (typeof FantasySounds !== 'undefined') {
                FantasySounds.play('magicSuccess');
            }
            
            return {
                success: true,
                message: 'Magic summoned successfully',
                data: { type: 'magic' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Magic summoning failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute stability action
     */
    executeStability(action) {
        try {
            // Add stability class to body
            document.body.classList.add('stability-mode');
            
            // Create stability effect
            const stabilityEffect = document.createElement('div');
            stabilityEffect.className = 'stability-effect';
            stabilityEffect.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                border: 3px solid #228B22;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: stability-pulse 2s ease-in-out;
            `;
            
            document.body.appendChild(stabilityEffect);
            
            // Remove after animation
            setTimeout(() => {
                if (stabilityEffect.parentNode) {
                    stabilityEffect.parentNode.removeChild(stabilityEffect);
                }
            }, 2000);
            
            return {
                success: true,
                message: 'Stability cast successfully',
                data: { type: 'stability' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Stability casting failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute protection action
     */
    executeProtection(action) {
        try {
            // Add protection class to body
            document.body.classList.add('protection-mode');
            
            // Create shield effect
            const shieldEffect = document.createElement('div');
            shieldEffect.className = 'shield-effect';
            shieldEffect.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, rgba(65, 105, 225, 0.1) 0%, rgba(65, 105, 225, 0.05) 100%);
                pointer-events: none;
                z-index: 1000;
                animation: shield-fade 2s ease-in-out;
            `;
            
            document.body.appendChild(shieldEffect);
            
            // Remove after animation
            setTimeout(() => {
                if (shieldEffect.parentNode) {
                    shieldEffect.parentNode.removeChild(shieldEffect);
                }
            }, 2000);
            
            return {
                success: true,
                message: 'Protection cast successfully',
                data: { type: 'protection' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Protection casting failed: ${error.message}`
            };
        }
    }
    
    /**
     * Execute eternal action
     */
    executeEternal(action) {
        try {
            // Add eternal class to body
            document.body.classList.add('eternal-mode');
            
            // Create eternal effect
            const eternalEffect = document.createElement('div');
            eternalEffect.className = 'eternal-effect';
            eternalEffect.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(0, 206, 209, 0.1) 0%, transparent 70%);
                pointer-events: none;
                z-index: 1000;
                animation: eternal-rotate 10s linear infinite;
            `;
            
            document.body.appendChild(eternalEffect);
            
            // Remove after animation
            setTimeout(() => {
                if (eternalEffect.parentNode) {
                    eternalEffect.parentNode.removeChild(eternalEffect);
                }
            }, 10000);
            
            return {
                success: true,
                message: 'Eternal cast successfully',
                data: { type: 'eternal' }
            };
        } catch (error) {
            return {
                success: false,
                message: `Eternal casting failed: ${error.message}`
            };
        }
    }
    
    /**
     * Check if gesture is on cooldown
     */
    isOnCooldown(gestureType) {
        const cooldownEnd = this.cooldowns.get(gestureType);
        return cooldownEnd && Date.now() < cooldownEnd;
    }
    
    /**
     * Set cooldown for gesture
     */
    setCooldown(gestureType, duration) {
        this.cooldowns.set(gestureType, Date.now() + duration);
    }
    
    /**
     * Check requirements for action
     */
    checkRequirements(requirements) {
        for (const requirement of requirements) {
            if (!this.checkRequirement(requirement)) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Check single requirement
     */
    checkRequirement(requirement) {
        switch (requirement) {
            case 'room-manager':
                return typeof RoomManager !== 'undefined';
            case 'particle-system':
                return typeof ParticleSystem !== 'undefined';
            case 'sound-system':
                return typeof FantasySounds !== 'undefined';
            case 'spell-parser':
                return typeof SpellParser !== 'undefined';
            default:
                return true;
        }
    }
    
    /**
     * Play action sound
     */
    playActionSound(action, type) {
        if (typeof FantasySounds === 'undefined') return;
        
        const soundMap = {
            success: 'magicSuccess',
            failure: 'magicFail'
        };
        
        const sound = soundMap[type];
        if (sound) {
            FantasySounds.play(sound);
        }
    }
    
    /**
     * Show action feedback
     */
    showActionFeedback(action, type) {
        const message = type === 'success' 
            ? `✨ ${action.action} successful!`
            : `💥 ${action.action} failed!`;
        
        this.showMessage(message, type === 'success' ? 3000 : 2000);
    }
    
    /**
     * Show message to user
     */
    showMessage(message, duration = 3000) {
        const messageElement = document.createElement('div');
        messageElement.className = 'action-message';
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--magic-purple);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-family: 'MedievalSharp', cursive;
            font-size: 14px;
            z-index: 3000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageElement);
        
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
     * Add action to history
     */
    addToHistory(action) {
        this.actionHistory.unshift(action);
        
        if (this.actionHistory.length > this.maxHistorySize) {
            this.actionHistory = this.actionHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get action history
     */
    getActionHistory(limit = 10) {
        return this.actionHistory.slice(0, limit);
    }
    
    /**
     * Get action statistics
     */
    getActionStats() {
        const stats = {
            total: this.actionHistory.length,
            successful: this.actionHistory.filter(a => a.executed && a.result?.success).length,
            failed: this.actionHistory.filter(a => a.executed && !a.result?.success).length,
            byCategory: {},
            byPriority: {},
            averageConfidence: 0
        };
        
        // Calculate category stats
        this.actionHistory.forEach(action => {
            const category = action.category;
            stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
            
            const priority = action.priority;
            stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;
        });
        
        // Calculate average confidence
        if (this.actionHistory.length > 0) {
            const totalConfidence = this.actionHistory.reduce((sum, action) => sum + action.confidence, 0);
            stats.averageConfidence = totalConfidence / this.actionHistory.length;
        }
        
        return stats;
    }
    
    /**
     * Clear action history
     */
    clearHistory() {
        this.actionHistory = [];
        console.log('🗑️ Action history cleared');
    }
    
    /**
     * Get cooldown status
     */
    getCooldownStatus() {
        const status = {};
        
        for (const [gestureType, cooldownEnd] of this.cooldowns) {
            const remaining = Math.max(0, cooldownEnd - Date.now());
            status[gestureType] = {
                isOnCooldown: remaining > 0,
                remainingMs: remaining,
                remainingSeconds: Math.ceil(remaining / 1000)
            };
        }
        
        return status;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestureActions;
}
