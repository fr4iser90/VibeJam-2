/**
 * Fantasy OS - Room Progression System Integration Tests
 * Tests for integration between room progression components and existing systems
 * Created: 2025-10-25T16:45:13.000Z
 */

describe('Room Progression System Integration', () => {
    let fantasyOS;
    let roomProgression;
    let roomUnlocking;
    let secretPassages;
    let roomUpgrades;

    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
            <div class="room-tab" data-room="living-room">
                <span class="room-icon">🏠</span>
                <span class="room-name">Living Room</span>
            </div>
            <div class="room-tab" data-room="kitchen">
                <span class="room-icon">🍳</span>
                <span class="room-name">Kitchen</span>
            </div>
            <div id="living-room" class="room active">
                <div class="room-background"></div>
            </div>
            <div id="kitchen" class="room">
                <div class="room-background"></div>
            </div>
        `;

        // Mock localStorage
        const mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage
        });

        // Initialize Fantasy OS with room progression
        fantasyOS = new FantasyOS();
        roomProgression = fantasyOS.components.roomProgression;
        roomUnlocking = fantasyOS.components.roomUnlocking;
        secretPassages = fantasyOS.components.secretPassages;
        roomUpgrades = fantasyOS.components.roomUpgrades;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Fantasy OS Integration', () => {
        test('should initialize room progression components', () => {
            expect(fantasyOS.components.roomProgression).toBeDefined();
            expect(fantasyOS.components.roomUnlocking).toBeDefined();
            expect(fantasyOS.components.secretPassages).toBeDefined();
            expect(fantasyOS.components.roomUpgrades).toBeDefined();
        });

        test('should provide access to room progression methods', () => {
            expect(typeof fantasyOS.getRoomProgression).toBe('function');
            expect(typeof fantasyOS.getRoomUnlocking).toBe('function');
            expect(typeof fantasyOS.getSecretPassages).toBe('function');
            expect(typeof fantasyOS.getRoomUpgrades).toBe('function');
        });

        test('should provide room progression statistics', () => {
            const stats = fantasyOS.getRoomProgressionStats();
            expect(stats).toBeDefined();
            expect(stats.totalRooms).toBe(6);
        });
    });

    describe('Room Switching Integration', () => {
        test('should check room accessibility before switching', () => {
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 0;
            
            const result = fantasyOS.switchRoom('kitchen');
            expect(result).toBe(false);
        });

        test('should allow switching to accessible rooms', () => {
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 1;
            
            const result = fantasyOS.switchRoom('kitchen');
            expect(result).toBe(true);
        });

        test('should mark room as explored when switching', () => {
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 1;
            roomProgression.progressionData.rooms['kitchen'].visitCount = 0;
            
            fantasyOS.switchRoom('kitchen');
            expect(roomProgression.progressionData.rooms['kitchen'].visitCount).toBe(1);
        });

        test('should check for auto-unlock opportunities after switching', () => {
            roomProgression.checkAutoUnlock = jest.fn();
            roomProgression.progressionData.rooms['kitchen'].accessLevel = 1;
            
            fantasyOS.switchRoom('kitchen');
            expect(roomProgression.checkAutoUnlock).toHaveBeenCalled();
        });
    });

    describe('Object Interaction Integration', () => {
        test('should trigger secret passage discovery on object interaction', () => {
            secretPassages.handleObjectInteractionDiscovery = jest.fn();
            
            const event = {
                currentTarget: {
                    dataset: { object: 'fireplace' }
                }
            };
            
            fantasyOS.handleObjectClick(event);
            expect(secretPassages.handleObjectInteractionDiscovery).toHaveBeenCalledWith({
                objectType: 'fireplace',
                action: 'click',
                roomId: 'living-room'
            });
        });

        test('should trigger room progression events on object interaction', () => {
            const mockHandler = jest.fn();
            roomProgression.addEventHandler('object-interaction', mockHandler);
            
            const event = {
                currentTarget: {
                    dataset: { object: 'fireplace' }
                }
            };
            
            fantasyOS.handleObjectClick(event);
            expect(mockHandler).toHaveBeenCalledWith({
                objectType: 'fireplace',
                action: 'click',
                roomId: 'living-room'
            });
        });
    });

    describe('Spell Casting Integration', () => {
        test('should trigger secret passage discovery on spell casting', () => {
            secretPassages.handleSpellCastDiscovery = jest.fn();
            
            const inputElement = {
                value: 'brew potion'
            };
            
            fantasyOS.castSpellFromInput(inputElement);
            expect(secretPassages.handleSpellCastDiscovery).toHaveBeenCalledWith({
                spellText: 'brew potion',
                roomId: 'living-room'
            });
        });

        test('should trigger room progression events on spell casting', () => {
            const mockHandler = jest.fn();
            roomProgression.addEventHandler('spell-cast', mockHandler);
            
            const inputElement = {
                value: 'ignite fireplace'
            };
            
            fantasyOS.castSpellFromInput(inputElement);
            expect(mockHandler).toHaveBeenCalledWith({
                spellText: 'ignite fireplace',
                roomId: 'living-room'
            });
        });
    });

    describe('Quest System Integration', () => {
        test('should unlock rooms based on quest completion', () => {
            const questManager = fantasyOS.components.questManager;
            if (questManager) {
                questManager.isQuestCompleted = jest.fn().mockReturnValue(true);
                
                roomProgression.checkAutoUnlock();
                expect(roomProgression.progressionData.rooms['kitchen'].accessLevel).toBe(1);
            }
        });

        test('should trigger room unlocking on quest completion', () => {
            roomUnlocking.checkQuestBasedUnlocks = jest.fn();
            
            roomProgression.triggerEvent('quest-completed', { questId: 'credentials-recovery' });
            expect(roomUnlocking.checkQuestBasedUnlocks).toHaveBeenCalled();
        });
    });

    describe('Achievement System Integration', () => {
        test('should unlock rooms based on achievement completion', () => {
            const achievementSystem = fantasyOS.components.achievementSystem;
            if (achievementSystem) {
                achievementSystem.isAchievementCompleted = jest.fn().mockReturnValue(true);
                
                roomProgression.checkAutoUnlock();
                expect(roomProgression.progressionData.rooms['kitchen'].accessLevel).toBe(1);
            }
        });

        test('should trigger room unlocking on achievement completion', () => {
            roomUnlocking.checkAchievementBasedUnlocks = jest.fn();
            
            roomProgression.triggerEvent('achievement-completed', { achievementId: 'room-explorer' });
            expect(roomUnlocking.checkAchievementBasedUnlocks).toHaveBeenCalled();
        });
    });

    describe('Secret Passages Integration', () => {
        test('should discover passages through object interactions', () => {
            roomProgression.isRoomAccessible = jest.fn().mockReturnValue(true);
            secretPassages.discoverPassage = jest.fn().mockReturnValue(true);
            
            secretPassages.handleObjectInteractionDiscovery({
                objectType: 'fireplace',
                action: 'ignite',
                roomId: 'living-room'
            });
            
            expect(secretPassages.discoverPassage).toHaveBeenCalledWith('living-room-to-kitchen');
        });

        test('should discover passages through spell casting', () => {
            roomProgression.isRoomAccessible = jest.fn().mockReturnValue(true);
            secretPassages.discoverPassage = jest.fn().mockReturnValue(true);
            
            secretPassages.handleSpellCastDiscovery({
                spellText: 'brew potion',
                roomId: 'kitchen'
            });
            
            expect(secretPassages.discoverPassage).toHaveBeenCalledWith('kitchen-to-workshop');
        });

        test('should provide passage navigation', () => {
            secretPassages.passages['living-room-to-kitchen'].unlocked = true;
            
            const passages = secretPassages.getPassagesFromRoom('living-room');
            expect(passages).toHaveLength(1);
            expect(passages[0].id).toBe('living-room-to-kitchen');
        });
    });

    describe('Room Upgrades Integration', () => {
        test('should unlock upgrades based on room mastery', () => {
            roomProgression.progressionData.rooms['living-room'].masteryPoints = 50;
            roomUpgrades.hasArtifact = jest.fn().mockReturnValue(true);
            
            roomUpgrades.checkAutoUnlockUpgrades();
            expect(roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked).toBe(true);
        });

        test('should apply room upgrades with visual effects', () => {
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].applied = false;
            
            const result = roomUpgrades.applyUpgrade('living-room', 'magical-fireplace');
            expect(result).toBe(true);
            expect(roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].applied).toBe(true);
        });

        test('should provide upgrade statistics', () => {
            roomUpgrades.upgrades['living-room'].upgrades['magical-fireplace'].unlocked = true;
            roomUpgrades.hasArtifact = jest.fn().mockReturnValue(true);
            
            const stats = roomUpgrades.getUpgradeStats();
            expect(stats.totalUpgrades).toBeGreaterThan(0);
            expect(stats.unlockedUpgrades).toBe(1);
        });
    });

    describe('Data Persistence Integration', () => {
        test('should save progression data across sessions', () => {
            roomProgression.progressionData.rooms['living-room'].visitCount = 10;
            roomProgression.saveProgressionData();
            
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'fantasy-os-room-progression',
                expect.stringContaining('"visitCount":10')
            );
        });

        test('should load progression data on initialization', () => {
            const mockData = {
                rooms: {
                    'living-room': {
                        accessLevel: 2,
                        visitCount: 15
                    }
                }
            };
            localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
            
            const newRoomProgression = new RoomProgression();
            expect(newRoomProgression.progressionData.rooms['living-room'].visitCount).toBe(15);
        });
    });

    describe('Event System Integration', () => {
        test('should propagate events between components', () => {
            const mockHandler = jest.fn();
            roomProgression.addEventHandler('room-unlocked', mockHandler);
            
            roomProgression.unlockRoom('kitchen');
            expect(mockHandler).toHaveBeenCalledWith({
                roomId: 'kitchen',
                roomData: expect.any(Object)
            });
        });

        test('should handle multiple event listeners', () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            
            roomProgression.addEventHandler('room-explored', handler1);
            roomProgression.addEventHandler('room-explored', handler2);
            
            roomProgression.exploreRoom('living-room');
            expect(handler1).toHaveBeenCalled();
            expect(handler2).toHaveBeenCalled();
        });
    });

    describe('Error Handling Integration', () => {
        test('should handle missing room gracefully', () => {
            const result = fantasyOS.switchRoom('nonexistent-room');
            expect(result).toBe(false);
        });

        test('should handle localStorage errors gracefully', () => {
            localStorage.setItem.mockImplementation(() => {
                throw new Error('Storage quota exceeded');
            });
            
            const result = roomProgression.saveProgressionData();
            expect(result).toBe(false);
        });

        test('should handle invalid progression data gracefully', () => {
            localStorage.getItem.mockReturnValue('invalid json');
            
            const newRoomProgression = new RoomProgression();
            expect(newRoomProgression.progressionData).toBeDefined();
        });
    });

    describe('Performance Integration', () => {
        test('should maintain performance with large progression data', () => {
            const startTime = performance.now();
            
            // Simulate large progression data
            for (let i = 0; i < 1000; i++) {
                roomProgression.exploreRoom('living-room');
            }
            
            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
        });

        test('should efficiently check room accessibility', () => {
            const startTime = performance.now();
            
            // Check accessibility multiple times
            for (let i = 0; i < 100; i++) {
                roomProgression.isRoomAccessible('living-room');
            }
            
            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(50); // Should complete in under 50ms
        });
    });
});
