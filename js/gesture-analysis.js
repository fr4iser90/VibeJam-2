/**
 * Fantasy OS - Gesture Analysis Algorithms
 * Mathematical algorithms for gesture pattern analysis and recognition
 * Created: 2025-10-25T12:22:24.000Z
 */

class GestureAnalysis {
    constructor() {
        this.smoothingFactor = 0.3;
        this.normalizationSize = 100;
        this.segmentationThreshold = 5;
        this.curvatureWindow = 3;
    }
    
    /**
     * Smooth the gesture path using moving average
     */
    smoothPath(path) {
        if (path.length < 3) return path;
        
        const smoothed = [path[0]]; // Keep first point
        
        for (let i = 1; i < path.length - 1; i++) {
            const prev = path[i - 1];
            const curr = path[i];
            const next = path[i + 1];
            
            const smoothedPoint = {
                x: (prev.x + curr.x + next.x) / 3,
                y: (prev.y + curr.y + next.y) / 3,
                timestamp: curr.timestamp
            };
            
            smoothed.push(smoothedPoint);
        }
        
        smoothed.push(path[path.length - 1]); // Keep last point
        return smoothed;
    }
    
    /**
     * Normalize path to standard size
     */
    normalizePath(path) {
        if (path.length === 0) return path;
        
        const boundingBox = this.getBoundingBox(path);
        const width = boundingBox.maxX - boundingBox.minX;
        const height = boundingBox.maxY - boundingBox.minY;
        const maxDimension = Math.max(width, height);
        
        if (maxDimension === 0) return path;
        
        const scale = this.normalizationSize / maxDimension;
        const centerX = (boundingBox.minX + boundingBox.maxX) / 2;
        const centerY = (boundingBox.minY + boundingBox.maxY) / 2;
        
        return path.map(point => ({
            x: (point.x - centerX) * scale + this.normalizationSize / 2,
            y: (point.y - centerY) * scale + this.normalizationSize / 2,
            timestamp: point.timestamp
        }));
    }
    
    /**
     * Segment path into meaningful parts
     */
    segmentPath(path) {
        if (path.length < 3) return [path];
        
        const segments = [];
        let currentSegment = [path[0]];
        
        for (let i = 1; i < path.length; i++) {
            const prev = path[i - 1];
            const curr = path[i];
            
            const distance = this.calculateDistance(prev, curr);
            
            if (distance > this.segmentationThreshold) {
                // Start new segment
                segments.push([...currentSegment]);
                currentSegment = [curr];
            } else {
                currentSegment.push(curr);
            }
        }
        
        if (currentSegment.length > 0) {
            segments.push(currentSegment);
        }
        
        return segments.filter(segment => segment.length > 1);
    }
    
    /**
     * Calculate path features for recognition
     */
    calculateFeatures(path) {
        const features = {
            pathLength: path.length,
            boundingBox: this.getBoundingBox(path),
            aspectRatio: 0,
            curvature: this.calculateCurvature(path),
            directionChanges: this.countDirectionChanges(path),
            isClosed: this.isPathClosed(path),
            symmetry: this.calculateSymmetry(path),
            density: this.calculateDensity(path),
            velocity: this.calculateVelocity(path),
            acceleration: this.calculateAcceleration(path)
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
    getBoundingBox(path) {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        for (const point of path) {
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
    calculateCurvature(path) {
        if (path.length < 3) return 0;
        
        let totalCurvature = 0;
        let curvatureCount = 0;
        
        for (let i = this.curvatureWindow; i < path.length - this.curvatureWindow; i++) {
            const p1 = path[i - this.curvatureWindow];
            const p2 = path[i];
            const p3 = path[i + this.curvatureWindow];
            
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
    countDirectionChanges(path) {
        if (path.length < 3) return 0;
        
        let changes = 0;
        let lastDirection = null;
        
        for (let i = 1; i < path.length; i++) {
            const p1 = path[i - 1];
            const p2 = path[i];
            
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
    isPathClosed(path) {
        if (path.length < 4) return false;
        
        const first = path[0];
        const last = path[path.length - 1];
        
        const distance = this.calculateDistance(first, last);
        return distance < 20; // Threshold for considering path closed
    }
    
    /**
     * Calculate symmetry of the path
     */
    calculateSymmetry(path) {
        if (path.length < 4) return 0;
        
        const boundingBox = this.getBoundingBox(path);
        const centerX = (boundingBox.minX + boundingBox.maxX) / 2;
        const centerY = (boundingBox.minY + boundingBox.maxY) / 2;
        
        let symmetryScore = 0;
        let comparisons = 0;
        
        for (let i = 0; i < path.length / 2; i++) {
            const point1 = path[i];
            const point2 = path[path.length - 1 - i];
            
            const mirroredX = centerX - (point1.x - centerX);
            const mirroredY = centerY - (point1.y - centerY);
            
            const distance = Math.sqrt(
                Math.pow(point2.x - mirroredX, 2) + Math.pow(point2.y - mirroredY, 2)
            );
            
            symmetryScore += Math.max(0, 1 - distance / 10);
            comparisons++;
        }
        
        return comparisons > 0 ? symmetryScore / comparisons : 0;
    }
    
    /**
     * Calculate density of points in the path
     */
    calculateDensity(path) {
        if (path.length < 2) return 0;
        
        const boundingBox = this.getBoundingBox(path);
        const area = (boundingBox.maxX - boundingBox.minX) * (boundingBox.maxY - boundingBox.minY);
        
        return area > 0 ? path.length / area : 0;
    }
    
    /**
     * Calculate velocity of the path
     */
    calculateVelocity(path) {
        if (path.length < 2) return [];
        
        const velocities = [];
        
        for (let i = 1; i < path.length; i++) {
            const prev = path[i - 1];
            const curr = path[i];
            
            const distance = this.calculateDistance(prev, curr);
            const timeDelta = curr.timestamp - prev.timestamp;
            
            const velocity = timeDelta > 0 ? distance / timeDelta : 0;
            velocities.push(velocity);
        }
        
        return velocities;
    }
    
    /**
     * Calculate acceleration of the path
     */
    calculateAcceleration(path) {
        const velocities = this.calculateVelocity(path);
        if (velocities.length < 2) return [];
        
        const accelerations = [];
        
        for (let i = 1; i < velocities.length; i++) {
            const velocityDelta = velocities[i] - velocities[i - 1];
            const timeDelta = path[i + 1].timestamp - path[i].timestamp;
            
            const acceleration = timeDelta > 0 ? velocityDelta / timeDelta : 0;
            accelerations.push(acceleration);
        }
        
        return accelerations;
    }
    
    /**
     * Calculate distance between two points
     */
    calculateDistance(p1, p2) {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
        );
    }
    
    /**
     * Compare two paths for similarity
     */
    comparePaths(path1, path2) {
        const features1 = this.calculateFeatures(path1);
        const features2 = this.calculateFeatures(path2);
        
        let similarity = 0;
        let comparisons = 0;
        
        // Compare aspect ratios
        const aspectRatioDiff = Math.abs(features1.aspectRatio - features2.aspectRatio);
        similarity += Math.max(0, 1 - aspectRatioDiff / 2);
        comparisons++;
        
        // Compare curvatures
        const curvatureDiff = Math.abs(features1.curvature - features2.curvature);
        similarity += Math.max(0, 1 - curvatureDiff / 1);
        comparisons++;
        
        // Compare direction changes
        const directionDiff = Math.abs(features1.directionChanges - features2.directionChanges);
        similarity += Math.max(0, 1 - directionDiff / 10);
        comparisons++;
        
        // Compare closed state
        if (features1.isClosed === features2.isClosed) {
            similarity += 1;
        }
        comparisons++;
        
        return comparisons > 0 ? similarity / comparisons : 0;
    }
    
    /**
     * Detect specific geometric shapes
     */
    detectShape(path) {
        const features = this.calculateFeatures(path);
        
        // Circle detection
        if (this.isCircle(path, features)) {
            return { type: 'circle', confidence: this.calculateCircleConfidence(path, features) };
        }
        
        // Rectangle detection
        if (this.isRectangle(path, features)) {
            return { type: 'rectangle', confidence: this.calculateRectangleConfidence(path, features) };
        }
        
        // Triangle detection
        if (this.isTriangle(path, features)) {
            return { type: 'triangle', confidence: this.calculateTriangleConfidence(path, features) };
        }
        
        // Line detection
        if (this.isLine(path, features)) {
            return { type: 'line', confidence: this.calculateLineConfidence(path, features) };
        }
        
        return { type: 'unknown', confidence: 0 };
    }
    
    /**
     * Check if path forms a circle
     */
    isCircle(path, features) {
        return features.isClosed && 
               features.aspectRatio > 0.7 && 
               features.aspectRatio < 1.3 &&
               features.curvature > 0.1 &&
               features.curvature < 0.5;
    }
    
    /**
     * Calculate circle confidence
     */
    calculateCircleConfidence(path, features) {
        let confidence = 0;
        
        if (features.isClosed) confidence += 0.3;
        if (features.aspectRatio > 0.7 && features.aspectRatio < 1.3) confidence += 0.3;
        if (features.curvature > 0.1 && features.curvature < 0.5) confidence += 0.2;
        if (features.symmetry > 0.7) confidence += 0.2;
        
        return confidence;
    }
    
    /**
     * Check if path forms a rectangle
     */
    isRectangle(path, features) {
        return features.isClosed && 
               features.directionChanges <= 8 &&
               features.curvature < 0.1;
    }
    
    /**
     * Calculate rectangle confidence
     */
    calculateRectangleConfidence(path, features) {
        let confidence = 0;
        
        if (features.isClosed) confidence += 0.3;
        if (features.directionChanges <= 8) confidence += 0.3;
        if (features.curvature < 0.1) confidence += 0.2;
        if (features.symmetry > 0.8) confidence += 0.2;
        
        return confidence;
    }
    
    /**
     * Check if path forms a triangle
     */
    isTriangle(path, features) {
        return features.isClosed && 
               features.directionChanges <= 6 &&
               features.pathLength < 20;
    }
    
    /**
     * Calculate triangle confidence
     */
    calculateTriangleConfidence(path, features) {
        let confidence = 0;
        
        if (features.isClosed) confidence += 0.3;
        if (features.directionChanges <= 6) confidence += 0.3;
        if (features.pathLength < 20) confidence += 0.2;
        if (features.symmetry > 0.6) confidence += 0.2;
        
        return confidence;
    }
    
    /**
     * Check if path forms a line
     */
    isLine(path, features) {
        return !features.isClosed && 
               features.directionChanges <= 2 &&
               features.curvature < 0.1;
    }
    
    /**
     * Calculate line confidence
     */
    calculateLineConfidence(path, features) {
        let confidence = 0;
        
        if (!features.isClosed) confidence += 0.4;
        if (features.directionChanges <= 2) confidence += 0.3;
        if (features.curvature < 0.1) confidence += 0.3;
        
        return confidence;
    }
    
    /**
     * Optimize path for recognition
     */
    optimizePath(path) {
        let optimized = [...path];
        
        // Apply smoothing
        optimized = this.smoothPath(optimized);
        
        // Normalize size
        optimized = this.normalizePath(optimized);
        
        // Remove duplicate points
        optimized = this.removeDuplicatePoints(optimized);
        
        return optimized;
    }
    
    /**
     * Remove duplicate points from path
     */
    removeDuplicatePoints(path) {
        const filtered = [path[0]];
        
        for (let i = 1; i < path.length; i++) {
            const prev = filtered[filtered.length - 1];
            const curr = path[i];
            
            const distance = this.calculateDistance(prev, curr);
            
            if (distance > 1) { // Minimum distance threshold
                filtered.push(curr);
            }
        }
        
        return filtered;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestureAnalysis;
}
