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
                    'lamp_1': {
                        name: 'Lamp_1',
                        description: 'lamp_1 object',
                        action: 'illuminate',
                        effects: ['light', 'ambient'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 722, y: 455, width: 70, height: 131 },
                        type: 'lighting'
                    },
                    'fireplace': {
                        name: 'Fireplace',
                        description: 'fireplace object',
                        action: 'ignite',
                        effects: ['fire', 'warmth', 'light'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        clickableArea: { x: 160, y: 816, width: 229, height: 112 },
                        type: 'lighting'
                    },
                    'vase': {
                        name: 'Vase',
                        description: 'vase object',
                        action: 'examine',
                        effects: ['decoration', 'beauty'],
                        sound: 'object-click',
                        animation: 'decorationGlow',
                        clickableArea: { x: -4, y: 763, width: 75, height: 125 },
                        type: 'interactive'
                    },
                    'lamp_2': {
                        name: 'Lamp_2',
                        description: 'lamp_2 object',
                        action: 'illuminate',
                        effects: ['light', 'ambient'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 706, y: 760, width: 89, height: 172 },
                        type: 'lighting'
                    },
                    'door': {
                        name: 'Door',
                        description: 'door object',
                        action: 'open',
                        effects: ['portal', 'interaction'],
                        sound: 'room-change',
                        animation: 'portalGlow',
                        clickableArea: { x: 1038, y: 537, width: 158, height: 146 },
                        type: 'interactive'
                    },
                    'book': {
                        name: 'Book',
                        description: 'book object',
                        action: 'browse',
                        effects: ['knowledge', 'reading'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 538, y: 433, width: 22, height: 80 },
                        type: 'interactive'
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
                        description: 'fireplace object',
                        action: 'ignite',
                        effects: ['fire', 'cooking'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        clickableArea: { x: 58, y: 848, width: 213, height: 135 },
                        type: 'lighting'
                    },
                    'lamp_1': {
                        name: 'Lamp_1',
                        description: 'lamp_1 object',
                        action: 'illuminate',
                        effects: ['light', 'cooking'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 155, y: 393, width: 61, height: 173 },
                        type: 'lighting'
                    },
                    'lamp_2': {
                        name: 'Lamp_2',
                        description: 'lamp_2 object',
                        action: 'illuminate',
                        effects: ['light', 'cooking'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 1336, y: 468, width: 58, height: 151 },
                        type: 'lighting'
                    },
                    'basket': {
                        name: 'Basket',
                        description: 'basket object',
                        action: 'examine',
                        effects: ['storage', 'items'],
                        sound: 'object-click',
                        animation: 'storageGlow',
                        clickableArea: { x: 1507, y: 248, width: 143, height: 82 },
                        type: 'interactive'
                    },
                    'drawer': {
                        name: 'Drawer',
                        description: 'drawer object',
                        action: 'open',
                        effects: ['storage', 'items'],
                        sound: 'chest-open',
                        animation: 'storageGlow',
                        clickableArea: { x: 1249, y: 771, width: 148, height: 48 },
                        type: 'interactive'
                    },
                    'chest': {
                        name: 'Chest',
                        description: 'chest object',
                        action: 'open',
                        effects: ['storage', 'items'],
                        sound: 'chest-open',
                        animation: 'storageGlow',
                        clickableArea: { x: 1472, y: 631, width: 125, height: 98 },
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
        this.storageKey = 'fantasy-os-object-states';
        
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
        
        // Load saved object states
        this.loadObjectStates();
        
        // Set initial dark mode for living room
        this.setInitialDarkMode();
        
        // Add debug layer for development
        this.addDebugLayer();
        
        console.log('✨ Room Object Overlay System initialized!');
    }
    
    /**
     * Load object states from localStorage
     */
    loadObjectStates() {
        try {
            const savedStates = localStorage.getItem(this.storageKey);
            if (savedStates) {
                const states = JSON.parse(savedStates);
                console.log('📦 Loading saved object states:', states);
                
                // Restore object states
                for (const [roomName, roomStates] of Object.entries(states)) {
                    if (this.activeObjects.has(roomName)) {
                        for (const [objectName, objectState] of Object.entries(roomStates)) {
                            if (this.activeObjects.get(roomName).has(objectName)) {
                                this.activeObjects.get(roomName).set(objectName, objectState);
                            }
                        }
                    }
                }
                
                // Restore dark mode state
                if (states.isDarkMode !== undefined) {
                    this.isDarkMode = states.isDarkMode;
                    console.log(`🌙 Dark mode state restored: ${this.isDarkMode}`);
                }
            }
        } catch (error) {
            console.error('❌ Failed to load object states:', error);
        }
    }
    
    /**
     * Save object states to localStorage
     */
    saveObjectStates() {
        try {
            const states = {};
            
            // Save all object states
            for (const [roomName, roomObjects] of this.activeObjects) {
                states[roomName] = {};
                for (const [objectName, objectState] of roomObjects) {
                    states[roomName][objectName] = objectState;
                }
            }
            
            // Save dark mode state
            states.isDarkMode = this.isDarkMode;
            
            localStorage.setItem(this.storageKey, JSON.stringify(states));
            console.log('💾 Object states saved to localStorage');
        } catch (error) {
            console.error('❌ Failed to save object states:', error);
        }
    }
    
    /**
     * Set initial dark mode for living room
     */
    setInitialDarkMode() {
        console.log('🌙 Setting initial dark mode for living room...');
        
        // Set initial dark mode flag FIRST
        this.isDarkMode = true;
        console.log('🌙 Dark mode flag set to true');
        
        // Set living room to dark mode initially
        const livingRoomBackground = document.querySelector('#living-room .room-background');
        if (livingRoomBackground) {
            livingRoomBackground.style.backgroundImage = "url('assets/images/rooms/living-room-dark.png')";
            console.log('✅ Living room set to dark mode');
        } else {
            console.log('❌ Living room background not found!');
        }
        
        // Set all lighting objects to inactive initially
        const livingRoomObjects = this.activeObjects.get('living-room');
        if (livingRoomObjects) {
            livingRoomObjects.set('lamp_1', { isActive: false, lastInteraction: null, interactionCount: 0 });
            livingRoomObjects.set('lamp_2', { isActive: false, lastInteraction: null, interactionCount: 0 });
            livingRoomObjects.set('fireplace', { isActive: false, lastInteraction: null, interactionCount: 0 });
            console.log('✅ All lighting objects set to inactive');
        } else {
            console.log('❌ Living room objects not found!');
        }
        
        // Force dark mode with timeout to ensure DOM is ready
        setTimeout(() => {
            const livingRoomBackground = document.querySelector('#living-room .room-background');
            if (livingRoomBackground) {
                livingRoomBackground.style.backgroundImage = "url('assets/images/rooms/living-room-dark.png')";
                console.log('✅ Living room FORCED to dark mode');
            }
        }, 100);
    }
    
    /**
     * Set up event listeners for objects
     */
    setupObjectEventListeners() {
        // Set up click listeners directly on room background elements
        this.setupRoomClickListeners();
        
        // Disabled hover effects - only clicks work
        // document.addEventListener('mousemove', (e) => {
        //     if (e.target.classList.contains('room-background')) {
        //         this.handleRoomHover(e);
        //     }
        // });
    }
    
    /**
     * Set up click listeners on room background elements
     */
    setupRoomClickListeners() {
        // Find all room background elements and add mousedown listeners
        const roomBackgrounds = document.querySelectorAll('.room-background');
        roomBackgrounds.forEach(background => {
            let clickStartTime = 0;
            let clickStartX = 0;
            let clickStartY = 0;
            
            background.addEventListener('mousedown', (e) => {
                // Store the original coordinates
                clickStartTime = Date.now();
                clickStartX = e.clientX;
                clickStartY = e.clientY;
                
                // Store mouse coordinates for feedback
                window.lastClickX = e.clientX;
                window.lastClickY = e.clientY;
                
                console.log('🎯 Mouse down on room background:', clickStartX, clickStartY);
            });
            
            background.addEventListener('mouseup', (e) => {
                const clickDuration = Date.now() - clickStartTime;
                const clickDistance = Math.sqrt(
                    Math.pow(e.clientX - clickStartX, 2) + 
                    Math.pow(e.clientY - clickStartY, 2)
                );
                
                // Only handle short clicks (less than 200ms and less than 10px movement)
                if (clickDuration < 200 && clickDistance < 10) {
                    console.log('🎯 Short click detected on room background!');
                    console.log('🎯 Click coordinates:', clickStartX, clickStartY);
                    
                    // Create a synthetic click event with the original coordinates
                    const syntheticEvent = {
                        clientX: clickStartX,
                        clientY: clickStartY,
                        target: background
                    };
                    
                    this.handleRoomClick(syntheticEvent);
                }
            });
        });
        
        console.log(`🎯 Set up mousedown/mouseup listeners on ${roomBackgrounds.length} room backgrounds`);
        
        // Add global mousedown listener for mouse coordinates
        document.addEventListener('mousedown', (e) => {
            // Store mouse coordinates for feedback
            window.lastClickX = e.clientX;
            window.lastClickY = e.clientY;
        });
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
        // Find the active room element, not the canvas
        const activeRoom = document.querySelector('.room.active');
        if (!activeRoom) {
            console.log('❌ No active room found');
            return;
        }
        const roomId = activeRoom.id;
        const roomData = this.rooms[roomId];
        
        if (!roomData) {
            console.log('❌ No room data found for:', roomId);
            return;
        }
        
        // Get click coordinates relative to the ACTIVE room background
        const roomBackground = activeRoom ? activeRoom.querySelector('.room-background') : event.target;
        const rect = roomBackground.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        console.log(`Raw click: ${event.clientX}, ${event.clientY}`);
        console.log(`Room rect: ${rect.left}, ${rect.top}, ${rect.width}, ${rect.height}`);
        console.log(`Relative click: ${x}, ${y}`);
        
        // Use coordinates directly - NO SCALING!
        console.log(`Click at: ${x}, ${y} in room: ${roomId}`);
        
        // Check which object was clicked using object data directly
        const clickedObject = this.findClickedObject(roomData, x, y);
        
        if (clickedObject) {
            console.log('✅ Object clicked:', clickedObject.name);
            
            // Store mouse coordinates for feedback
            window.lastClickX = event.clientX;
            window.lastClickY = event.clientY;
            
            this.handleObjectClick(clickedObject, roomId);
        } else {
            console.log('❌ No object found at coordinates:', x, y);
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
        
        // Check if we should exit dark mode (but don't block interactions)
        if (this.isDarkMode && roomId === 'living-room') {
            this.checkDarkModeExit(roomId);
        }
        
        // Save object states to localStorage
        this.saveObjectStates();
    }
    
    /**
     * Check if we should exit dark mode
     */
    checkDarkModeExit(roomId) {
        if (roomId !== 'living-room') return;
        
        const livingRoomObjects = this.activeObjects.get('living-room');
        const lamp1Active = livingRoomObjects.get('lamp_1').isActive;
        const lamp2Active = livingRoomObjects.get('lamp_2').isActive;
        const fireplaceActive = livingRoomObjects.get('fireplace').isActive;
        
        // Exit dark mode ONLY if ALL lighting objects are active
        if (lamp1Active && lamp2Active && fireplaceActive) {
            console.log('💡 Exiting dark mode - ALL lighting objects activated!');
            this.exitDarkMode();
        } else {
            console.log(`🌙 Dark mode still active - Lamp1: ${lamp1Active}, Lamp2: ${lamp2Active}, Fireplace: ${fireplaceActive}`);
        }
    }
    
    /**
     * Exit dark mode and switch to normal mode
     */
    exitDarkMode() {
        this.isDarkMode = false;
        
        // Switch to normal background
        const livingRoomBackground = document.querySelector('#living-room .room-background');
        if (livingRoomBackground) {
            livingRoomBackground.style.backgroundImage = "url('assets/images/rooms/living-room.png')";
            console.log('✅ Switched to normal mode');
        }
        
        // Update hobbit dialogue
        const hobbitText = document.querySelector('#hobbitDialogue .hobbit-text');
        if (hobbitText) {
            hobbitText.textContent = "Thank you! Now I can see better. I need to read something to find the portal spell!";
        }
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
            // Don't automatically switch to dark mode - let individual fireplace control it
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
            // Don't automatically switch to dark mode - let individual lamp control it
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
     * Create animation overlay for object using object data directly
     */
    createAnimationOverlay(objectData, roomId) {
        const activeRoom = document.querySelector('.room.active');
        if (!activeRoom) return;
        
        const roomBackground = activeRoom.querySelector('.room-background');
        if (!roomBackground) return;
        
        // Use object data directly - NO CALCULATIONS!
        const area = objectData.clickableArea;
        
        const overlay = document.createElement('div');
        overlay.className = `object-animation-overlay animate-${objectData.animation}`;
        overlay.setAttribute('data-object', objectData.name);
        overlay.style.cssText = `
            position: absolute;
            left: ${area.x}px;
            top: ${area.y}px;
            width: ${area.width}px;
            height: ${area.height}px;
            pointer-events: none;
            z-index: 100;
            background: radial-gradient(circle, var(--magic-purple) 0%, transparent 70%);
            opacity: 0.7;
            animation: ${objectData.animation} 2s ease-out forwards;
            border-radius: 50%;
        `;
        
        roomBackground.appendChild(overlay);
        
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
        this.showMessageAtObjectDirect(objectName, roomId, message);
    }
    
    /**
     * Show a message directly at the object position using object data
     */
    showMessageAtObjectDirect(objectName, roomId, message, duration = 2000) {
        const objectData = this.rooms[roomId].objects[objectName];
        if (!objectData) return;
        
        const activeRoom = document.querySelector('.room.active');
        if (!activeRoom) return;
        
        const roomBackground = activeRoom.querySelector('.room-background');
        if (!roomBackground) return;
        
        // Use object data directly - NO CALCULATIONS!
        const area = objectData.clickableArea;
        
        // Create feedback overlay directly on the object
        const feedbackOverlay = document.createElement('div');
        feedbackOverlay.className = 'object-feedback-overlay';
        feedbackOverlay.setAttribute('data-object', objectName);
        feedbackOverlay.textContent = message;
        feedbackOverlay.style.cssText = `
            position: absolute;
            left: ${area.x}px;
            top: ${area.y}px;
            width: ${area.width}px;
            height: ${area.height}px;
            background: rgba(0, 0, 0, 0.8);
            color: #D4AF37;
            padding: 8px 12px;
            border-radius: 5px;
            font-family: 'MedievalSharp', cursive;
            font-size: 12px;
            z-index: 10000;
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            animation: fadeInOut ${duration}ms ease-in-out;
            border: 2px solid #D4AF37;
        `;
        
        roomBackground.appendChild(feedbackOverlay);
        
        setTimeout(() => {
            if (feedbackOverlay.parentNode) {
                feedbackOverlay.parentNode.removeChild(feedbackOverlay);
            }
        }, duration);
    }
    
    /**
     * Show a message directly at mouse position
     */
    showMessageAtMouse(message, duration = 2000) {
        // Debug: Check if coordinates are set
        console.log('🎯 Mouse coordinates:', window.lastClickX, window.lastClickY);
        
        const messageElement = document.createElement('div');
        messageElement.className = 'interaction-message-at-mouse';
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            left: ${window.lastClickX || 0}px;
            top: ${window.lastClickY || 0}px;
            background: rgba(0, 0, 0, 0.8);
            color: #D4AF37;
            padding: 8px 12px;
            border-radius: 5px;
            font-family: 'MedievalSharp', cursive;
            font-size: 14px;
            z-index: 10000;
            pointer-events: none;
            transform: translate(-50%, -100%);
            animation: fadeInOut ${duration}ms ease-in-out;
        `;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, duration);
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
    
    /**
     * Add debug layer to visualize object areas
     */
    addDebugLayer() {
        console.log('🔍 Adding debug layer for object visualization...');
        
        // Create debug toggle button
        const debugToggle = document.createElement('button');
        debugToggle.id = 'debug-toggle';
        debugToggle.textContent = '🔍 Debug Objects';
        debugToggle.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 10000;
            background: var(--magic-purple);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'MedievalSharp', cursive;
            font-size: 12px;
        `;
        
        debugToggle.addEventListener('click', () => {
            this.toggleDebugLayer();
        });
        
        document.body.appendChild(debugToggle);
        
        // Initially show debug layer
        this.showDebugLayer();
    }
    
    /**
     * Toggle debug layer visibility
     */
    toggleDebugLayer() {
        const activeRoom = document.querySelector('.room.active');
        if (!activeRoom) return;
        
        const existingOverlay = activeRoom.querySelector('.room-debug-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
            console.log('🔍 Debug overlay removed');
        } else {
            this.showDebugLayer();
        }
    }
    
    /**
     * Show debug layer with object areas
     */
    showDebugLayer() {
        const activeRoom = document.querySelector('.room.active');
        if (!activeRoom) return;
        
        const roomId = activeRoom.id;
        const roomData = this.rooms[roomId];
        if (!roomData) return;
        
        const roomBackground = activeRoom.querySelector('.room-background');
        if (!roomBackground) return;
        
        // Remove existing debug overlay
        const existingOverlay = roomBackground.querySelector('.room-debug-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create debug overlay
        const roomDebugOverlay = document.createElement('div');
        roomDebugOverlay.className = 'room-debug-overlay';
        roomDebugOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        roomBackground.appendChild(roomDebugOverlay);
        
        // Add debug rectangles for each object using object data directly
        for (const [objectName, objectData] of Object.entries(roomData.objects)) {
            const area = objectData.clickableArea;
            
            // Use object data directly - NO CALCULATIONS!
            const debugRect = document.createElement('div');
            debugRect.className = 'object-debug-rect';
            debugRect.setAttribute('data-object', objectName);
            debugRect.style.cssText = `
                position: absolute;
                left: ${area.x}px;
                top: ${area.y}px;
                width: ${area.width}px;
                height: ${area.height}px;
                border: 2px solid #ff00ff;
                background: rgba(255, 0, 255, 0.2);
                pointer-events: none;
                z-index: 1001;
            `;
            
            // Add object name label
            const label = document.createElement('div');
            label.textContent = objectName;
            label.style.cssText = `
                position: absolute;
                top: -20px;
                left: 0;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 2px 5px;
                font-size: 10px;
                font-family: monospace;
                border-radius: 2px;
            `;
            
            debugRect.appendChild(label);
            roomDebugOverlay.appendChild(debugRect);
            
            console.log(`🎯 Added debug rect for ${objectName}: ${area.x},${area.y} ${area.width}x${area.height}`);
        }
        
        console.log('🔍 Debug overlay added - object areas are now visible!');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomObjectOverlay;
}
