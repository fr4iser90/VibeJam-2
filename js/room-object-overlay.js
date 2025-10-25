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
                    'fireplace': {
                        name: 'Fireplace',
                        description: 'Warm hearth for energy and light',
                        action: 'ignite',
                        effects: ['fire', 'warmth', 'light'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        clickableArea: { x: 50, y: 200, width: 200, height: 300 }
                    },
                    'wall-lamp': {
                        name: 'Wall Lamp',
                        description: 'Oil lamp for ambient lighting',
                        action: 'illuminate',
                        effects: ['light', 'ambient'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 100, y: 150, width: 80, height: 120 }
                    },
                    'bookshelf': {
                        name: 'Bookshelf',
                        description: 'Knowledge repository',
                        action: 'browse',
                        effects: ['knowledge', 'storage'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 300, y: 100, width: 150, height: 400 }
                    },
                    'round-door': {
                        name: 'Round Door',
                        description: 'Portal to other rooms',
                        action: 'open',
                        effects: ['portal', 'navigation'],
                        sound: 'room-change',
                        animation: 'magicPulse',
                        clickableArea: { x: 600, y: 150, width: 200, height: 300 }
                    },
                    'armchair': {
                        name: 'Armchair',
                        description: 'Comfortable seating',
                        action: 'sit',
                        effects: ['comfort', 'rest'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        clickableArea: { x: 500, y: 300, width: 120, height: 150 }
                    },
                    'round-table': {
                        name: 'Round Table',
                        description: 'Workspace surface',
                        action: 'use',
                        effects: ['workspace', 'utility'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        clickableArea: { x: 450, y: 400, width: 100, height: 80 }
                    },
                    'table-lamp': {
                        name: 'Table Lamp',
                        description: 'Focused reading light',
                        action: 'illuminate',
                        effects: ['light', 'focus'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 470, y: 380, width: 60, height: 100 }
                    }
                }
            },
            'kitchen': {
                name: 'Kitchen',
                backgroundImage: 'assets/images/rooms/kitchen.png',
                darkBackgroundImage: 'assets/images/rooms/kitchen-dark.png',
                objects: {
                    'fireplace': {
                        name: 'Kitchen Fireplace',
                        description: 'Cooking hearth',
                        action: 'ignite',
                        effects: ['fire', 'cooking'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        clickableArea: { x: 50, y: 200, width: 200, height: 300 }
                    },
                    'oil-lamp': {
                        name: 'Oil Lamp',
                        description: 'Kitchen lighting',
                        action: 'illuminate',
                        effects: ['light', 'cooking'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 100, y: 150, width: 60, height: 100 }
                    },
                    'shelves': {
                        name: 'Kitchen Shelves',
                        description: 'Storage for ingredients',
                        action: 'browse',
                        effects: ['storage', 'ingredients'],
                        sound: 'object-click',
                        animation: 'storageGlow',
                        clickableArea: { x: 300, y: 100, width: 400, height: 200 }
                    },
                    'hanging-pots': {
                        name: 'Hanging Pots',
                        description: 'Cooking utensils',
                        action: 'use',
                        effects: ['cooking', 'tools'],
                        sound: 'object-click',
                        animation: 'toolGlow',
                        clickableArea: { x: 350, y: 300, width: 300, height: 100 }
                    },
                    'round-table': {
                        name: 'Kitchen Table',
                        description: 'Dining surface',
                        action: 'use',
                        effects: ['dining', 'preparation'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        clickableArea: { x: 200, y: 400, width: 150, height: 120 }
                    },
                    'fruit-bowl': {
                        name: 'Fruit Bowl',
                        description: 'Fresh ingredients',
                        action: 'examine',
                        effects: ['food', 'freshness'],
                        sound: 'object-click',
                        animation: 'foodGlow',
                        clickableArea: { x: 220, y: 420, width: 80, height: 60 }
                    },
                    'chairs': {
                        name: 'Kitchen Chairs',
                        description: 'Seating for meals',
                        action: 'sit',
                        effects: ['comfort', 'dining'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        clickableArea: { x: 150, y: 450, width: 250, height: 100 }
                    },
                    'window': {
                        name: 'Kitchen Window',
                        description: 'View to the outside',
                        action: 'gaze',
                        effects: ['view', 'nature'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        clickableArea: { x: 400, y: 150, width: 120, height: 150 }
                    }
                }
            },
            'library': {
                name: 'Library',
                backgroundImage: 'assets/images/rooms/library.png',
                darkBackgroundImage: 'assets/images/rooms/library-dark.png',
                objects: {
                    'left-bookshelf': {
                        name: 'Left Bookshelf',
                        description: 'Ancient knowledge collection',
                        action: 'browse',
                        effects: ['knowledge', 'ancient'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 50, y: 100, width: 200, height: 400 }
                    },
                    'right-bookshelf': {
                        name: 'Right Bookshelf',
                        description: 'Modern knowledge collection',
                        action: 'browse',
                        effects: ['knowledge', 'modern'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        clickableArea: { x: 600, y: 100, width: 150, height: 400 }
                    },
                    'armchair': {
                        name: 'Reading Chair',
                        description: 'Comfortable reading spot',
                        action: 'sit',
                        effects: ['comfort', 'reading'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        clickableArea: { x: 400, y: 300, width: 120, height: 150 }
                    },
                    'small-table': {
                        name: 'Reading Table',
                        description: 'Surface for books',
                        action: 'use',
                        effects: ['workspace', 'reading'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        clickableArea: { x: 350, y: 400, width: 100, height: 80 }
                    },
                    'oil-lamp': {
                        name: 'Reading Lamp',
                        description: 'Focused reading light',
                        action: 'illuminate',
                        effects: ['light', 'reading'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 370, y: 380, width: 60, height: 100 }
                    },
                    'round-window': {
                        name: 'Library Window',
                        description: 'Portal to knowledge',
                        action: 'gaze',
                        effects: ['vision', 'knowledge'],
                        sound: 'crystal-ball',
                        animation: 'magicPulse',
                        clickableArea: { x: 350, y: 150, width: 150, height: 150 }
                    },
                    'curtain': {
                        name: 'Window Curtain',
                        description: 'Privacy control',
                        action: 'adjust',
                        effects: ['privacy', 'lighting'],
                        sound: 'object-click',
                        animation: 'adjustGlow',
                        clickableArea: { x: 300, y: 150, width: 50, height: 200 }
                    }
                }
            },
            'workshop': {
                name: 'Workshop',
                backgroundImage: 'assets/images/rooms/workshop.png',
                darkBackgroundImage: 'assets/images/rooms/workshop-dark.png',
                objects: {
                    'workbench-1': {
                        name: 'Main Workbench',
                        description: 'Primary crafting station',
                        action: 'craft',
                        effects: ['crafting', 'creation'],
                        sound: 'object-click',
                        animation: 'craftGlow',
                        clickableArea: { x: 100, y: 350, width: 200, height: 100 }
                    },
                    'workbench-2': {
                        name: 'Secondary Workbench',
                        description: 'Additional workspace',
                        action: 'use',
                        effects: ['workspace', 'utility'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        clickableArea: { x: 400, y: 300, width: 300, height: 120 }
                    },
                    'hanging-tools': {
                        name: 'Hanging Tools',
                        description: 'Crafting implements',
                        action: 'use',
                        effects: ['tools', 'crafting'],
                        sound: 'object-click',
                        animation: 'toolGlow',
                        clickableArea: { x: 50, y: 200, width: 150, height: 200 }
                    },
                    'shelves': {
                        name: 'Tool Shelves',
                        description: 'Storage for materials',
                        action: 'browse',
                        effects: ['storage', 'materials'],
                        sound: 'object-click',
                        animation: 'storageGlow',
                        clickableArea: { x: 300, y: 100, width: 400, height: 150 }
                    },
                    'wooden-crates': {
                        name: 'Wooden Crates',
                        description: 'Material storage',
                        action: 'open',
                        effects: ['storage', 'materials'],
                        sound: 'chest-open',
                        animation: 'storageGlow',
                        clickableArea: { x: 200, y: 400, width: 100, height: 80 }
                    },
                    'stool': {
                        name: 'Work Stool',
                        description: 'Crafting seating',
                        action: 'sit',
                        effects: ['comfort', 'crafting'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        clickableArea: { x: 150, y: 450, width: 60, height: 60 }
                    },
                    'wall-lantern-left': {
                        name: 'Left Lantern',
                        description: 'Workshop lighting',
                        action: 'illuminate',
                        effects: ['light', 'workspace'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 50, y: 150, width: 80, height: 120 }
                    },
                    'wall-lantern-right': {
                        name: 'Right Lantern',
                        description: 'Additional lighting',
                        action: 'illuminate',
                        effects: ['light', 'workspace'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 700, y: 150, width: 80, height: 120 }
                    }
                }
            },
            'bedroom': {
                name: 'Bedroom',
                backgroundImage: 'assets/images/rooms/bedroom.png',
                darkBackgroundImage: null, // No dark version
                objects: {
                    'bed': {
                        name: 'Bed',
                        description: 'Rest and recovery',
                        action: 'rest',
                        effects: ['rest', 'recovery'],
                        sound: 'object-click',
                        animation: 'restGlow',
                        clickableArea: { x: 500, y: 200, width: 200, height: 300 }
                    },
                    'nightstand': {
                        name: 'Nightstand',
                        description: 'Bedside storage',
                        action: 'use',
                        effects: ['storage', 'bedside'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        clickableArea: { x: 450, y: 250, width: 80, height: 100 }
                    },
                    'oil-lamp': {
                        name: 'Bedside Lamp',
                        description: 'Gentle night light',
                        action: 'illuminate',
                        effects: ['light', 'gentle'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        clickableArea: { x: 470, y: 230, width: 60, height: 100 }
                    },
                    'round-window': {
                        name: 'Bedroom Window',
                        description: 'View to the stars',
                        action: 'gaze',
                        effects: ['view', 'stars'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        clickableArea: { x: 100, y: 150, width: 150, height: 150 }
                    },
                    'curtains': {
                        name: 'Window Curtains',
                        description: 'Privacy and darkness',
                        action: 'adjust',
                        effects: ['privacy', 'darkness'],
                        sound: 'object-click',
                        animation: 'adjustGlow',
                        clickableArea: { x: 50, y: 150, width: 200, height: 200 }
                    },
                    'small-table': {
                        name: 'Bedside Table',
                        description: 'Additional surface',
                        action: 'use',
                        effects: ['workspace', 'bedside'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        clickableArea: { x: 200, y: 400, width: 100, height: 80 }
                    }
                }
            },
            'garden': {
                name: 'Garden',
                backgroundImage: 'assets/images/rooms/garden.png',
                darkBackgroundImage: null, // No dark version
                objects: {
                    'round-door': {
                        name: 'Garden Door',
                        description: 'Portal to nature',
                        action: 'open',
                        effects: ['portal', 'nature'],
                        sound: 'room-change',
                        animation: 'natureGlow',
                        clickableArea: { x: 200, y: 300, width: 200, height: 300 }
                    },
                    'round-window-left': {
                        name: 'Left Window',
                        description: 'Garden view',
                        action: 'gaze',
                        effects: ['view', 'nature'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        clickableArea: { x: 100, y: 250, width: 80, height: 80 }
                    },
                    'round-window-right': {
                        name: 'Right Window',
                        description: 'Garden view',
                        action: 'gaze',
                        effects: ['view', 'nature'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        clickableArea: { x: 400, y: 250, width: 80, height: 80 }
                    },
                    'flowers-red': {
                        name: 'Red Flowers',
                        description: 'Beautiful blooms',
                        action: 'admire',
                        effects: ['beauty', 'nature'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 50, y: 200, width: 100, height: 150 }
                    },
                    'flowers-mixed': {
                        name: 'Mixed Flowers',
                        description: 'Colorful garden',
                        action: 'admire',
                        effects: ['beauty', 'color'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 150, y: 400, width: 200, height: 100 }
                    },
                    'flowers-orange': {
                        name: 'Orange Flowers',
                        description: 'Warm blooms',
                        action: 'admire',
                        effects: ['beauty', 'warmth'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 500, y: 300, width: 150, height: 120 }
                    },
                    'wooden-fence': {
                        name: 'Wooden Fence',
                        description: 'Garden boundary',
                        action: 'examine',
                        effects: ['boundary', 'structure'],
                        sound: 'object-click',
                        animation: 'structureGlow',
                        clickableArea: { x: 300, y: 200, width: 300, height: 80 }
                    },
                    'stone-path': {
                        name: 'Stone Path',
                        description: 'Garden walkway',
                        action: 'follow',
                        effects: ['path', 'journey'],
                        sound: 'object-click',
                        animation: 'pathGlow',
                        clickableArea: { x: 200, y: 500, width: 200, height: 100 }
                    },
                    'large-tree': {
                        name: 'Large Tree',
                        description: 'Ancient guardian',
                        action: 'admire',
                        effects: ['wisdom', 'nature'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        clickableArea: { x: 600, y: 100, width: 200, height: 300 }
                    }
                }
            }
        };
        
        this.activeObjects = new Map();
        this.interactionHistory = [];
        this.maxHistorySize = 50;
        this.isDarkMode = false;
        this.currentRoom = 'living-room';
        
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
        const roomElement = event.target;
        const roomId = roomElement.closest('.room').id;
        const roomData = this.rooms[roomId];
        
        if (!roomData) return;
        
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
            this.handleObjectClick(clickedObject, roomId);
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
            if (objectData.action === 'ignite' || objectData.action === 'illuminate') {
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
            if (objectData.action === 'ignite' || objectData.action === 'illuminate') {
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
            totalInteractions: this.interactionHistory.length
        };
        
        for (const [roomName, roomData] of Object.entries(this.rooms)) {
            stats.totalObjects += Object.keys(roomData.objects).length;
            
            const roomActiveObjects = this.activeObjects.get(roomName);
            for (const [objectName, objectState] of roomActiveObjects) {
                if (objectState.isActive) {
                    stats.activeObjects++;
                }
            }
        }
        
        return stats;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoomObjectOverlay;
}
