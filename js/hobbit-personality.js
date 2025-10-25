/**
 * Fantasy OS - Hobbit Personality System
 * Manages hobbit personality traits, emotional states, and mood system
 * Created: 2025-10-25T16:24:13.000Z
 */

class HobbitPersonality {
    constructor() {
        this.name = 'Bilbo';
        this.baseTraits = {
            curiosity: 0.8,      // How curious about new things
            friendliness: 0.7,   // How friendly and helpful
            wisdom: 0.6,         // How wise and knowledgeable
            playfulness: 0.5,    // How playful and humorous
            caution: 0.4,        // How cautious and careful
            loyalty: 0.9         // How loyal to the user
        };
        
        this.currentTraits = { ...this.baseTraits };
        this.currentMood = 'neutral';
        this.moodHistory = [];
        this.personalityDevelopment = {
            level: 1,
            experience: 0,
            milestones: []
        };
        
        // Mood states
        this.moods = {
            happy: { color: '#4CAF50', icon: '😊', description: 'Cheerful and optimistic' },
            excited: { color: '#FF9800', icon: '🤩', description: 'Eager and enthusiastic' },
            worried: { color: '#FF5722', icon: '😟', description: 'Concerned and cautious' },
            mysterious: { color: '#9C27B0', icon: '🤔', description: 'Thoughtful and enigmatic' },
            neutral: { color: '#607D8B', icon: '😐', description: 'Calm and balanced' },
            proud: { color: '#3F51B5', icon: '😌', description: 'Confident and satisfied' },
            curious: { color: '#00BCD4', icon: '🤓', description: 'Inquisitive and interested' }
        };
        
        // Personality events
        this.eventHistory = [];
        this.maxEventHistory = 50;
    }
    
    /**
     * Initialize personality system
     */
    async init() {
        console.log('🧠 Initializing Hobbit Personality System...');
        
        // Load saved personality state
        this.loadState();
        
        // Set initial mood based on traits
        this.updateMood();
        
        console.log('🧠 Hobbit Personality System initialized');
    }
    
    /**
     * Update personality traits based on interaction
     */
    updateFromInteraction(action) {
        const event = {
            type: 'interaction',
            action: action,
            timestamp: new Date().toISOString(),
            impact: this.calculateInteractionImpact(action)
        };
        
        this.addEvent(event);
        this.applyTraitChanges(event.impact);
        this.updateMood();
        this.updatePersonalityDevelopment();
        
        console.log(`🧠 Personality updated from interaction: ${action}`);
    }
    
    /**
     * Update personality based on room change
     */
    updateFromRoomChange(roomId) {
        const event = {
            type: 'room-change',
            room: roomId,
            timestamp: new Date().toISOString(),
            impact: this.calculateRoomChangeImpact(roomId)
        };
        
        this.addEvent(event);
        this.applyTraitChanges(event.impact);
        this.updateMood();
        
        console.log(`🧠 Personality updated from room change: ${roomId}`);
    }
    
    /**
     * Update personality based on quest progress
     */
    updateFromQuestProgress(questId, stepId) {
        const event = {
            type: 'quest-progress',
            quest: questId,
            step: stepId,
            timestamp: new Date().toISOString(),
            impact: this.calculateQuestProgressImpact(questId, stepId)
        };
        
        this.addEvent(event);
        this.applyTraitChanges(event.impact);
        this.updateMood();
        
        console.log(`🧠 Personality updated from quest progress: ${questId}`);
    }
    
    /**
     * Update personality based on object interaction
     */
    updateFromObjectInteraction(objectType, room) {
        const event = {
            type: 'object-interaction',
            object: objectType,
            room: room,
            timestamp: new Date().toISOString(),
            impact: this.calculateObjectInteractionImpact(objectType, room)
        };
        
        this.addEvent(event);
        this.applyTraitChanges(event.impact);
        this.updateMood();
        
        console.log(`🧠 Personality updated from object interaction: ${objectType}`);
    }
    
    /**
     * Calculate impact of interaction on personality
     */
    calculateInteractionImpact(action) {
        const impacts = {
            talk: { friendliness: 0.02, wisdom: 0.01 },
            quest: { wisdom: 0.03, loyalty: 0.02 },
            memory: { wisdom: 0.02, curiosity: 0.01 }
        };
        
        return impacts[action] || {};
    }
    
    /**
     * Calculate impact of room change on personality
     */
    calculateRoomChangeImpact(roomId) {
        const roomImpacts = {
            'living-room': { friendliness: 0.01 },
            'kitchen': { curiosity: 0.01, playfulness: 0.01 },
            'library': { wisdom: 0.02, curiosity: 0.01 },
            'workshop': { curiosity: 0.02, caution: 0.01 },
            'bedroom': { caution: 0.01 },
            'garden': { playfulness: 0.02, friendliness: 0.01 }
        };
        
        return roomImpacts[roomId] || {};
    }
    
    /**
     * Calculate impact of quest progress on personality
     */
    calculateQuestProgressImpact(questId, stepId) {
        return {
            wisdom: 0.02,
            loyalty: 0.01,
            curiosity: 0.01
        };
    }
    
    /**
     * Calculate impact of object interaction on personality
     */
    calculateObjectInteractionImpact(objectType, room) {
        const objectImpacts = {
            fireplace: { friendliness: 0.01 },
            lamp: { wisdom: 0.01 },
            chest: { curiosity: 0.02 },
            'crystal-ball': { wisdom: 0.02, curiosity: 0.01 },
            'spell-book': { wisdom: 0.03, curiosity: 0.02 },
            cauldron: { curiosity: 0.02, playfulness: 0.01 }
        };
        
        return objectImpacts[objectType] || {};
    }
    
    /**
     * Apply trait changes to current personality
     */
    applyTraitChanges(impacts) {
        Object.keys(impacts).forEach(trait => {
            if (this.currentTraits[trait] !== undefined) {
                this.currentTraits[trait] = Math.max(0, Math.min(1, 
                    this.currentTraits[trait] + impacts[trait]
                ));
            }
        });
    }
    
    /**
     * Update current mood based on personality traits
     */
    updateMood() {
        const traits = this.currentTraits;
        const recentEvents = this.getRecentEvents(5);
        
        // Calculate mood score
        let moodScore = {
            happy: traits.friendliness * 0.3 + traits.playfulness * 0.2,
            excited: traits.curiosity * 0.4 + traits.playfulness * 0.3,
            worried: traits.caution * 0.5,
            mysterious: traits.wisdom * 0.4 + traits.curiosity * 0.2,
            proud: traits.wisdom * 0.3 + traits.loyalty * 0.3,
            curious: traits.curiosity * 0.6 + traits.wisdom * 0.2
        };
        
        // Adjust based on recent events
        recentEvents.forEach(event => {
            if (event.type === 'quest-progress') {
                moodScore.excited += 0.1;
                moodScore.proud += 0.1;
            }
            if (event.type === 'object-interaction') {
                moodScore.curious += 0.05;
            }
        });
        
        // Find highest scoring mood
        const newMood = Object.keys(moodScore).reduce((a, b) => 
            moodScore[a] > moodScore[b] ? a : b
        );
        
        // Only change mood if significantly different
        if (newMood !== this.currentMood && moodScore[newMood] > 0.3) {
            this.currentMood = newMood;
            this.moodHistory.push({
                mood: newMood,
                timestamp: new Date().toISOString(),
                traits: { ...this.currentTraits }
            });
            
            // Keep mood history manageable
            if (this.moodHistory.length > 20) {
                this.moodHistory = this.moodHistory.slice(-20);
            }
        }
    }
    
    /**
     * Update personality development
     */
    updatePersonalityDevelopment() {
        this.personalityDevelopment.experience += 1;
        
        // Check for level up
        const requiredExp = this.personalityDevelopment.level * 10;
        if (this.personalityDevelopment.experience >= requiredExp) {
            this.levelUp();
        }
    }
    
    /**
     * Level up personality
     */
    levelUp() {
        this.personalityDevelopment.level += 1;
        this.personalityDevelopment.experience = 0;
        
        // Add milestone
        this.personalityDevelopment.milestones.push({
            level: this.personalityDevelopment.level,
            timestamp: new Date().toISOString(),
            traits: { ...this.currentTraits }
        });
        
        console.log(`🎉 Hobbit personality leveled up to level ${this.personalityDevelopment.level}!`);
    }
    
    /**
     * Add event to history
     */
    addEvent(event) {
        this.eventHistory.push(event);
        
        // Keep event history manageable
        if (this.eventHistory.length > this.maxEventHistory) {
            this.eventHistory = this.eventHistory.slice(-this.maxEventHistory);
        }
    }
    
    /**
     * Get recent events
     */
    getRecentEvents(count = 5) {
        return this.eventHistory.slice(-count);
    }
    
    /**
     * Get current mood
     */
    getCurrentMood() {
        return this.currentMood;
    }
    
    /**
     * Get personality traits
     */
    getPersonalityTraits() {
        return Object.keys(this.currentTraits).filter(trait => 
            this.currentTraits[trait] > 0.6
        );
    }
    
    /**
     * Get personality state
     */
    getState() {
        return {
            traits: { ...this.currentTraits },
            currentMood: this.currentMood,
            moodHistory: [...this.moodHistory],
            personalityDevelopment: { ...this.personalityDevelopment },
            eventHistory: [...this.eventHistory]
        };
    }
    
    /**
     * Set personality state
     */
    setState(state) {
        if (state.traits) {
            this.currentTraits = { ...state.traits };
        }
        if (state.currentMood) {
            this.currentMood = state.currentMood;
        }
        if (state.moodHistory) {
            this.moodHistory = [...state.moodHistory];
        }
        if (state.personalityDevelopment) {
            this.personalityDevelopment = { ...state.personalityDevelopment };
        }
        if (state.eventHistory) {
            this.eventHistory = [...state.eventHistory];
        }
    }
    
    /**
     * Save personality state
     */
    saveState() {
        const state = this.getState();
        localStorage.setItem('hobbit-personality-state', JSON.stringify(state));
    }
    
    /**
     * Load personality state
     */
    loadState() {
        try {
            const savedState = localStorage.getItem('hobbit-personality-state');
            if (savedState) {
                const state = JSON.parse(savedState);
                this.setState(state);
            }
        } catch (error) {
            console.error('❌ Error loading personality state:', error);
        }
    }
    
    /**
     * Reset personality to default state
     */
    reset() {
        this.currentTraits = { ...this.baseTraits };
        this.currentMood = 'neutral';
        this.moodHistory = [];
        this.personalityDevelopment = {
            level: 1,
            experience: 0,
            milestones: []
        };
        this.eventHistory = [];
        
        localStorage.removeItem('hobbit-personality-state');
        console.log('🔄 Hobbit personality reset to default state');
    }
    
    /**
     * Get personality summary
     */
    getSummary() {
        const dominantTraits = this.getPersonalityTraits();
        const mood = this.moods[this.currentMood];
        
        return {
            name: this.name,
            level: this.personalityDevelopment.level,
            mood: {
                current: this.currentMood,
                description: mood.description,
                icon: mood.icon,
                color: mood.color
            },
            dominantTraits: dominantTraits,
            experience: this.personalityDevelopment.experience,
            milestones: this.personalityDevelopment.milestones.length
        };
    }
}

// Export for use in other modules
window.HobbitPersonality = HobbitPersonality;
