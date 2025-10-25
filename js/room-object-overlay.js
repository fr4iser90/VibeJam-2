/**
 * Fantasy OS - Room Object Overlay System
 * Creates interactive overlays on room images instead of slicing objects
 * Created: 2024-12-19T12:30:00.000Z
 */

class RoomObjectOverlay {
    constructor() {
        this.rooms = {
            'living-room': {
                name: 'Living Room',
                backgroundImage: 'assets/images/rooms/living-room.png',
                darkBackgroundImage: 'assets/images/rooms/living-room-dark.png',
                objects: {
                    'lamp': {
                        name: 'Lamp',
                        description: 'Oil lamp for ambient lighting',
                        action: 'illuminate',
                        effects: ['light', 'ambient'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 484, y: 459, width: 88, height: 146 },
                        type: 'lighting'
                    },
                    'fireplace': {
                        name: 'Fireplace',
                        description: 'Warm hearth for energy and light',
                        action: 'ignite',
                        effects: ['fire', 'warmth', 'light'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        clickableArea: { x: 113, y: 495, width: 154, height: 110 },
                        type: 'lighting'
                    }
                }
            },
            'kitchen': {
                name: 'Kitchen',
                backgroundImage: 'assets/images/rooms/kitchen.png',
                darkBackgroundImage: 'assets/images/rooms/kitchen-dark.png',
                objects: {
                    'fireplace': {
                        name: 'Fireplace',
                        description: 'Cooking hearth',
                        action: 'ignite',
                        effects: ['fire', 'cooking'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        clickableArea: { x: 31, y: 534, width: 163, height: 103 },
                        type: 'lighting'
                    },
                    'lamp': {
                        name: 'Lamp',
                        description: 'Kitchen lighting',
                        action: 'illuminate',
                        effects: ['light', 'cooking'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 929, y: 275, width: 38, height: 112 },
                        type: 'lighting'
                    },
                    'chest': {
                        name: 'Chest',
                        description: 'Storage chest',
                        action: 'open',
                        effects: ['storage', 'items'],
                        sound: 'chest-open',
                        animation: 'storageGlow',
                        clickableArea: { x: 1020, y: 390, width: 89, height: 67 },
                        type: 'interactive'
                    },
                    'basket': {
                        name: 'Basket',
                        description: 'Storage basket',
                        action: 'examine',
                        effects: ['storage', 'items'],
                        sound: 'object-click',
                        animation: 'storageGlow',
                        clickableArea: { x: 1054, y: 120, width: 89, height: 60 },
                        type: 'interactive'
                    }
                }
            },
            'library': {
                name: 'Library',
                backgroundImage: 'assets/images/rooms/library.png',
                darkBackgroundImage: 'assets/images/rooms/library-dark.png',
                objects: {
                    'lamp': {
                        name: 'Lamp',
                        description: 'Reading lamp',
                        action: 'illuminate',
                        effects: ['light', 'reading'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 548, y: 457, width: 47, height: 119 },
                        type: 'lighting'
                    },
                    'shelf_bottom': {
                        name: 'Shelf Bottom',
                        description: 'Bottom bookshelf',
                        action: 'browse',
                        effects: ['knowledge', 'storage'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 915, y: 689, width: 160, height: 33 },
                        type: 'interactive'
                    },
                    'book_1': {
                        name: 'Book 1',
                        description: 'Ancient tome',
                        action: 'browse',
                        effects: ['knowledge', 'ancient'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 233, y: 370, width: 20, height: 74 },
                        type: 'interactive'
                    },
                    'book_2': {
                        name: 'Book 2',
                        description: 'Modern volume',
                        action: 'browse',
                        effects: ['knowledge', 'modern'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 989, y: 426, width: 46, height: 20 },
                        type: 'interactive'
                    },
                    'vase': {
                        name: 'Vase',
                        description: 'Decorative vase',
                        action: 'examine',
                        effects: ['decoration', 'beauty'],
                        sound: 'object-click',
                        animation: 'decorationGlow',
                        clickableArea: { x: -1, y: 351, width: 35, height: 96 },
                        type: 'interactive'
                    },
                    'shelf_top': {
                        name: 'Shelf Top',
                        description: 'Top bookshelf',
                        action: 'browse',
                        effects: ['knowledge', 'storage'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 420, y: 180, width: 49, height: 26 },
                        type: 'interactive'
                    }
                }
            },
            'workshop': {
                name: 'Workshop',
                backgroundImage: 'assets/images/rooms/workshop.png',
                darkBackgroundImage: 'assets/images/rooms/workshop-dark.png',
                objects: {
                    'hammer': {
                        name: 'Hammer',
                        description: 'Crafting hammer',
                        action: 'use',
                        effects: ['tools', 'crafting'],
                        sound: 'object-click',
                        animation: 'toolGlow',
                        clickableArea: { x: 766, y: 287, width: 54, height: 127 },
                        type: 'interactive'
                    },
                    'lamp': {
                        name: 'Lamp',
                        description: 'Workshop lighting',
                        action: 'illuminate',
                        effects: ['light', 'workspace'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 79, y: 255, width: 59, height: 153 },
                        type: 'lighting'
                    },
                    'workbench': {
                        name: 'Workbench',
                        description: 'Main crafting station',
                        action: 'craft',
                        effects: ['crafting', 'creation'],
                        sound: 'object-click',
                        animation: 'craftGlow',
                        clickableArea: { x: 290, y: 538, width: 527, height: 183 },
                        type: 'interactive'
                    }
                }
            },
            'bedroom': {
                name: 'Bedroom',
                backgroundImage: 'assets/images/rooms/bedroom.png',
                darkBackgroundImage: 'assets/images/rooms/bedroom-dark.png',
                objects: {
                    'lamp': {
                        name: 'Lamp',
                        description: 'Bedside lamp',
                        action: 'illuminate',
                        effects: ['light', 'gentle'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 490, y: 336, width: 36, height: 115 },
                        type: 'lighting'
                    },
                    'drawer': {
                        name: 'Drawer',
                        description: 'Bedside drawer',
                        action: 'open',
                        effects: ['storage', 'bedside'],
                        sound: 'chest-open',
                        animation: 'storageGlow',
                        clickableArea: { x: 433, y: 460, width: 83, height: 38 },
                        type: 'interactive'
                    },
                    'bed_bottom': {
                        name: 'Bed Bottom',
                        description: 'Sleeping area',
                        action: 'rest',
                        effects: ['rest', 'recovery'],
                        sound: 'object-click',
                        animation: 'restGlow',
                        clickableArea: { x: 886, y: 610, width: 66, height: 43 },
                        type: 'interactive'
                    }
                }
            },
            'garden': {
                name: 'Garden',
                backgroundImage: 'assets/images/rooms/garden.png',
                darkBackgroundImage: 'assets/images/rooms/garden-dark.png',
                objects: {
                    'Door': {
                        name: 'Door',
                        description: 'Portal to nature',
                        action: 'open',
                        effects: ['portal', 'nature'],
                        sound: 'room-change',
                        animation: 'natureGlow',
                        clickableArea: { x: 231, y: 225, width: 265, height: 372 },
                        type: 'interactive'
                    },
                    'fence': {
                        name: 'Fence',
                        description: 'Garden boundary',
                        action: 'examine',
                        effects: ['boundary', 'structure'],
                        sound: 'object-click',
                        animation: 'structureGlow',
                        clickableArea: { x: 1008, y: 415, width: 398, height: 171 },
                        type: 'interactive'
                    },
                    'flowers_red': {
                        name: 'Red Flowers',
                        description: 'Beautiful red blooms',
                        action: 'admire',
                        effects: ['beauty', 'nature'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 1221, y: 589, width: 302, height: 386 },
                        type: 'interactive'
                    },
                    'flowers_white': {
                        name: 'White Flowers',
                        description: 'Pure white blooms',
                        action: 'admire',
                        effects: ['beauty', 'purity'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 802, y: 544, width: 150, height: 107 },
                        type: 'interactive'
                    },
                    'flowers_white_2': {
                        name: 'White Flowers 2',
                        description: 'More white blooms',
                        action: 'admire',
                        effects: ['beauty', 'purity'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 177, y: 651, width: 223, height: 239 },
                        type: 'interactive'
                    },
                    'far_far_away': {
                        name: 'Far Far Away',
                        description: 'Distant horizon',
                        action: 'gaze',
                        effects: ['view', 'horizon'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        clickableArea: { x: 964, y: 246, width: 355, height: 58 },
                        type: 'interactive'
                    }
                }
            }
        };
        
        this.activeObjects = new Map();
        this.interactionHistory = [];
        this.maxHistorySize = 50;
        this.isDarkMode = false;
        this.currentRoom = 'living-room';
        this.fantasyOSMode = true; // Enable FantasyOS mode
        this.autoLighting = true; // Enable automatic lighting control
        
        // Initialize object system
        this.initializeObjectSystem();
    }
    
    /**
     * Initialize the object system
     */
    initializeObjectSystem() {
        console.log('🎯 Initializing Room Object Overlay System...');
        
        // Set up object event listeners
        this.setupObjectEventListeners();
        
        // Initialize object states
        this.initializeObjectStates();
        
        console.log('✨ Room Object Overlay System initialized!');
    }
    
    /**
     * Set up event listeners for objects
     */
    setupObjectEventListeners() {
        // Listen for clicks on room backgrounds
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('room-background')) {
                this.handleRoomClick(e);
            }
        });
        
        // Disabled hover effects - only clicks work
        // document.addEventListener('mousemove', (e) => {
        //     if (e.target.classList.contains('room-background')) {
        //         this.handleRoomHover(e);
        //     }
        // });
    }
    
    /**
     * Initialize object states
     */
    initializeObjectStates() {
        for (const [roomName, roomData] of Object.entries(this.rooms)) {
            this.activeObjects.set(roomName, new Map());
            
            for (const [objectName, objectData] of Object.entries(roomData.objects)) {
                this.activeObjects.get(roomName).set(objectName, {
                    isActive: false,
                    lastInteraction: null,
                    interactionCount: 0
                });
            }
        }
    }
    
    /**
     * Handle room click events
     */
    handleRoomClick(event) {
        console.log('🎯 Room click detected!');
        const roomElement = event.target;
        const roomId = roomElement.closest('.room').id;
        const roomData = this.rooms[roomId];
        
        if (!roomData) {
            console.log('❌ No room data found for:', roomId);
            return;
        }
        
        // Get click coordinates relative to the room background
        const rect = roomElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Scale coordinates to match the original image dimensions
        const scaleX = roomElement.offsetWidth / 800; // Assuming original image width
        const scaleY = roomElement.offsetHeight / 600; // Assuming original image height
        
        const scaledX = x / scaleX;
        const scaledY = y / scaleY;
        
        console.log(`Click at: ${x}, ${y} -> Scaled: ${scaledX}, ${scaledY} in room: ${roomId}`);
        
        // Check which object was clicked
        const clickedObject = this.findClickedObject(roomData, scaledX, scaledY);
        
        if (clickedObject) {
            console.log('✅ Object clicked:', clickedObject.name);
            this.handleObjectClick(clickedObject, roomId);
        } else {
            console.log('❌ No object found at coordinates:', scaledX, scaledY);
        }
    }
    
    /**
     * Handle room hover events - DISABLED
     */
    handleRoomHover(event) {
        // Hover effects disabled - no tooltips or cursor changes
        return;
    }
    
    /**
     * Find which object was clicked/hovered
     */
    findClickedObject(roomData, x, y) {
        console.log(`Checking objects in ${roomData.name} at ${x}, ${y}`);
        for (const [objectName, objectData] of Object.entries(roomData.objects)) {
            const area = objectData.clickableArea;
            console.log(`Checking ${objectName}: area ${area.x},${area.y} ${area.width}x${area.height}`);
            if (x >= area.x && x <= area.x + area.width &&
                y >= area.y && y <= area.y + area.height) {
                console.log(`Found object: ${objectName}`);
                return { name: objectName, data: objectData };
            }
        }
        console.log('No object found');
        return null;
    }
    
    /**
     * Handle object click event
     */
    handleObjectClick(object, roomId) {
        const objectData = object.data;
        const objectName = object.name;
        
        console.log(`🎯 Interacting with ${objectData.name} in ${this.rooms[roomId].name}`);
        
        // Update object state
        const objectState = this.activeObjects.get(roomId).get(objectName);
        objectState.isActive = !objectState.isActive;
        objectState.lastInteraction = new Date().toISOString();
        objectState.interactionCount++;
        
        // Add to interaction history
        this.addToHistory(roomId, objectName, 'click');
        
        // Execute object action
        this.executeObjectAction(objectName, roomId);
        
        // Play interaction sound
        this.playObjectSound(objectName, roomId);
        
        // Trigger object animation
        this.triggerObjectAnimation(objectName, roomId);
        
        // Show interaction feedback
        this.showInteractionFeedback(objectName, roomId);
    }
    
    /**
     * Execute object action
     */
    executeObjectAction(objectName, roomId) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (!objectData) return;
        
        const objectState = this.activeObjects.get(roomId).get(objectName);
        const isActive = objectState.isActive;
        
        switch (objectData.action) {
            case 'ignite':
                this.handleFireplaceAction(roomId, objectName, isActive);
                break;
            case 'illuminate':
                this.handleLampAction(roomId, objectName, isActive);
                break;
            case 'browse':
                this.handleBrowseAction(roomId, objectName, isActive);
                break;
            case 'sit':
                this.handleSitAction(roomId, objectName, isActive);
                break;
            case 'use':
                this.handleUseAction(roomId, objectName, isActive);
                break;
            case 'gaze':
                this.handleGazeAction(roomId, objectName, isActive);
                break;
            case 'craft':
                this.handleCraftAction(roomId, objectName, isActive);
                break;
            case 'rest':
                this.handleRestAction(roomId, objectName, isActive);
                break;
            case 'admire':
                this.handleAdmireAction(roomId, objectName, isActive);
                break;
            case 'open':
                this.handleOpenAction(roomId, objectName, isActive);
                break;
            case 'examine':
                this.handleExamineAction(roomId, objectName, isActive);
                break;
            case 'adjust':
                this.handleAdjustAction(roomId, objectName, isActive);
                break;
            case 'follow':
                this.handleFollowAction(roomId, objectName, isActive);
                break;
            default:
                console.log(`Unknown action: ${objectData.action}`);
        }
    }
    
    /**
     * Handle fireplace actions
     */
    handleFireplaceAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (isActive) {
            console.log(`🔥 ${objectData.name} ignited!`);
            this.showMessage(`${objectData.name} is now burning brightly!`);
            // Automatically switch to dark mode when fireplace is lit
            this.setDarkMode(true);
        } else {
            console.log(`❄️ ${objectData.name} extinguished`);
            this.showMessage(`${objectData.name} has been extinguished.`);
            // Check if any lighting objects are still active
            this.checkLightingState(roomId);
        }
    }
    
    /**
     * Handle lamp actions
     */
    handleLampAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (isActive) {
            console.log(`💡 ${objectData.name} illuminated!`);
            this.showMessage(`${objectData.name} is now providing light!`);
            // Automatically switch to dark mode when lamp is lit
            this.setDarkMode(true);
        } else {
            console.log(`🌙 ${objectData.name} dimmed`);
            this.showMessage(`${objectData.name} has been dimmed.`);
            // Check if any lighting objects are still active
            this.checkLightingState(roomId);
        }
    }
    
    /**
     * Handle browse actions
     */
    handleBrowseAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`📖 Browsing ${objectData.name}...`);
        this.showMessage(`Exploring ${objectData.name}...`);
    }
    
    /**
     * Handle sit actions
     */
    handleSitAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (isActive) {
            console.log(`🪑 Sitting in ${objectData.name}`);
            this.showMessage(`You sit comfortably in ${objectData.name}.`);
        } else {
            console.log(`🚶 Standing up from ${objectData.name}`);
            this.showMessage(`You stand up from ${objectData.name}.`);
        }
    }
    
    /**
     * Handle use actions
     */
    handleUseAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`🔧 Using ${objectData.name}...`);
        this.showMessage(`Using ${objectData.name}...`);
    }
    
    /**
     * Handle gaze actions
     */
    handleGazeAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`👁️ Gazing through ${objectData.name}...`);
        this.showMessage(`You gaze through ${objectData.name}...`);
    }
    
    /**
     * Handle craft actions
     */
    handleCraftAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (isActive) {
            console.log(`🔨 Crafting at ${objectData.name}`);
            this.showMessage(`You begin crafting at ${objectData.name}.`);
        } else {
            console.log(`⏹️ Stopped crafting at ${objectData.name}`);
            this.showMessage(`You stop crafting at ${objectData.name}.`);
        }
    }
    
    /**
     * Handle rest actions
     */
    handleRestAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (isActive) {
            console.log(`😴 Resting in ${objectData.name}`);
            this.showMessage(`You rest comfortably in ${objectData.name}.`);
        } else {
            console.log(`🌅 Waking up from ${objectData.name}`);
            this.showMessage(`You wake up refreshed from ${objectData.name}.`);
        }
    }
    
    /**
     * Handle admire actions
     */
    handleAdmireAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`🌸 Admiring ${objectData.name}...`);
        this.showMessage(`You admire the beauty of ${objectData.name}.`);
    }
    
    /**
     * Handle open actions
     */
    handleOpenAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (isActive) {
            console.log(`🚪 Opening ${objectData.name}`);
            this.showMessage(`${objectData.name} is now open.`);
        } else {
            console.log(`🔒 Closing ${objectData.name}`);
            this.showMessage(`${objectData.name} is now closed.`);
        }
    }
    
    /**
     * Handle examine actions
     */
    handleExamineAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`🔍 Examining ${objectData.name}...`);
        this.showMessage(`You examine ${objectData.name} closely...`);
    }
    
    /**
     * Handle adjust actions
     */
    handleAdjustAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`⚙️ Adjusting ${objectData.name}...`);
        this.showMessage(`You adjust ${objectData.name}...`);
    }
    
    /**
     * Handle follow actions
     */
    handleFollowAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`🛤️ Following ${objectData.name}...`);
        this.showMessage(`You follow ${objectData.name}...`);
    }
    
    /**
     * Play object-specific sound
     */
    playObjectSound(objectName, roomId) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (!objectData || !objectData.sound) return;
        
        if (typeof FantasySounds !== 'undefined') {
            FantasySounds.play(objectData.sound);
        }
    }
    
    /**
     * Trigger object-specific animation
     */
    triggerObjectAnimation(objectName, roomId) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (!objectData || !objectData.animation) return;
        
        // Create temporary animation overlay
        this.createAnimationOverlay(objectData, roomId);
    }
    
    /**
     * Create animation overlay for object
     */
    createAnimationOverlay(objectData, roomId) {
        const roomElement = document.getElementById(roomId);
        if (!roomElement) return;
        
        const overlay = document.createElement('div');
        overlay.className = `object-animation-overlay animate-${objectData.animation}`;
        overlay.style.cssText = `
            position: absolute;
            top: ${objectData.clickableArea.y}px;
            left: ${objectData.clickableArea.x}px;
            width: ${objectData.clickableArea.width}px;
            height: ${objectData.clickableArea.height}px;
            pointer-events: none;
            z-index: 100;
            background: radial-gradient(circle, var(--magic-purple) 0%, transparent 70%);
            opacity: 0.7;
            animation: ${objectData.animation} 2s ease-out forwards;
        `;
        
        roomElement.appendChild(overlay);
        
        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 2000);
    }
    
    /**
     * Show object tooltip - DISABLED
     */
    showObjectTooltip(object, x, y) {
        // Tooltips disabled - no popups
        return;
    }
    
    /**
     * Hide object tooltip - DISABLED
     */
    hideObjectTooltip() {
        // Tooltips disabled - no popups
        return;
    }
    
    /**
     * Show interaction feedback message
     */
    showInteractionFeedback(objectName, roomId) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (!objectData) return;
        
        const message = `Interacting with ${objectData.name}: ${objectData.description}`;
        this.showMessage(message);
    }
    
    /**
     * Show a message to the user (disabled to prevent spam)
     */
    showMessage(message, duration = 3000) {
        // Disabled to prevent spam of info boxes
        console.log(`📢 ${message}`);
        return;
        
        // Original message display code (commented out)
        /*
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
            animation: messageSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.animation = 'messageSlideOut 0.3s ease-in';
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 300);
            }
        }, duration);
        */
    }
    
    /**
     * Add interaction to history
     */
    addToHistory(roomId, objectName, action) {
        const interaction = {
            room: roomId,
            objectName,
            action,
            timestamp: new Date().toISOString(),
            objectDisplayName: this.rooms[roomId].objects[objectName].name
        };
        
        this.interactionHistory.unshift(interaction);
        
        if (this.interactionHistory.length > this.maxHistorySize) {
            this.interactionHistory = this.interactionHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get object information
     */
    getObjectInfo(roomId, objectName) {
        const roomData = this.rooms[roomId];
        if (!roomData) return null;
        
        const objectData = roomData.objects[objectName];
        if (!objectData) return null;
        
        return {
            ...objectData,
            state: this.activeObjects.get(roomId).get(objectName)
        };
    }
    
    /**
     * Get all objects for a room
     */
    getRoomObjects(roomId) {
        const roomData = this.rooms[roomId];
        if (!roomData) return [];
        
        return Object.keys(roomData.objects).map(objectName => ({
            name: objectName,
            ...roomData.objects[objectName],
            state: this.activeObjects.get(roomId).get(objectName)
        }));
    }
    
    /**
     * Set dark mode
     */
    setDarkMode(enabled) {
        this.isDarkMode = enabled;
        console.log(`🌙 Dark mode ${enabled ? 'enabled' : 'disabled'}`);
        
        // Update room backgrounds
        this.updateRoomBackgrounds();
    }
    
    /**
     * Check if any lighting objects are still active in the current room
     */
    checkLightingState(roomId) {
        const roomData = this.rooms[roomId];
        if (!roomData) return;
        
        const roomActiveObjects = this.activeObjects.get(roomId);
        let hasActiveLighting = false;
        
        // Check all lighting objects (fireplaces and lamps)
        for (const [objectName, objectData] of Object.entries(roomData.objects)) {
            // Check both by action type and explicit type property
            const isLightingObject = objectData.type === 'lighting' || 
                                   objectData.action === 'ignite' || 
                                   objectData.action === 'illuminate';
            
            if (isLightingObject) {
                const objectState = roomActiveObjects.get(objectName);
                if (objectState && objectState.isActive) {
                    hasActiveLighting = true;
                    break;
                }
            }
        }
        
        // If no lighting objects are active, switch back to normal mode
        if (!hasActiveLighting) {
            this.setDarkMode(false);
        }
    }
    
    /**
     * Update room backgrounds based on dark mode
     */
    updateRoomBackgrounds() {
        for (const [roomId, roomData] of Object.entries(this.rooms)) {
            const roomElement = document.getElementById(roomId);
            if (!roomElement) continue;
            
            const backgroundElement = roomElement.querySelector('.room-background');
            if (!backgroundElement) continue;
            
            // Check if current room has active lighting
            const hasActiveLighting = this.checkRoomLightingState(roomId);
            
            if (hasActiveLighting && roomData.darkBackgroundImage) {
                backgroundElement.style.backgroundImage = `url('${roomData.darkBackgroundImage}')`;
            } else {
                backgroundElement.style.backgroundImage = `url('${roomData.backgroundImage}')`;
            }
        }
    }
    
    /**
     * Check if a specific room has active lighting
     */
    checkRoomLightingState(roomId) {
        const roomData = this.rooms[roomId];
        if (!roomData) return false;
        
        const roomActiveObjects = this.activeObjects.get(roomId);
        if (!roomActiveObjects) return false;
        
        // Check all lighting objects (fireplaces and lamps)
        for (const [objectName, objectData] of Object.entries(roomData.objects)) {
            // Check both by action type and explicit type property
            const isLightingObject = objectData.type === 'lighting' || 
                                   objectData.action === 'ignite' || 
                                   objectData.action === 'illuminate';
            
            if (isLightingObject) {
                const objectState = roomActiveObjects.get(objectName);
                if (objectState && objectState.isActive) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Get interaction history
     */
    getInteractionHistory() {
        return [...this.interactionHistory];
    }
    
    /**
     * Get object statistics
     */
    getObjectStatistics() {
        const stats = {
            totalRooms: Object.keys(this.rooms).length,
            totalObjects: 0,
            activeObjects: 0,
            totalInteractions: this.interactionHistory.length,
            lightingObjects: 0,
            interactiveObjects: 0
        };
        
        for (const [roomName, roomData] of Object.entries(this.rooms)) {
            stats.totalObjects += Object.keys(roomData.objects).length;
            
            const roomActiveObjects = this.activeObjects.get(roomName);
            for (const [objectName, objectState] of roomActiveObjects) {
                if (objectState.isActive) {
                    stats.activeObjects++;
                }
                
                // Count object types
                const objectData = roomData.objects[objectName];
                if (objectData.type === 'lighting') {
                    stats.lightingObjects++;
                } else if (objectData.type === 'interactive') {
                    stats.interactiveObjects++;
                }
            }
        }
        
        return stats;
    }
    
    /**
     * FantasyOS: Get system status
     */
    getFantasyOSStatus() {
        return {
            mode: this.fantasyOSMode ? 'FantasyOS' : 'Normal',
            currentRoom: this.currentRoom,
            darkMode: this.isDarkMode,
            autoLighting: this.autoLighting,
            activeLighting: this.getActiveLightingCount(),
            totalRooms: Object.keys(this.rooms).length,
            systemTime: new Date().toLocaleTimeString()
        };
    }
    
    /**
     * FantasyOS: Get count of active lighting objects
     */
    getActiveLightingCount() {
        let count = 0;
        for (const [roomName, roomData] of Object.entries(this.rooms)) {
            const roomActiveObjects = this.activeObjects.get(roomName);
            for (const [objectName, objectData] of Object.entries(roomData.objects)) {
                if (objectData.type === 'lighting') {
                    const objectState = roomActiveObjects.get(objectName);
                    if (objectState && objectState.isActive) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    
    /**
     * FantasyOS: Toggle automatic lighting control
     */
    toggleAutoLighting() {
        this.autoLighting = !this.autoLighting;
        console.log(`🔮 FantasyOS Auto-Lighting: ${this.autoLighting ? 'ON' : 'OFF'}`);
        return this.autoLighting;
    }
    
    /**
     * FantasyOS: Simulate day/night cycle
     */
    simulateDayNightCycle() {
        const hour = new Date().getHours();
        const isNightTime = hour < 6 || hour > 18; // Night from 6 PM to 6 AM
        
        if (this.autoLighting && isNightTime && !this.isDarkMode) {
            console.log('🌙 FantasyOS: Night time detected, switching to dark mode');
            this.setDarkMode(true);
        } else if (this.autoLighting && !isNightTime && this.isDarkMode) {
            console.log('☀️ FantasyOS: Day time detected, switching to light mode');
            this.setDarkMode(false);
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomObjectOverlay;
}
