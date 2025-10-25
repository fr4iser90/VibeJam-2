/**
 * Fantasy OS - Sound System
 * Manages audio playback and sound effects
 * Created: 2025-10-25T12:04:17.000Z
 */

class SoundSystem {
    constructor() {
        this.sounds = {
            // Ambient sounds
            fireplace: {
                src: 'assets/sounds/ambient/fireplace.mp3',
                loop: true,
                volume: 0.3,
                type: 'ambient'
            },
            
            // Action sounds
            spellCast: {
                src: 'assets/sounds/actions/spell-cast.mp3',
                loop: false,
                volume: 0.7,
                type: 'action'
            },
            roomChange: {
                src: 'assets/sounds/actions/room-change.mp3',
                loop: false,
                volume: 0.6,
                type: 'action'
            },
            objectClick: {
                src: 'assets/sounds/actions/object-click.mp3',
                loop: false,
                volume: 0.5,
                type: 'action'
            },
            magicSuccess: {
                src: 'assets/sounds/actions/magic-success.mp3',
                loop: false,
                volume: 0.8,
                type: 'action'
            },
            magicFail: {
                src: 'assets/sounds/actions/magic-fail.mp3',
                loop: false,
                volume: 0.6,
                type: 'action'
            },
            gestureRecognized: {
                src: 'assets/sounds/actions/gesture-recognized.mp3',
                loop: false,
                volume: 0.7,
                type: 'action'
            },
            
            // Object-specific sounds
            fireplaceIgnite: {
                src: 'assets/sounds/actions/fireplace-ignite.mp3',
                loop: false,
                volume: 0.8,
                type: 'object'
            },
            lampOn: {
                src: 'assets/sounds/actions/lamp-on.mp3',
                loop: false,
                volume: 0.6,
                type: 'object'
            },
            chestOpen: {
                src: 'assets/sounds/actions/chest-open.mp3',
                loop: false,
                volume: 0.7,
                type: 'object'
            },
            crystalBall: {
                src: 'assets/sounds/actions/crystal-ball.mp3',
                loop: false,
                volume: 0.8,
                type: 'object'
            },
            bookOpen: {
                src: 'assets/sounds/actions/book-open.mp3',
                loop: false,
                volume: 0.5,
                type: 'object'
            },
            cauldronBubble: {
                src: 'assets/sounds/actions/cauldron-bubble.mp3',
                loop: true,
                volume: 0.4,
                type: 'object'
            }
        };
        
        this.audioElements = new Map();
        this.isEnabled = true;
        this.masterVolume = 0.7;
        this.ambientVolume = 0.3;
        this.effectVolume = 0.7;
        
        this.ambientSounds = new Set();
        this.initializeAudio();
    }
    
    /**
     * Initialize audio system
     */
    initializeAudio() {
        // Create audio elements for each sound
        Object.keys(this.sounds).forEach(soundKey => {
            const sound = this.sounds[soundKey];
            const audio = new Audio(sound.src);
            
            audio.loop = sound.loop;
            audio.volume = sound.volume * this.masterVolume;
            audio.preload = 'auto';
            
            this.audioElements.set(soundKey, audio);
        });
        
        console.log('🔊 Sound system initialized');
    }
    
    /**
     * Play a sound
     */
    play(soundKey, volume = null) {
        if (!this.isEnabled) return;
        
        const audio = this.audioElements.get(soundKey);
        if (!audio) {
            console.warn(`Sound ${soundKey} not found`);
            return;
        }
        
        try {
            // Set volume if specified
            if (volume !== null) {
                audio.volume = volume * this.masterVolume;
            } else {
                const sound = this.sounds[soundKey];
                audio.volume = sound.volume * this.masterVolume;
            }
            
            // Play the sound
            audio.currentTime = 0; // Reset to beginning
            audio.play().catch(error => {
                console.warn(`Could not play sound ${soundKey}:`, error);
            });
            
            console.log(`🔊 Playing sound: ${soundKey}`);
            
        } catch (error) {
            console.error(`Error playing sound ${soundKey}:`, error);
        }
    }
    
    /**
     * Stop a sound
     */
    stop(soundKey) {
        const audio = this.audioElements.get(soundKey);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    
    /**
     * Stop all sounds
     */
    stopAll() {
        this.audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        this.ambientSounds.clear();
    }
    
    /**
     * Play ambient sound
     */
    playAmbient(soundKey) {
        if (!this.isEnabled) return;
        
        const audio = this.audioElements.get(soundKey);
        if (!audio) return;
        
        const sound = this.sounds[soundKey];
        if (sound.type !== 'ambient') {
            console.warn(`Sound ${soundKey} is not an ambient sound`);
            return;
        }
        
        audio.volume = sound.volume * this.masterVolume * this.ambientVolume;
        audio.loop = true;
        
        audio.play().catch(error => {
            console.warn(`Could not play ambient sound ${soundKey}:`, error);
        });
        
        this.ambientSounds.add(soundKey);
        console.log(`🌊 Playing ambient sound: ${soundKey}`);
    }
    
    /**
     * Stop ambient sound
     */
    stopAmbient(soundKey) {
        const audio = this.audioElements.get(soundKey);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        this.ambientSounds.delete(soundKey);
    }
    
    /**
     * Stop all ambient sounds
     */
    stopAllAmbient() {
        this.ambientSounds.forEach(soundKey => {
            this.stopAmbient(soundKey);
        });
    }
    
    /**
     * Play spell cast sound
     */
    playSpellCast() {
        this.play('spellCast');
    }
    
    /**
     * Play room change sound
     */
    playRoomChange() {
        this.play('roomChange');
    }
    
    /**
     * Play object click sound
     */
    playObjectClick() {
        this.play('objectClick');
    }
    
    /**
     * Play magic success sound
     */
    playMagicSuccess() {
        this.play('magicSuccess');
    }
    
    /**
     * Play magic fail sound
     */
    playMagicFail() {
        this.play('magicFail');
    }
    
    /**
     * Play gesture recognized sound
     */
    playGestureRecognized() {
        this.play('gestureRecognized');
    }
    
    /**
     * Play fireplace ignite sound
     */
    playFireplaceIgnite() {
        this.play('fireplaceIgnite');
    }
    
    /**
     * Play lamp on sound
     */
    playLampOn() {
        this.play('lampOn');
    }
    
    /**
     * Play chest open sound
     */
    playChestOpen() {
        this.play('chestOpen');
    }
    
    /**
     * Play crystal ball sound
     */
    playCrystalBall() {
        this.play('crystalBall');
    }
    
    /**
     * Play book open sound
     */
    playBookOpen() {
        this.play('bookOpen');
    }
    
    /**
     * Play cauldron bubble sound
     */
    playCauldronBubble() {
        this.playAmbient('cauldronBubble');
    }
    
    /**
     * Stop cauldron bubble sound
     */
    stopCauldronBubble() {
        this.stopAmbient('cauldronBubble');
    }
    
    /**
     * Set master volume
     */
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        
        // Update all audio elements
        this.audioElements.forEach((audio, soundKey) => {
            const sound = this.sounds[soundKey];
            audio.volume = sound.volume * this.masterVolume;
        });
        
        console.log(`🔊 Master volume set to ${(this.masterVolume * 100).toFixed(0)}%`);
    }
    
    /**
     * Set ambient volume
     */
    setAmbientVolume(volume) {
        this.ambientVolume = Math.max(0, Math.min(1, volume));
        
        // Update ambient sounds
        this.ambientSounds.forEach(soundKey => {
            const audio = this.audioElements.get(soundKey);
            const sound = this.sounds[soundKey];
            if (audio && sound.type === 'ambient') {
                audio.volume = sound.volume * this.masterVolume * this.ambientVolume;
            }
        });
        
        console.log(`🌊 Ambient volume set to ${(this.ambientVolume * 100).toFixed(0)}%`);
    }
    
    /**
     * Set effect volume
     */
    setEffectVolume(volume) {
        this.effectVolume = Math.max(0, Math.min(1, volume));
        
        // Update effect sounds
        this.audioElements.forEach((audio, soundKey) => {
            const sound = this.sounds[soundKey];
            if (sound.type === 'action' || sound.type === 'object') {
                audio.volume = sound.volume * this.masterVolume * this.effectVolume;
            }
        });
        
        console.log(`🎵 Effect volume set to ${(this.effectVolume * 100).toFixed(0)}%`);
    }
    
    /**
     * Enable/disable sound system
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        
        if (!enabled) {
            this.stopAll();
        }
        
        console.log(`🔊 Sound system ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Get sound system status
     */
    getStatus() {
        return {
            enabled: this.isEnabled,
            masterVolume: this.masterVolume,
            ambientVolume: this.ambientVolume,
            effectVolume: this.effectVolume,
            activeAmbientSounds: Array.from(this.ambientSounds),
            totalSounds: this.audioElements.size
        };
    }
    
    /**
     * Load additional sound
     */
    loadSound(soundKey, src, options = {}) {
        const sound = {
            src,
            loop: options.loop || false,
            volume: options.volume || 0.7,
            type: options.type || 'action'
        };
        
        this.sounds[soundKey] = sound;
        
        const audio = new Audio(src);
        audio.loop = sound.loop;
        audio.volume = sound.volume * this.masterVolume;
        audio.preload = 'auto';
        
        this.audioElements.set(soundKey, audio);
        
        console.log(`🔊 Loaded sound: ${soundKey}`);
    }
    
    /**
     * Preload all sounds
     */
    preloadSounds() {
        this.audioElements.forEach((audio, soundKey) => {
            audio.load();
        });
        
        console.log('🔊 Preloading all sounds...');
    }
    
    /**
     * Get available sounds
     */
    getAvailableSounds() {
        return Object.keys(this.sounds).map(soundKey => ({
            key: soundKey,
            ...this.sounds[soundKey]
        }));
    }
    
    /**
     * Create audio context for advanced features
     */
    createAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🔊 Audio context created');
            return true;
        } catch (error) {
            console.warn('Could not create audio context:', error);
            return false;
        }
    }
    
    /**
     * Resume audio context (required for user interaction)
     */
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                console.log('🔊 Audio context resumed');
            });
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundSystem;
}
