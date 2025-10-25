/**
 * Fantasy OS - Gesture Helper Utilities
 * Utility functions for gesture recognition and processing
 * Created: 2025-10-25T12:22:24.000Z
 */

class GestureHelpers {
    constructor() {
        this.defaultConfig = {
            smoothingFactor: 0.3,
            normalizationSize: 100,
            segmentationThreshold: 5,
            curvatureWindow: 3,
            confidenceThreshold: 0.5,
            maxPathLength: 1000,
            minPathLength: 5
        };
        
        this.config = { ...this.defaultConfig };
    }
    
    /**
     * Validate gesture path
     */
    validatePath(path) {
        if (!Array.isArray(path)) {
            return { valid: false, error: 'Path must be an array' };
        }
        
        if (path.length < this.config.minPathLength) {
            return { valid: false, error: 'Path too short' };
        }
        
        if (path.length > this.config.maxPathLength) {
            return { valid: false, error: 'Path too long' };
        }
        
        for (let i = 0; i < path.length; i++) {
            const point = path[i];
            if (!this.validatePoint(point)) {
                return { valid: false, error: `Invalid point at index ${i}` };
            }
        }
        
        return { valid: true };
    }
    
    /**
     * Validate single point
     */
    validatePoint(point) {
        return point && 
               typeof point.x === 'number' && 
               typeof point.y === 'number' &&
               !isNaN(point.x) && 
               !isNaN(point.y) &&
               isFinite(point.x) && 
               isFinite(point.y);
    }
    
    /**
     * Normalize point coordinates
     */
    normalizePoint(point, bounds) {
        return {
            x: (point.x - bounds.minX) / (bounds.maxX - bounds.minX),
            y: (point.y - bounds.minY) / (bounds.maxY - bounds.minY),
            timestamp: point.timestamp
        };
    }
    
    /**
     * Denormalize point coordinates
     */
    denormalizePoint(point, bounds) {
        return {
            x: point.x * (bounds.maxX - bounds.minX) + bounds.minX,
            y: point.y * (bounds.maxY - bounds.minY) + bounds.minY,
            timestamp: point.timestamp
        };
    }
    
    /**
     * Calculate path length
     */
    calculatePathLength(path) {
        if (path.length < 2) return 0;
        
        let length = 0;
        for (let i = 1; i < path.length; i++) {
            length += this.calculateDistance(path[i - 1], path[i]);
        }
        
        return length;
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
     * Calculate angle between two points
     */
    calculateAngle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }
    
    /**
     * Calculate centroid of path
     */
    calculateCentroid(path) {
        if (path.length === 0) return { x: 0, y: 0 };
        
        const sum = path.reduce((acc, point) => ({
            x: acc.x + point.x,
            y: acc.y + point.y
        }), { x: 0, y: 0 });
        
        return {
            x: sum.x / path.length,
            y: sum.y / path.length
        };
    }
    
    /**
     * Calculate bounding box of path
     */
    calculateBoundingBox(path) {
        if (path.length === 0) {
            return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
        }
        
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
     * Calculate aspect ratio of path
     */
    calculateAspectRatio(path) {
        const bounds = this.calculateBoundingBox(path);
        const width = bounds.maxX - bounds.minX;
        const height = bounds.maxY - bounds.minY;
        
        return height === 0 ? 1 : width / height;
    }
    
    /**
     * Calculate path complexity
     */
    calculateComplexity(path) {
        if (path.length < 3) return 0;
        
        let complexity = 0;
        
        for (let i = 1; i < path.length - 1; i++) {
            const p1 = path[i - 1];
            const p2 = path[i];
            const p3 = path[i + 1];
            
            const angle1 = this.calculateAngle(p1, p2);
            const angle2 = this.calculateAngle(p2, p3);
            
            const angleDiff = Math.abs(angle1 - angle2);
            complexity += angleDiff;
        }
        
        return complexity / (path.length - 2);
    }
    
    /**
     * Calculate path smoothness
     */
    calculateSmoothness(path) {
        if (path.length < 3) return 1;
        
        let totalDeviation = 0;
        let deviationCount = 0;
        
        for (let i = 1; i < path.length - 1; i++) {
            const p1 = path[i - 1];
            const p2 = path[i];
            const p3 = path[i + 1];
            
            // Calculate expected position based on linear interpolation
            const expectedX = (p1.x + p3.x) / 2;
            const expectedY = (p1.y + p3.y) / 2;
            
            const deviation = this.calculateDistance(p2, { x: expectedX, y: expectedY });
            totalDeviation += deviation;
            deviationCount++;
        }
        
        const averageDeviation = deviationCount > 0 ? totalDeviation / deviationCount : 0;
        return Math.max(0, 1 - averageDeviation / 10); // Normalize to 0-1
    }
    
    /**
     * Calculate path symmetry
     */
    calculateSymmetry(path) {
        if (path.length < 4) return 0;
        
        const bounds = this.calculateBoundingBox(path);
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        let symmetryScore = 0;
        let comparisons = 0;
        
        for (let i = 0; i < path.length / 2; i++) {
            const point1 = path[i];
            const point2 = path[path.length - 1 - i];
            
            const mirroredX = centerX - (point1.x - centerX);
            const mirroredY = centerY - (point1.y - centerY);
            
            const distance = this.calculateDistance(point2, { x: mirroredX, y: mirroredY });
            symmetryScore += Math.max(0, 1 - distance / 20);
            comparisons++;
        }
        
        return comparisons > 0 ? symmetryScore / comparisons : 0;
    }
    
    /**
     * Calculate path density
     */
    calculateDensity(path) {
        if (path.length < 2) return 0;
        
        const bounds = this.calculateBoundingBox(path);
        const area = (bounds.maxX - bounds.minX) * (bounds.maxY - bounds.minY);
        
        return area > 0 ? path.length / area : 0;
    }
    
    /**
     * Calculate path velocity
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
     * Calculate path acceleration
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
     * Calculate path curvature
     */
    calculateCurvature(path) {
        if (path.length < 3) return 0;
        
        let totalCurvature = 0;
        let curvatureCount = 0;
        
        for (let i = 1; i < path.length - 1; i++) {
            const p1 = path[i - 1];
            const p2 = path[i];
            const p3 = path[i + 1];
            
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
     * Count direction changes in path
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
     * Check if path is closed
     */
    isPathClosed(path) {
        if (path.length < 4) return false;
        
        const first = path[0];
        const last = path[path.length - 1];
        
        const distance = this.calculateDistance(first, last);
        return distance < 20; // Threshold for considering path closed
    }
    
    /**
     * Smooth path using moving average
     */
    smoothPath(path, factor = this.config.smoothingFactor) {
        if (path.length < 3) return path;
        
        const smoothed = [path[0]]; // Keep first point
        
        for (let i = 1; i < path.length - 1; i++) {
            const prev = path[i - 1];
            const curr = path[i];
            const next = path[i + 1];
            
            const smoothedPoint = {
                x: prev.x * factor + curr.x * (1 - 2 * factor) + next.x * factor,
                y: prev.y * factor + curr.y * (1 - 2 * factor) + next.y * factor,
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
    normalizePath(path, size = this.config.normalizationSize) {
        if (path.length === 0) return path;
        
        const bounds = this.calculateBoundingBox(path);
        const width = bounds.maxX - bounds.minX;
        const height = bounds.maxY - bounds.minY;
        const maxDimension = Math.max(width, height);
        
        if (maxDimension === 0) return path;
        
        const scale = size / maxDimension;
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        return path.map(point => ({
            x: (point.x - centerX) * scale + size / 2,
            y: (point.y - centerY) * scale + size / 2,
            timestamp: point.timestamp
        }));
    }
    
    /**
     * Remove duplicate points from path
     */
    removeDuplicatePoints(path, threshold = 1) {
        const filtered = [path[0]];
        
        for (let i = 1; i < path.length; i++) {
            const prev = filtered[filtered.length - 1];
            const curr = path[i];
            
            const distance = this.calculateDistance(prev, curr);
            
            if (distance > threshold) {
                filtered.push(curr);
            }
        }
        
        return filtered;
    }
    
    /**
     * Resample path to fixed number of points
     */
    resamplePath(path, numPoints) {
        if (path.length <= numPoints) return path;
        
        const resampled = [];
        const step = (path.length - 1) / (numPoints - 1);
        
        for (let i = 0; i < numPoints; i++) {
            const index = i * step;
            const lower = Math.floor(index);
            const upper = Math.ceil(index);
            const fraction = index - lower;
            
            if (upper >= path.length) {
                resampled.push(path[path.length - 1]);
            } else if (lower === upper) {
                resampled.push(path[lower]);
            } else {
                const p1 = path[lower];
                const p2 = path[upper];
                
                resampled.push({
                    x: p1.x + fraction * (p2.x - p1.x),
                    y: p1.y + fraction * (p2.y - p1.y),
                    timestamp: p1.timestamp + fraction * (p2.timestamp - p1.timestamp)
                });
            }
        }
        
        return resampled;
    }
    
    /**
     * Calculate path similarity using dynamic time warping
     */
    calculateSimilarity(path1, path2) {
        if (path1.length === 0 || path2.length === 0) return 0;
        
        const n = path1.length;
        const m = path2.length;
        
        // Create distance matrix
        const dtw = Array(n + 1).fill().map(() => Array(m + 1).fill(Infinity));
        dtw[0][0] = 0;
        
        // Fill distance matrix
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                const cost = this.calculateDistance(path1[i - 1], path2[j - 1]);
                dtw[i][j] = cost + Math.min(
                    dtw[i - 1][j],     // insertion
                    dtw[i][j - 1],     // deletion
                    dtw[i - 1][j - 1]  // match
                );
            }
        }
        
        // Normalize by path length
        const normalizedDistance = dtw[n][m] / Math.max(n, m);
        
        // Convert to similarity (0-1)
        return Math.max(0, 1 - normalizedDistance / 50);
    }
    
    /**
     * Generate path statistics
     */
    generatePathStats(path) {
        const stats = {
            length: path.length,
            pathLength: this.calculatePathLength(path),
            boundingBox: this.calculateBoundingBox(path),
            aspectRatio: this.calculateAspectRatio(path),
            centroid: this.calculateCentroid(path),
            complexity: this.calculateComplexity(path),
            smoothness: this.calculateSmoothness(path),
            symmetry: this.calculateSymmetry(path),
            density: this.calculateDensity(path),
            curvature: this.calculateCurvature(path),
            directionChanges: this.countDirectionChanges(path),
            isClosed: this.isPathClosed(path),
            velocity: this.calculateVelocity(path),
            acceleration: this.calculateAcceleration(path)
        };
        
        // Calculate derived statistics
        stats.area = (stats.boundingBox.maxX - stats.boundingBox.minX) * 
                    (stats.boundingBox.maxY - stats.boundingBox.minY);
        stats.perimeter = stats.pathLength;
        stats.compactness = stats.area > 0 ? (stats.perimeter * stats.perimeter) / stats.area : 0;
        
        // Calculate velocity statistics
        if (stats.velocity.length > 0) {
            stats.averageVelocity = stats.velocity.reduce((a, b) => a + b, 0) / stats.velocity.length;
            stats.maxVelocity = Math.max(...stats.velocity);
            stats.minVelocity = Math.min(...stats.velocity);
        }
        
        // Calculate acceleration statistics
        if (stats.acceleration.length > 0) {
            stats.averageAcceleration = stats.acceleration.reduce((a, b) => a + b, 0) / stats.acceleration.length;
            stats.maxAcceleration = Math.max(...stats.acceleration);
            stats.minAcceleration = Math.min(...stats.acceleration);
        }
        
        return stats;
    }
    
    /**
     * Create path from points
     */
    createPath(points) {
        return points.map((point, index) => ({
            x: point.x || 0,
            y: point.y || 0,
            timestamp: point.timestamp || Date.now() + index
        }));
    }
    
    /**
     * Convert path to SVG path string
     */
    pathToSVG(path) {
        if (path.length === 0) return '';
        
        let svgPath = `M ${path[0].x} ${path[0].y}`;
        
        for (let i = 1; i < path.length; i++) {
            svgPath += ` L ${path[i].x} ${path[i].y}`;
        }
        
        return svgPath;
    }
    
    /**
     * Convert SVG path string to path
     */
    svgToPath(svgPath) {
        const path = [];
        const commands = svgPath.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g);
        
        if (!commands) return path;
        
        let currentX = 0;
        let currentY = 0;
        
        for (const command of commands) {
            const type = command[0];
            const coords = command.slice(1).trim().split(/[\s,]+/).map(Number);
            
            switch (type.toLowerCase()) {
                case 'm':
                case 'l':
                    for (let i = 0; i < coords.length; i += 2) {
                        if (type === 'm' || type === 'l') {
                            currentX += coords[i] || 0;
                            currentY += coords[i + 1] || 0;
                        } else {
                            currentX = coords[i] || 0;
                            currentY = coords[i + 1] || 0;
                        }
                        
                        path.push({
                            x: currentX,
                            y: currentY,
                            timestamp: Date.now() + path.length
                        });
                    }
                    break;
                case 'z':
                    // Close path
                    if (path.length > 0) {
                        path.push({
                            x: path[0].x,
                            y: path[0].y,
                            timestamp: Date.now() + path.length
                        });
                    }
                    break;
            }
        }
        
        return path;
    }
    
    /**
     * Export path to JSON
     */
    exportPath(path) {
        return {
            path,
            stats: this.generatePathStats(path),
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
    }
    
    /**
     * Import path from JSON
     */
    importPath(data) {
        if (data.path && Array.isArray(data.path)) {
            return data.path;
        }
        
        throw new Error('Invalid path data format');
    }
    
    /**
     * Set configuration
     */
    setConfig(config) {
        this.config = { ...this.config, ...config };
        return this;
    }
    
    /**
     * Get configuration
     */
    getConfig() {
        return { ...this.config };
    }
    
    /**
     * Reset configuration to default
     */
    resetConfig() {
        this.config = { ...this.defaultConfig };
        return this;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GestureHelpers;
}
