/**
 * Fantasy OS - Gesture Recognition Unit Tests
 * Unit tests for gesture recognition functionality
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
    height: 300
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
    }
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

describe('GestureRecognition', () => {
    let gestureRecognition;
    
    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
        
        // Create new instance
        gestureRecognition = new GestureRecognition();
    });
    
    describe('Initialization', () => {
        test('should initialize with default values', () => {
            expect(gestureRecognition.canvas).toBeNull();
            expect(gestureRecognition.context).toBeNull();
            expect(gestureRecognition.isDrawing).toBe(false);
            expect(gestureRecognition.path).toEqual([]);
            expect(gestureRecognition.isEnabled).toBe(true);
            expect(gestureRecognition.debugMode).toBe(false);
        });
        
        test('should initialize gesture modules', () => {
            expect(gestureRecognition.patterns).toBeInstanceOf(GesturePatterns);
            expect(gestureRecognition.analysis).toBeInstanceOf(GestureAnalysis);
            expect(gestureRecognition.actions).toBeInstanceOf(GestureActions);
            expect(gestureRecognition.helpers).toBeInstanceOf(GestureHelpers);
        });
        
        test('should initialize successfully with valid canvas', () => {
            const result = gestureRecognition.init();
            expect(result).toBe(true);
            expect(gestureRecognition.canvas).toBe(mockCanvas);
            expect(gestureRecognition.context).toBeDefined();
        });
        
        test('should fail initialization without canvas', () => {
            document.getElementById.mockReturnValue(null);
            const result = gestureRecognition.init();
            expect(result).toBe(false);
            expect(console.warn).toHaveBeenCalledWith('Gesture canvas not found');
        });
    });
    
    describe('Path Validation', () => {
        test('should validate valid path', () => {
            const validPath = [
                { x: 0, y: 0, timestamp: Date.now() },
                { x: 10, y: 10, timestamp: Date.now() + 100 },
                { x: 20, y: 20, timestamp: Date.now() + 200 }
            ];
            
            const result = gestureRecognition.helpers.validatePath(validPath);
            expect(result.valid).toBe(true);
        });
        
        test('should reject invalid path', () => {
            const invalidPath = [
                { x: 0, y: 0, timestamp: Date.now() },
                { x: 10, y: 10, timestamp: Date.now() + 100 }
            ];
            
            const result = gestureRecognition.helpers.validatePath(invalidPath);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Path too short');
        });
        
        test('should reject non-array path', () => {
            const result = gestureRecognition.helpers.validatePath('not an array');
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Path must be an array');
        });
    });
    
    describe('Gesture Recognition', () => {
        test('should recognize circle gesture', () => {
            const circlePath = generateCirclePath();
            gestureRecognition.path = circlePath;
            
            const result = gestureRecognition.recognizeGesture();
            
            if (result) {
                expect(result.type).toBe('circle');
                expect(result.score).toBeGreaterThan(0);
                expect(result.pattern).toBeDefined();
            }
        });
        
        test('should recognize zigzag gesture', () => {
            const zigzagPath = generateZigzagPath();
            gestureRecognition.path = zigzagPath;
            
            const result = gestureRecognition.recognizeGesture();
            
            if (result) {
                expect(result.type).toBe('zigzag');
                expect(result.score).toBeGreaterThan(0);
            }
        });
        
        test('should return null for unrecognized gesture', () => {
            const randomPath = generateRandomPath();
            gestureRecognition.path = randomPath;
            
            const result = gestureRecognition.recognizeGesture();
            expect(result).toBeNull();
        });
        
        test('should return null for short path', () => {
            gestureRecognition.path = [
                { x: 0, y: 0, timestamp: Date.now() },
                { x: 10, y: 10, timestamp: Date.now() + 100 }
            ];
            
            const result = gestureRecognition.recognizeGesture();
            expect(result).toBeNull();
        });
    });
    
    describe('Gesture Execution', () => {
        test('should execute gesture action', () => {
            const mockGesture = {
                type: 'circle',
                pattern: { name: 'Circle', spell: 'open portal' },
                score: 0.8,
                features: {}
            };
            
            gestureRecognition.executeGesture(mockGesture);
            
            expect(gestureRecognition.recognitionHistory).toHaveLength(1);
            expect(gestureRecognition.recognitionHistory[0]).toEqual(
                expect.objectContaining({
                    gesture: 'circle',
                    score: 0.8,
                    spell: 'open portal'
                })
            );
        });
        
        test('should not execute when disabled', () => {
            gestureRecognition.setEnabled(false);
            
            const mockGesture = {
                type: 'circle',
                pattern: { name: 'Circle' },
                score: 0.8,
                features: {}
            };
            
            gestureRecognition.executeGesture(mockGesture);
            
            expect(console.warn).toHaveBeenCalledWith('Gesture recognition is disabled');
        });
    });
    
    describe('Pattern Management', () => {
        test('should get all patterns', () => {
            const patterns = gestureRecognition.getAllGestures();
            expect(patterns).toBeInstanceOf(Array);
            expect(patterns.length).toBeGreaterThan(0);
        });
        
        test('should add custom pattern', () => {
            const customPattern = {
                name: 'Custom',
                description: 'Custom gesture',
                spell: 'custom spell',
                threshold: 0.7,
                minPoints: 10
            };
            
            gestureRecognition.addCustomPattern('custom', customPattern);
            
            const patterns = gestureRecognition.getAllGestures();
            const customPatternFound = patterns.find(p => p.type === 'custom');
            expect(customPatternFound).toBeDefined();
        });
        
        test('should remove custom pattern', () => {
            const customPattern = {
                name: 'Custom',
                description: 'Custom gesture',
                spell: 'custom spell',
                threshold: 0.7,
                minPoints: 10
            };
            
            gestureRecognition.addCustomPattern('custom', customPattern);
            gestureRecognition.removeCustomPattern('custom');
            
            const patterns = gestureRecognition.getAllGestures();
            const customPatternFound = patterns.find(p => p.type === 'custom');
            expect(customPatternFound).toBeUndefined();
        });
    });
    
    describe('Statistics and History', () => {
        test('should get gesture statistics', () => {
            const stats = gestureRecognition.getGestureStats();
            expect(stats).toBeDefined();
            expect(stats.patterns).toBeDefined();
            expect(stats.actions).toBeDefined();
            expect(stats.history).toBeDefined();
            expect(stats.cooldowns).toBeDefined();
        });
        
        test('should maintain recognition history', () => {
            const mockGesture = {
                type: 'circle',
                pattern: { name: 'Circle' },
                score: 0.8,
                spell: 'open portal'
            };
            
            gestureRecognition.addToHistory(mockGesture);
            
            const history = gestureRecognition.getRecognitionHistory();
            expect(history).toHaveLength(1);
            expect(history[0]).toEqual(
                expect.objectContaining({
                    gesture: 'circle',
                    score: 0.8,
                    spell: 'open portal'
                })
            );
        });
        
        test('should limit history size', () => {
            // Add more than maxHistorySize gestures
            for (let i = 0; i < 35; i++) {
                const mockGesture = {
                    type: 'circle',
                    pattern: { name: 'Circle' },
                    score: 0.8,
                    spell: 'open portal'
                };
                gestureRecognition.addToHistory(mockGesture);
            }
            
            const history = gestureRecognition.getRecognitionHistory();
            expect(history.length).toBeLessThanOrEqual(gestureRecognition.maxHistorySize);
        });
    });
    
    describe('Configuration', () => {
        test('should enable/disable gesture recognition', () => {
            gestureRecognition.canvas = mockCanvas;
            
            gestureRecognition.setEnabled(false);
            expect(gestureRecognition.isEnabled).toBe(false);
            expect(mockCanvas.style.pointerEvents).toBe('none');
            expect(mockCanvas.style.opacity).toBe('0.5');
            
            gestureRecognition.setEnabled(true);
            expect(gestureRecognition.isEnabled).toBe(true);
            expect(mockCanvas.style.pointerEvents).toBe('auto');
            expect(mockCanvas.style.opacity).toBe('1');
        });
        
        test('should set debug mode', () => {
            gestureRecognition.setDebugMode(true);
            expect(gestureRecognition.debugMode).toBe(true);
            
            gestureRecognition.setDebugMode(false);
            expect(gestureRecognition.debugMode).toBe(false);
        });
    });
    
    describe('Data Export/Import', () => {
        test('should export gesture data', () => {
            const data = gestureRecognition.exportData();
            expect(data).toBeDefined();
            expect(data.patterns).toBeDefined();
            expect(data.actions).toBeDefined();
            expect(data.recognition).toBeDefined();
            expect(data.exportedAt).toBeDefined();
        });
        
        test('should import gesture data', () => {
            const mockData = {
                patterns: {
                    builtIn: {},
                    custom: {},
                    history: []
                }
            };
            
            gestureRecognition.importData(mockData);
            expect(console.log).toHaveBeenCalledWith('📥 Gesture data imported successfully');
        });
        
        test('should reset gesture system', () => {
            gestureRecognition.reset();
            expect(gestureRecognition.recognitionHistory).toHaveLength(0);
            expect(console.log).toHaveBeenCalledWith('🔄 Gesture system reset');
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
