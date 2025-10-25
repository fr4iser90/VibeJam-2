/**
 * Fantasy OS - Room Manager
 * Handles room navigation and room-specific functionality
 * Created: 2025-10-25T12:04:17.000Z
 */

class RoomManager {
    constructor() {
        this.currentRoom = 'living-room';
        this.rooms = {
            'living-room': {
                name: 'Wohnzimmer',
                icon: '🏠',
                description: 'Main living space with interactive objects',
                objects: ['fireplace', 'lamp', 'chest', 'crystal-ball', 'spell-book', 'cauldron']
            },
            'kitchen': {
                name: 'Küche',
                icon: '🍳',
                description: 'Organized pantry for your files',
                objects: []
            },
            'bedroom': {
                name: 'Schlafzimmer',
                icon: '🛏️',
                description: 'Quiet retreat for rest',
                objects: []
            },
            'workshop': {
                name: 'Werkstatt',
                icon: '🔨',
                description: 'Workspace with tools and applications',
                objects: []
            },
            'library': {
                name: 'Bibliothek',
                icon: '📚',
                description: 'Books and scrolls for your documents',
                objects: []
            },
            'garden': {
                name: 'Garten',
                icon: '🌿',
                description: 'Connection to the outside world and internet',
                objects: []
            }
        };
        
        this.roomHistory = [];
        this.maxHistorySize = 10;
    }
    
    /**
     * Switch to a different room
     */
    switchToRoom(roomId) {
        if (!this.rooms[roomId]) {
            console.warn(`Room ${roomId} does not exist`);
            return false;
        }
        
        // Add current room to history
        if (this.currentRoom !== roomId) {
            this.addToHistory(this.currentRoom);
        }
        
        // Update current room
        this.currentRoom = roomId;
        
        // Update UI
        this.updateRoomUI();
        
        // Emit room change event
        this.onRoomChange(roomId);
        
        console.log(`🏠 Switched to room: ${this.rooms[roomId].name}`);
        return true;
    }
    
    /**
     * Get current room information
     */
    getCurrentRoom() {
        return {
            id: this.currentRoom,
            ...this.rooms[this.currentRoom]
        };
    }
    
    /**
     * Get all available rooms
     */
    getAllRooms() {
        return Object.keys(this.rooms).map(id => ({
            id,
            ...this.rooms[id]
        }));
    }
    
    /**
     * Add room to history
     */
    addToHistory(roomId) {
        this.roomHistory.unshift(roomId);
        
        // Limit history size
        if (this.roomHistory.length > this.maxHistorySize) {
            this.roomHistory = this.roomHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get room history
     */
    getRoomHistory() {
        return [...this.roomHistory];
    }
    
    /**
     * Go back to previous room
     */
    goBack() {
        if (this.roomHistory.length > 0) {
            const previousRoom = this.roomHistory.shift();
            this.switchToRoom(previousRoom);
            return true;
        }
        return false;
    }
    
    /**
     * Update room UI elements
     */
    updateRoomUI() {
        // Update active tab
        document.querySelectorAll('.room-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-room="${this.currentRoom}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Update room content
        document.querySelectorAll('.room').forEach(room => {
            room.classList.remove('active');
        });
        
        const targetRoom = document.getElementById(this.currentRoom);
        if (targetRoom) {
            targetRoom.classList.add('active');
        }
        
        // Update status bar
        this.updateStatusBar();
    }
    
    /**
     * Update status bar with current room info
     */
    updateStatusBar() {
        const currentRoomElement = document.querySelector('.current-room');
        if (currentRoomElement) {
            currentRoomElement.textContent = this.rooms[this.currentRoom].name;
        }
    }
    
    /**
     * Handle room change event
     */
    onRoomChange(roomId) {
        // Play room change sound
        if (typeof FantasySounds !== 'undefined') {
            FantasySounds.play('roomChange');
        }
        
        // Trigger room-specific animations
        this.triggerRoomAnimation(roomId);
        
        // Update room-specific content
        this.updateRoomContent(roomId);
    }
    
    /**
     * Trigger room-specific animation
     */
    triggerRoomAnimation(roomId) {
        const roomElement = document.getElementById(roomId);
        if (!roomElement) return;
        
        // Add entrance animation
        if (typeof FantasyAnimations !== 'undefined') {
            FantasyAnimations.applyAnimation(roomElement, 'fadeIn');
        }
    }
    
    /**
     * Update room-specific content
     */
    updateRoomContent(roomId) {
        const room = this.rooms[roomId];
        if (!room) return;
        
        // Update room description if element exists
        const descriptionElement = document.querySelector(`#${roomId} .room-description`);
        if (descriptionElement) {
            descriptionElement.textContent = room.description;
        }
        
        // Load room-specific objects
        this.loadRoomObjects(roomId);
    }
    
    /**
     * Load objects for a specific room
     */
    loadRoomObjects(roomId) {
        const room = this.rooms[roomId];
        if (!room || !room.objects) return;
        
        const objectsContainer = document.querySelector(`#${roomId} .interactive-objects`);
        if (!objectsContainer) return;
        
        // Show/hide objects based on room
        document.querySelectorAll('.object').forEach(object => {
            const objectType = object.dataset.object;
            if (room.objects.includes(objectType)) {
                object.style.display = 'block';
            } else {
                object.style.display = 'none';
            }
        });
    }
    
    /**
     * Get objects in current room
     */
    getCurrentRoomObjects() {
        const room = this.rooms[this.currentRoom];
        return room ? room.objects : [];
    }
    
    /**
     * Check if object exists in current room
     */
    hasObject(objectType) {
        const room = this.rooms[this.currentRoom];
        return room && room.objects.includes(objectType);
    }
    
    /**
     * Add object to current room
     */
    addObjectToCurrentRoom(objectType) {
        const room = this.rooms[this.currentRoom];
        if (room && !room.objects.includes(objectType)) {
            room.objects.push(objectType);
            this.loadRoomObjects(this.currentRoom);
            return true;
        }
        return false;
    }
    
    /**
     * Remove object from current room
     */
    removeObjectFromCurrentRoom(objectType) {
        const room = this.rooms[this.currentRoom];
        if (room) {
            const index = room.objects.indexOf(objectType);
            if (index > -1) {
                room.objects.splice(index, 1);
                this.loadRoomObjects(this.currentRoom);
                return true;
            }
        }
        return false;
    }
    
    /**
     * Get room statistics
     */
    getRoomStats() {
        const stats = {
            totalRooms: Object.keys(this.rooms).length,
            currentRoom: this.currentRoom,
            roomHistory: this.roomHistory.length,
            totalObjects: 0
        };
        
        // Count total objects across all rooms
        Object.values(this.rooms).forEach(room => {
            stats.totalObjects += room.objects ? room.objects.length : 0;
        });
        
        return stats;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomManager;
}
