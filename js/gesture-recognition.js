/**
 * Fantasy OS - Gesture Recognition System
 * Recognizes and processes magical gestures for spell casting
 * Created: 2025-10-25T12:04:17.000Z
 */

class GestureRecognition {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.isDrawing = false;
        this.path = [];
        this.gestures = {
            circle: {
                name: 'Circle',
                description: 'Portal opening gesture',
                spell: 'open portal',
                threshold: 0.8,
                minPoints: 20
            },
            zigzag: {
                name: 'Zigzag',
                description: 'Lightning gesture',
                spell: 'summon light',
                threshold: 0.7,
                minPoints: 15
            },
            spiral: {
                name: 'Spiral',
                description: 'Fire gesture',
                spell: 'ignite fireplace',
                threshold: 0.6,
                minPoints: 25
            },
            heart: {
                name: 'Heart',
                description: 'Favorites gesture',
                spell: 'cast protection spell',
                threshold: 0.5,
                minPoints: 20
            }
        };
        
        this.recognitionHistory = [];
        this.maxHistorySize = 30;
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
    }
    
    /**
     * Start drawing gesture
     */
    startDrawing(e) {
        this.isDrawing = true;
        this.path = [];
        
        const rect = this.canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            timestamp: Date.now()
        };
        
        this.path.push(point);
        
        // Start drawing
        this.context.beginPath();
        this.context.moveTo(point.x, point.y);
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
        
        // Draw line
        this.context.lineTo(point.x, point.y);
        this.context.stroke();
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
        
        // Calculate gesture features
        const features = this.calculateFeatures();
        
        // Compare with known gestures
        let bestMatch = null;
        let bestScore = 0;
        
        for (const [gestureType, gesture] of Object.entries(this.gestures)) {
            const score = this.compareGesture(features, gestureType);
            if (score > gesture.threshold && score > bestScore) {
                bestScore = score;
                bestMatch = gestureType;
            }
        }
        
        if (bestMatch) {
            console.log(`🎯 Recognized gesture: ${this.gestures[bestMatch].name} (${bestScore.toFixed(2)})`);
            return {
                type: bestMatch,
                gesture: this.gestures[bestMatch],
                score: bestScore
            };
        }
        
        console.log('❓ Unknown gesture');
        return null;
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
        // Add to recognition history
        this.addToHistory(gesture);
        
        // Show gesture feedback
        this.showGestureFeedback(gesture);
        
        // Execute associated spell
        if (gesture.gesture.spell) {
            this.castGestureSpell(gesture.gesture.spell);
        }
        
        // Play gesture sound
        if (typeof FantasySounds !== 'undefined') {
            FantasySounds.play('gestureRecognized');
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
     * Clear the canvas
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.path = [];
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
        return Object.keys(this.gestures).map(type => ({
            type,
            ...this.gestures[type]
        }));
    }
    
    /**
     * Enable/disable gesture recognition
     */
    setEnabled(enabled) {
        if (enabled) {
            this.canvas.style.pointerEvents = 'auto';
            this.canvas.style.opacity = '1';
        } else {
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.opacity = '0.5';
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestureRecognition;
}
