/**
 * Fantasy OS - Hobbit Companion System
 * Main hobbit companion with personality, dialogue, and memory systems
 * Created: 2025-10-25T16:24:13.000Z
 */

class HobbitCompanion {
    constructor() {
        this.name = 'Bilbo';
        this.personality = null;
        this.dialogue = null;
        this.memory = null;
        this.isActive = false;
        this.currentRoom = 'living-room';
        this.interactionCount = 0;
        this.lastInteraction = null;
        
        // UI elements
        this.ui = {
            container: null,
            dialogueBox: null,
            personalityIndicator: null,
            memoryDisplay: null
        };
        
        // Event handlers
        this.eventHandlers = new Map();
        
        // Initialize companion
        this.init();
    }
    
    /**
     * Initialize the hobbit companion system
     */
    async init() {
        try {
            console.log('🧙‍♂️ Initializing Hobbit Companion...');
            
            // Initialize personality system
            this.personality = new HobbitPersonality();
            await this.personality.init();
            
            // Initialize dialogue system
            this.dialogue = new HobbitDialogue();
            await this.dialogue.init();
            
            // Initialize memory system
            this.memory = new HobbitMemory();
            await this.memory.init();
            
            // Create UI elements
            this.createUI();
            
            // Set up event handlers
            this.setupEventHandlers();
            
            // Load saved state
            this.loadState();
            
            this.isActive = true;
            console.log('🧙‍♂️ Hobbit Companion initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing Hobbit Companion:', error);
        }
    }
    
    /**
     * Create hobbit companion UI elements
     */
    createUI() {
        // Create main container
        this.ui.container = document.createElement('div');
        this.ui.container.id = 'hobbit-companion';
        this.ui.container.className = 'hobbit-companion-container';
        
        // Create dialogue box
        this.ui.dialogueBox = document.createElement('div');
        this.ui.dialogueBox.className = 'hobbit-dialogue-box';
        this.ui.dialogueBox.innerHTML = `
            <div class="hobbit-avatar">
                <div class="hobbit-face"></div>
                <div class="personality-indicator"></div>
            </div>
            <div class="dialogue-content">
                <div class="dialogue-text"></div>
                <div class="dialogue-actions">
                    <button class="dialogue-btn" data-action="talk">Talk</button>
                    <button class="dialogue-btn" data-action="quest">Quest Help</button>
                    <button class="dialogue-btn" data-action="memory">Memory</button>
                </div>
            </div>
        `;
        
        // Create personality indicator
        this.ui.personalityIndicator = this.ui.dialogueBox.querySelector('.personality-indicator');
        
        // Create memory display
        this.ui.memoryDisplay = document.createElement('div');
        this.ui.memoryDisplay.className = 'hobbit-memory-display';
        this.ui.memoryDisplay.style.display = 'none';
        
        // Append to container
        this.ui.container.appendChild(this.ui.dialogueBox);
        this.ui.container.appendChild(this.ui.memoryDisplay);
        
        // Add to page
        document.body.appendChild(this.ui.container);
        
        console.log('🎨 Hobbit Companion UI created');
    }
    
    /**
     * Set up event handlers for hobbit interactions
     */
    setupEventHandlers() {
        // Dialogue button handlers
        const dialogueButtons = this.ui.dialogueBox.querySelectorAll('.dialogue-btn');
        dialogueButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleDialogueAction(action);
            });
        });
        
        // Room change handler
        this.eventHandlers.set('room-changed', (roomId) => {
            this.onRoomChanged(roomId);
        });
        
        // Quest progress handler
        this.eventHandlers.set('quest-progress', (questId, stepId) => {
            this.onQuestProgress(questId, stepId);
        });
        
        // Object interaction handler
        this.eventHandlers.set('object-interaction', (objectType, room) => {
            this.onObjectInteraction(objectType, room);
        });
        
        console.log('🎯 Hobbit Companion event handlers set up');
    }
    
    /**
     * Handle dialogue action button clicks
     */
    handleDialogueAction(action) {
        console.log(`🧙‍♂️ Hobbit action: ${action}`);
        
        switch (action) {
            case 'talk':
                this.startConversation();
                break;
            case 'quest':
                this.provideQuestGuidance();
                break;
            case 'memory':
                this.showMemory();
                break;
            default:
                console.warn(`Unknown hobbit action: ${action}`);
        }
        
        // Update interaction count
        this.interactionCount++;
        this.lastInteraction = new Date().toISOString();
        
        // Update personality based on interaction
        this.personality.updateFromInteraction(action);
        
        // Save state
        this.saveState();
    }
    
    /**
     * Start a conversation with the hobbit
     */
    startConversation() {
        const context = this.getCurrentContext();
        const dialogue = this.dialogue.getDialogue('conversation', context);
        
        this.displayDialogue(dialogue);
        this.playDialogueSound();
        
        // Add to memory
        this.memory.addMemory('conversation', {
            type: 'conversation',
            content: dialogue.text,
            context: context,
            timestamp: new Date().toISOString()
        });
    }
    
    /**
     * Provide quest guidance
     */
    provideQuestGuidance() {
        const context = this.getCurrentContext();
        const guidance = this.dialogue.getDialogue('quest-guidance', context);
        
        this.displayDialogue(guidance);
        this.playDialogueSound();
        
        // Add to memory
        this.memory.addMemory('guidance', {
            type: 'quest-guidance',
            content: guidance.text,
            context: context,
            timestamp: new Date().toISOString()
        });
    }
    
    /**
     * Show memory display
     */
    showMemory() {
        const memories = this.memory.getRecentMemories(5);
        this.displayMemories(memories);
        
        // Toggle memory display
        const isVisible = this.ui.memoryDisplay.style.display !== 'none';
        this.ui.memoryDisplay.style.display = isVisible ? 'none' : 'block';
    }
    
    /**
     * Display dialogue text
     */
    displayDialogue(dialogue) {
        const dialogueText = this.ui.dialogueBox.querySelector('.dialogue-text');
        dialogueText.textContent = dialogue.text;
        
        // Update personality indicator
        this.updatePersonalityIndicator();
        
        // Add dialogue animation
        this.ui.dialogueBox.classList.add('dialogue-active');
        setTimeout(() => {
            this.ui.dialogueBox.classList.remove('dialogue-active');
        }, 3000);
    }
    
    /**
     * Display memories
     */
    displayMemories(memories) {
        this.ui.memoryDisplay.innerHTML = `
            <div class="memory-header">Recent Memories</div>
            <div class="memory-list">
                ${memories.map(memory => `
                    <div class="memory-item">
                        <div class="memory-type">${memory.type}</div>
                        <div class="memory-content">${memory.content}</div>
                        <div class="memory-time">${new Date(memory.timestamp).toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    /**
     * Update personality indicator visual
     */
    updatePersonalityIndicator() {
        const mood = this.personality.getCurrentMood();
        const traits = this.personality.getPersonalityTraits();
        
        this.ui.personalityIndicator.className = `personality-indicator mood-${mood}`;
        this.ui.personalityIndicator.title = `Mood: ${mood}, Traits: ${traits.join(', ')}`;
    }
    
    /**
     * Play dialogue sound effect
     */
    playDialogueSound() {
        // Use existing sound system
        if (window.soundSystem) {
            window.soundSystem.play('gestureRecognized', 0.4);
        }
    }
    
    /**
     * Get current context for dialogue
     */
    getCurrentContext() {
        return {
            room: this.currentRoom,
            mood: this.personality.getCurrentMood(),
            questProgress: this.getQuestProgress(),
            interactionCount: this.interactionCount,
            timeOfDay: this.getTimeOfDay()
        };
    }
    
    /**
     * Get current quest progress
     */
    getQuestProgress() {
        if (window.questManager) {
            return {
                activeQuests: Array.from(window.questManager.activeQuests.keys()),
                completedQuests: Array.from(window.questManager.completedQuests),
                currentStep: window.questManager.getCurrentQuestStep()
            };
        }
        return { activeQuests: [], completedQuests: [], currentStep: null };
    }
    
    /**
     * Get time of day
     */
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 6) return 'night';
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    }
    
    /**
     * Handle room change events
     */
    onRoomChanged(roomId) {
        this.currentRoom = roomId;
        
        // Update personality based on room
        this.personality.updateFromRoomChange(roomId);
        
        // Show room-specific greeting
        const greeting = this.dialogue.getDialogue('room-greeting', this.getCurrentContext());
        this.displayDialogue(greeting);
        
        console.log(`🧙‍♂️ Hobbit moved to ${roomId}`);
    }
    
    /**
     * Handle quest progress events
     */
    onQuestProgress(questId, stepId) {
        // Update personality based on quest progress
        this.personality.updateFromQuestProgress(questId, stepId);
        
        // Show quest-specific dialogue
        const context = this.getCurrentContext();
        const dialogue = this.dialogue.getDialogue('quest-progress', context);
        this.displayDialogue(dialogue);
        
        console.log(`🧙‍♂️ Hobbit noted quest progress: ${questId} - ${stepId}`);
    }
    
    /**
     * Handle object interaction events
     */
    onObjectInteraction(objectType, room) {
        // Update personality based on object interaction
        this.personality.updateFromObjectInteraction(objectType, room);
        
        // Show object-specific dialogue
        const context = this.getCurrentContext();
        const dialogue = this.dialogue.getDialogue('object-interaction', context);
        this.displayDialogue(dialogue);
        
        console.log(`🧙‍♂️ Hobbit observed interaction with ${objectType} in ${room}`);
    }
    
    /**
     * Save hobbit companion state
     */
    saveState() {
        const state = {
            personality: this.personality.getState(),
            memory: this.memory.getState(),
            interactionCount: this.interactionCount,
            lastInteraction: this.lastInteraction,
            currentRoom: this.currentRoom
        };
        
        localStorage.setItem('hobbit-companion-state', JSON.stringify(state));
        console.log('💾 Hobbit Companion state saved');
    }
    
    /**
     * Load hobbit companion state
     */
    loadState() {
        try {
            const savedState = localStorage.getItem('hobbit-companion-state');
            if (savedState) {
                const state = JSON.parse(savedState);
                
                this.personality.setState(state.personality);
                this.memory.setState(state.memory);
                this.interactionCount = state.interactionCount || 0;
                this.lastInteraction = state.lastInteraction;
                this.currentRoom = state.currentRoom || 'living-room';
                
                console.log('📂 Hobbit Companion state loaded');
            }
        } catch (error) {
            console.error('❌ Error loading Hobbit Companion state:', error);
        }
    }
    
    /**
     * Get hobbit companion status
     */
    getStatus() {
        return {
            isActive: this.isActive,
            name: this.name,
            personality: this.personality.getState(),
            memory: this.memory.getState(),
            interactionCount: this.interactionCount,
            lastInteraction: this.lastInteraction,
            currentRoom: this.currentRoom
        };
    }
    
    /**
     * Reset hobbit companion to default state
     */
    reset() {
        this.personality.reset();
        this.memory.reset();
        this.interactionCount = 0;
        this.lastInteraction = null;
        this.currentRoom = 'living-room';
        
        localStorage.removeItem('hobbit-companion-state');
        console.log('🔄 Hobbit Companion reset to default state');
    }
}

// Export for use in other modules
window.HobbitCompanion = HobbitCompanion;
