/**
 * Fantasy OS - Gesture Recognition System
 * Recognizes and processes magical gestures for spell casting
 * Created: 2025-10-25T12:04:17.000Z
 * Updated: 2025-10-25T12:22:24.000Z
 */

class GestureRecognition {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.isDrawing = false;
        this.path = [];
        
        // Initialize gesture modules
        this.patterns = new GesturePatterns();
        this.analysis = new GestureAnalysis();
        this.actions = new GestureActions();
        this.helpers = new GestureHelpers();
        
        this.recognitionHistory = [];
        this.maxHistorySize = 30;
        this.isEnabled = true;
        this.debugMode = false;
    }
    
    /**
     * Initialize gesture recognition
     */
    init() {
        this.canvas = document.getElementById('gestureCanvas');
        if (!this.canvas) {
            console.warn('Gesture canvas not found');
            return false;
        }
        
        this.context = this.canvas.getContext('2d');
        
        // Set canvas size to full screen
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.setupCanvas();
        this.setupEventListeners();
        
        console.log('🎨 Gesture recognition initialized');
        return true;
    }
    
    /**
     * Setup canvas properties
     */
    setupCanvas() {
        this.context.strokeStyle = '#D4AF37';
        this.context.lineWidth = 3;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        
        // Magic rainbow trail properties
        this.rainbowColors = [
            '#FF0000', // Red
            '#FF7F00', // Orange
            '#FFFF00', // Yellow
            '#00FF00', // Green
            '#0000FF', // Blue
            '#4B0082', // Indigo
            '#9400D3'  // Violet
        ];
        this.currentColorIndex = 0;
        this.trailPoints = [];
        this.maxTrailLength = 20;
        this.trailOpacity = 0.8;
        
        // Clear canvas
        this.clearCanvas();
    }
    
    /**
     * Setup event listeners for drawing
     */
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    /**
     * Start drawing gesture
     */
    startDrawing(e) {
        this.isDrawing = true;
        this.path = [];
        this.trailPoints = [];
        
        const rect = this.canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            timestamp: Date.now()
        };
        
        this.path.push(point);
        this.trailPoints.push(point);
        
        // Reset color index for new gesture
        this.currentColorIndex = 0;
        
        // Start drawing with magic trail
        this.context.beginPath();
        this.context.moveTo(point.x, point.y);
        
        // Add magic sparkle effect at start
        this.drawMagicSparkle(point.x, point.y);
    }
    
    /**
     * Draw gesture path
     */
    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            timestamp: Date.now()
        };
        
        this.path.push(point);
        this.trailPoints.push(point);
        
        // Limit trail length
        if (this.trailPoints.length > this.maxTrailLength) {
            this.trailPoints.shift();
        }
        
        // Draw magic rainbow trail
        this.drawMagicTrail();
        
        // Draw main line with current rainbow color
        this.context.save();
        this.context.strokeStyle = this.rainbowColors[this.currentColorIndex];
        this.context.lineWidth = 4;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.lineTo(point.x, point.y);
        this.context.stroke();
        this.context.restore();
        
        // Cycle through rainbow colors
        this.currentColorIndex = (this.currentColorIndex + 1) % this.rainbowColors.length;
        
        // Add magic particles along the path
        this.drawMagicParticles(point.x, point.y);
    }
    
    /**
     * Stop drawing and recognize gesture
     */
    stopDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        
        // Recognize gesture if we have enough points
        if (this.path.length >= 5) {
            const gesture = this.recognizeGesture();
            if (gesture) {
                this.executeGesture(gesture);
            }
        }
        
        // Clear canvas after a delay
        setTimeout(() => this.clearCanvas(), 1000);
    }
    
    /**
     * Recognize the drawn gesture
     */
    recognizeGesture() {
        if (this.path.length < 5) return null;
        
        try {
            // Validate path
            const validation = this.helpers.validatePath(this.path);
            if (!validation.valid) {
                console.warn(`Path validation failed: ${validation.error}`);
                return null;
            }
            
            // Optimize path for recognition
            const optimizedPath = this.analysis.optimizePath(this.path);
            
            // Calculate gesture features
            const features = this.analysis.calculateFeatures(optimizedPath);
            
            // Get pattern suggestions
            const suggestions = this.patterns.getPatternSuggestions(features);
            
            if (suggestions.length === 0) {
                console.log('❓ Unknown gesture');
                return null;
            }
            
            const bestMatch = suggestions[0];
            const pattern = this.patterns.getPattern(bestMatch.type);
            
            if (bestMatch.matchScore > pattern.threshold) {
                console.log(`🎯 Recognized gesture: ${pattern.name} (${bestMatch.matchScore.toFixed(2)})`);
                
                // Add to pattern usage history
                this.patterns.addPatternUsage(bestMatch.type, bestMatch.matchScore);
                
                return {
                    type: bestMatch.type,
                    gesture: pattern, // Fix: Add 'gesture' property
                    pattern: pattern,
                    score: bestMatch.matchScore,
                    features: features
                };
            }
            
            console.log('❓ Gesture confidence too low');
            return null;
        } catch (error) {
            console.error('Error in gesture recognition:', error);
            return null;
        }
    }
    
    /**
     * Calculate features of the drawn path
     */
    calculateFeatures() {
        const features = {
            pathLength: this.path.length,
            boundingBox: this.getBoundingBox(),
            aspectRatio: 0,
            curvature: this.calculateCurvature(),
            directionChanges: this.countDirectionChanges(),
            isClosed: this.isPathClosed()
        };
        
        // Calculate aspect ratio
        const width = features.boundingBox.maxX - features.boundingBox.minX;
        const height = features.boundingBox.maxY - features.boundingBox.minY;
        features.aspectRatio = width / height;
        
        return features;
    }
    
    /**
     * Get bounding box of the path
     */
    getBoundingBox() {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        for (const point of this.path) {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        }
        
        return { minX, minY, maxX, maxY };
    }
    
    /**
     * Calculate curvature of the path
     */
    calculateCurvature() {
        if (this.path.length < 3) return 0;
        
        let totalCurvature = 0;
        let curvatureCount = 0;
        
        for (let i = 1; i < this.path.length - 1; i++) {
            const p1 = this.path[i - 1];
            const p2 = this.path[i];
            const p3 = this.path[i + 1];
            
            const curvature = this.calculatePointCurvature(p1, p2, p3);
            totalCurvature += Math.abs(curvature);
            curvatureCount++;
        }
        
        return curvatureCount > 0 ? totalCurvature / curvatureCount : 0;
    }
    
    /**
     * Calculate curvature at a specific point
     */
    calculatePointCurvature(p1, p2, p3) {
        const dx1 = p2.x - p1.x;
        const dy1 = p2.y - p1.y;
        const dx2 = p3.x - p2.x;
        const dy2 = p3.y - p2.y;
        
        const cross = dx1 * dy2 - dy1 * dx2;
        const norm1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const norm2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (norm1 === 0 || norm2 === 0) return 0;
        
        return cross / (norm1 * norm2);
    }
    
    /**
     * Count direction changes in the path
     */
    countDirectionChanges() {
        if (this.path.length < 3) return 0;
        
        let changes = 0;
        let lastDirection = null;
        
        for (let i = 1; i < this.path.length; i++) {
            const p1 = this.path[i - 1];
            const p2 = this.path[i];
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            
            let direction;
            if (Math.abs(dx) > Math.abs(dy)) {
                direction = dx > 0 ? 'right' : 'left';
            } else {
                direction = dy > 0 ? 'down' : 'up';
            }
            
            if (lastDirection && lastDirection !== direction) {
                changes++;
            }
            
            lastDirection = direction;
        }
        
        return changes;
    }
    
    /**
     * Check if the path is closed (forms a loop)
     */
    isPathClosed() {
        if (this.path.length < 4) return false;
        
        const first = this.path[0];
        const last = this.path[this.path.length - 1];
        
        const distance = Math.sqrt(
            Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2)
        );
        
        return distance < 20; // Threshold for considering path closed
    }
    
    /**
     * Compare gesture features with known gesture types
     */
    compareGesture(features, gestureType) {
        switch (gestureType) {
            case 'circle':
                return this.compareCircle(features);
            case 'zigzag':
                return this.compareZigzag(features);
            case 'spiral':
                return this.compareSpiral(features);
            case 'heart':
                return this.compareHeart(features);
            default:
                return 0;
        }
    }
    
    /**
     * Compare with circle gesture
     */
    compareCircle(features) {
        let score = 0;
        
        // Check if path is closed
        if (features.isClosed) score += 0.4;
        
        // Check aspect ratio (should be close to 1 for circle)
        const aspectRatioDiff = Math.abs(features.aspectRatio - 1);
        if (aspectRatioDiff < 0.3) score += 0.3;
        
        // Check curvature (circles have consistent curvature)
        if (features.curvature > 0.1 && features.curvature < 0.5) score += 0.3;
        
        return score;
    }
    
    /**
     * Compare with zigzag gesture
     */
    compareZigzag(features) {
        let score = 0;
        
        // Check direction changes (zigzag has many changes)
        if (features.directionChanges > 6) score += 0.4;
        
        // Check aspect ratio (zigzag is usually wider than tall)
        if (features.aspectRatio > 1.2) score += 0.3;
        
        // Check if not closed
        if (!features.isClosed) score += 0.3;
        
        return score;
    }
    
    /**
     * Compare with spiral gesture
     */
    compareSpiral(features) {
        let score = 0;
        
        // Check if path is closed
        if (features.isClosed) score += 0.3;
        
        // Check curvature (spirals have varying curvature)
        if (features.curvature > 0.2) score += 0.3;
        
        // Check path length (spirals are usually long)
        if (features.pathLength > 20) score += 0.4;
        
        return score;
    }
    
    /**
     * Compare with heart gesture
     */
    compareHeart(features) {
        let score = 0;
        
        // Check if path is closed
        if (features.isClosed) score += 0.3;
        
        // Check aspect ratio (hearts are usually taller than wide)
        if (features.aspectRatio < 1.2) score += 0.3;
        
        // Check curvature (hearts have curves)
        if (features.curvature > 0.1) score += 0.4;
        
        return score;
    }
    
    /**
     * Execute recognized gesture
     */
    executeGesture(gesture) {
        if (!this.isEnabled) {
            console.warn('Gesture recognition is disabled');
            return;
        }
        
        try {
            // Add to recognition history
            this.addToHistory(gesture);
            
            // Show gesture feedback
            this.showGestureFeedback(gesture);
            
            // Map gesture to action
            const action = this.actions.mapGestureToAction(
                gesture.type, 
                gesture.score, 
                { features: gesture.features }
            );
            
            if (action) {
                // Execute the action
                const success = this.actions.executeAction(action);
                
                if (success) {
                    console.log(`✨ Gesture action executed: ${action.action}`);
                } else {
                    console.warn(`⚠️ Gesture action failed: ${action.action}`);
                }
            } else {
                console.warn('No action mapped for gesture');
            }
            
            // Play gesture sound
            if (typeof FantasySounds !== 'undefined') {
                try {
                    FantasySounds.play('gestureRecognized');
                } catch (error) {
                    console.warn('Could not play gesture sound:', error);
                }
            }
        } catch (error) {
            console.error('Error executing gesture:', error);
        }
    }
    
    /**
     * Cast spell associated with gesture
     */
    castGestureSpell(spellText) {
        console.log(`🔮 Casting spell from gesture: ${spellText}`);
        
        // Use spell parser if available
        if (typeof SpellParser !== 'undefined') {
            const spellParser = new SpellParser();
            const result = spellParser.parseSpell(spellText);
            
            if (result.success) {
                this.showMessage(`✨ Gesture spell successful: ${result.message}`);
            } else {
                this.showMessage(`💥 Gesture spell failed: ${result.message}`);
            }
        } else {
            this.showMessage(`🎯 Gesture recognized: ${spellText}`);
        }
    }
    
    /**
     * Show gesture recognition feedback
     */
    showGestureFeedback(gesture) {
        const message = `🎨 ${gesture.gesture.name} recognized! (${(gesture.score * 100).toFixed(0)}%)`;
        this.showMessage(message);
    }
    
    /**
     * Show a message to the user
     */
    showMessage(message, duration = 3000) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = 'gesture-message';
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--magic-purple);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            font-family: 'MedievalSharp', cursive;
            font-size: 16px;
            z-index: 3000;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageElement);
        
        // Remove after duration
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.animation = 'fadeOut 0.3s ease-in';
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 300);
            }
        }, duration);
    }
    
    /**
     * Draw magic rainbow trail
     */
    drawMagicTrail() {
        if (this.trailPoints.length < 2) return;
        
        // Draw fading trail behind the main line
        for (let i = 0; i < this.trailPoints.length - 1; i++) {
            const point1 = this.trailPoints[i];
            const point2 = this.trailPoints[i + 1];
            
            // Calculate opacity based on position in trail
            const opacity = (i / this.trailPoints.length) * this.trailOpacity;
            const colorIndex = (this.currentColorIndex - i) % this.rainbowColors.length;
            const color = this.rainbowColors[colorIndex < 0 ? colorIndex + this.rainbowColors.length : colorIndex];
            
            // Draw trail segment
            this.context.save();
            this.context.strokeStyle = color;
            this.context.globalAlpha = opacity;
            this.context.lineWidth = 8 - (i * 0.3); // Decreasing width
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
            this.context.beginPath();
            this.context.moveTo(point1.x, point1.y);
            this.context.lineTo(point2.x, point2.y);
            this.context.stroke();
            this.context.restore();
        }
    }
    
    /**
     * Draw magic sparkle effect
     */
    drawMagicSparkle(x, y) {
        // Create multiple sparkles
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 15 + Math.random() * 10;
            const sparkleX = x + Math.cos(angle) * distance;
            const sparkleY = y + Math.sin(angle) * distance;
            
            this.context.save();
            this.context.globalAlpha = 0.8 + Math.random() * 0.2;
            this.context.fillStyle = this.rainbowColors[i % this.rainbowColors.length];
            this.context.shadowColor = this.rainbowColors[i % this.rainbowColors.length];
            this.context.shadowBlur = 15;
            
            // Draw sparkle as a star
            this.context.beginPath();
            const size = 3 + Math.random() * 3;
            for (let j = 0; j < 5; j++) {
                const starAngle = (Math.PI * 2 * j) / 5;
                const starX = sparkleX + Math.cos(starAngle) * size;
                const starY = sparkleY + Math.sin(starAngle) * size;
                if (j === 0) {
                    this.context.moveTo(starX, starY);
                } else {
                    this.context.lineTo(starX, starY);
                }
            }
            this.context.closePath();
            this.context.fill();
            this.context.restore();
        }
    }
    
    /**
     * Draw magic particles
     */
    drawMagicParticles(x, y) {
        // Add random particles around the drawing point
        if (Math.random() < 0.5) { // 50% chance to add particles
            this.context.save();
            
            for (let i = 0; i < 5; i++) {
                const particleX = x + (Math.random() - 0.5) * 30;
                const particleY = y + (Math.random() - 0.5) * 30;
                const size = Math.random() * 4 + 2;
                const colorIndex = Math.floor(Math.random() * this.rainbowColors.length);
                
                this.context.fillStyle = this.rainbowColors[colorIndex];
                this.context.globalAlpha = 0.7 + Math.random() * 0.3;
                this.context.shadowColor = this.rainbowColors[colorIndex];
                this.context.shadowBlur = 8;
                
                this.context.beginPath();
                this.context.arc(particleX, particleY, size, 0, Math.PI * 2);
                this.context.fill();
            }
            
            this.context.restore();
        }
    }
    
    /**
     * Clear the canvas
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.path = [];
        this.trailPoints = [];
    }
    
    /**
     * Add gesture to recognition history
     */
    addToHistory(gesture) {
        const entry = {
            gesture: gesture.type,
            score: gesture.score,
            timestamp: new Date().toISOString(),
            spell: gesture.gesture.spell
        };
        
        this.recognitionHistory.unshift(entry);
        
        // Limit history size
        if (this.recognitionHistory.length > this.maxHistorySize) {
            this.recognitionHistory = this.recognitionHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get recognition history
     */
    getRecognitionHistory() {
        return [...this.recognitionHistory];
    }
    
    /**
     * Get all available gestures
     */
    getAllGestures() {
        return this.patterns.getAllPatterns();
    }
    
    /**
     * Get gesture statistics
     */
    getGestureStats() {
        return {
            patterns: this.patterns.getPatternStats(),
            actions: this.actions.getActionStats(),
            history: this.getRecognitionHistory(),
            cooldowns: this.actions.getCooldownStatus()
        };
    }
    
    /**
     * Enable/disable gesture recognition
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        
        if (this.canvas) {
            if (enabled) {
                this.canvas.style.pointerEvents = 'auto';
                this.canvas.style.opacity = '1';
            } else {
                this.canvas.style.pointerEvents = 'none';
                this.canvas.style.opacity = '0.5';
            }
        }
        
        console.log(`🎨 Gesture recognition ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Set debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        console.log(`🐛 Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Add custom gesture pattern
     */
    addCustomPattern(type, pattern) {
        this.patterns.addCustomPattern(type, pattern);
        console.log(`✨ Custom pattern added: ${type}`);
    }
    
    /**
     * Remove custom gesture pattern
     */
    removeCustomPattern(type) {
        this.patterns.removeCustomPattern(type);
        console.log(`🗑️ Custom pattern removed: ${type}`);
    }
    
    /**
     * Export gesture data
     */
    exportData() {
        return {
            patterns: this.patterns.exportPatterns(),
            actions: this.actions.getActionHistory(),
            recognition: this.getRecognitionHistory(),
            exportedAt: new Date().toISOString()
        };
    }
    
    /**
     * Import gesture data
     */
    importData(data) {
        if (data.patterns) {
            this.patterns.importPatterns(data.patterns);
        }
        
        console.log('📥 Gesture data imported successfully');
    }
    
    /**
     * Reset gesture system
     */
    reset() {
        this.patterns.resetPatterns();
        this.actions.clearHistory();
        this.recognitionHistory = [];
        this.clearCanvas();
        
        console.log('🔄 Gesture system reset');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestureRecognition;
}
