/**
 * Fantasy OS - Gesture Pattern Definitions
 * Defines all available gesture patterns and their properties
 * Created: 2025-10-25T12:22:24.000Z
 */

class GesturePatterns {
    constructor() {
        this.patterns = {
            circle: {
                name: 'Circle',
                description: 'Portal opening gesture',
                spell: 'open portal',
                threshold: 0.4, // Lowered from 0.8
                minPoints: 15, // Lowered from 20
                features: {
                    isClosed: true,
                    aspectRatioRange: [0.5, 1.5], // Wider range
                    curvatureRange: [0.05, 0.6], // Wider range
                    directionChangesMax: 6 // Increased
                },
                visual: {
                    color: '#D4AF37',
                    strokeWidth: 3,
                    animation: 'magicPulse'
                }
            },
            zigzag: {
                name: 'Zigzag',
                description: 'Lightning gesture',
                spell: 'summon light',
                threshold: 0.7,
                minPoints: 15,
                features: {
                    isClosed: false,
                    aspectRatioRange: [1.2, 3.0],
                    curvatureRange: [0.0, 0.3],
                    directionChangesMin: 6
                },
                visual: {
                    color: '#FFD700',
                    strokeWidth: 2,
                    animation: 'sparkle'
                }
            },
            spiral: {
                name: 'Spiral',
                description: 'Fire gesture',
                spell: 'ignite fireplace',
                threshold: 0.3, // Lowered from 0.6
                minPoints: 15, // Lowered from 25
                features: {
                    isClosed: true,
                    aspectRatioRange: [0.6, 1.4], // Wider range
                    curvatureRange: [0.1, 0.9], // Wider range
                    pathLengthMin: 10 // Lowered from 20
                },
                visual: {
                    color: '#DC143C',
                    strokeWidth: 3,
                    animation: 'magicPulse'
                }
            },
            heart: {
                name: 'Heart',
                description: 'Favorites gesture',
                spell: 'cast protection spell',
                threshold: 0.2, // Lowered from 0.5
                minPoints: 12, // Lowered from 20
                features: {
                    isClosed: true,
                    aspectRatioRange: [0.3, 1.5], // Much wider range
                    curvatureRange: [0.05, 0.8], // Much wider range
                    directionChangesMax: 12 // Increased
                },
                visual: {
                    color: '#FF69B4',
                    strokeWidth: 3,
                    animation: 'fadeIn'
                }
            },
            star: {
                name: 'Star',
                description: 'Magic star gesture',
                spell: 'summon magic',
                threshold: 0.6,
                minPoints: 30,
                features: {
                    isClosed: true,
                    aspectRatioRange: [0.8, 1.2],
                    curvatureRange: [0.2, 0.7],
                    directionChangesMin: 8
                },
                visual: {
                    color: '#9370DB',
                    strokeWidth: 2,
                    animation: 'sparkle'
                }
            },
            triangle: {
                name: 'Triangle',
                description: 'Stability gesture',
                spell: 'cast stability',
                threshold: 0.7,
                minPoints: 12,
                features: {
                    isClosed: true,
                    aspectRatioRange: [0.7, 1.4],
                    curvatureRange: [0.0, 0.2],
                    directionChangesMax: 6
                },
                visual: {
                    color: '#228B22',
                    strokeWidth: 3,
                    animation: 'slideIn'
                }
            },
            square: {
                name: 'Square',
                description: 'Protection gesture',
                spell: 'cast protection',
                threshold: 0.7,
                minPoints: 16,
                features: {
                    isClosed: true,
                    aspectRatioRange: [0.8, 1.2],
                    curvatureRange: [0.0, 0.1],
                    directionChangesMax: 8
                },
                visual: {
                    color: '#4169E1',
                    strokeWidth: 3,
                    animation: 'fadeIn'
                }
            },
            infinity: {
                name: 'Infinity',
                description: 'Eternal gesture',
                spell: 'cast eternal',
                threshold: 0.6,
                minPoints: 35,
                features: {
                    isClosed: true,
                    aspectRatioRange: [1.5, 2.5],
                    curvatureRange: [0.3, 0.8],
                    pathLengthMin: 30
                },
                visual: {
                    color: '#00CED1',
                    strokeWidth: 2,
                    animation: 'magicPulse'
                }
            }
        };
        
        this.customPatterns = new Map();
        this.patternHistory = [];
        this.maxHistorySize = 50;
    }
    
    /**
     * Get all available patterns
     */
    getAllPatterns() {
        return Object.keys(this.patterns).map(type => ({
            type,
            ...this.patterns[type]
        }));
    }
    
    /**
     * Get pattern by type
     */
    getPattern(type) {
        return this.patterns[type] || this.customPatterns.get(type);
    }
    
    /**
     * Add custom pattern
     */
    addCustomPattern(type, pattern) {
        this.customPatterns.set(type, {
            ...pattern,
            isCustom: true,
            createdAt: new Date().toISOString()
        });
        
        console.log(`✨ Custom pattern added: ${type}`);
        return this;
    }
    
    /**
     * Remove custom pattern
     */
    removeCustomPattern(type) {
        if (this.customPatterns.has(type)) {
            this.customPatterns.delete(type);
            console.log(`🗑️ Custom pattern removed: ${type}`);
        }
        return this;
    }
    
    /**
     * Get pattern features for recognition
     */
    getPatternFeatures(type) {
        const pattern = this.getPattern(type);
        return pattern ? pattern.features : null;
    }
    
    /**
     * Get pattern visual properties
     */
    getPatternVisual(type) {
        const pattern = this.getPattern(type);
        return pattern ? pattern.visual : null;
    }
    
    /**
     * Check if pattern exists
     */
    hasPattern(type) {
        return this.patterns.hasOwnProperty(type) || this.customPatterns.has(type);
    }
    
    /**
     * Get patterns by category
     */
    getPatternsByCategory(category) {
        const categories = {
            basic: ['circle', 'square', 'triangle'],
            complex: ['spiral', 'star', 'infinity'],
            emotional: ['heart'],
            elemental: ['zigzag', 'spiral']
        };
        
        const patternTypes = categories[category] || [];
        return patternTypes.map(type => ({
            type,
            ...this.getPattern(type)
        })).filter(pattern => pattern.name);
    }
    
    /**
     * Get pattern statistics
     */
    getPatternStats() {
        const stats = {
            total: Object.keys(this.patterns).length + this.customPatterns.size,
            builtIn: Object.keys(this.patterns).length,
            custom: this.customPatterns.size,
            mostUsed: this.getMostUsedPattern(),
            averageThreshold: this.getAverageThreshold()
        };
        
        return stats;
    }
    
    /**
     * Get most used pattern from history
     */
    getMostUsedPattern() {
        if (this.patternHistory.length === 0) return null;
        
        const usage = {};
        this.patternHistory.forEach(entry => {
            usage[entry.pattern] = (usage[entry.pattern] || 0) + 1;
        });
        
        return Object.keys(usage).reduce((a, b) => 
            usage[a] > usage[b] ? a : b
        );
    }
    
    /**
     * Get average threshold across all patterns
     */
    getAverageThreshold() {
        const thresholds = Object.values(this.patterns).map(p => p.threshold);
        return thresholds.reduce((a, b) => a + b, 0) / thresholds.length;
    }
    
    /**
     * Add pattern usage to history
     */
    addPatternUsage(patternType, score) {
        this.patternHistory.unshift({
            pattern: patternType,
            score,
            timestamp: new Date().toISOString()
        });
        
        // Limit history size
        if (this.patternHistory.length > this.maxHistorySize) {
            this.patternHistory = this.patternHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get pattern history
     */
    getPatternHistory(limit = 10) {
        return this.patternHistory.slice(0, limit);
    }
    
    /**
     * Export patterns to JSON
     */
    exportPatterns() {
        return {
            builtIn: this.patterns,
            custom: Object.fromEntries(this.customPatterns),
            history: this.patternHistory,
            exportedAt: new Date().toISOString()
        };
    }
    
    /**
     * Import patterns from JSON
     */
    importPatterns(data) {
        if (data.custom) {
            Object.entries(data.custom).forEach(([type, pattern]) => {
                this.customPatterns.set(type, pattern);
            });
        }
        
        if (data.history) {
            this.patternHistory = data.history;
        }
        
        console.log('📥 Patterns imported successfully');
        return this;
    }
    
    /**
     * Reset patterns to default
     */
    resetPatterns() {
        this.customPatterns.clear();
        this.patternHistory = [];
        console.log('🔄 Patterns reset to default');
        return this;
    }
    
    /**
     * Get pattern suggestions based on features
     */
    getPatternSuggestions(features) {
        const suggestions = [];
        
        Object.entries(this.patterns).forEach(([type, pattern]) => {
            let matchScore = 0;
            const patternFeatures = pattern.features;
            
            // Check aspect ratio
            if (patternFeatures.aspectRatioRange) {
                const [min, max] = patternFeatures.aspectRatioRange;
                if (features.aspectRatio >= min && features.aspectRatio <= max) {
                    matchScore += 0.3;
                }
            }
            
            // Check curvature
            if (patternFeatures.curvatureRange) {
                const [min, max] = patternFeatures.curvatureRange;
                if (features.curvature >= min && features.curvature <= max) {
                    matchScore += 0.3;
                }
            }
            
            // Check closed state
            if (patternFeatures.isClosed !== undefined) {
                if (features.isClosed === patternFeatures.isClosed) {
                    matchScore += 0.2;
                }
            }
            
            // Check direction changes
            if (patternFeatures.directionChangesMin && features.directionChanges >= patternFeatures.directionChangesMin) {
                matchScore += 0.1;
            }
            if (patternFeatures.directionChangesMax && features.directionChanges <= patternFeatures.directionChangesMax) {
                matchScore += 0.1;
            }
            
            if (matchScore > 0.3) {
                suggestions.push({
                    type,
                    pattern,
                    matchScore
                });
            }
        });
        
        return suggestions.sort((a, b) => b.matchScore - a.matchScore);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GesturePatterns;
}
