/**
 * Fantasy OS - Particle System
 * Creates magical particle effects throughout the application
 * Created: 2025-10-25T12:04:17.000Z
 */

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 50;
        this.isRunning = false;
        this.animationId = null;
        
        this.particleTypes = {
            sparkle: {
                color: '#D4AF37',
                size: 2,
                speed: 1,
                life: 3000,
                gravity: 0.02
            },
            magic: {
                color: '#9370DB',
                size: 3,
                speed: 0.8,
                life: 4000,
                gravity: 0.01
            },
            fire: {
                color: '#FF8C00',
                size: 4,
                speed: 1.2,
                life: 2000,
                gravity: -0.01
            },
            ice: {
                color: '#00CED1',
                size: 2,
                speed: 0.6,
                life: 5000,
                gravity: 0.03
            }
        };
        
        this.emitters = [];
        this.canvas = null;
        this.context = null;
    }
    
    /**
     * Initialize the particle system
     */
    init() {
        // Create particle canvas
        this.createParticleCanvas();
        
        // Set up existing particle elements
        this.setupExistingParticles();
        
        console.log('✨ Particle system initialized');
        return true;
    }
    
    /**
     * Create particle canvas for dynamic particles
     */
    createParticleCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particleCanvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
        `;
        
        document.body.appendChild(this.canvas);
        
        this.context = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    /**
     * Resize canvas to match window
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    /**
     * Setup existing particle elements
     */
    setupExistingParticles() {
        const existingParticles = document.querySelectorAll('.particle');
        existingParticles.forEach((particle, index) => {
            this.animateExistingParticle(particle, index);
        });
    }
    
    /**
     * Animate existing particle elements
     */
    animateExistingParticle(particle, index) {
        const delay = index * 2000; // Stagger animations
        
        setTimeout(() => {
            this.startParticleAnimation(particle);
        }, delay);
    }
    
    /**
     * Start animation for a particle element
     */
    startParticleAnimation(particle) {
        const animation = () => {
            // Reset particle position
            particle.style.transform = 'translateY(100vh) rotate(0deg)';
            particle.style.opacity = '0';
            
            // Animate particle
            particle.style.transition = 'all 8s linear';
            particle.style.transform = 'translateY(-100px) rotate(360deg)';
            particle.style.opacity = '1';
            
            // Reset after animation
            setTimeout(() => {
                particle.style.transition = 'none';
                particle.style.transform = 'translateY(100vh) rotate(0deg)';
                particle.style.opacity = '0';
                
                // Restart animation
                setTimeout(animation, Math.random() * 2000);
            }, 8000);
        };
        
        animation();
    }
    
    /**
     * Start the particle system
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.animate();
        
        console.log('🌟 Particle system started');
    }
    
    /**
     * Stop the particle system
     */
    stop() {
        this.isRunning = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        console.log('🌙 Particle system stopped');
    }
    
    /**
     * Main animation loop
     */
    animate() {
        if (!this.isRunning) return;
        
        // Check if context is available
        if (!this.context || !this.canvas) {
            console.warn('Particle system context not available');
            return;
        }
        
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.updateParticles();
        this.drawParticles();
        
        // Spawn new particles
        this.spawnParticles();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Update all particles
     */
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.life -= 16; // Assuming 60fps
            particle.alpha = particle.life / particle.maxLife;
            
            // Remove dead particles
            if (particle.life <= 0 || particle.y > this.canvas.height + 50) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    /**
     * Draw all particles
     */
    drawParticles() {
        this.particles.forEach(particle => {
            this.context.save();
            this.context.globalAlpha = particle.alpha;
            this.context.fillStyle = particle.color;
            this.context.beginPath();
            this.context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.context.fill();
            
            // Add glow effect
            this.context.shadowColor = particle.color;
            this.context.shadowBlur = 10;
            this.context.fill();
            this.context.restore();
        });
    }
    
    /**
     * Spawn new particles
     */
    spawnParticles() {
        if (this.particles.length >= this.maxParticles) return;
        
        // Spawn particles from emitters
        this.emitters.forEach(emitter => {
            if (Math.random() < emitter.rate) {
                this.createParticle(emitter);
            }
        });
        
        // Spawn random ambient particles
        if (Math.random() < 0.02) {
            this.createRandomParticle();
        }
    }
    
    /**
     * Create a particle from emitter
     */
    createParticle(emitter) {
        const type = this.particleTypes[emitter.type] || this.particleTypes.sparkle;
        
        const particle = {
            x: emitter.x + (Math.random() - 0.5) * emitter.width,
            y: emitter.y + (Math.random() - 0.5) * emitter.height,
            vx: (Math.random() - 0.5) * type.speed * 2,
            vy: -Math.random() * type.speed - 0.5,
            color: type.color,
            size: type.size + Math.random() * 2,
            life: type.life + Math.random() * 1000,
            maxLife: type.life,
            alpha: 1,
            gravity: type.gravity
        };
        
        this.particles.push(particle);
    }
    
    /**
     * Create a random ambient particle
     */
    createRandomParticle() {
        const types = Object.keys(this.particleTypes);
        const typeName = types[Math.floor(Math.random() * types.length)];
        const type = this.particleTypes[typeName];
        
        const particle = {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            vx: (Math.random() - 0.5) * type.speed,
            vy: -Math.random() * type.speed - 0.5,
            color: type.color,
            size: type.size + Math.random() * 2,
            life: type.life + Math.random() * 1000,
            maxLife: type.life,
            alpha: 1,
            gravity: type.gravity
        };
        
        this.particles.push(particle);
    }
    
    /**
     * Add particle emitter
     */
    addEmitter(x, y, width, height, type, rate) {
        const emitter = {
            x,
            y,
            width: width || 50,
            height: height || 50,
            type: type || 'sparkle',
            rate: rate || 0.1
        };
        
        this.emitters.push(emitter);
        return emitter;
    }
    
    /**
     * Remove particle emitter
     */
    removeEmitter(emitter) {
        const index = this.emitters.indexOf(emitter);
        if (index > -1) {
            this.emitters.splice(index, 1);
        }
    }
    
    /**
     * Create particle burst effect
     */
    createBurst(x, y, count, type) {
        const particleType = this.particleTypes[type] || this.particleTypes.sparkle;
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = particleType.speed + Math.random() * 2;
            
            const particle = {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: particleType.color,
                size: particleType.size + Math.random() * 2,
                life: particleType.life + Math.random() * 1000,
                maxLife: particleType.life,
                alpha: 1,
                gravity: particleType.gravity
            };
            
            this.particles.push(particle);
        }
    }
    
    /**
     * Create spell effect particles
     */
    createSpellEffect(x, y, spellType) {
        const effects = {
            fire: { type: 'fire', count: 15 },
            ice: { type: 'ice', count: 12 },
            magic: { type: 'magic', count: 20 },
            light: { type: 'sparkle', count: 10 }
        };
        
        const effect = effects[spellType] || effects.magic;
        this.createBurst(x, y, effect.count, effect.type);
    }
    
    /**
     * Create object interaction particles
     */
    createObjectEffect(objectType, x, y) {
        const effects = {
            fireplace: 'fire',
            lamp: 'light',
            'crystal-ball': 'magic',
            cauldron: 'magic',
            chest: 'sparkle',
            'spell-book': 'magic'
        };
        
        const effectType = effects[objectType] || 'sparkle';
        this.createSpellEffect(x, y, effectType);
    }
    
    /**
     * Set particle system settings
     */
    setSettings(settings) {
        if (settings.maxParticles !== undefined) {
            this.maxParticles = settings.maxParticles;
        }
        
        if (settings.enabled !== undefined) {
            if (settings.enabled) {
                this.start();
            } else {
                this.stop();
            }
        }
    }
    
    /**
     * Get particle system statistics
     */
    getStats() {
        return {
            activeParticles: this.particles.length,
            maxParticles: this.maxParticles,
            emitters: this.emitters.length,
            isRunning: this.isRunning
        };
    }
    
    /**
     * Clear all particles
     */
    clearParticles() {
        this.particles = [];
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Destroy the particle system
     */
    destroy() {
        this.stop();
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.particles = [];
        this.emitters = [];
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleSystem;
}
