/**
 * Fantasy OS - Hobbit Dialogue System
 * Manages dynamic dialogue responses based on context and personality
 * Created: 2025-10-25T16:24:13.000Z
 */

class HobbitDialogue {
    constructor() {
        this.dialogueContent = this.initializeDialogueContent();
        this.dialogueHistory = [];
        this.maxHistorySize = 20;
        this.responsePatterns = new Map();
        
        // Dialogue categories
        this.categories = {
            'conversation': 'general',
            'quest-guidance': 'quest',
            'room-greeting': 'room',
            'quest-progress': 'quest',
            'object-interaction': 'object',
            'memory': 'memory',
            'spell-teaching': 'magic',
            'lore-sharing': 'lore'
        };
    }
    
    /**
     * Initialize dialogue system
     */
    async init() {
        console.log('💬 Initializing Hobbit Dialogue System...');
        
        // Load dialogue patterns
        this.loadResponsePatterns();
        
        // Load saved dialogue history
        this.loadDialogueHistory();
        
        console.log('💬 Hobbit Dialogue System initialized');
    }
    
    /**
     * Get dialogue based on category and context
     */
    getDialogue(category, context) {
        const dialogueSet = this.dialogueContent[category];
        if (!dialogueSet) {
            return this.getFallbackDialogue(category);
        }
        
        // Filter dialogues based on context
        const filteredDialogues = this.filterDialoguesByContext(dialogueSet, context);
        
        // Select appropriate dialogue
        const selectedDialogue = this.selectDialogue(filteredDialogues, context);
        
        // Add to history
        this.addToHistory(category, selectedDialogue, context);
        
        return selectedDialogue;
    }
    
    /**
     * Filter dialogues based on context
     */
    filterDialoguesByContext(dialogues, context) {
        return dialogues.filter(dialogue => {
            // Check room context
            if (dialogue.room && dialogue.room !== context.room) {
                return false;
            }
            
            // Check mood context
            if (dialogue.mood && dialogue.mood !== context.mood) {
                return false;
            }
            
            // Check quest context
            if (dialogue.questProgress && !this.checkQuestContext(dialogue.questProgress, context.questProgress)) {
                return false;
            }
            
            // Check time context
            if (dialogue.timeOfDay && dialogue.timeOfDay !== context.timeOfDay) {
                return false;
            }
            
            return true;
        });
    }
    
    /**
     * Check quest context requirements
     */
    checkQuestContext(requirements, currentProgress) {
        if (!requirements || !currentProgress) return true;
        
        // Check active quests
        if (requirements.activeQuests) {
            const hasRequiredQuest = requirements.activeQuests.some(questId => 
                currentProgress.activeQuests.includes(questId)
            );
            if (!hasRequiredQuest) return false;
        }
        
        // Check completed quests
        if (requirements.completedQuests) {
            const hasRequiredCompleted = requirements.completedQuests.some(questId => 
                currentProgress.completedQuests.includes(questId)
            );
            if (!hasRequiredCompleted) return false;
        }
        
        return true;
    }
    
    /**
     * Select dialogue from filtered options
     */
    selectDialogue(dialogues, context) {
        if (dialogues.length === 0) {
            return this.getFallbackDialogue(this.categories[context.category] || 'general');
        }
        
        // Weight dialogues based on context relevance
        const weightedDialogues = dialogues.map(dialogue => ({
            ...dialogue,
            weight: this.calculateDialogueWeight(dialogue, context)
        }));
        
        // Sort by weight and select
        weightedDialogues.sort((a, b) => b.weight - a.weight);
        
        // Add some randomness to selection
        const topDialogues = weightedDialogues.slice(0, Math.min(3, weightedDialogues.length));
        const randomIndex = Math.floor(Math.random() * topDialogues.length);
        
        return topDialogues[randomIndex];
    }
    
    /**
     * Calculate dialogue weight based on context
     */
    calculateDialogueWeight(dialogue, context) {
        let weight = 1;
        
        // Base weight from dialogue priority
        weight += dialogue.priority || 0;
        
        // Boost for exact room match
        if (dialogue.room === context.room) {
            weight += 2;
        }
        
        // Boost for exact mood match
        if (dialogue.mood === context.mood) {
            weight += 1.5;
        }
        
        // Boost for time of day match
        if (dialogue.timeOfDay === context.timeOfDay) {
            weight += 1;
        }
        
        // Reduce weight for recently used dialogues
        const recentUsage = this.getRecentUsageCount(dialogue.id);
        weight -= recentUsage * 0.5;
        
        return Math.max(0, weight);
    }
    
    /**
     * Get fallback dialogue
     */
    getFallbackDialogue(category) {
        const fallbacks = {
            general: {
                id: 'fallback-general',
                text: "Well, hello there! I'm always happy to chat.",
                category: 'conversation',
                priority: 0
            },
            quest: {
                id: 'fallback-quest',
                text: "I'm here to help with your quests whenever you need guidance.",
                category: 'quest-guidance',
                priority: 0
            },
            room: {
                id: 'fallback-room',
                text: "This is a lovely place, isn't it?",
                category: 'room-greeting',
                priority: 0
            },
            object: {
                id: 'fallback-object',
                text: "Interesting things you have here!",
                category: 'object-interaction',
                priority: 0
            },
            memory: {
                id: 'fallback-memory',
                text: "I remember our conversations fondly.",
                category: 'memory',
                priority: 0
            },
            magic: {
                id: 'fallback-magic',
                text: "Magic is all around us, you know.",
                category: 'spell-teaching',
                priority: 0
            },
            lore: {
                id: 'fallback-lore',
                text: "There's so much history in these walls.",
                category: 'lore-sharing',
                priority: 0
            }
        };
        
        return fallbacks[category] || fallbacks.general;
    }
    
    /**
     * Add dialogue to history
     */
    addToHistory(category, dialogue, context) {
        this.dialogueHistory.push({
            category: category,
            dialogue: dialogue,
            context: context,
            timestamp: new Date().toISOString()
        });
        
        // Keep history manageable
        if (this.dialogueHistory.length > this.maxHistorySize) {
            this.dialogueHistory = this.dialogueHistory.slice(-this.maxHistorySize);
        }
        
        // Save history
        this.saveDialogueHistory();
    }
    
    /**
     * Get recent usage count for dialogue
     */
    getRecentUsageCount(dialogueId) {
        const recentHistory = this.dialogueHistory.slice(-10);
        return recentHistory.filter(entry => entry.dialogue.id === dialogueId).length;
    }
    
    /**
     * Load response patterns
     */
    loadResponsePatterns() {
        // Define response patterns for different situations
        this.responsePatterns.set('quest-help', {
            pattern: /quest|help|guidance/i,
            responses: ['quest-guidance']
        });
        
        this.responsePatterns.set('memory-request', {
            pattern: /remember|memory|past/i,
            responses: ['memory']
        });
        
        this.responsePatterns.set('magic-interest', {
            pattern: /magic|spell|enchant/i,
            responses: ['spell-teaching']
        });
        
        this.responsePatterns.set('lore-interest', {
            pattern: /history|lore|story/i,
            responses: ['lore-sharing']
        });
    }
    
    /**
     * Save dialogue history
     */
    saveDialogueHistory() {
        try {
            localStorage.setItem('hobbit-dialogue-history', JSON.stringify(this.dialogueHistory));
        } catch (error) {
            console.error('❌ Error saving dialogue history:', error);
        }
    }
    
    /**
     * Load dialogue history
     */
    loadDialogueHistory() {
        try {
            const savedHistory = localStorage.getItem('hobbit-dialogue-history');
            if (savedHistory) {
                this.dialogueHistory = JSON.parse(savedHistory);
            }
        } catch (error) {
            console.error('❌ Error loading dialogue history:', error);
        }
    }
    
    /**
     * Initialize dialogue content
     */
    initializeDialogueContent() {
        return {
            'conversation': [
                {
                    id: 'conv-general-1',
                    text: "Hello there! I'm Bilbo, your faithful companion on this magical journey.",
                    category: 'conversation',
                    priority: 1,
                    mood: 'happy'
                },
                {
                    id: 'conv-general-2',
                    text: "What a wonderful day for an adventure! How can I help you today?",
                    category: 'conversation',
                    priority: 1,
                    mood: 'excited'
                },
                {
                    id: 'conv-general-3',
                    text: "I've been thinking about our journey together. It's been quite the experience!",
                    category: 'conversation',
                    priority: 1,
                    mood: 'mysterious'
                },
                {
                    id: 'conv-curious-1',
                    text: "I'm curious about what you're planning to do next. Care to share?",
                    category: 'conversation',
                    priority: 2,
                    mood: 'curious'
                },
                {
                    id: 'conv-wisdom-1',
                    text: "You know, I've learned that the best adventures come from unexpected places.",
                    category: 'conversation',
                    priority: 2,
                    mood: 'mysterious'
                }
            ],
            
            'quest-guidance': [
                {
                    id: 'quest-general-1',
                    text: "I sense you're working on something important. Let me help guide you!",
                    category: 'quest-guidance',
                    priority: 1
                },
                {
                    id: 'quest-active-1',
                    text: "I can see you have active quests. Would you like some guidance on your current objectives?",
                    category: 'quest-guidance',
                    priority: 2,
                    questProgress: { activeQuests: true }
                },
                {
                    id: 'quest-progress-1',
                    text: "You're making excellent progress! Keep following your instincts.",
                    category: 'quest-guidance',
                    priority: 2,
                    mood: 'proud'
                },
                {
                    id: 'quest-stuck-1',
                    text: "Sometimes the best approach is to step back and look at things differently.",
                    category: 'quest-guidance',
                    priority: 1,
                    mood: 'wise'
                }
            ],
            
            'room-greeting': [
                {
                    id: 'room-living-1',
                    text: "Ah, the living room! Such a cozy place for conversation.",
                    category: 'room-greeting',
                    priority: 2,
                    room: 'living-room'
                },
                {
                    id: 'room-kitchen-1',
                    text: "The kitchen! I do love the smell of magical ingredients brewing.",
                    category: 'room-greeting',
                    priority: 2,
                    room: 'kitchen'
                },
                {
                    id: 'room-library-1',
                    text: "The library! So much knowledge waiting to be discovered.",
                    category: 'room-greeting',
                    priority: 2,
                    room: 'library'
                },
                {
                    id: 'room-workshop-1',
                    text: "The workshop! A place where ideas become reality.",
                    category: 'room-greeting',
                    priority: 2,
                    room: 'workshop'
                },
                {
                    id: 'room-bedroom-1',
                    text: "The bedroom! A peaceful place for rest and reflection.",
                    category: 'room-greeting',
                    priority: 2,
                    room: 'bedroom'
                },
                {
                    id: 'room-garden-1',
                    text: "The garden! Nature's magic is always inspiring.",
                    category: 'room-greeting',
                    priority: 2,
                    room: 'garden'
                }
            ],
            
            'quest-progress': [
                {
                    id: 'progress-encouragement-1',
                    text: "Excellent work! You're really getting the hang of this magical world.",
                    category: 'quest-progress',
                    priority: 2,
                    mood: 'proud'
                },
                {
                    id: 'progress-curious-1',
                    text: "I'm curious to see what you'll discover next!",
                    category: 'quest-progress',
                    priority: 1,
                    mood: 'curious'
                },
                {
                    id: 'progress-wisdom-1',
                    text: "Each step forward teaches us something new about ourselves.",
                    category: 'quest-progress',
                    priority: 1,
                    mood: 'mysterious'
                }
            ],
            
            'object-interaction': [
                {
                    id: 'obj-fireplace-1',
                    text: "The fireplace brings such warmth and light to the room!",
                    category: 'object-interaction',
                    priority: 2,
                    room: 'living-room'
                },
                {
                    id: 'obj-basket-1',
                    text: "The basket might contain magical ingredients!",
                    category: 'object-interaction',
                    priority: 2,
                    room: 'kitchen'
                },
                {
                    id: 'obj-drawer-1',
                    text: "The drawer could hold cooking tools and secrets!",
                    category: 'object-interaction',
                    priority: 2,
                    room: 'kitchen'
                },
                {
                    id: 'obj-books-1',
                    text: "Books hold the wisdom of ages. What knowledge will you discover?",
                    category: 'object-interaction',
                    priority: 2,
                    room: 'library'
                },
                {
                    id: 'obj-tools-1',
                    text: "Tools are extensions of our creativity and skill.",
                    category: 'object-interaction',
                    priority: 2,
                    room: 'workshop'
                }
            ],
            
            'memory': [
                {
                    id: 'memory-general-1',
                    text: "I remember our conversations fondly. Each one has been special.",
                    category: 'memory',
                    priority: 1
                },
                {
                    id: 'memory-recent-1',
                    text: "Our recent adventures have been quite memorable!",
                    category: 'memory',
                    priority: 2
                },
                {
                    id: 'memory-wisdom-1',
                    text: "Memories are the threads that weave our story together.",
                    category: 'memory',
                    priority: 1,
                    mood: 'mysterious'
                }
            ],
            
            'spell-teaching': [
                {
                    id: 'spell-general-1',
                    text: "Magic flows through everything around us. You just need to learn to see it.",
                    category: 'spell-teaching',
                    priority: 1,
                    mood: 'mysterious'
                },
                {
                    id: 'spell-curious-1',
                    text: "I'd be happy to teach you some magical techniques!",
                    category: 'spell-teaching',
                    priority: 2,
                    mood: 'excited'
                },
                {
                    id: 'spell-wisdom-1',
                    text: "The best spells come from understanding, not just memorization.",
                    category: 'spell-teaching',
                    priority: 1,
                    mood: 'wise'
                }
            ],
            
            'lore-sharing': [
                {
                    id: 'lore-general-1',
                    text: "This place holds many secrets and stories from ages past.",
                    category: 'lore-sharing',
                    priority: 1,
                    mood: 'mysterious'
                },
                {
                    id: 'lore-curious-1',
                    text: "Would you like to hear about the history of this magical realm?",
                    category: 'lore-sharing',
                    priority: 2,
                    mood: 'curious'
                },
                {
                    id: 'lore-wisdom-1',
                    text: "Every room has its own story to tell, if you know how to listen.",
                    category: 'lore-sharing',
                    priority: 1,
                    mood: 'wise'
                }
            ]
        };
    }
    
    /**
     * Get dialogue history
     */
    getDialogueHistory() {
        return [...this.dialogueHistory];
    }
    
    /**
     * Clear dialogue history
     */
    clearDialogueHistory() {
        this.dialogueHistory = [];
        this.saveDialogueHistory();
        console.log('🗑️ Dialogue history cleared');
    }
    
    /**
     * Get dialogue statistics
     */
    getDialogueStats() {
        const stats = {
            totalDialogues: this.dialogueHistory.length,
            categories: {},
            moods: {},
            recentActivity: this.dialogueHistory.slice(-5)
        };
        
        // Count by category
        this.dialogueHistory.forEach(entry => {
            const category = entry.category;
            stats.categories[category] = (stats.categories[category] || 0) + 1;
        });
        
        // Count by mood
        this.dialogueHistory.forEach(entry => {
            const mood = entry.context.mood;
            if (mood) {
                stats.moods[mood] = (stats.moods[mood] || 0) + 1;
            }
        });
        
        return stats;
    }
}

// Export for use in other modules
window.HobbitDialogue = HobbitDialogue;
