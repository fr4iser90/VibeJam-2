/**
 * Fantasy OS - Quest Manager System
 * Main quest management system with state management, progress tracking, and quest mechanics
 * Created: 2025-10-25T16:06:31.000Z
 */

class QuestManager {
    constructor() {
        this.activeQuests = new Map();
        this.completedQuests = new Set();
        this.questProgress = new Map();
        this.questRewards = new Map();
        this.questDependencies = new Map();
        this.storageKey = 'fantasy-os-quest-state';
        this.isInitialized = false;
        
        // Quest state events
        this.eventHandlers = new Map();
        
        // Initialize quest system
        this.init();
    }
    
    /**
     * Initialize the quest manager system
     */
    async init() {
        try {
            console.log('🎯 Initializing Quest Manager...');
            
            // Clear quest state to restart fresh
            this.clearQuestState();
            
            // Initialize quest content
            this.initializeQuestContent();
            
            // Set up event handlers
            this.setupEventHandlers();
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('✨ Quest Manager initialized successfully!');
            
        } catch (error) {
            console.error('💥 Failed to initialize Quest Manager:', error);
        }
    }
    
    /**
     * Clear quest state to restart fresh
     */
    clearQuestState() {
        console.log('🔄 Clearing quest state to restart fresh...');
        
        // Clear all quest data
        this.activeQuests.clear();
        this.completedQuests.clear();
        this.questProgress.clear();
        
        // Clear from localStorage
        localStorage.removeItem(this.storageKey);
        
        console.log('✅ Quest state cleared successfully!');
    }
    
    /**
     * Initialize quest content and dependencies
     */
    initializeQuestContent() {
        // Load quest content from quest-content.js
        if (typeof questContent !== 'undefined') {
            this.questContent = questContent;
            console.log('🎯 Quest content loaded from quest-content.js');
            console.log('🎯 Available quests:', Object.keys(this.questContent));
        } else {
            console.warn('Quest content not loaded. Using default content.');
            this.questContent = this.getDefaultQuestContent();
            console.log('🎯 Using default quest content');
            console.log('🎯 Available quests:', Object.keys(this.questContent));
        }
        
        // Initialize quest dependencies
        this.initializeQuestDependencies();
        
        // Initialize quest rewards
        this.initializeQuestRewards();
    }
    
    /**
     * Get default quest content if quest-content.js is not loaded
     */
    getDefaultQuestContent() {
        return {
            'credentials-recovery': {
                id: 'credentials-recovery',
                title: 'The Hobbit\'s Lost Legacy - Act 1',
                description: 'Help the Hobbit recover his Fantasy OS credentials',
                type: 'main',
                act: 1,
                steps: [
                    { id: 'start', title: 'Meet the Hobbit', description: 'Talk to the Hobbit in the living room', room: 'living-room', completed: false, triggers: ['hobbit-interaction'], hobbitDialogue: "I have lost my Fantasy OS credentials! I need help! Can you light up the place?" },
                    { id: 'light-lamp1', title: 'Light Lamp 1', description: 'Turn on the first lamp to illuminate the room', room: 'living-room', completed: false, triggers: ['lamp1-illuminate'], objectCoords: { x: 722, y: 455 }, spell: 'illuminate' },
                    { id: 'light-lamp2', title: 'Light Lamp 2', description: 'Turn on the second lamp for more light', room: 'living-room', completed: false, triggers: ['lamp2-illuminate'], objectCoords: { x: 706, y: 760 }, spell: 'illuminate' },
                    { id: 'ignite-fireplace', title: 'Ignite Fireplace', description: 'Light the fireplace to warm up the room', room: 'living-room', completed: false, triggers: ['fireplace-ignite'], objectCoords: { x: 160, y: 816 }, spell: 'ignite' },
                    { id: 'read-book', title: 'Read Book', description: 'Read the book to find the portal spell', room: 'living-room', completed: false, triggers: ['book-browse'], objectCoords: { x: 538, y: 433 }, spell: 'browse', hobbitDialogue: "Thank you! Now I can see better. I need to read something to find the portal spell!" },
                    { id: 'cast-portal-spell', title: 'Cast Portal Spell', description: 'Cast the portal spell to open the kitchen', room: 'living-room', completed: false, triggers: ['portal-spell-cast'], spell: 'open portal to kitchen', hobbitDialogue: "Perfect! I found the portal spell! Now I can open the kitchen!" },
                    { id: 'examine-vase', title: 'Examine Vase', description: 'Check the vase for hints about the next quest', room: 'living-room', completed: false, triggers: ['vase-examine'], objectCoords: { x: -4, y: 763 }, spell: 'examine', hobbitDialogue: "The vase contains hints about the kitchen quest!" }
                ],
                rewards: ['unlock-kitchen', 'magic-level-10'],
                dependencies: [],
                triggers: ['hobbit-interaction', 'lamp1-illuminate', 'lamp2-illuminate', 'fireplace-ignite', 'book-browse', 'portal-spell-cast', 'vase-examine'],
                status: 'available'
            }
        };
    }
    
    /**
     * Initialize quest dependencies
     */
    initializeQuestDependencies() {
        // Set up quest dependencies based on quest content
        for (const [questId, quest] of Object.entries(this.questContent)) {
            if (quest.dependencies && quest.dependencies.length > 0) {
                this.questDependencies.set(questId, quest.dependencies);
            }
        }
    }
    
    /**
     * Initialize quest rewards
     */
    initializeQuestRewards() {
        // Set up quest rewards based on quest content
        for (const [questId, quest] of Object.entries(this.questContent)) {
            if (quest.rewards && quest.rewards.length > 0) {
                this.questRewards.set(questId, quest.rewards);
            }
        }
    }
    
    /**
     * Set up event handlers for quest system
     */
    setupEventHandlers() {
        // Quest progress events
        this.addEventListener('quest-started', (questId) => {
            console.log(`🎯 Quest started: ${questId}`);
            this.showQuestNotification(`Quest Started: ${this.questContent[questId]?.title || questId}`);
        });
        
        this.addEventListener('quest-completed', (questId) => {
            console.log(`🎉 Quest completed: ${questId}`);
            this.showQuestNotification(`Quest Completed: ${this.questContent[questId]?.title || questId}`);
            this.awardQuestReward(questId);
        });
        
        this.addEventListener('quest-step-completed', (questId, stepId) => {
            console.log(`✅ Quest step completed: ${questId} - ${stepId}`);
            this.updateQuestProgressUI(questId);
        });
    }
    
    /**
     * Start a quest
     */
    startQuest(questId) {
        if (!this.questContent[questId]) {
            console.warn(`Quest ${questId} not found`);
            return false;
        }
        
        // Check if quest is already active or completed
        if (this.activeQuests.has(questId) || this.completedQuests.has(questId)) {
            console.warn(`Quest ${questId} is already active or completed`);
            return false;
        }
        
        // Check quest dependencies
        if (!this.checkQuestDependencies(questId)) {
            console.warn(`Quest ${questId} dependencies not met`);
            return false;
        }
        
        // Initialize quest progress
        const quest = this.questContent[questId];
        this.activeQuests.set(questId, {
            ...quest,
            currentStep: 0,
            startTime: new Date().toISOString(),
            progress: 0
        });
        
        // Initialize quest progress tracking
        this.questProgress.set(questId, {
            completedSteps: [],
            currentStep: 0,
            progress: 0
        });
        
        // Save quest state
        this.saveQuestState();
        
        // Trigger quest started event
        this.triggerEvent('quest-started', questId);
        
        // Update UI
        this.updateQuestProgressUI(questId);
        
        return true;
    }
    
    /**
     * Update quest progress
     */
    updateQuestProgress(questId, stepId) {
        if (!this.activeQuests.has(questId)) {
            console.warn(`Quest ${questId} is not active`);
            return false;
        }
        
        const quest = this.activeQuests.get(questId);
        const questProgress = this.questProgress.get(questId);
        
        // Find the step in quest content
        const stepIndex = quest.steps.findIndex(step => step.id === stepId);
        if (stepIndex === -1) {
            console.warn(`Step ${stepId} not found in quest ${questId}`);
            return false;
        }
        
        // Mark step as completed
        quest.steps[stepIndex].completed = true;
        questProgress.completedSteps.push(stepId);
        questProgress.currentStep = stepIndex + 1;
        questProgress.progress = (questProgress.completedSteps.length / quest.steps.length) * 100;
        
        // Update quest progress
        quest.currentStep = questProgress.currentStep;
        quest.progress = questProgress.progress;
        
        // Process step unlocks
        const completedStep = quest.steps[stepIndex];
        if (completedStep.unlocks) {
            this.processStepUnlocks(completedStep.unlocks);
        }
        
        // Check if quest is complete
        if (questProgress.completedSteps.length === quest.steps.length) {
            this.completeQuest(questId);
        } else {
            // Save quest state
            this.saveQuestState();
            
            // Trigger quest step completed event
            this.triggerEvent('quest-step-completed', questId, stepId);
            
            // Notify hobbit companion of quest progress
            if (window.hobbitCompanion) {
                window.hobbitCompanion.eventHandlers.get('quest-progress')?.(questId, stepId);
            }
        }
        
        return true;
    }
    
    /**
     * Complete a quest
     */
    completeQuest(questId) {
        if (!this.activeQuests.has(questId)) {
            console.warn(`Quest ${questId} is not active`);
            return false;
        }
        
        const quest = this.activeQuests.get(questId);
        
        // Move quest to completed
        this.completedQuests.add(questId);
        this.activeQuests.delete(questId);
        
        // Update quest status
        quest.status = 'completed';
        quest.completionTime = new Date().toISOString();
        
        // Save quest state
        this.saveQuestState();
        
        // Trigger quest completed event
        this.triggerEvent('quest-completed', questId);
        
        // Check for new available quests
        this.checkAvailableQuests();
        
        return true;
    }
    
    /**
     * Check quest dependencies
     */
    checkQuestDependencies(questId) {
        const dependencies = this.questDependencies.get(questId);
        if (!dependencies || dependencies.length === 0) {
            return true;
        }
        
        // Check if all dependencies are completed
        return dependencies.every(depId => this.completedQuests.has(depId));
    }
    
    /**
     * Award quest reward
     */
    awardQuestReward(questId) {
        const rewards = this.questRewards.get(questId);
        if (!rewards || rewards.length === 0) {
            return;
        }
        
        console.log(`🎁 Awarding rewards for quest ${questId}:`, rewards);
        
        // Process each reward
        rewards.forEach(reward => {
            this.processReward(reward);
        });
        
        // Show reward notification
        this.showRewardNotification(rewards);
    }
    
    /**
     * Process step unlocks
     */
    processStepUnlocks(unlocks) {
        console.log(`🔓 Processing step unlocks:`, unlocks);
        
        unlocks.forEach(unlock => {
            switch (unlock) {
                case 'kitchen-portal':
                    console.log('🔓 Kitchen portal unlocked!');
                    // The portal will be available through the spell parser
                    break;
                case 'bedroom-portal':
                    console.log('🔓 Bedroom portal unlocked!');
                    break;
                case 'workshop-portal':
                    console.log('🔓 Workshop portal unlocked!');
                    break;
                case 'library-portal':
                    console.log('🔓 Library portal unlocked!');
                    break;
                case 'garden-portal':
                    console.log('🔓 Garden portal unlocked!');
                    break;
                default:
                    console.log(`Unknown unlock: ${unlock}`);
            }
        });
    }
    
    /**
     * Process a reward
     */
    processReward(reward) {
        switch (reward) {
            case 'unlock-kitchen':
                this.unlockRoom('kitchen');
                break;
            case 'unlock-workshop':
                this.unlockRoom('workshop');
                break;
            case 'unlock-library':
                this.unlockRoom('library');
                break;
            case 'unlock-bedroom':
                this.unlockRoom('bedroom');
                break;
            case 'unlock-garden':
                this.unlockRoom('garden');
                break;
            case 'magic-level-10':
                this.increaseMagicLevel(10);
                break;
            case 'spell-unlock-fireball':
                this.unlockSpell('fireball');
                break;
            case 'gesture-unlock-spiral':
                this.unlockGesture('spiral');
                break;
            default:
                console.log(`Unknown reward: ${reward}`);
        }
    }
    
    /**
     * Unlock a room
     */
    unlockRoom(roomId) {
        console.log(`🚪 Unlocking room: ${roomId}`);
        // This would integrate with RoomManager
        if (typeof window.fantasyOS !== 'undefined' && window.fantasyOS.components.roomManager) {
            // Room unlocking logic would go here
            console.log(`Room ${roomId} unlocked!`);
        }
    }
    
    /**
     * Increase magic level
     */
    increaseMagicLevel(amount) {
        console.log(`✨ Increasing magic level by ${amount}`);
        if (typeof window.fantasyOS !== 'undefined') {
            const currentLevel = window.fantasyOS.getMagicLevel();
            window.fantasyOS.setMagicLevel(currentLevel + amount);
        }
    }
    
    /**
     * Unlock a spell
     */
    unlockSpell(spellName) {
        console.log(`🔮 Unlocking spell: ${spellName}`);
        // This would integrate with SpellParser
    }
    
    /**
     * Unlock a gesture
     */
    unlockGesture(gestureName) {
        console.log(`🎨 Unlocking gesture: ${gestureName}`);
        // This would integrate with GestureRecognition
    }
    
    /**
     * Check for new available quests
     */
    checkAvailableQuests() {
        for (const [questId, quest] of Object.entries(this.questContent)) {
            if (quest.status === 'available' && this.checkQuestDependencies(questId)) {
                console.log(`🎯 Quest ${questId} is now available`);
                this.showQuestAvailableNotification(questId);
            }
        }
    }
    
    /**
     * Save quest state to localStorage
     */
    saveQuestState() {
        try {
            const questState = {
                activeQuests: Array.from(this.activeQuests.entries()),
                completedQuests: Array.from(this.completedQuests),
                questProgress: Array.from(this.questProgress.entries()),
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(questState));
            console.log('💾 Quest state saved');
        } catch (error) {
            console.error('💥 Failed to save quest state:', error);
        }
    }
    
    /**
     * Load quest state from localStorage
     */
    async loadQuestState() {
        try {
            const savedState = localStorage.getItem(this.storageKey);
            if (!savedState) {
                console.log('📝 No saved quest state found, starting fresh');
                return;
            }
            
            const questState = JSON.parse(savedState);
            
            // Restore active quests
            this.activeQuests = new Map(questState.activeQuests || []);
            
            // Restore completed quests
            this.completedQuests = new Set(questState.completedQuests || []);
            
            // Restore quest progress
            this.questProgress = new Map(questState.questProgress || []);
            
            console.log('📖 Quest state loaded successfully');
            console.log(`Active quests: ${this.activeQuests.size}`);
            console.log(`Completed quests: ${this.completedQuests.size}`);
            
        } catch (error) {
            console.error('💥 Failed to load quest state:', error);
        }
    }
    
    /**
     * Add event listener
     */
    addEventListener(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }
    
    /**
     * Remove event listener
     */
    removeEventListener(event, handler) {
        if (this.eventHandlers.has(event)) {
            const handlers = this.eventHandlers.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    /**
     * Trigger event
     */
    triggerEvent(event, ...args) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach(handler => {
                try {
                    handler(...args);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Show quest notification
     */
    showQuestNotification(message) {
        this.showNotification(message, 'quest');
    }
    
    /**
     * Show reward notification
     */
    showRewardNotification(rewards) {
        const message = `Rewards earned: ${rewards.join(', ')}`;
        this.showNotification(message, 'reward');
    }
    
    /**
     * Show quest available notification
     */
    showQuestAvailableNotification(questId) {
        const quest = this.questContent[questId];
        const message = `New quest available: ${quest.title}`;
        this.showNotification(message, 'quest-available');
    }
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `quest-notification quest-notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--magic-purple);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-family: 'MedievalSharp', cursive;
            font-size: 14px;
            z-index: 4000;
            max-width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add type-specific styling
        switch (type) {
            case 'quest':
                notification.style.background = 'var(--magic-blue)';
                break;
            case 'reward':
                notification.style.background = 'var(--magic-gold)';
                break;
            case 'quest-available':
                notification.style.background = 'var(--magic-green)';
                break;
        }
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    /**
     * Update quest progress UI
     */
    updateQuestProgressUI(questId) {
        // This would update the quest progress UI components
        console.log(`🎯 Updating quest progress UI for: ${questId}`);
        
        // Update quest progress display
        const questProgressElement = document.getElementById('quest-progress');
        if (questProgressElement) {
            this.renderQuestProgress(questProgressElement);
        }
        
        // Update Hobbit Companion dialogue
        this.updateHobbitDialogue(questId);
    }
    
    /**
     * Update Hobbit Companion dialogue based on quest progress
     */
    updateHobbitDialogue(questId) {
        const hobbitDialogue = document.getElementById('hobbitDialogue');
        if (!hobbitDialogue) return;
        
        const hobbitText = hobbitDialogue.querySelector('.hobbit-text');
        if (!hobbitText) return;
        
        // Get quest information
        const quest = this.getQuestInfo(questId);
        if (!quest) return;
        
        // Update Hobbit personality mood based on quest progress
        if (this.hobbitPersonality) {
            this.hobbitPersonality.updateMood('quest-progress');
            const dialogue = this.hobbitPersonality.getDialogue('quest-progress', this.getCurrentRoom());
            hobbitText.textContent = dialogue;
        }
        
        // Add bounce animation to Hobbit image
        const hobbitImage = document.querySelector('#hobbitCharacter .hobbit-image');
        if (hobbitImage) {
            hobbitImage.classList.add('clicked');
            setTimeout(() => {
                hobbitImage.classList.remove('clicked');
            }, 600);
        }
    }
    
    /**
     * Render quest progress
     */
    renderQuestProgress(container) {
        if (!container) return;
        
        container.innerHTML = '';
        
        // Render active quests
        this.activeQuests.forEach((quest, questId) => {
            const questElement = this.createQuestElement(quest, questId);
            container.appendChild(questElement);
        });
        
        // Render completed quests count
        if (this.completedQuests.size > 0) {
            const completedElement = document.createElement('div');
            completedElement.className = 'quest-completed-count';
            completedElement.textContent = `Completed: ${this.completedQuests.size}`;
            container.appendChild(completedElement);
        }
    }
    
    /**
     * Create quest element
     */
    createQuestElement(quest, questId) {
        const questElement = document.createElement('div');
        questElement.className = 'quest-item';
        questElement.innerHTML = `
            <div class="quest-title">${quest.title}</div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-progress-bar">
                <div class="quest-progress-fill" style="width: ${quest.progress}%"></div>
            </div>
            <div class="quest-progress-text">${quest.currentStep}/${quest.steps.length} steps</div>
        `;
        
        return questElement;
    }
    
    /**
     * Get quest information
     */
    getQuestInfo(questId) {
        return this.questContent[questId] || null;
    }
    
    /**
     * Get active quests
     */
    getActiveQuests() {
        return Array.from(this.activeQuests.keys());
    }
    
    /**
     * Get completed quests
     */
    getCompletedQuests() {
        return Array.from(this.completedQuests);
    }
    
    /**
     * Get quest progress
     */
    getQuestProgress(questId) {
        return this.questProgress.get(questId) || null;
    }
    
    /**
     * Check if quest is active
     */
    isQuestActive(questId) {
        return this.activeQuests.has(questId);
    }
    
    /**
     * Check if quest is completed
     */
    isQuestCompleted(questId) {
        return this.completedQuests.has(questId);
    }
    
    /**
     * Check if specific quest step is completed
     */
    isQuestStepCompleted(questId, stepId) {
        const quest = this.getQuestInfo(questId);
        if (!quest || !quest.steps) {
            return false;
        }
        
        const step = quest.steps.find(s => s.id === stepId);
        return step ? step.completed : false;
    }
    
    /**
     * Check if quest has minimum required steps completed for unlocking features
     */
    hasMinimumStepsCompleted(questId, requiredSteps) {
        const quest = this.getQuestInfo(questId);
        if (!quest || !quest.steps) {
            return false;
        }
        
        return requiredSteps.every(stepId => this.isQuestStepCompleted(questId, stepId));
    }
    
    /**
     * Get current room
     */
    getCurrentRoom() {
        // Get current room from FantasyOS if available
        if (typeof window.fantasyOS !== 'undefined') {
            return window.fantasyOS.getCurrentRoom();
        }
        
        // Fallback: get from active room tab
        const activeTab = document.querySelector('.room-tab.active');
        return activeTab ? activeTab.dataset.room : 'living-room';
    }
    
    /**
     * Reset quest system
     */
    resetQuestSystem() {
        this.activeQuests.clear();
        this.completedQuests.clear();
        this.questProgress.clear();
        localStorage.removeItem(this.storageKey);
        console.log('🔄 Quest system reset');
    }
}

/**
 * Hobbit Personality System
 * Manages the Hobbit companion's personality and dialogue
 */
class HobbitPersonality {
    constructor() {
        this.currentMood = 'friendly';
        this.memory = new Map();
        this.dialogueHistory = [];
        this.maxMemorySize = 50;
    }
    
    /**
     * Get dialogue based on current mood and context
     */
    getDialogue(context, room) {
        const moodDialogues = this.getMoodDialogues();
        const roomDialogues = this.getRoomDialogues(room);
        
        // Combine mood and room-specific dialogues
        const availableDialogues = [
            ...(moodDialogues[this.currentMood] || []),
            ...(roomDialogues || [])
        ];
        
        // Select random dialogue
        if (availableDialogues.length > 0) {
            const selectedDialogue = availableDialogues[Math.floor(Math.random() * availableDialogues.length)];
            this.addToMemory('dialogue', selectedDialogue);
            return selectedDialogue;
        }
        
        return "I'm here to help you on your quest!";
    }
    
    /**
     * Get mood-specific dialogues
     */
    getMoodDialogues() {
        return {
            'friendly': [
                "Hello there! Ready for an adventure?",
                "I'm excited to help you on your quest!",
                "Let's discover something amazing together!"
            ],
            'worried': [
                "I hope we can find what we're looking for...",
                "Something doesn't feel right about this place...",
                "Be careful, there might be dangers ahead."
            ],
            'excited': [
                "This is so exciting! I can feel the magic!",
                "We're getting closer to something big!",
                "I love adventures like this!",
                "Great progress! Keep going!",
                "You're doing amazing!",
                "I can feel the magic getting stronger!"
            ],
            'mysterious': [
                "The ancient magic speaks to those who listen...",
                "There are secrets hidden in plain sight...",
                "Trust your instincts, they will guide you."
            ]
        };
    }
    
    /**
     * Get room-specific dialogues
     */
    getRoomDialogues(room) {
        const roomDialogues = {
            'living-room': [
                "This is where our journey begins!",
                "The living room holds many secrets...",
                "I feel comfortable here, like home."
            ],
            'kitchen': [
                "The cauldron bubbles with magical energy!",
                "I love the smell of magical cooking!",
                "This kitchen has seen many magical recipes."
            ],
            'library': [
                "So many ancient texts and knowledge!",
                "The books here contain powerful secrets.",
                "I love the quiet wisdom of this place."
            ],
            'workshop': [
                "Tools and magic combine here!",
                "This workshop has crafted many wonders.",
                "I can feel the creative energy!"
            ],
            'bedroom': [
                "A place of rest and dreams...",
                "The bedroom holds peaceful magic.",
                "Dreams and reality meet here."
            ],
            'garden': [
                "Nature's magic flows through this place!",
                "The garden connects us to the earth.",
                "I feel most at peace here."
            ]
        };
        
        return roomDialogues[room] || [];
    }
    
    /**
     * Add to memory
     */
    addToMemory(type, content) {
        const memoryEntry = {
            type,
            content,
            timestamp: new Date().toISOString()
        };
        
        this.memory.set(Date.now(), memoryEntry);
        
        // Limit memory size
        if (this.memory.size > this.maxMemorySize) {
            const oldestKey = Math.min(...this.memory.keys());
            this.memory.delete(oldestKey);
        }
    }
    
    /**
     * Update mood based on context
     */
    updateMood(context) {
        switch (context) {
            case 'quest-completed':
                this.currentMood = 'excited';
                break;
            case 'quest-failed':
                this.currentMood = 'worried';
                break;
            case 'quest-progress':
                this.currentMood = 'excited';
                break;
            case 'discovery':
                this.currentMood = 'mysterious';
                break;
            default:
                this.currentMood = 'friendly';
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuestManager, HobbitPersonality };
}
