/**
 * Fantasy OS - Hobbit Memory System
 * Manages hobbit memory, interaction history, and learning system
 * Created: 2025-10-25T16:24:13.000Z
 */

class HobbitMemory {
    constructor() {
        this.memories = new Map();
        this.memoryTypes = {
            'conversation': { priority: 1, retention: 7 },
            'quest-guidance': { priority: 3, retention: 14 },
            'object-interaction': { priority: 2, retention: 10 },
            'room-change': { priority: 1, retention: 5 },
            'quest-progress': { priority: 4, retention: 21 },
            'spell-teaching': { priority: 3, retention: 14 },
            'lore-sharing': { priority: 2, retention: 10 },
            'achievement': { priority: 5, retention: 30 }
        };
        
        this.maxMemories = 100;
        this.memoryDecayRate = 0.1; // How quickly memories fade
        this.learningRate = 0.05;   // How quickly new patterns are learned
        
        // Memory patterns and associations
        this.patterns = new Map();
        this.associations = new Map();
        
        // Memory categories for organization
        this.categories = {
            'personal': 'Personal interactions and conversations',
            'quest': 'Quest-related information and guidance',
            'magic': 'Magical knowledge and spell teachings',
            'lore': 'Historical and cultural information',
            'technical': 'System and technical information',
            'social': 'Social interactions and relationships'
        };
    }
    
    /**
     * Initialize memory system
     */
    async init() {
        console.log('🧠 Initializing Hobbit Memory System...');
        
        // Load saved memories
        this.loadMemories();
        
        // Initialize memory patterns
        this.initializeMemoryPatterns();
        
        // Start memory maintenance
        this.startMemoryMaintenance();
        
        console.log('🧠 Hobbit Memory System initialized');
    }
    
    /**
     * Add a new memory
     */
    addMemory(type, content) {
        const memoryId = this.generateMemoryId();
        const memoryType = this.memoryTypes[type] || { priority: 1, retention: 7 };
        
        const memory = {
            id: memoryId,
            type: type,
            content: content,
            timestamp: new Date().toISOString(),
            priority: memoryType.priority,
            retention: memoryType.retention,
            strength: 1.0,
            category: this.categorizeMemory(type, content),
            tags: this.extractTags(content),
            associations: []
        };
        
        // Store memory
        this.memories.set(memoryId, memory);
        
        // Update patterns and associations
        this.updateMemoryPatterns(memory);
        this.createAssociations(memory);
        
        // Maintain memory limit
        this.maintainMemoryLimit();
        
        // Save memories
        this.saveMemories();
        
        console.log(`🧠 Added memory: ${type} - ${memoryId}`);
        return memoryId;
    }
    
    /**
     * Get memories by criteria
     */
    getMemories(criteria = {}) {
        const filteredMemories = Array.from(this.memories.values()).filter(memory => {
            // Filter by type
            if (criteria.type && memory.type !== criteria.type) {
                return false;
            }
            
            // Filter by category
            if (criteria.category && memory.category !== criteria.category) {
                return false;
            }
            
            // Filter by date range
            if (criteria.startDate && new Date(memory.timestamp) < new Date(criteria.startDate)) {
                return false;
            }
            if (criteria.endDate && new Date(memory.timestamp) > new Date(criteria.endDate)) {
                return false;
            }
            
            // Filter by strength
            if (criteria.minStrength && memory.strength < criteria.minStrength) {
                return false;
            }
            
            return true;
        });
        
        // Sort by relevance (strength * priority)
        filteredMemories.sort((a, b) => 
            (b.strength * b.priority) - (a.strength * a.priority)
        );
        
        return filteredMemories;
    }
    
    /**
     * Get recent memories
     */
    getRecentMemories(count = 10) {
        const recentMemories = Array.from(this.memories.values())
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, count);
        
        return recentMemories;
    }
    
    /**
     * Get memories by association
     */
    getAssociatedMemories(memoryId, maxCount = 5) {
        const memory = this.memories.get(memoryId);
        if (!memory) return [];
        
        const associatedMemories = memory.associations
            .map(assocId => this.memories.get(assocId))
            .filter(mem => mem && mem.strength > 0.3)
            .sort((a, b) => b.strength - a.strength)
            .slice(0, maxCount);
        
        return associatedMemories;
    }
    
    /**
     * Search memories by content
     */
    searchMemories(query, maxResults = 10) {
        const searchTerms = query.toLowerCase().split(' ');
        const scoredMemories = Array.from(this.memories.values()).map(memory => {
            let score = 0;
            const content = JSON.stringify(memory.content).toLowerCase();
            
            // Score based on term matches
            searchTerms.forEach(term => {
                if (content.includes(term)) {
                    score += 1;
                }
            });
            
            // Boost score for exact matches
            if (content.includes(query.toLowerCase())) {
                score += 2;
            }
            
            // Boost score for tag matches
            memory.tags.forEach(tag => {
                if (tag.toLowerCase().includes(query.toLowerCase())) {
                    score += 1.5;
                }
            });
            
            return { memory, score };
        });
        
        // Filter and sort by score
        return scoredMemories
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, maxResults)
            .map(item => item.memory);
    }
    
    /**
     * Generate unique memory ID
     */
    generateMemoryId() {
        return `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Categorize memory based on type and content
     */
    categorizeMemory(type, content) {
        const typeCategories = {
            'conversation': 'personal',
            'quest-guidance': 'quest',
            'quest-progress': 'quest',
            'spell-teaching': 'magic',
            'lore-sharing': 'lore',
            'object-interaction': 'technical',
            'room-change': 'technical',
            'achievement': 'personal'
        };
        
        return typeCategories[type] || 'personal';
    }
    
    /**
     * Extract tags from memory content
     */
    extractTags(content) {
        const tags = [];
        
        // Extract tags from content text
        if (content.content) {
            const text = content.content.toLowerCase();
            
            // Room tags
            const rooms = ['living-room', 'kitchen', 'library', 'workshop', 'bedroom', 'garden'];
            rooms.forEach(room => {
                if (text.includes(room)) {
                    tags.push(room);
                }
            });
            
            // Object tags
            const objects = ['fireplace', 'lamp', 'chest', 'crystal-ball', 'spell-book', 'cauldron'];
            objects.forEach(obj => {
                if (text.includes(obj)) {
                    tags.push(obj);
                }
            });
            
            // Mood tags
            const moods = ['happy', 'excited', 'worried', 'mysterious', 'proud', 'curious'];
            moods.forEach(mood => {
                if (text.includes(mood)) {
                    tags.push(mood);
                }
            });
        }
        
        // Add type tag
        tags.push(content.type);
        
        return [...new Set(tags)]; // Remove duplicates
    }
    
    /**
     * Update memory patterns based on new memory
     */
    updateMemoryPatterns(memory) {
        const patternKey = `${memory.type}_${memory.category}`;
        
        if (!this.patterns.has(patternKey)) {
            this.patterns.set(patternKey, {
                count: 0,
                totalStrength: 0,
                lastSeen: memory.timestamp,
                examples: []
            });
        }
        
        const pattern = this.patterns.get(patternKey);
        pattern.count += 1;
        pattern.totalStrength += memory.strength;
        pattern.lastSeen = memory.timestamp;
        pattern.examples.push(memory.id);
        
        // Keep only recent examples
        if (pattern.examples.length > 10) {
            pattern.examples = pattern.examples.slice(-10);
        }
    }
    
    /**
     * Create associations between memories
     */
    createAssociations(memory) {
        const memoryTags = memory.tags;
        
        // Find memories with similar tags
        this.memories.forEach((otherMemory, otherId) => {
            if (otherId === memory.id) return;
            
            const commonTags = memoryTags.filter(tag => 
                otherMemory.tags.includes(tag)
            );
            
            // Create association if there are common tags
            if (commonTags.length > 0) {
                const associationStrength = commonTags.length / Math.max(memoryTags.length, otherMemory.tags.length);
                
                if (associationStrength > 0.3) {
                    memory.associations.push(otherId);
                    otherMemory.associations.push(memory.id);
                }
            }
        });
    }
    
    /**
     * Start memory maintenance process
     */
    startMemoryMaintenance() {
        // Run memory maintenance every hour
        setInterval(() => {
            this.performMemoryMaintenance();
        }, 60 * 60 * 1000);
        
        console.log('🧠 Memory maintenance started');
    }
    
    /**
     * Perform memory maintenance
     */
    performMemoryMaintenance() {
        console.log('🧠 Performing memory maintenance...');
        
        // Decay memory strength
        this.memories.forEach(memory => {
            const ageInDays = (Date.now() - new Date(memory.timestamp).getTime()) / (1000 * 60 * 60 * 24);
            const decayFactor = Math.exp(-this.memoryDecayRate * ageInDays);
            memory.strength = Math.max(0.1, memory.strength * decayFactor);
        });
        
        // Remove very weak memories
        const weakMemories = Array.from(this.memories.entries())
            .filter(([id, memory]) => memory.strength < 0.1)
            .map(([id]) => id);
        
        weakMemories.forEach(id => {
            this.memories.delete(id);
        });
        
        if (weakMemories.length > 0) {
            console.log(`🧠 Removed ${weakMemories.length} weak memories`);
        }
        
        // Maintain memory limit
        this.maintainMemoryLimit();
        
        // Save updated memories
        this.saveMemories();
    }
    
    /**
     * Maintain memory limit by removing oldest/lowest priority memories
     */
    maintainMemoryLimit() {
        if (this.memories.size <= this.maxMemories) return;
        
        const memoriesArray = Array.from(this.memories.values());
        
        // Sort by relevance score (strength * priority)
        memoriesArray.sort((a, b) => 
            (a.strength * a.priority) - (b.strength * b.priority)
        );
        
        // Remove least relevant memories
        const toRemove = memoriesArray.slice(0, this.memories.size - this.maxMemories);
        toRemove.forEach(memory => {
            this.memories.delete(memory.id);
        });
        
        console.log(`🧠 Removed ${toRemove.length} memories to maintain limit`);
    }
    
    /**
     * Initialize memory patterns
     */
    initializeMemoryPatterns() {
        // Initialize common patterns
        const commonPatterns = [
            'conversation_personal',
            'quest-guidance_quest',
            'object-interaction_technical',
            'room-change_technical',
            'spell-teaching_magic',
            'lore-sharing_lore'
        ];
        
        commonPatterns.forEach(patternKey => {
            this.patterns.set(patternKey, {
                count: 0,
                totalStrength: 0,
                lastSeen: null,
                examples: []
            });
        });
    }
    
    /**
     * Get memory statistics
     */
    getMemoryStats() {
        const stats = {
            totalMemories: this.memories.size,
            memoryTypes: {},
            categories: {},
            patterns: {},
            averageStrength: 0,
            oldestMemory: null,
            newestMemory: null
        };
        
        let totalStrength = 0;
        let oldestTimestamp = null;
        let newestTimestamp = null;
        
        this.memories.forEach(memory => {
            // Count by type
            stats.memoryTypes[memory.type] = (stats.memoryTypes[memory.type] || 0) + 1;
            
            // Count by category
            stats.categories[memory.category] = (stats.categories[memory.category] || 0) + 1;
            
            // Track strength
            totalStrength += memory.strength;
            
            // Track timestamps
            if (!oldestTimestamp || new Date(memory.timestamp) < new Date(oldestTimestamp)) {
                oldestTimestamp = memory.timestamp;
                stats.oldestMemory = memory;
            }
            if (!newestTimestamp || new Date(memory.timestamp) > new Date(newestTimestamp)) {
                newestTimestamp = memory.timestamp;
                stats.newestMemory = memory;
            }
        });
        
        stats.averageStrength = this.memories.size > 0 ? totalStrength / this.memories.size : 0;
        
        // Pattern statistics
        this.patterns.forEach((pattern, key) => {
            stats.patterns[key] = {
                count: pattern.count,
                averageStrength: pattern.count > 0 ? pattern.totalStrength / pattern.count : 0,
                lastSeen: pattern.lastSeen
            };
        });
        
        return stats;
    }
    
    /**
     * Get memory state
     */
    getState() {
        return {
            memories: Array.from(this.memories.values()),
            patterns: Object.fromEntries(this.patterns),
            associations: Object.fromEntries(this.associations)
        };
    }
    
    /**
     * Set memory state
     */
    setState(state) {
        if (state.memories) {
            this.memories = new Map(state.memories.map(memory => [memory.id, memory]));
        }
        if (state.patterns) {
            this.patterns = new Map(Object.entries(state.patterns));
        }
        if (state.associations) {
            this.associations = new Map(Object.entries(state.associations));
        }
    }
    
    /**
     * Save memories to storage
     */
    saveMemories() {
        try {
            const state = this.getState();
            localStorage.setItem('hobbit-memory-state', JSON.stringify(state));
        } catch (error) {
            console.error('❌ Error saving memories:', error);
        }
    }
    
    /**
     * Load memories from storage
     */
    loadMemories() {
        try {
            const savedState = localStorage.getItem('hobbit-memory-state');
            if (savedState) {
                const state = JSON.parse(savedState);
                this.setState(state);
            }
        } catch (error) {
            console.error('❌ Error loading memories:', error);
        }
    }
    
    /**
     * Reset memory system
     */
    reset() {
        this.memories.clear();
        this.patterns.clear();
        this.associations.clear();
        
        localStorage.removeItem('hobbit-memory-state');
        console.log('🔄 Hobbit memory system reset');
    }
}

// Export for use in other modules
window.HobbitMemory = HobbitMemory;
