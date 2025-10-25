/**
 * Fantasy OS - Gesture Engine Integration Tests
 * Integration tests for gesture recognition engine
 * Created: 2025-10-25T12:23:56.000Z
 */

// Mock DOM elements for testing
const mockCanvas = {
    getContext: jest.fn(() => ({
        strokeStyle: '',
        lineWidth: 0,
        lineCap: '',
        lineJoin: '',
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        clearRect: jest.fn()
    })),
    getBoundingClientRect: jest.fn(() => ({
        left: 0,
        top: 0
    })),
    style: {
        pointerEvents: 'auto',
        opacity: '1'
    },
    width: 300,
    height: 300,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
};

// Mock document methods
global.document = {
    getElementById: jest.fn(() => mockCanvas),
    createElement: jest.fn(() => ({
        className: '',
        textContent: '',
        style: {},
        appendChild: jest.fn(),
        parentNode: {
            removeChild: jest.fn()
        }
    })),
    body: {
        appendChild: jest.fn(),
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            toggle: jest.fn()
        }
    },
    querySelector: jest.fn(() => mockCanvas),
    querySelectorAll: jest.fn(() => [mockCanvas])
};

// Mock console methods
global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

// Mock FantasySounds
global.FantasySounds = {
    play: jest.fn()
};

// Mock SpellParser
global.SpellParser = jest.fn(() => ({
    parseSpell: jest.fn(() => ({
        success: true,
        message: 'Spell parsed successfully'
    }))
}));

// Mock RoomManager
global.RoomManager = jest.fn(() => ({
    getAvailableRooms: jest.fn(() => ['living-room', 'kitchen', 'bedroom']),
    switchToRoom: jest.fn()
}));

// Mock ParticleSystem
global.ParticleSystem = jest.fn(() => ({
    createLightEffect: jest.fn(),
    createMagicEffect: jest.fn()
}));

describe('Gesture Engine Integration', () => {
    let gestureRecognition;
    let fantasyOS;
    
    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
        
        // Create new instances
        gestureRecognition = new GestureRecognition();
        fantasyOS = new FantasyOS();
    });
    
    describe('Complete Gesture Recognition Flow', () => {
        test('should complete full gesture recognition flow', async () => {
            // Initialize gesture recognition
            const initResult = gestureRecognition.init();
            expect(initResult).toBe(true);
            
            // Simulate drawing a circle
            const circlePath = generateCirclePath();
            gestureRecognition.path = circlePath;
            
            // Recognize gesture
            const recognitionResult = gestureRecognition.recognizeGesture();
            expect(recognitionResult).toBeDefined();
            expect(recognitionResult.type).toBe('circle');
            expect(recognitionResult.score).toBeGreaterThan(0);
            
            // Execute gesture
            gestureRecognition.executeGesture(recognitionResult);
            
            // Verify action was executed
            expect(gestureRecognition.recognitionHistory).toHaveLength(1);
            expect(FantasySounds.play).toHaveBeenCalledWith('gestureRecognized');
        });
        
        test('should handle gesture recognition with spell casting', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Simulate drawing a zigzag
            const zigzagPath = generateZigzagPath();
            gestureRecognition.path = zigzagPath;
            
            // Recognize gesture
            const recognitionResult = gestureRecognition.recognizeGesture();
            expect(recognitionResult).toBeDefined();
            expect(recognitionResult.type).toBe('zigzag');
            
            // Execute gesture
            gestureRecognition.executeGesture(recognitionResult);
            
            // Verify spell was cast
            expect(gestureRecognition.recognitionHistory).toHaveLength(1);
            expect(gestureRecognition.recognitionHistory[0].spell).toBe('summon light');
        });
        
        test('should handle multiple gesture recognitions', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Simulate multiple gestures
            const gestures = [
                { path: generateCirclePath(), expectedType: 'circle' },
                { path: generateZigzagPath(), expectedType: 'zigzag' },
                { path: generateSpiralPath(), expectedType: 'spiral' }
            ];
            
            gestures.forEach((gesture, index) => {
                gestureRecognition.path = gesture.path;
                const result = gestureRecognition.recognizeGesture();
                
                if (result) {
                    expect(result.type).toBe(gesture.expectedType);
                    gestureRecognition.executeGesture(result);
                }
            });
            
            // Verify all gestures were recorded
            expect(gestureRecognition.recognitionHistory.length).toBeGreaterThan(0);
        });
    });
    
    describe('Fantasy OS Integration', () => {
        test('should integrate with Fantasy OS main application', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Verify gesture recognition component is initialized
            expect(fantasyOS.components.gestureRecognition).toBeDefined();
            expect(fantasyOS.components.gestureRecognition).toBeInstanceOf(GestureRecognition);
        });
        
        test('should provide gesture statistics through Fantasy OS', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Get gesture statistics
            const stats = fantasyOS.getGestureStats();
            expect(stats).toBeDefined();
            expect(stats.patterns).toBeDefined();
            expect(stats.actions).toBeDefined();
        });
        
        test('should allow enabling/disabling gesture recognition through Fantasy OS', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Disable gesture recognition
            fantasyOS.setGestureRecognitionEnabled(false);
            expect(fantasyOS.components.gestureRecognition.isEnabled).toBe(false);
            
            // Enable gesture recognition
            fantasyOS.setGestureRecognitionEnabled(true);
            expect(fantasyOS.components.gestureRecognition.isEnabled).toBe(true);
        });
        
        test('should allow custom pattern management through Fantasy OS', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Add custom pattern
            const customPattern = {
                name: 'Custom',
                description: 'Custom gesture',
                spell: 'custom spell',
                threshold: 0.7,
                minPoints: 10
            };
            
            fantasyOS.addCustomGesturePattern('custom', customPattern);
            
            // Verify pattern was added
            const patterns = fantasyOS.components.gestureRecognition.getAllGestures();
            const customPatternFound = patterns.find(p => p.type === 'custom');
            expect(customPatternFound).toBeDefined();
        });
    });
    
    describe('Multi-Room Gesture Recognition', () => {
        test('should initialize gesture recognition for all rooms', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Verify gesture recognition is initialized for all rooms
            expect(console.log).toHaveBeenCalledWith('🎨 Gesture recognition initialized for all rooms');
        });
        
        test('should handle room switching with gesture recognition', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Switch to different room
            fantasyOS.switchRoom('kitchen');
            
            // Verify room switch was successful
            expect(fantasyOS.currentRoom).toBe('kitchen');
        });
    });
    
    describe('Error Handling and Recovery', () => {
        test('should handle invalid gesture paths gracefully', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Set invalid path
            gestureRecognition.path = 'invalid path';
            
            // Attempt recognition
            const result = gestureRecognition.recognizeGesture();
            expect(result).toBeNull();
        });
        
        test('should handle recognition errors gracefully', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Set path that will cause error
            gestureRecognition.path = null;
            
            // Attempt recognition
            const result = gestureRecognition.recognizeGesture();
            expect(result).toBeNull();
        });
        
        test('should handle execution errors gracefully', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Create invalid gesture
            const invalidGesture = {
                type: 'invalid',
                pattern: null,
                score: 0.5,
                features: {}
            };
            
            // Attempt execution
            gestureRecognition.executeGesture(invalidGesture);
            
            // Should not crash
            expect(console.error).toHaveBeenCalled();
        });
    });
    
    describe('Performance and Memory Management', () => {
        test('should maintain reasonable memory usage', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Simulate many gestures
            for (let i = 0; i < 100; i++) {
                const path = generateRandomPath();
                gestureRecognition.path = path;
                const result = gestureRecognition.recognizeGesture();
                if (result) {
                    gestureRecognition.executeGesture(result);
                }
            }
            
            // Verify history is limited
            expect(gestureRecognition.recognitionHistory.length).toBeLessThanOrEqual(
                gestureRecognition.maxHistorySize
            );
        });
        
        test('should handle rapid gesture recognition', () => {
            // Initialize gesture recognition
            gestureRecognition.init();
            
            // Simulate rapid gestures
            const startTime = Date.now();
            
            for (let i = 0; i < 10; i++) {
                const path = generateCirclePath();
                gestureRecognition.path = path;
                const result = gestureRecognition.recognizeGesture();
                if (result) {
                    gestureRecognition.executeGesture(result);
                }
            }
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            // Should complete within reasonable time (less than 1 second)
            expect(duration).toBeLessThan(1000);
        });
    });
    
    describe('Data Persistence', () => {
        test('should export and import gesture data', async () => {
            // Initialize Fantasy OS
            await fantasyOS.init();
            
            // Add some gesture history
            const mockGesture = {
                type: 'circle',
                pattern: { name: 'Circle' },
                score: 0.8,
                spell: 'open portal'
            };
            fantasyOS.components.gestureRecognition.addToHistory(mockGesture);
            
            // Export data
            const exportedData = fantasyOS.exportGestureData();
            expect(exportedData).toBeDefined();
            expect(exportedData.recognition).toHaveLength(1);
            
            // Reset system
            fantasyOS.resetGestureSystem();
            expect(fantasyOS.components.gestureRecognition.recognitionHistory).toHaveLength(0);
            
            // Import data
            fantasyOS.importGestureData(exportedData);
            expect(fantasyOS.components.gestureRecognition.recognitionHistory).toHaveLength(1);
        });
    });
});

// Helper functions for generating test paths
function generateCirclePath() {
    const path = [];
    const centerX = 150;
    const centerY = 150;
    const radius = 50;
    const points = 20;
    
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        path.push({
            x: x,
            y: y,
            timestamp: Date.now() + i * 100
        });
    }
    
    return path;
}

function generateZigzagPath() {
    const path = [];
    const startX = 50;
    const startY = 100;
    const width = 200;
    const height = 100;
    const segments = 10;
    
    for (let i = 0; i <= segments; i++) {
        const x = startX + (i / segments) * width;
        const y = startY + (i % 2 === 0 ? 0 : height);
        path.push({
            x: x,
            y: y,
            timestamp: Date.now() + i * 100
        });
    }
    
    return path;
}

function generateSpiralPath() {
    const path = [];
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 60;
    const turns = 2;
    const points = 30;
    
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * turns * 2 * Math.PI;
        const radius = (i / points) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        path.push({
            x: x,
            y: y,
            timestamp: Date.now() + i * 100
        });
    }
    
    return path;
}

function generateRandomPath() {
    const path = [];
    const points = 15;
    
    for (let i = 0; i < points; i++) {
        path.push({
            x: Math.random() * 300,
            y: Math.random() * 300,
            timestamp: Date.now() + i * 100
        });
    }
    
    return path;
}
