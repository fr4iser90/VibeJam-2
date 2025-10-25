/**
 * Fantasy OS - Achievement System
 * Achievement tracking, rewards, and notification system
 * Created: 2025-10-25T16:06:31.000Z
 */

class AchievementSystem {
    constructor() {
        this.achievements = new Map();
        this.completedAchievements = new Set();
        this.achievementProgress = new Map();
        this.achievementRewards = new Map();
        this.storageKey = 'fantasy-os-achievements';
        this.isInitialized = false;
        
        // Achievement events
        this.eventHandlers = new Map();
        
        // Initialize achievement system
        this.init();
    }
    
    /**
     * Initialize the achievement system
     */
    async init() {
        try {
            console.log('🏆 Initializing Achievement System...');
            
            // Load achievement state from storage
            await this.loadAchievementState();
            
            // Initialize achievement content
            this.initializeAchievementContent();
            
            // Set up event handlers
            this.setupEventHandlers();
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('✨ Achievement System initialized successfully!');
            
        } catch (error) {
            console.error('💥 Failed to initialize Achievement System:', error);
        }
    }
    
    /**
     * Initialize achievement content
     */
    initializeAchievementContent() {
        // Load achievement content from quest-content.js
        if (typeof achievements !== 'undefined') {
            this.achievementContent = achievements;
        } else {
            console.warn('Achievement content not loaded. Using default content.');
            this.achievementContent = this.getDefaultAchievementContent();
        }
        
        // Initialize achievements
        for (const [achievementId, achievement] of Object.entries(this.achievementContent)) {
            this.achievements.set(achievementId, achievement);
            
            // Initialize progress tracking
            if (!this.achievementProgress.has(achievementId)) {
                this.achievementProgress.set(achievementId, {
                    current: 0,
                    target: achievement.target,
                    progress: 0
                });
            }
        }
    }
    
    /**
     * Get default achievement content
     */
    getDefaultAchievementContent() {
        return {
            'first-quest': {
                id: 'first-quest',
                title: 'First Steps',
                description: 'Complete your first quest',
                type: 'quest',
                requirement: 'complete-quest',
                target: 1,
                reward: 'achievement-badge',
                icon: '🎯'
            },
            'room-explorer': {
                id: 'room-explorer',
                title: 'Room Explorer',
                description: 'Visit all rooms in the Fantasy OS',
                type: 'exploration',
                requirement: 'visit-rooms',
                target: 6,
                reward: 'explorer-badge',
                icon: '🏠'
            },
            'magic-master': {
                id: 'magic-master',
                title: 'Magic Master',
                description: 'Master all magical abilities',
                type: 'magic',
                requirement: 'master-magic',
                target: 10,
                reward: 'magic-badge',
                icon: '🔮'
            }
        };
    }
    
    /**
     * Set up event handlers
     */
    setupEventHandlers() {
        // Achievement unlocked events
        this.addEventListener('achievement-unlocked', (achievementId) => {
            console.log(`🏆 Achievement unlocked: ${achievementId}`);
            this.showAchievementNotification(achievementId);
        });
        
        this.addEventListener('achievement-progress', (achievementId, progress) => {
            console.log(`📈 Achievement progress: ${achievementId} - ${progress}%`);
            this.updateAchievementProgressUI(achievementId);
        });
    }
    
    /**
     * Check achievement progress
     */
    checkAchievementProgress(achievementId, action, data = {}) {
        if (!this.achievements.has(achievementId)) {
            console.warn(`Achievement ${achievementId} not found`);
            return false;
        }
        
        const achievement = this.achievements.get(achievementId);
        
        // Skip if already completed
        if (this.completedAchievements.has(achievementId)) {
            return false;
        }
        
        // Check if action matches achievement requirement
        if (achievement.requirement !== action) {
            return false;
        }
        
        // Update progress based on achievement type
        const progress = this.achievementProgress.get(achievementId);
        let updated = false;
        
        switch (achievement.type) {
            case 'quest':
                updated = this.updateQuestAchievement(achievementId, data);
                break;
            case 'exploration':
                updated = this.updateExplorationAchievement(achievementId, data);
                break;
            case 'magic':
                updated = this.updateMagicAchievement(achievementId, data);
                break;
            case 'collection':
                updated = this.updateCollectionAchievement(achievementId, data);
                break;
            case 'companion':
                updated = this.updateCompanionAchievement(achievementId, data);
                break;
            default:
                updated = this.updateGenericAchievement(achievementId, data);
        }
        
        if (updated) {
            // Check if achievement is completed
            if (progress.current >= achievement.target) {
                this.awardAchievement(achievementId);
            } else {
                // Save progress
                this.saveAchievementState();
                
                // Trigger progress event
                this.triggerEvent('achievement-progress', achievementId, progress.progress);
            }
        }
        
        return updated;
    }
    
    /**
     * Update quest achievement progress
     */
    updateQuestAchievement(achievementId, data) {
        const progress = this.achievementProgress.get(achievementId);
        const achievement = this.achievements.get(achievementId);
        
        if (data.questCompleted) {
            progress.current += 1;
            progress.progress = (progress.current / achievement.target) * 100;
            return true;
        }
        
        return false;
    }
    
    /**
     * Update exploration achievement progress
     */
    updateExplorationAchievement(achievementId, data) {
        const progress = this.achievementProgress.get(achievementId);
        const achievement = this.achievements.get(achievementId);
        
        if (data.roomVisited) {
            progress.current += 1;
            progress.progress = (progress.current / achievement.target) * 100;
            return true;
        }
        
        return false;
    }
    
    /**
     * Update magic achievement progress
     */
    updateMagicAchievement(achievementId, data) {
        const progress = this.achievementProgress.get(achievementId);
        const achievement = this.achievements.get(achievementId);
        
        if (data.magicLevelIncreased) {
            progress.current += data.magicLevelIncreased;
            progress.progress = (progress.current / achievement.target) * 100;
            return true;
        }
        
        return false;
    }
    
    /**
     * Update collection achievement progress
     */
    updateCollectionAchievement(achievementId, data) {
        const progress = this.achievementProgress.get(achievementId);
        const achievement = this.achievements.get(achievementId);
        
        if (data.itemCollected) {
            progress.current += 1;
            progress.progress = (progress.current / achievement.target) * 100;
            return true;
        }
        
        return false;
    }
    
    /**
     * Update companion achievement progress
     */
    updateCompanionAchievement(achievementId, data) {
        const progress = this.achievementProgress.get(achievementId);
        const achievement = this.achievements.get(achievementId);
        
        if (data.trustIncreased) {
            progress.current += data.trustIncreased;
            progress.progress = (progress.current / achievement.target) * 100;
            return true;
        }
        
        return false;
    }
    
    /**
     * Update generic achievement progress
     */
    updateGenericAchievement(achievementId, data) {
        const progress = this.achievementProgress.get(achievementId);
        const achievement = this.achievements.get(achievementId);
        
        if (data.progress) {
            progress.current += data.progress;
            progress.progress = (progress.current / achievement.target) * 100;
            return true;
        }
        
        return false;
    }
    
    /**
     * Award achievement
     */
    awardAchievement(achievementId) {
        if (!this.achievements.has(achievementId)) {
            console.warn(`Achievement ${achievementId} not found`);
            return false;
        }
        
        const achievement = this.achievements.get(achievementId);
        
        // Mark as completed
        this.completedAchievements.add(achievementId);
        
        // Process reward
        this.processAchievementReward(achievementId);
        
        // Save achievement state
        this.saveAchievementState();
        
        // Trigger achievement unlocked event
        this.triggerEvent('achievement-unlocked', achievementId);
        
        return true;
    }
    
    /**
     * Process achievement reward
     */
    processAchievementReward(achievementId) {
        const achievement = this.achievements.get(achievementId);
        if (!achievement.reward) {
            return;
        }
        
        console.log(`🎁 Processing achievement reward: ${achievement.reward}`);
        
        // Process reward based on type
        switch (achievement.reward) {
            case 'achievement-badge':
                this.grantAchievementBadge(achievementId);
                break;
            case 'explorer-badge':
                this.grantExplorerBadge(achievementId);
                break;
            case 'magic-badge':
                this.grantMagicBadge(achievementId);
                break;
            case 'collector-badge':
                this.grantCollectorBadge(achievementId);
                break;
            case 'companion-badge':
                this.grantCompanionBadge(achievementId);
                break;
            default:
                console.log(`Unknown achievement reward: ${achievement.reward}`);
        }
    }
    
    /**
     * Grant achievement badge
     */
    grantAchievementBadge(achievementId) {
        console.log(`🏆 Achievement badge granted: ${achievementId}`);
        // This would integrate with UI system to show badge
    }
    
    /**
     * Grant explorer badge
     */
    grantExplorerBadge(achievementId) {
        console.log(`🏠 Explorer badge granted: ${achievementId}`);
        // This would integrate with room system
    }
    
    /**
     * Grant magic badge
     */
    grantMagicBadge(achievementId) {
        console.log(`🔮 Magic badge granted: ${achievementId}`);
        // This would integrate with magic system
    }
    
    /**
     * Grant collector badge
     */
    grantCollectorBadge(achievementId) {
        console.log(`🏺 Collector badge granted: ${achievementId}`);
        // This would integrate with collection system
    }
    
    /**
     * Grant companion badge
     */
    grantCompanionBadge(achievementId) {
        console.log(`🧙‍♂️ Companion badge granted: ${achievementId}`);
        // This would integrate with companion system
    }
    
    /**
     * Display achievement notification
     */
    displayAchievementNotification(achievementId) {
        const achievement = this.achievements.get(achievementId);
        if (!achievement) {
            return;
        }
        
        this.showAchievementNotification(achievementId);
    }
    
    /**
     * Show achievement notification
     */
    showAchievementNotification(achievementId) {
        const achievement = this.achievements.get(achievementId);
        if (!achievement) {
            return;
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, var(--magic-gold), var(--magic-purple));
            color: white;
            padding: 20px;
            border-radius: 15px;
            font-family: 'MedievalSharp', cursive;
            font-size: 14px;
            z-index: 5000;
            max-width: 350px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            animation: slideInLeft 0.5s ease-out;
            border: 2px solid var(--magic-gold);
        `;
        
        // Style inner elements
        const icon = notification.querySelector('.achievement-icon');
        icon.style.cssText = `
            font-size: 32px;
            text-align: center;
            margin-bottom: 10px;
        `;
        
        const title = notification.querySelector('.achievement-title');
        title.style.cssText = `
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 5px;
        `;
        
        const name = notification.querySelector('.achievement-name');
        name.style.cssText = `
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 5px;
            color: var(--magic-gold);
        `;
        
        const description = notification.querySelector('.achievement-description');
        description.style.cssText = `
            font-size: 12px;
            text-align: center;
            opacity: 0.9;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 6 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutLeft 0.5s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        }, 6000);
    }
    
    /**
     * Get achievement progress
     */
    getAchievementProgress(achievementId) {
        return this.achievementProgress.get(achievementId) || null;
    }
    
    /**
     * Update achievement progress UI
     */
    updateAchievementProgressUI(achievementId) {
        // This would update the achievement progress UI components
        console.log(`📈 Updating achievement progress UI for: ${achievementId}`);
        
        // Update achievement progress display
        const achievementProgressElement = document.getElementById('achievement-progress');
        if (achievementProgressElement) {
            this.renderAchievementProgress(achievementProgressElement);
        }
    }
    
    /**
     * Render achievement progress
     */
    renderAchievementProgress(container) {
        if (!container) return;
        
        container.innerHTML = '';
        
        // Render achievement progress
        this.achievementProgress.forEach((progress, achievementId) => {
            const achievement = this.achievements.get(achievementId);
            if (!achievement) return;
            
            const achievementElement = this.createAchievementElement(achievement, progress);
            container.appendChild(achievementElement);
        });
    }
    
    /**
     * Create achievement element
     */
    createAchievementElement(achievement, progress) {
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement-item ${this.completedAchievements.has(achievement.id) ? 'completed' : 'in-progress'}`;
        
        const isCompleted = this.completedAchievements.has(achievement.id);
        
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-progress-bar">
                    <div class="achievement-progress-fill" style="width: ${progress.progress}%"></div>
                </div>
                <div class="achievement-progress-text">${progress.current}/${achievement.target}</div>
            </div>
        `;
        
        return achievementElement;
    }
    
    /**
     * Save achievement state to localStorage
     */
    saveAchievementState() {
        try {
            const achievementState = {
                completedAchievements: Array.from(this.completedAchievements),
                achievementProgress: Array.from(this.achievementProgress.entries()),
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(achievementState));
            console.log('💾 Achievement state saved');
        } catch (error) {
            console.error('💥 Failed to save achievement state:', error);
        }
    }
    
    /**
     * Load achievement state from localStorage
     */
    async loadAchievementState() {
        try {
            const savedState = localStorage.getItem(this.storageKey);
            if (!savedState) {
                console.log('📝 No saved achievement state found, starting fresh');
                return;
            }
            
            const achievementState = JSON.parse(savedState);
            
            // Restore completed achievements
            this.completedAchievements = new Set(achievementState.completedAchievements || []);
            
            // Restore achievement progress
            this.achievementProgress = new Map(achievementState.achievementProgress || []);
            
            console.log('📖 Achievement state loaded successfully');
            console.log(`Completed achievements: ${this.completedAchievements.size}`);
            
        } catch (error) {
            console.error('💥 Failed to load achievement state:', error);
        }
    }
    
    /**
     * Add event listener
     */
    addEventListener(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }
    
    /**
     * Remove event listener
     */
    removeEventListener(event, handler) {
        if (this.eventHandlers.has(event)) {
            const handlers = this.eventHandlers.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    /**
     * Trigger event
     */
    triggerEvent(event, ...args) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach(handler => {
                try {
                    handler(...args);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Get achievement information
     */
    getAchievementInfo(achievementId) {
        return this.achievements.get(achievementId) || null;
    }
    
    /**
     * Get completed achievements
     */
    getCompletedAchievements() {
        return Array.from(this.completedAchievements);
    }
    
    /**
     * Get achievement count
     */
    getAchievementCount() {
        return {
            total: this.achievements.size,
            completed: this.completedAchievements.size,
            progress: (this.completedAchievements.size / this.achievements.size) * 100
        };
    }
    
    /**
     * Check if achievement is completed
     */
    isAchievementCompleted(achievementId) {
        return this.completedAchievements.has(achievementId);
    }
    
    /**
     * Reset achievement system
     */
    resetAchievementSystem() {
        this.completedAchievements.clear();
        this.achievementProgress.clear();
        localStorage.removeItem(this.storageKey);
        console.log('🔄 Achievement system reset');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementSystem;
}
