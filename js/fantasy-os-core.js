/**
 * Fantasy OS - Core Framework
 * Core FantasyOS class and framework utilities
 * Created: 2025-10-25T12:04:17.000Z
 */

/**
 * Core FantasyOS framework class
 */
class FantasyOSCore {
    constructor() {
        this.name = 'FantasyOS Core';
        this.version = '1.0.0';
        this.config = {
            debug: false,
            animations: true,
            sounds: true,
            particles: true
        };
        
        this.eventBus = new EventBus();
        this.componentRegistry = new Map();
        this.pluginRegistry = new Map();
    }
    
    /**
     * Initialize the core framework
     */
    init(config = {}) {
        this.config = { ...this.config, ...config };
        
        if (this.config.debug) {
            console.log('🧙‍♂️ FantasyOS Core initialized');
        }
        
        return this;
    }
    
    /**
     * Register a component
     */
    registerComponent(name, component) {
        this.componentRegistry.set(name, component);
        
        if (this.config.debug) {
            console.log(`📦 Component registered: ${name}`);
        }
        
        return this;
    }
    
    /**
     * Get a registered component
     */
    getComponent(name) {
        return this.componentRegistry.get(name);
    }
    
    /**
     * Register a plugin
     */
    registerPlugin(name, plugin) {
        this.pluginRegistry.set(name, plugin);
        
        if (this.config.debug) {
            console.log(`🔌 Plugin registered: ${name}`);
        }
        
        return this;
    }
    
    /**
     * Get a registered plugin
     */
    getPlugin(name) {
        return this.pluginRegistry.get(name);
    }
    
    /**
     * Emit an event
     */
    emit(event, data) {
        this.eventBus.emit(event, data);
        return this;
    }
    
    /**
     * Listen to an event
     */
    on(event, callback) {
        this.eventBus.on(event, callback);
        return this;
    }
    
    /**
     * Remove event listener
     */
    off(event, callback) {
        this.eventBus.off(event, callback);
        return this;
    }
}

/**
 * Simple event bus implementation
 */
class EventBus {
    constructor() {
        this.events = new Map();
    }
    
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    }
    
    off(event, callback) {
        if (this.events.has(event)) {
            const callbacks = this.events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }
}

/**
 * Base component class
 */
class FantasyComponent {
    constructor(name, options = {}) {
        this.name = name;
        this.options = options;
        this.element = null;
        this.isInitialized = false;
    }
    
    /**
     * Initialize the component
     */
    init(element) {
        this.element = element;
        this.isInitialized = true;
        this.onInit();
        return this;
    }
    
    /**
     * Override in subclasses
     */
    onInit() {
        // Override in subclasses
    }
    
    /**
     * Destroy the component
     */
    destroy() {
        this.onDestroy();
        this.element = null;
        this.isInitialized = false;
    }
    
    /**
     * Override in subclasses
     */
    onDestroy() {
        // Override in subclasses
    }
}

/**
 * Fantasy theme utilities
 */
class FantasyTheme {
    static colors = {
        warmGold: '#D4AF37',
        warmOrange: '#FF8C00',
        warmRed: '#DC143C',
        coolBlue: '#4169E1',
        coolSilver: '#C0C0C0',
        coolWhite: '#F8F8FF',
        earthBrown: '#8B4513',
        earthGreen: '#228B22',
        earthBeige: '#F5DEB3',
        magicPurple: '#9370DB',
        magicPink: '#FF69B4',
        magicCyan: '#00CED1'
    };
    
    static fonts = {
        header: 'Cinzel, serif',
        ui: 'MedievalSharp, cursive',
        text: 'Crimson Text, serif'
    };
    
    /**
     * Get a random fantasy color
     */
    static getRandomColor() {
        const colors = Object.values(this.colors);
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    /**
     * Create a fantasy gradient
     */
    static createGradient(color1, color2, direction = '45deg') {
        return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
    }
    
    /**
     * Create a magic glow effect
     */
    static createGlow(color, intensity = 'medium') {
        const intensities = {
            low: '0 0 5px',
            medium: '0 0 10px',
            high: '0 0 20px'
        };
        
        return `${intensities[intensity]} ${color}`;
    }
}

/**
 * Fantasy animation utilities
 */
class FantasyAnimations {
    static animations = {
        fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
            duration: '0.5s',
            easing: 'ease-in'
        },
        slideIn: {
            from: { transform: 'translateY(-20px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
            duration: '0.3s',
            easing: 'ease-out'
        },
        magicPulse: {
            from: { transform: 'scale(1)', opacity: 0.8 },
            to: { transform: 'scale(1.1)', opacity: 1 },
            duration: '1s',
            easing: 'ease-in-out',
            iteration: 'infinite',
            direction: 'alternate'
        },
        sparkle: {
            from: { transform: 'rotate(0deg) scale(1)', opacity: 0 },
            to: { transform: 'rotate(360deg) scale(1.2)', opacity: 1 },
            duration: '2s',
            easing: 'ease-in-out'
        }
    };
    
    /**
     * Apply animation to element
     */
    static applyAnimation(element, animationName) {
        const animation = this.animations[animationName];
        if (!animation) return;
        
        const keyframes = `
            @keyframes ${animationName} {
                from { ${this.objectToCSS(animation.from)} }
                to { ${this.objectToCSS(animation.to)} }
            }
        `;
        
        // Add keyframes to document if not already present
        if (!document.querySelector(`style[data-animation="${animationName}"]`)) {
            const style = document.createElement('style');
            style.setAttribute('data-animation', animationName);
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        // Apply animation to element
        element.style.animation = `${animationName} ${animation.duration} ${animation.easing}`;
        if (animation.iteration) {
            element.style.animationIterationCount = animation.iteration;
        }
        if (animation.direction) {
            element.style.animationDirection = animation.direction;
        }
    }
    
    /**
     * Convert object to CSS string
     */
    static objectToCSS(obj) {
        return Object.entries(obj)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');
    }
}

/**
 * Fantasy sound utilities
 */
class FantasySounds {
    static sounds = {
        spellCast: 'assets/sounds/actions/spell-cast.mp3',
        roomChange: 'assets/sounds/actions/room-change.mp3',
        objectClick: 'assets/sounds/actions/object-click.mp3',
        magicSuccess: 'assets/sounds/actions/magic-success.mp3',
        magicFail: 'assets/sounds/actions/magic-fail.mp3'
    };
    
    static audioContext = null;
    static isEnabled = true;
    
    /**
     * Initialize audio context
     */
    static init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    /**
     * Play a sound
     */
    static play(soundName, volume = 0.5) {
        if (!this.isEnabled) return;
        
        const soundPath = this.sounds[soundName];
        if (!soundPath) return;
        
        const audio = new Audio(soundPath);
        audio.volume = volume;
        audio.play().catch(error => {
            console.warn(`Could not play sound ${soundName}:`, error);
        });
    }
    
    /**
     * Enable/disable sounds
     */
    static setEnabled(enabled) {
        this.isEnabled = enabled;
    }
}

// Initialize core framework
const fantasyOSCore = new FantasyOSCore();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FantasyOSCore,
        EventBus,
        FantasyComponent,
        FantasyTheme,
        FantasyAnimations,
        FantasySounds
    };
}
