/**
 * Fantasy OS - Enhanced Object Interaction System
 * Handles interactions with extracted room objects
 * Created: 2024-12-19T12:00:00.000Z
 */

class EnhancedObjectInteraction {
    constructor() {
        this.rooms = {
            'living-room': {
                name: 'Living Room',
                objects: {
                    'fireplace': {
                        name: 'Fireplace',
                        description: 'Warm hearth for energy and light',
                        action: 'ignite',
                        effects: ['fire', 'warmth', 'light'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        position: { top: '20%', left: '10%' },
                        size: { width: '200px', height: '300px' },
                        darkMode: true
                    },
                    'wall-lamp': {
                        name: 'Wall Lamp',
                        description: 'Oil lamp for ambient lighting',
                        action: 'illuminate',
                        effects: ['light', 'ambient'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { top: '15%', left: '15%' },
                        size: { width: '80px', height: '120px' },
                        darkMode: true
                    },
                    'bookshelf': {
                        name: 'Bookshelf',
                        description: 'Knowledge repository',
                        action: 'browse',
                        effects: ['knowledge', 'storage'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        position: { top: '10%', right: '20%' },
                        size: { width: '150px', height: '400px' },
                        darkMode: true
                    },
                    'round-door': {
                        name: 'Round Door',
                        description: 'Portal to other rooms',
                        action: 'open',
                        effects: ['portal', 'navigation'],
                        sound: 'room-change',
                        animation: 'magicPulse',
                        position: { top: '15%', right: '10%' },
                        size: { width: '200px', height: '300px' },
                        darkMode: true
                    },
                    'armchair': {
                        name: 'Armchair',
                        description: 'Comfortable seating',
                        action: 'sit',
                        effects: ['comfort', 'rest'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        position: { bottom: '30%', right: '25%' },
                        size: { width: '120px', height: '150px' },
                        darkMode: true
                    },
                    'round-table': {
                        name: 'Round Table',
                        description: 'Workspace surface',
                        action: 'use',
                        effects: ['workspace', 'utility'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        position: { bottom: '20%', right: '30%' },
                        size: { width: '100px', height: '80px' },
                        darkMode: true
                    },
                    'table-lamp': {
                        name: 'Table Lamp',
                        description: 'Focused reading light',
                        action: 'illuminate',
                        effects: ['light', 'focus'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { bottom: '25%', right: '28%' },
                        size: { width: '60px', height: '100px' },
                        darkMode: true
                    }
                }
            },
            'kitchen': {
                name: 'Kitchen',
                objects: {
                    'fireplace': {
                        name: 'Kitchen Fireplace',
                        description: 'Cooking hearth',
                        action: 'ignite',
                        effects: ['fire', 'cooking'],
                        sound: 'fireplace-ignite',
                        animation: 'fireFlicker',
                        position: { top: '20%', left: '10%' },
                        size: { width: '200px', height: '300px' },
                        darkMode: true
                    },
                    'oil-lamp': {
                        name: 'Oil Lamp',
                        description: 'Kitchen lighting',
                        action: 'illuminate',
                        effects: ['light', 'cooking'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { top: '15%', left: '15%' },
                        size: { width: '60px', height: '100px' },
                        darkMode: true
                    },
                    'shelves': {
                        name: 'Kitchen Shelves',
                        description: 'Storage for ingredients',
                        action: 'browse',
                        effects: ['storage', 'ingredients'],
                        sound: 'object-click',
                        animation: 'storageGlow',
                        position: { top: '10%', left: '30%' },
                        size: { width: '400px', height: '200px' },
                        darkMode: true
                    },
                    'hanging-pots': {
                        name: 'Hanging Pots',
                        description: 'Cooking utensils',
                        action: 'use',
                        effects: ['cooking', 'tools'],
                        sound: 'object-click',
                        animation: 'toolGlow',
                        position: { top: '30%', left: '35%' },
                        size: { width: '300px', height: '100px' },
                        darkMode: true
                    },
                    'round-table': {
                        name: 'Kitchen Table',
                        description: 'Dining surface',
                        action: 'use',
                        effects: ['dining', 'preparation'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        position: { bottom: '20%', left: '20%' },
                        size: { width: '150px', height: '120px' },
                        darkMode: true
                    },
                    'fruit-bowl': {
                        name: 'Fruit Bowl',
                        description: 'Fresh ingredients',
                        action: 'examine',
                        effects: ['food', 'freshness'],
                        sound: 'object-click',
                        animation: 'foodGlow',
                        position: { bottom: '25%', left: '22%' },
                        size: { width: '80px', height: '60px' },
                        darkMode: true
                    },
                    'chairs': {
                        name: 'Kitchen Chairs',
                        description: 'Seating for meals',
                        action: 'sit',
                        effects: ['comfort', 'dining'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        position: { bottom: '15%', left: '15%' },
                        size: { width: '250px', height: '100px' },
                        darkMode: true
                    },
                    'window': {
                        name: 'Kitchen Window',
                        description: 'View to the outside',
                        action: 'gaze',
                        effects: ['view', 'nature'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        position: { top: '15%', left: '40%' },
                        size: { width: '120px', height: '150px' },
                        darkMode: true
                    }
                }
            },
            'library': {
                name: 'Library',
                objects: {
                    'left-bookshelf': {
                        name: 'Left Bookshelf',
                        description: 'Ancient knowledge collection',
                        action: 'browse',
                        effects: ['knowledge', 'ancient'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        position: { top: '10%', left: '5%' },
                        size: { width: '200px', height: '400px' },
                        darkMode: true
                    },
                    'right-bookshelf': {
                        name: 'Right Bookshelf',
                        description: 'Modern knowledge collection',
                        action: 'browse',
                        effects: ['knowledge', 'modern'],
                        sound: 'book-open',
                        animation: 'bookGlow',
                        position: { top: '10%', right: '5%' },
                        size: { width: '150px', height: '400px' },
                        darkMode: true
                    },
                    'armchair': {
                        name: 'Reading Chair',
                        description: 'Comfortable reading spot',
                        action: 'sit',
                        effects: ['comfort', 'reading'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        position: { bottom: '30%', right: '20%' },
                        size: { width: '120px', height: '150px' },
                        darkMode: true
                    },
                    'small-table': {
                        name: 'Reading Table',
                        description: 'Surface for books',
                        action: 'use',
                        effects: ['workspace', 'reading'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        position: { bottom: '20%', right: '25%' },
                        size: { width: '100px', height: '80px' },
                        darkMode: true
                    },
                    'oil-lamp': {
                        name: 'Reading Lamp',
                        description: 'Focused reading light',
                        action: 'illuminate',
                        effects: ['light', 'reading'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { bottom: '25%', right: '27%' },
                        size: { width: '60px', height: '100px' },
                        darkMode: true
                    },
                    'round-window': {
                        name: 'Library Window',
                        description: 'Portal to knowledge',
                        action: 'gaze',
                        effects: ['vision', 'knowledge'],
                        sound: 'crystal-ball',
                        animation: 'magicPulse',
                        position: { top: '15%', left: '50%' },
                        size: { width: '150px', height: '150px' },
                        darkMode: true
                    },
                    'curtain': {
                        name: 'Window Curtain',
                        description: 'Privacy control',
                        action: 'adjust',
                        effects: ['privacy', 'lighting'],
                        sound: 'object-click',
                        animation: 'adjustGlow',
                        position: { top: '15%', left: '30%' },
                        size: { width: '50px', height: '200px' },
                        darkMode: true
                    }
                }
            },
            'workshop': {
                name: 'Workshop',
                objects: {
                    'workbench-1': {
                        name: 'Main Workbench',
                        description: 'Primary crafting station',
                        action: 'craft',
                        effects: ['crafting', 'creation'],
                        sound: 'object-click',
                        animation: 'craftGlow',
                        position: { bottom: '20%', left: '10%' },
                        size: { width: '200px', height: '100px' },
                        darkMode: true
                    },
                    'workbench-2': {
                        name: 'Secondary Workbench',
                        description: 'Additional workspace',
                        action: 'use',
                        effects: ['workspace', 'utility'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        position: { bottom: '30%', left: '40%' },
                        size: { width: '300px', height: '120px' },
                        darkMode: true
                    },
                    'hanging-tools': {
                        name: 'Hanging Tools',
                        description: 'Crafting implements',
                        action: 'use',
                        effects: ['tools', 'crafting'],
                        sound: 'object-click',
                        animation: 'toolGlow',
                        position: { top: '20%', left: '5%' },
                        size: { width: '150px', height: '200px' },
                        darkMode: true
                    },
                    'shelves': {
                        name: 'Tool Shelves',
                        description: 'Storage for materials',
                        action: 'browse',
                        effects: ['storage', 'materials'],
                        sound: 'object-click',
                        animation: 'storageGlow',
                        position: { top: '10%', left: '30%' },
                        size: { width: '400px', height: '150px' },
                        darkMode: true
                    },
                    'wooden-crates': {
                        name: 'Wooden Crates',
                        description: 'Material storage',
                        action: 'open',
                        effects: ['storage', 'materials'],
                        sound: 'chest-open',
                        animation: 'storageGlow',
                        position: { bottom: '20%', left: '20%' },
                        size: { width: '100px', height: '80px' },
                        darkMode: true
                    },
                    'stool': {
                        name: 'Work Stool',
                        description: 'Crafting seating',
                        action: 'sit',
                        effects: ['comfort', 'crafting'],
                        sound: 'object-click',
                        animation: 'comfortGlow',
                        position: { bottom: '15%', left: '15%' },
                        size: { width: '60px', height: '60px' },
                        darkMode: true
                    },
                    'wall-lantern-left': {
                        name: 'Left Lantern',
                        description: 'Workshop lighting',
                        action: 'illuminate',
                        effects: ['light', 'workspace'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { top: '15%', left: '5%' },
                        size: { width: '80px', height: '120px' },
                        darkMode: true
                    },
                    'wall-lantern-right': {
                        name: 'Right Lantern',
                        description: 'Additional lighting',
                        action: 'illuminate',
                        effects: ['light', 'workspace'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { top: '15%', right: '5%' },
                        size: { width: '80px', height: '120px' },
                        darkMode: true
                    }
                }
            },
            'bedroom': {
                name: 'Bedroom',
                objects: {
                    'bed': {
                        name: 'Bed',
                        description: 'Rest and recovery',
                        action: 'rest',
                        effects: ['rest', 'recovery'],
                        sound: 'object-click',
                        animation: 'restGlow',
                        position: { bottom: '20%', right: '20%' },
                        size: { width: '200px', height: '300px' },
                        darkMode: false
                    },
                    'nightstand': {
                        name: 'Nightstand',
                        description: 'Bedside storage',
                        action: 'use',
                        effects: ['storage', 'bedside'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        position: { bottom: '25%', right: '25%' },
                        size: { width: '80px', height: '100px' },
                        darkMode: false
                    },
                    'oil-lamp': {
                        name: 'Bedside Lamp',
                        description: 'Gentle night light',
                        action: 'illuminate',
                        effects: ['light', 'gentle'],
                        sound: 'lamp-on',
                        animation: 'lightGlow',
                        position: { bottom: '30%', right: '27%' },
                        size: { width: '60px', height: '100px' },
                        darkMode: false
                    },
                    'round-window': {
                        name: 'Bedroom Window',
                        description: 'View to the stars',
                        action: 'gaze',
                        effects: ['view', 'stars'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        position: { top: '15%', left: '10%' },
                        size: { width: '150px', height: '150px' },
                        darkMode: false
                    },
                    'curtains': {
                        name: 'Window Curtains',
                        description: 'Privacy and darkness',
                        action: 'adjust',
                        effects: ['privacy', 'darkness'],
                        sound: 'object-click',
                        animation: 'adjustGlow',
                        position: { top: '15%', left: '5%' },
                        size: { width: '200px', height: '200px' },
                        darkMode: false
                    },
                    'small-table': {
                        name: 'Bedside Table',
                        description: 'Additional surface',
                        action: 'use',
                        effects: ['workspace', 'bedside'],
                        sound: 'object-click',
                        animation: 'utilityGlow',
                        position: { bottom: '20%', left: '20%' },
                        size: { width: '100px', height: '80px' },
                        darkMode: false
                    }
                }
            },
            'garden': {
                name: 'Garden',
                objects: {
                    'round-door': {
                        name: 'Garden Door',
                        description: 'Portal to nature',
                        action: 'open',
                        effects: ['portal', 'nature'],
                        sound: 'room-change',
                        animation: 'natureGlow',
                        position: { top: '30%', left: '20%' },
                        size: { width: '200px', height: '300px' },
                        darkMode: false
                    },
                    'round-window-left': {
                        name: 'Left Window',
                        description: 'Garden view',
                        action: 'gaze',
                        effects: ['view', 'nature'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        position: { top: '25%', left: '10%' },
                        size: { width: '80px', height: '80px' },
                        darkMode: false
                    },
                    'round-window-right': {
                        name: 'Right Window',
                        description: 'Garden view',
                        action: 'gaze',
                        effects: ['view', 'nature'],
                        sound: 'object-click',
                        animation: 'viewGlow',
                        position: { top: '25%', right: '10%' },
                        size: { width: '80px', height: '80px' },
                        darkMode: false
                    },
                    'flowers-red': {
                        name: 'Red Flowers',
                        description: 'Beautiful blooms',
                        action: 'admire',
                        effects: ['beauty', 'nature'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        position: { top: '20%', left: '5%' },
                        size: { width: '100px', height: '150px' },
                        darkMode: false
                    },
                    'flowers-mixed': {
                        name: 'Mixed Flowers',
                        description: 'Colorful garden',
                        action: 'admire',
                        effects: ['beauty', 'color'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        position: { bottom: '40%', left: '15%' },
                        size: { width: '200px', height: '100px' },
                        darkMode: false
                    },
                    'flowers-orange': {
                        name: 'Orange Flowers',
                        description: 'Warm blooms',
                        action: 'admire',
                        effects: ['beauty', 'warmth'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        position: { top: '30%', right: '20%' },
                        size: { width: '150px', height: '120px' },
                        darkMode: false
                    },
                    'wooden-fence': {
                        name: 'Wooden Fence',
                        description: 'Garden boundary',
                        action: 'examine',
                        effects: ['boundary', 'structure'],
                        sound: 'object-click',
                        animation: 'structureGlow',
                        position: { top: '20%', left: '30%' },
                        size: { width: '300px', height: '80px' },
                        darkMode: false
                    },
                    'stone-path': {
                        name: 'Stone Path',
                        description: 'Garden walkway',
                        action: 'follow',
                        effects: ['path', 'journey'],
                        sound: 'object-click',
                        animation: 'pathGlow',
                        position: { bottom: '50%', left: '20%' },
                        size: { width: '200px', height: '100px' },
                        darkMode: false
                    },
                    'large-tree': {
                        name: 'Large Tree',
                        description: 'Ancient guardian',
                        action: 'admire',
                        effects: ['wisdom', 'nature'],
                        sound: 'object-click',
                        animation: 'natureGlow',
                        position: { top: '10%', right: '5%' },
                        size: { width: '200px', height: '300px' },
                        darkMode: false
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
        console.log('🎯 Initializing Enhanced Object Interaction System...');
        
        // Set up object event listeners
        this.setupObjectEventListeners();
        
        // Initialize object states
        this.initializeObjectStates();
        
        console.log('✨ Enhanced Object Interaction System initialized!');
    }
    
    /**
     * Set up event listeners for objects
     */
    setupObjectEventListeners() {
        // This will be called when objects are dynamically created
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('room-object')) {
                const objectType = e.target.dataset.objectType;
                const room = e.target.dataset.room;
                this.handleObjectClick(objectType, room);
            }
        });
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('room-object')) {
                this.handleObjectHover(e.target, true);
            }
        });
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains('room-object')) {
                this.handleObjectHover(e.target, false);
            }
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
     * Handle object click event
     */
    handleObjectClick(objectType, room) {
        const roomData = this.rooms[room];
        if (!roomData) {
            console.warn(`Room ${room} not found`);
            return false;
        }
        
        const objectData = roomData.objects[objectType];
        if (!objectData) {
            console.warn(`Object ${objectType} not found in room ${room}`);
            return false;
        }
        
        console.log(`🎯 Interacting with ${objectData.name} in ${roomData.name}`);
        
        // Update object state
        const objectState = this.activeObjects.get(room).get(objectType);
        objectState.isActive = !objectState.isActive;
        objectState.lastInteraction = new Date().toISOString();
        objectState.interactionCount++;
        
        // Add to interaction history
        this.addToHistory(room, objectType, 'click');
        
        // Execute object action
        this.executeObjectAction(objectType, room);
        
        // Play interaction sound
        this.playObjectSound(objectType, room);
        
        // Trigger object animation
        this.triggerObjectAnimation(objectType, room);
        
        // Show interaction feedback
        this.showInteractionFeedback(objectType, room);
        
        return true;
    }
    
    /**
     * Handle object hover event
     */
    handleObjectHover(objectElement, isHovering) {
        if (isHovering) {
            objectElement.classList.add('object-hover');
            this.showObjectTooltip(objectElement);
        } else {
            objectElement.classList.remove('object-hover');
            this.hideObjectTooltip(objectElement);
        }
    }
    
    /**
     * Execute object action
     */
    executeObjectAction(objectType, room) {
        const objectData = this.rooms[room].objects[objectType];
        if (!objectData) return;
        
        const objectState = this.activeObjects.get(room).get(objectType);
        const isActive = objectState.isActive;
        
        switch (objectData.action) {
            case 'ignite':
                this.handleFireplaceAction(room, objectType, isActive);
                break;
            case 'illuminate':
                this.handleLampAction(room, objectType, isActive);
                break;
            case 'browse':
                this.handleBrowseAction(room, objectType, isActive);
                break;
            case 'sit':
                this.handleSitAction(room, objectType, isActive);
                break;
            case 'use':
                this.handleUseAction(room, objectType, isActive);
                break;
            case 'gaze':
                this.handleGazeAction(room, objectType, isActive);
                break;
            case 'craft':
                this.handleCraftAction(room, objectType, isActive);
                break;
            case 'rest':
                this.handleRestAction(room, objectType, isActive);
                break;
            case 'admire':
                this.handleAdmireAction(room, objectType, isActive);
                break;
            default:
                console.log(`Unknown action: ${objectData.action}`);
        }
    }
    
    /**
     * Handle fireplace actions
     */
    handleFireplaceAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
        if (isActive) {
            console.log(`🔥 ${objectData.name} ignited!`);
            this.showMessage(`${objectData.name} is now burning brightly!`);
        } else {
            console.log(`❄️ ${objectData.name} extinguished`);
            this.showMessage(`${objectData.name} has been extinguished.`);
        }
    }
    
    /**
     * Handle lamp actions
     */
    handleLampAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
        if (isActive) {
            console.log(`💡 ${objectData.name} illuminated!`);
            this.showMessage(`${objectData.name} is now providing light!`);
        } else {
            console.log(`🌙 ${objectData.name} dimmed`);
            this.showMessage(`${objectData.name} has been dimmed.`);
        }
    }
    
    /**
     * Handle browse actions
     */
    handleBrowseAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
        console.log(`📖 Browsing ${objectData.name}...`);
        this.showMessage(`Exploring ${objectData.name}...`);
    }
    
    /**
     * Handle sit actions
     */
    handleSitAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
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
    handleUseAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
        console.log(`🔧 Using ${objectData.name}...`);
        this.showMessage(`Using ${objectData.name}...`);
    }
    
    /**
     * Handle gaze actions
     */
    handleGazeAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
        console.log(`👁️ Gazing through ${objectData.name}...`);
        this.showMessage(`You gaze through ${objectData.name}...`);
    }
    
    /**
     * Handle craft actions
     */
    handleCraftAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
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
    handleRestAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
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
    handleAdmireAction(room, objectType, isActive) {
        const objectData = this.rooms[room].objects[objectType];
        console.log(`🌸 Admiring ${objectData.name}...`);
        this.showMessage(`You admire the beauty of ${objectData.name}.`);
    }
    
    /**
     * Play object-specific sound
     */
    playObjectSound(objectType, room) {
        const objectData = this.rooms[room].objects[objectType];
        if (!objectData || !objectData.sound) return;
        
        if (typeof FantasySounds !== 'undefined') {
            FantasySounds.play(objectData.sound);
        }
    }
    
    /**
     * Trigger object-specific animation
     */
    triggerObjectAnimation(objectType, room) {
        const objectData = this.rooms[room].objects[objectType];
        if (!objectData || !objectData.animation) return;
        
        const objectElement = document.querySelector(`[data-room="${room}"][data-object-type="${objectType}"]`);
        if (!objectElement) return;
        
        objectElement.classList.add(`animate-${objectData.animation}`);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            objectElement.classList.remove(`animate-${objectData.animation}`);
        }, 2000);
    }
    
    /**
     * Show interaction feedback message
     */
    showInteractionFeedback(objectType, room) {
        const objectData = this.rooms[room].objects[objectType];
        if (!objectData) return;
        
        const message = `Interacting with ${objectData.name}: ${objectData.description}`;
        this.showMessage(message);
    }
    
    /**
     * Show object tooltip
     */
    showObjectTooltip(objectElement) {
        const room = objectElement.dataset.room;
        const objectType = objectElement.dataset.objectType;
        const objectData = this.rooms[room].objects[objectType];
        
        if (!objectData) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'object-tooltip';
        tooltip.textContent = `${objectData.name}: ${objectData.description}`;
        tooltip.style.cssText = `
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--magic-purple);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-family: 'MedievalSharp', cursive;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            animation: tooltipFadeIn 0.3s ease-out;
        `;
        
        objectElement.appendChild(tooltip);
    }
    
    /**
     * Hide object tooltip
     */
    hideObjectTooltip(objectElement) {
        const tooltip = objectElement.querySelector('.object-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    /**
     * Show a message to the user
     */
    showMessage(message, duration = 3000) {
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
    }
    
    /**
     * Add interaction to history
     */
    addToHistory(room, objectType, action) {
        const interaction = {
            room,
            objectType,
            action,
            timestamp: new Date().toISOString(),
            objectName: this.rooms[room].objects[objectType].name
        };
        
        this.interactionHistory.unshift(interaction);
        
        if (this.interactionHistory.length > this.maxHistorySize) {
            this.interactionHistory = this.interactionHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get object information
     */
    getObjectInfo(room, objectType) {
        const roomData = this.rooms[room];
        if (!roomData) return null;
        
        const objectData = roomData.objects[objectType];
        if (!objectData) return null;
        
        return {
            ...objectData,
            state: this.activeObjects.get(room).get(objectType)
        };
    }
    
    /**
     * Get all objects for a room
     */
    getRoomObjects(room) {
        const roomData = this.rooms[room];
        if (!roomData) return [];
        
        return Object.keys(roomData.objects).map(objectType => ({
            type: objectType,
            ...roomData.objects[objectType],
            state: this.activeObjects.get(room).get(objectType)
        }));
    }
    
    /**
     * Set dark mode
     */
    setDarkMode(enabled) {
        this.isDarkMode = enabled;
        console.log(`🌙 Dark mode ${enabled ? 'enabled' : 'disabled'}`);
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
    module.exports = EnhancedObjectInteraction;
}
