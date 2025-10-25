/**
 * Fantasy OS - Room Progression System Unit Tests
 * Tests for room progression, unlocking, secret passages, and upgrades
 * Created: 2025-10-25T16:45:13.000Z
 */

describe('RoomProgression', () => {
    let roomProgression;
    let mockLocalStorage;

    beforeEach(() => {
        // Mock localStorage
        mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage
        });

        // Mock Fantasy OS components
        window.fantasyOS = {
            components: {
                questManager: {
                    isQuestCompleted: jest.fn(),
                    getCompletedQuests: jest.fn()
                },
                achievementSystem: {
                    isAchievementCompleted: jest.fn(),
                    getCompletedAchievements: jest.fn()
                }
            }
        };

        roomProgression = new RoomProgression();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        test('should initialize with default progression data', () => {
            expect(roomProgression.progressionData).toBeDefined();
            expect(roomProgression.progressionData.rooms).toBeDefined();
            expect(roomProgression.progressionData.secretPassages).toBeDefined();
            expect(roomProgression.progressionData.roomUpgrades).toBeDefined();
        });

        test('should load progression data from localStorage', () => {
            const mockData = {
                rooms: {
                    'living-room': {
                        accessLevel: 1,
                        unlockedAt: '2025-10-25T16:45:13.000Z',
                        visitCount: 5
                    }
                }
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockData));

            const newRoomProgression = new RoomProgression();
            expect(newRoomProgression.progressionData.rooms['living-room'].visitCount).toBe(5);
        });

        test('should initialize room requirements correctly', () => {
            expect(roomProgression.roomRequirements['living-room'].accessLevel).toBe(1);
            expect(roomProgression.roomRequirements['kitchen'].requiredQuests).toContain('credentials-recovery');
        });
    });

    describe('Room Access Control', () => {
        test('should check room accessibility correctly', () => {
            roomProgression.progressionData.rooms['living-room'].accessLevel = 1;
            expect(roomProgression.isRoomAccessible('living-room')).toBe(true);

            roomProgression.progressionData.rooms['kitchen'].accessLevel = 0;
            expect(roomProgression.isRoomAccessible('kitchen')).toBe(false);
        });

        test('should validate room unlock requirements', () => {
            window.fantasyOS.components.questManager.isQuestCompleted.mockReturnValue(true);
            window.fantasyOS.components.achievementSystem.isAchievementCompleted.mockReturnValue(true);

            expect(roomProgression.canUnlockRoom('kitchen')).toBe(true);

            window.fantasyOS.components.questManager.isQuestCompleted.mockReturnValue(false);
            expect(roomProgression.canUnlockRoom('kitchen')).toBe(false);
        });

        test('should unlock room when requirements are met', () => {
            window.fantasyOS.components.questManager.isQuestCompleted.mockReturnValue(true);
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 0;

            const result = roomProgression.unlockRoom('kitchen');
            expect(result).toBe(true);
            expect(roomProgression.progressionData.rooms['kitchen'].accessLevel).toBe(1);
            expect(roomProgression.progressionData.rooms['kitchen'].unlockedAt).toBeDefined();
        });

        test('should not unlock room when requirements are not met', () => {
            window.fantasyOS.components.questManager.isQuestCompleted.mockReturnValue(false);
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 0;

            const result = roomProgression.unlockRoom('kitchen');
            expect(result).toBe(false);
            expect(roomProgression.progressionData.rooms['kitchen'].accessLevel).toBe(0);
        });
    });

    describe('Room Exploration', () => {
        test('should mark room as explored', () => {
            roomProgression.progressionData.rooms['living-room'].accessLevel = 1;
            roomProgression.progressionData.rooms['living-room'].visitCount = 0;

            const result = roomProgression.exploreRoom('living-room');
            expect(result).toBe(true);
            expect(roomProgression.progressionData.rooms['living-room'].accessLevel).toBe(2);
            expect(roomProgression.progressionData.rooms['living-room'].visitCount).toBe(1);
            expect(roomProgression.progressionData.rooms['living-room'].lastVisited).toBeDefined();
        });

        test('should not explore locked room', () => {
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 0;

            const result = roomProgression.exploreRoom('kitchen');
            expect(result).toBe(false);
        });

        test('should increment visit count on each exploration', () => {
            roomProgression.progressionData.rooms['living-room'].accessLevel = 2;
            roomProgression.progressionData.rooms['living-room'].visitCount = 5;

            roomProgression.exploreRoom('living-room');
            expect(roomProgression.progressionData.rooms['living-room'].visitCount).toBe(6);
        });
    });

    describe('Room Mastery', () => {
        test('should mark room as mastered', () => {
            roomProgression.progressionData.rooms['living-room'].accessLevel = 2;
            roomProgression.progressionData.rooms['living-room'].visitCount = 10;

            const result = roomProgression.masterRoom('living-room');
            expect(result).toBe(true);
            expect(roomProgression.progressionData.rooms['living-room'].accessLevel).toBe(3);
            expect(roomProgression.progressionData.rooms['living-room'].masteredAt).toBeDefined();
            expect(roomProgression.progressionData.rooms['living-room'].masteryPoints).toBeGreaterThan(0);
        });

        test('should not master unexplored room', () => {
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 1;

            const result = roomProgression.masterRoom('kitchen');
            expect(result).toBe(false);
        });

        test('should calculate mastery points correctly', () => {
            roomProgression.progressionData.rooms['living-room'].visitCount = 5;
            roomProgression.progressionData.rooms['living-room'].accessLevel = 2;

            const points = roomProgression.calculateMasteryPoints('living-room');
            expect(points).toBeGreaterThan(0);
            expect(points).toBeLessThanOrEqual(100);
        });
    });

    describe('Progression Statistics', () => {
        test('should return correct progression stats', () => {
            roomProgression.progressionData.rooms['living-room'].accessLevel = 3;
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 1;
            roomProgression.progressionData.rooms['bedroom'].accessLevel = 0;

            const stats = roomProgression.getProgressionStats();
            expect(stats.totalRooms).toBe(6);
            expect(stats.unlockedRooms).toBe(2);
            expect(stats.exploredRooms).toBe(1);
            expect(stats.masteredRooms).toBe(1);
        });

        test('should return room status correctly', () => {
            roomProgression.progressionData.rooms['living-room'].accessLevel = 2;
            roomProgression.progressionData.rooms['living-room'].visitCount = 5;

            const status = roomProgression.getRoomStatus('living-room');
            expect(status.roomId).toBe('living-room');
            expect(status.accessLevel).toBe(2);
            expect(status.accessLevelName).toBe('Explored');
            expect(status.visitCount).toBe(5);
        });
    });

    describe('Event System', () => {
        test('should add and trigger event handlers', () => {
            const mockHandler = jest.fn();
            roomProgression.addEventHandler('room-unlocked', mockHandler);

            roomProgression.triggerEvent('room-unlocked', { roomId: 'kitchen' });
            expect(mockHandler).toHaveBeenCalledWith({ roomId: 'kitchen' });
        });

        test('should remove event handlers', () => {
            const mockHandler = jest.fn();
            roomProgression.addEventHandler('room-unlocked', mockHandler);
            roomProgression.removeEventHandler('room-unlocked', mockHandler);

            roomProgression.triggerEvent('room-unlocked', { roomId: 'kitchen' });
            expect(mockHandler).not.toHaveBeenCalled();
        });
    });

    describe('Data Persistence', () => {
        test('should save progression data to localStorage', () => {
            roomProgression.progressionData.rooms['living-room'].visitCount = 10;
            roomProgression.saveProgressionData();

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'fantasy-os-room-progression',
                expect.stringContaining('"visitCount":10')
            );
        });

        test('should export progression data', () => {
            const exportedData = roomProgression.exportProgressionData();
            expect(typeof exportedData).toBe('string');
            expect(JSON.parse(exportedData)).toBeDefined();
        });

        test('should import progression data', () => {
            const mockData = {
                rooms: {
                    'living-room': {
                        accessLevel: 3,
                        visitCount: 15
                    }
                }
            };

            const result = roomProgression.importProgressionData(JSON.stringify(mockData));
            expect(result).toBe(true);
            expect(roomProgression.progressionData.rooms['living-room'].visitCount).toBe(15);
        });
    });

    describe('Auto-unlock System', () => {
        test('should check for auto-unlock opportunities', () => {
            window.fantasyOS.components.questManager.isQuestCompleted.mockReturnValue(true);
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 0;

            roomProgression.checkAutoUnlock();
            expect(roomProgression.progressionData.rooms['kitchen'].accessLevel).toBe(1);
        });
    });
});

describe('RoomUnlocking', () => {
    let roomProgression;
    let roomUnlocking;

    beforeEach(() => {
        roomProgression = new RoomProgression();
        roomUnlocking = new RoomUnlocking(roomProgression);
    });

    describe('Room Unlocking', () => {
        test('should attempt to unlock room', () => {
            roomProgression.canUnlockRoom = jest.fn().mockReturnValue(true);
            roomProgression.unlockRoom = jest.fn().mockReturnValue(true);

            const result = roomUnlocking.attemptUnlockRoom('kitchen');
            expect(result).toBe(true);
        });

        test('should show unlock failure when requirements not met', () => {
            roomProgression.canUnlockRoom = jest.fn().mockReturnValue(false);
            
            // Mock DOM methods
            document.createElement = jest.fn().mockReturnValue({
                className: '',
                innerHTML: '',
                style: {},
                addEventListener: jest.fn()
            });
            document.body = {
                appendChild: jest.fn(),
                removeChild: jest.fn()
            };

            const result = roomUnlocking.attemptUnlockRoom('kitchen');
            expect(result).toBe(false);
        });
    });

    describe('Unlock Animations', () => {
        test('should setup unlock animations', () => {
            expect(roomUnlocking.unlockAnimations.has('default')).toBe(true);
            expect(roomUnlocking.unlockAnimations.has('quest-based')).toBe(true);
            expect(roomUnlocking.unlockAnimations.has('achievement-based')).toBe(true);
        });

        test('should get correct unlock message', () => {
            expect(roomUnlocking.getUnlockMessage('quest-based')).toBe('Quest completed! Room unlocked!');
            expect(roomUnlocking.getUnlockMessage('achievement-based')).toBe('Achievement unlocked! Room revealed!');
            expect(roomUnlocking.getUnlockMessage('default')).toBe('A new room has been discovered!');
        });
    });
});

describe('SecretPassages', () => {
    let roomProgression;
    let secretPassages;

    beforeEach(() => {
        roomProgression = new RoomProgression();
        secretPassages = new SecretPassages(roomProgression);
    });

    describe('Passage Discovery', () => {
        test('should initialize passages correctly', () => {
            expect(secretPassages.passages['living-room-to-kitchen']).toBeDefined();
            expect(secretPassages.passages['kitchen-to-workshop']).toBeDefined();
        });

        test('should handle object interaction discovery', () => {
            roomProgression.isRoomAccessible = jest.fn().mockReturnValue(true);
            secretPassages.discoverPassage = jest.fn().mockReturnValue(true);

            secretPassages.handleObjectInteractionDiscovery({
                objectType: 'fireplace',
                action: 'ignite',
                roomId: 'living-room'
            });

            expect(secretPassages.discoverPassage).toHaveBeenCalledWith('living-room-to-kitchen');
        });

        test('should handle spell cast discovery', () => {
            roomProgression.isRoomAccessible = jest.fn().mockReturnValue(true);
            secretPassages.discoverPassage = jest.fn().mockReturnValue(true);

            secretPassages.handleSpellCastDiscovery({
                spellText: 'brew potion',
                roomId: 'kitchen'
            });

            expect(secretPassages.discoverPassage).toHaveBeenCalledWith('kitchen-to-workshop');
        });
    });

    describe('Passage Usage', () => {
        test('should use passage correctly', () => {
            secretPassages.passages['living-room-to-kitchen'].unlocked = true;
            secretPassages.passages['living-room-to-kitchen'].usageCount = 0;

            const result = secretPassages.usePassage('living-room-to-kitchen');
            expect(result).toBe(true);
            expect(secretPassages.passages['living-room-to-kitchen'].usageCount).toBe(1);
        });

        test('should not use locked passage', () => {
            secretPassages.passages['living-room-to-kitchen'].unlocked = false;

            const result = secretPassages.usePassage('living-room-to-kitchen');
            expect(result).toBe(false);
        });
    });

    describe('Passage Statistics', () => {
        test('should return correct passage stats', () => {
            secretPassages.passages['living-room-to-kitchen'].unlocked = true;
            secretPassages.passages['living-room-to-kitchen'].usageCount = 5;

            const stats = secretPassages.getPassageStats();
            expect(stats.totalPassages).toBe(5);
            expect(stats.discoveredPassages).toBe(1);
            expect(stats.totalUsage).toBe(5);
        });
    });
});

describe('RoomUpgrades', () => {
    let roomProgression;
    let roomUpgrades;

    beforeEach(() => {
        roomProgression = new RoomProgression();
        roomUpgrades = new RoomUpgrades(roomProgression);
    });

    describe('Upgrade System', () => {
        test('should initialize upgrades correctly', () => {
            expect(roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace']).toBeDefined();
            expect(roomUpgrades.upgrades['kitchen'].upgrades['magical-cauldron']).toBeDefined();
        });

        test('should initialize artifacts correctly', () => {
            expect(roomUpgrades.artifacts['fire-crystal']).toBeDefined();
            expect(roomUpgrades.artifacts['light-crystal']).toBeDefined();
        });

        test('should check upgrade unlock requirements', () => {
            roomProgression.progressionData.rooms['living-room'].masteryPoints = 40;
            roomUpgrades.hasArtifact = jest.fn().mockReturnValue(true);

            const result = roomUpgrades.canUnlockUpgrade('living-room', 'magical-fireplace');
            expect(result).toBe(true);
        });

        test('should unlock upgrade when requirements met', () => {
            roomUpgrades.canUnlockUpgrade = jest.fn().mockReturnValue(true);
            roomUpgrades.saveUpgradeData = jest.fn();

            const result = roomUpgrades.unlockUpgrade('living-room', 'magical-fireplace');
            expect(result).toBe(true);
            expect(roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked).toBe(true);
        });

        test('should apply upgrade correctly', () => {
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].applied = false;
            roomUpgrades.saveUpgradeData = jest.fn();

            const result = roomUpgrades.applyUpgrade('living-room', 'magical-fireplace');
            expect(result).toBe(true);
            expect(roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].applied).toBe(true);
        });
    });

    describe('Artifact System', () => {
        test('should check artifact availability', () => {
            window.fantasyOS.components.questManager.isQuestCompleted = jest.fn().mockReturnValue(true);

            const result = roomUpgrades.hasArtifact('fire-crystal');
            expect(result).toBe(true);
        });

        test('should not have artifact when quest not completed', () => {
            window.fantasyOS.components.questManager.isQuestCompleted = jest.fn().mockReturnValue(false);

            const result = roomUpgrades.hasArtifact('fire-crystal');
            expect(result).toBe(false);
        });
    });

    describe('Upgrade Statistics', () => {
        test('should return correct upgrade stats', () => {
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].applied = true;
            roomUpgrades.hasArtifact = jest.fn().mockReturnValue(true);

            const stats = roomUpgrades.getUpgradeStats();
            expect(stats.totalUpgrades).toBeGreaterThan(0);
            expect(stats.unlockedUpgrades).toBe(1);
            expect(stats.appliedUpgrades).toBe(1);
        });
    });
});
