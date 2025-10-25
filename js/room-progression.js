/**
 * Fantasy OS - Room Progression System
 * Handles room unlocking, progression tracking, and room enhancement
 * Created: 2025-10-25T16:42:58.000Z
 */

class RoomProgression {
    constructor() {
        this.storageKey = 'fantasy-os-room-progression';
        this.progressionData = this.loadProgressionData();
        this.eventHandlers = new Map();
        
        // Room access levels
        this.accessLevels = {
            LOCKED: 0,
            UNLOCKED: 1,
            EXPLORED: 2,
            MASTERED: 3,
            ENHANCED: 4
        };
        
        // Room dependencies and unlocking requirements
        this.roomRequirements = {
            'living-room': {
                requiredQuests: [],
                requiredAchievements: [],
                requiredRooms: [],
                accessLevel: this.accessLevels.UNLOCKED
            },
            'kitchen': {
                requiredQuests: ['credentials-recovery'],
                requiredAchievements: ['room-explorer'],
                requiredRooms: ['living-room'],
                accessLevel: this.accessLevels.LOCKED
            },
            'bedroom': {
                requiredQuests: ['dream-walker'],
                requiredAchievements: [],
                requiredRooms: ['kitchen'],
                accessLevel: this.accessLevels.LOCKED
            },
            'workshop': {
                requiredQuests: ['crafting-mastery'],
                requiredAchievements: ['room-explorer'],
                requiredRooms: ['bedroom'],
                accessLevel: this.accessLevels.LOCKED
            },
            'library': {
                requiredQuests: ['knowledge-seeker'],
                requiredAchievements: ['room-explorer'],
                requiredRooms: ['workshop'],
                accessLevel: this.accessLevels.LOCKED
            },
            'garden': {
                requiredQuests: ['nature-connection'],
                requiredAchievements: ['room-explorer'],
                requiredRooms: ['library'],
                accessLevel: this.accessLevels.LOCKED
            }
        };
        
        // Initialize progression data for new users
        this.initializeProgressionData();
        
        // FORCE HIDE ROOMS IMMEDIATELY
        this.initializeRoomUI();
        
        // Also hide rooms after DOM is ready
        setTimeout(() => {
            this.initializeRoomUI();
        }, 100);
        
        // And hide them again after everything loads
        setTimeout(() => {
            this.initializeRoomUI();
        }, 1000);
        
        console.log('🏰 Room Progression System initialized');
    }
    
    /**
     * Load progression data from localStorage
     */
    loadProgressionData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('❌ Failed to load room progression data:', error);
        }
        return {};
    }
    
    /**
     * Save progression data to localStorage
     */
    saveProgressionData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progressionData));
            return true;
        } catch (error) {
            console.error('❌ Failed to save room progression data:', error);
            return false;
        }
    }
    
    /**
     * Initialize progression data for new users
     */
    initializeProgressionData() {
        if (!this.progressionData.rooms) {
            this.progressionData.rooms = {};
        }
        
        if (!this.progressionData.secretPassages) {
            this.progressionData.secretPassages = {};
        }
        
        if (!this.progressionData.roomUpgrades) {
            this.progressionData.roomUpgrades = {};
        }
        
        // Initialize room progression data
        Object.keys(this.roomRequirements).forEach(roomId => {
            if (!this.progressionData.rooms[roomId]) {
                this.progressionData.rooms[roomId] = {
                    accessLevel: this.roomRequirements[roomId].accessLevel,
                    unlockedAt: null,
                    exploredAt: null,
                    masteredAt: null,
                    visitCount: 0,
                    lastVisited: null,
                    masteryPoints: 0
                };
            }
        });
        
        // Initialize UI based on room access levels
        this.initializeRoomUI();
        
        this.saveProgressionData();
    }
    
    /**
     * Initialize room UI based on access levels
     */
    initializeRoomUI() {
        console.log('🎨 Initializing room UI based on access levels...');
        
        // Check each room's access level and update UI accordingly
        const allRooms = ['living-room', 'kitchen', 'bedroom', 'workshop', 'library', 'garden'];
        
        allRooms.forEach(roomId => {
            const roomTab = document.querySelector(`[data-room="${roomId}"]`);
            if (roomTab) {
                // Only Living Room is accessible by default, others must be explicitly unlocked
                const isAccessible = roomId === 'living-room';
                
                if (isAccessible) {
                    // Room is accessible - make it visible
                    roomTab.classList.remove('locked');
                    roomTab.style.setProperty('display', 'block', 'important');
                    roomTab.style.setProperty('visibility', 'visible', 'important');
                    roomTab.style.setProperty('opacity', '1', 'important');
                    roomTab.style.setProperty('pointer-events', 'auto', 'important');
                    roomTab.style.setProperty('position', 'relative', 'important');
                    roomTab.style.setProperty('left', 'auto', 'important');
                    roomTab.style.setProperty('top', 'auto', 'important');
                    roomTab.style.setProperty('width', 'auto', 'important');
                    roomTab.style.setProperty('height', 'auto', 'important');
                    roomTab.style.setProperty('overflow', 'visible', 'important');
                    
                    // Remove lock icon if present
                    const lockIcon = roomTab.querySelector('.lock-icon');
                    if (lockIcon) {
                        lockIcon.remove();
                    }
                    
                    console.log(`🔓 ROOM VISIBLE: ${roomId}`);
                } else {
                    // Room is not accessible - hide it
                    roomTab.classList.add('locked');
                    roomTab.style.setProperty('display', 'none', 'important');
                    roomTab.style.setProperty('visibility', 'hidden', 'important');
                    roomTab.style.setProperty('opacity', '0', 'important');
                    roomTab.style.setProperty('pointer-events', 'none', 'important');
                    roomTab.style.setProperty('position', 'absolute', 'important');
                    roomTab.style.setProperty('left', '-9999px', 'important');
                    roomTab.style.setProperty('top', '-9999px', 'important');
                    roomTab.style.setProperty('width', '0', 'important');
                    roomTab.style.setProperty('height', '0', 'important');
                    roomTab.style.setProperty('overflow', 'hidden', 'important');
                    
                    console.log(`🔒 ROOM HIDDEN: ${roomId}`);
                }
            }
        });
        
        console.log('✅ Room UI initialization complete');
    }
    
    /**
     * Check if a room is accessible
     */
    isRoomAccessible(roomId) {
        const roomData = this.progressionData.rooms[roomId];
        if (!roomData) return false;
        
        // Only return true if room is explicitly unlocked
        return roomData.accessLevel >= this.accessLevels.UNLOCKED;
    }
    
    /**
     * Check if a room can be unlocked
     */
    canUnlockRoom(roomId) {
        const requirements = this.roomRequirements[roomId];
        if (!requirements) return false;
        
        // Check quest requirements
        if (requirements.requiredQuests.length > 0) {
            const questManager = this.getQuestManager();
            if (!questManager) {
                // If quest manager is not available, requirements cannot be met
                return false;
            }
            for (const questId of requirements.requiredQuests) {
                if (!questManager.isQuestCompleted(questId)) {
                    return false;
                }
            }
        }
        
        // Check achievement requirements
        if (requirements.requiredAchievements.length > 0) {
            const achievementSystem = this.getAchievementSystem();
            if (!achievementSystem) {
                // If achievement system is not available, requirements cannot be met
                return false;
            }
            for (const achievementId of requirements.requiredAchievements) {
                if (!achievementSystem.isAchievementCompleted(achievementId)) {
                    return false;
                }
            }
        }
        
        // Check room requirements
        if (requirements.requiredRooms.length > 0) {
            for (const requiredRoomId of requirements.requiredRooms) {
                if (!this.isRoomAccessible(requiredRoomId)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    /**
     * Unlock a room
     */
    unlockRoom(roomId) {
        if (!this.canUnlockRoom(roomId)) {
            console.warn(`🚫 Cannot unlock room ${roomId}: requirements not met`);
            return false;
        }
        
        const roomData = this.progressionData.rooms[roomId];
        if (!roomData) {
            console.error(`❌ Room ${roomId} not found in progression data`);
            return false;
        }
        
        if (roomData.accessLevel >= this.accessLevels.UNLOCKED) {
            console.log(`✅ Room ${roomId} already unlocked`);
            return true;
        }
        
        roomData.accessLevel = this.accessLevels.UNLOCKED;
        roomData.unlockedAt = new Date().toISOString();
        
        // Update UI to show unlocked room
        this.updateRoomTabUI(roomId, true);
        
        this.saveProgressionData();
        
        // Trigger room unlocked event
        this.triggerEvent('room-unlocked', { roomId, roomData });
        
        console.log(`🔓 Room ${roomId} unlocked!`);
        return true;
    }
    
    /**
     * Update room tab UI based on unlock status
     */
    updateRoomTabUI(roomId, isUnlocked) {
        const roomTab = document.querySelector(`[data-room="${roomId}"]`);
        if (!roomTab) return;
        
        if (isUnlocked) {
            roomTab.classList.remove('locked');
            roomTab.classList.add('unlocking');
            
            // Force visibility with important styles
            roomTab.style.setProperty('display', 'block', 'important');
            roomTab.style.setProperty('visibility', 'visible', 'important');
            roomTab.style.setProperty('pointer-events', 'auto', 'important');
            roomTab.style.setProperty('opacity', '1', 'important');
            roomTab.style.setProperty('position', 'relative', 'important');
            roomTab.style.setProperty('left', 'auto', 'important');
            roomTab.style.setProperty('top', 'auto', 'important');
            roomTab.style.setProperty('width', 'auto', 'important');
            roomTab.style.setProperty('height', 'auto', 'important');
            roomTab.style.setProperty('overflow', 'visible', 'important');
            
            // Remove lock icon if present
            const lockIcon = roomTab.querySelector('.lock-icon');
            if (lockIcon) {
                lockIcon.remove();
            }
            
            // Add reveal animation
            setTimeout(() => {
                roomTab.classList.add('revealing');
                setTimeout(() => {
                    roomTab.classList.remove('unlocking', 'revealing');
                }, 800);
            }, 100);
        } else {
            roomTab.classList.add('locked');
            roomTab.classList.remove('unlocking', 'revealing');
            roomTab.style.setProperty('display', 'none', 'important');
            roomTab.style.setProperty('visibility', 'hidden', 'important');
            roomTab.style.setProperty('pointer-events', 'none', 'important');
        }
    }
    
    /**
     * Mark room as explored
     */
    exploreRoom(roomId) {
        const roomData = this.progressionData.rooms[roomId];
        if (!roomData) return false;
        
        if (roomData.accessLevel < this.accessLevels.UNLOCKED) {
            console.warn(`🚫 Cannot explore locked room ${roomId}`);
            return false;
        }
        
        if (roomData.accessLevel < this.accessLevels.EXPLORED) {
            roomData.accessLevel = this.accessLevels.EXPLORED;
            roomData.exploredAt = new Date().toISOString();
        }
        
        roomData.visitCount++;
        roomData.lastVisited = new Date().toISOString();
        
        this.saveProgressionData();
        
        // Trigger room explored event
        this.triggerEvent('room-explored', { roomId, roomData });
        
        console.log(`🔍 Room ${roomId} explored (visit #${roomData.visitCount})`);
        return true;
    }
    
    /**
     * Mark room as mastered
     */
    masterRoom(roomId) {
        const roomData = this.progressionData.rooms[roomId];
        if (!roomData) return false;
        
        if (roomData.accessLevel < this.accessLevels.EXPLORED) {
            console.warn(`🚫 Cannot master unexplored room ${roomId}`);
            return false;
        }
        
        if (roomData.accessLevel < this.accessLevels.MASTERED) {
            roomData.accessLevel = this.accessLevels.MASTERED;
            roomData.masteredAt = new Date().toISOString();
            roomData.masteryPoints = this.calculateMasteryPoints(roomId);
        }
        
        this.saveProgressionData();
        
        // Trigger room mastered event
        this.triggerEvent('room-mastered', { roomId, roomData });
        
        console.log(`🏆 Room ${roomId} mastered!`);
        return true;
    }
    
    /**
     * Calculate mastery points for a room
     */
    calculateMasteryPoints(roomId) {
        const roomData = this.progressionData.rooms[roomId];
        if (!roomData) return 0;
        
        let points = 0;
        
        // Base points for unlocking
        points += 10;
        
        // Points for exploration
        points += roomData.visitCount * 2;
        
        // Points for time spent (if available)
        if (roomData.exploredAt && roomData.masteredAt) {
            const exploreTime = new Date(roomData.masteredAt) - new Date(roomData.exploredAt);
            points += Math.floor(exploreTime / (1000 * 60 * 5)); // 1 point per 5 minutes
        }
        
        return Math.min(points, 100); // Cap at 100 points
    }
    
    /**
     * Get room progression status
     */
    getRoomStatus(roomId) {
        const roomData = this.progressionData.rooms[roomId];
        if (!roomData) return null;
        
        return {
            roomId,
            accessLevel: roomData.accessLevel,
            accessLevelName: this.getAccessLevelName(roomData.accessLevel),
            unlockedAt: roomData.unlockedAt,
            exploredAt: roomData.exploredAt,
            masteredAt: roomData.masteredAt,
            visitCount: roomData.visitCount,
            lastVisited: roomData.lastVisited,
            masteryPoints: roomData.masteryPoints,
            canUnlock: this.canUnlockRoom(roomId),
            requirements: this.roomRequirements[roomId]
        };
    }
    
    /**
     * Get access level name
     */
    getAccessLevelName(accessLevel) {
        const levelNames = {
            [this.accessLevels.LOCKED]: 'Locked',
            [this.accessLevels.UNLOCKED]: 'Unlocked',
            [this.accessLevels.EXPLORED]: 'Explored',
            [this.accessLevels.MASTERED]: 'Mastered',
            [this.accessLevels.ENHANCED]: 'Enhanced'
        };
        return levelNames[accessLevel] || 'Unknown';
    }
    
    /**
     * Get all room progression data
     */
    getAllRoomProgress() {
        const progress = {};
        Object.keys(this.roomRequirements).forEach(roomId => {
            progress[roomId] = this.getRoomStatus(roomId);
        });
        return progress;
    }
    
    /**
     * Get progression statistics
     */
    getProgressionStats() {
        const stats = {
            totalRooms: Object.keys(this.roomRequirements).length,
            unlockedRooms: 0,
            exploredRooms: 0,
            masteredRooms: 0,
            enhancedRooms: 0,
            totalVisits: 0,
            totalMasteryPoints: 0
        };
        
        Object.values(this.progressionData.rooms).forEach(roomData => {
            if (roomData.accessLevel >= this.accessLevels.UNLOCKED) stats.unlockedRooms++;
            if (roomData.accessLevel >= this.accessLevels.EXPLORED) stats.exploredRooms++;
            if (roomData.accessLevel >= this.accessLevels.MASTERED) stats.masteredRooms++;
            if (roomData.accessLevel >= this.accessLevels.ENHANCED) stats.enhancedRooms++;
            
            stats.totalVisits += roomData.visitCount || 0;
            stats.totalMasteryPoints += roomData.masteryPoints || 0;
        });
        
        return stats;
    }
    
    /**
     * Check for auto-unlock opportunities
     */
    checkAutoUnlock() {
        Object.keys(this.roomRequirements).forEach(roomId => {
            if (this.canUnlockRoom(roomId) && !this.isRoomAccessible(roomId)) {
                this.unlockRoom(roomId);
            }
        });
    }
    
    /**
     * Add event handler
     */
    addEventHandler(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }
    
    /**
     * Remove event handler
     */
    removeEventHandler(event, handler) {
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
    triggerEvent(event, data) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`❌ Error in event handler for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Get quest manager reference
     */
    getQuestManager() {
        if (typeof window !== 'undefined' && window.fantasyOS && window.fantasyOS.components.questManager) {
            return window.fantasyOS.components.questManager;
        }
        return null;
    }
    
    /**
     * Get achievement system reference
     */
    getAchievementSystem() {
        if (typeof window !== 'undefined' && window.fantasyOS && window.fantasyOS.components.achievementSystem) {
            return window.fantasyOS.components.achievementSystem;
        }
        return null;
    }
    
    /**
     * Reset progression data
     */
    resetProgression() {
        this.progressionData = {};
        this.initializeProgressionData();
        console.log('🔄 Room progression data reset');
    }
    
    /**
     * Export progression data
     */
    exportProgressionData() {
        return JSON.stringify(this.progressionData, null, 2);
    }
    
    /**
     * Import progression data
     */
    importProgressionData(data) {
        try {
            const importedData = JSON.parse(data);
            this.progressionData = importedData;
            this.saveProgressionData();
            console.log('📥 Room progression data imported');
            return true;
        } catch (error) {
            console.error('❌ Failed to import progression data:', error);
            return false;
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomProgression;
}
