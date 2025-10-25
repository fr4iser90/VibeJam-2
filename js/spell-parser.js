/**
 * Fantasy OS - Spell Parser System
 * Parses and executes fantasy spells/commands
 * Created: 2025-10-25T12:04:17.000Z
 */

class SpellParser {
    constructor() {
        this.spells = {
            // Fire spells
            'ignite fireplace': {
                action: 'igniteFireplace',
                description: 'Ignite the fireplace for warmth and light',
                effects: ['fire', 'warmth', 'light'],
                successMessage: 'The fireplace roars to life with magical flames!',
                failMessage: 'The fireplace remains cold and dark.'
            },
            'extinguish fireplace': {
                action: 'extinguishFireplace',
                description: 'Extinguish the fireplace',
                effects: ['cold', 'dark'],
                successMessage: 'The fireplace flames die down to embers.',
                failMessage: 'The fireplace continues to burn.'
            },
            
            // Light spells
            'summon light': {
                action: 'illuminateLamp',
                description: 'Illuminate the lamp for bright light',
                effects: ['light', 'warmth'],
                successMessage: 'The lamp glows with magical radiance!',
                failMessage: 'The lamp remains dim and unlit.'
            },
            'dim light': {
                action: 'dimLamp',
                description: 'Dim the lamp for softer light',
                effects: ['dim', 'shadow'],
                successMessage: 'The lamp dims to a soft glow.',
                failMessage: 'The lamp continues to shine brightly.'
            },
            
            // Portal spells
            'open portal to kitchen': {
                action: 'openPortal',
                target: 'kitchen',
                description: 'Open a portal to the kitchen',
                effects: ['portal', 'transport'],
                successMessage: 'A shimmering portal opens to the kitchen!',
                failMessage: 'The portal fails to materialize.'
            },
            'open portal to bedroom': {
                action: 'openPortal',
                target: 'bedroom',
                description: 'Open a portal to the bedroom',
                effects: ['portal', 'transport'],
                successMessage: 'A mystical portal opens to the bedroom!',
                failMessage: 'The portal remains closed.'
            },
            'open portal to workshop': {
                action: 'openPortal',
                target: 'workshop',
                description: 'Open a portal to the workshop',
                effects: ['portal', 'transport'],
                successMessage: 'A magical portal opens to the workshop!',
                failMessage: 'The portal fails to open.'
            },
            'open portal to library': {
                action: 'openPortal',
                target: 'library',
                description: 'Open a portal to the library',
                effects: ['portal', 'transport'],
                successMessage: 'A scholarly portal opens to the library!',
                failMessage: 'The portal remains sealed.'
            },
            'open portal to garden': {
                action: 'openPortal',
                target: 'garden',
                description: 'Open a portal to the garden',
                effects: ['portal', 'transport'],
                successMessage: 'A verdant portal opens to the garden!',
                failMessage: 'The portal fails to bloom.'
            },
            
            // Storage spells
            'store treasure in chest': {
                action: 'openChest',
                description: 'Open the chest to store files',
                effects: ['storage', 'treasure'],
                successMessage: 'The chest opens, ready to store your treasures!',
                failMessage: 'The chest remains locked.'
            },
            'close chest': {
                action: 'closeChest',
                description: 'Close the chest',
                effects: ['security'],
                successMessage: 'The chest closes with a satisfying click.',
                failMessage: 'The chest refuses to close.'
            },
            
            // Crystal ball spells
            'gaze into crystal ball': {
                action: 'gazeIntoCrystal',
                description: 'Look into the crystal ball for visions',
                effects: ['vision', 'magic'],
                successMessage: 'The crystal ball shows mystical visions!',
                failMessage: 'The crystal ball remains cloudy.'
            },
            'clear crystal ball': {
                action: 'clearCrystal',
                description: 'Clear the crystal ball',
                effects: ['clarity'],
                successMessage: 'The crystal ball clears to perfect transparency.',
                failMessage: 'The crystal ball remains clouded.'
            },
            
            // Book spells
            'read ancient tome': {
                action: 'readSpellBook',
                description: 'Read the spell book for knowledge',
                effects: ['knowledge', 'wisdom'],
                successMessage: 'Ancient knowledge flows through your mind!',
                failMessage: 'The text remains unreadable.'
            },
            'close spell book': {
                action: 'closeSpellBook',
                description: 'Close the spell book',
                effects: ['rest'],
                successMessage: 'The spell book closes with a whisper.',
                failMessage: 'The spell book remains open.'
            },
            
            // Cauldron spells
            'brew potion': {
                action: 'brewPotion',
                description: 'Brew a magical potion in the cauldron',
                effects: ['brewing', 'magic'],
                successMessage: 'The cauldron bubbles with magical energy!',
                failMessage: 'The cauldron remains still.'
            },
            'stop brewing': {
                action: 'stopBrewing',
                description: 'Stop brewing in the cauldron',
                effects: ['stillness'],
                successMessage: 'The cauldron stops bubbling.',
                failMessage: 'The cauldron continues to brew.'
            },
            
            // Protection spells
            'cast protection spell': {
                action: 'castProtection',
                description: 'Cast a protection spell for security',
                effects: ['protection', 'security'],
                successMessage: 'A protective barrier surrounds you!',
                failMessage: 'The protection spell fails to take hold.'
            },
            'remove protection': {
                action: 'removeProtection',
                description: 'Remove the protection spell',
                effects: ['vulnerability'],
                successMessage: 'The protective barrier dissipates.',
                failMessage: 'The protection remains strong.'
            },
            
            // Utility spells
            'show help': {
                action: 'showHelp',
                description: 'Show help and spell information',
                effects: ['knowledge'],
                successMessage: 'Help information appears before you!',
                failMessage: 'Help remains hidden.'
            },
            'show settings': {
                action: 'showSettings',
                description: 'Show settings and preferences',
                effects: ['configuration'],
                successMessage: 'Settings panel opens!',
                failMessage: 'Settings remain locked.'
            }
        };
        
        this.spellHistory = [];
        this.maxHistorySize = 50;
    }
    
    /**
     * Parse a spell text and execute it
     */
    parseSpell(spellText) {
        const normalizedSpell = spellText.toLowerCase().trim();
        
        // Add to spell history
        this.addToHistory(normalizedSpell);
        
        // Check for incomplete portal spells
        if (normalizedSpell === 'open portal') {
            return this.handleIncompletePortalSpell();
        }
        
        // Check if spell exists
        const spell = this.spells[normalizedSpell];
        if (!spell) {
            return {
                success: false,
                message: `Unknown spell: "${spellText}". Try "show help" for available spells.`,
                effect: null
            };
        }
        
        // Execute spell action
        const result = this.executeSpellAction(spell);
        
        // Trigger quest events based on spell
        this.triggerQuestEvents(normalizedSpell, result.success);
        
        return {
            success: result.success,
            message: result.success ? spell.successMessage : spell.failMessage,
            effect: spell.effects,
            spell: normalizedSpell
        };
    }
    
    /**
     * Trigger quest events based on spell
     */
    triggerQuestEvents(spellText, success) {
        if (!success) return;
        
        // Map spells to quest triggers
        const spellToTrigger = {
            'illuminate': 'lamp1-illuminate', // Will be refined based on context
            'ignite': 'fireplace-ignite',
            'browse': 'book-browse',
            'examine': 'vase-examine',
            'open portal to kitchen': 'portal-spell-cast',
            'open portal to bedroom': 'portal-spell-cast',
            'open portal to workshop': 'portal-spell-cast',
            'open portal to library': 'portal-spell-cast',
            'open portal to garden': 'portal-spell-cast'
        };
        
        const trigger = spellToTrigger[spellText];
        if (trigger && typeof window.fantasyOS !== 'undefined' && 
            window.fantasyOS.components.questManager) {
            
            console.log(`🎯 Triggering quest event: ${trigger}`);
            window.fantasyOS.components.questManager.triggerEvent(trigger);
        }
    }
    
    /**
     * Handle incomplete portal spell
     */
    handleIncompletePortalSpell() {
        const availableRooms = this.getAvailableRooms();
        
        return {
            success: false,
            message: `Open portal to where? Available destinations: ${availableRooms.join(', ')}`,
            effect: 'portal-prompt',
            availableRooms: availableRooms
        };
    }
    
    /**
     * Get available rooms for portal spells
     */
    getAvailableRooms() {
        const roomTabs = document.querySelectorAll('.room-tab');
        const rooms = [];
        
        roomTabs.forEach(tab => {
            const roomId = tab.dataset.room;
            if (roomId) {
                // Convert room ID to readable name
                const roomName = roomId.replace('-', ' ');
                rooms.push(roomName);
            }
        });
        
        return rooms;
    }
    
    /**
     * Execute the action for a spell
     */
    executeSpellAction(spell) {
        try {
            switch (spell.action) {
                case 'igniteFireplace':
                    return this.igniteFireplace();
                case 'extinguishFireplace':
                    return this.extinguishFireplace();
                case 'illuminateLamp':
                    return this.illuminateLamp();
                case 'dimLamp':
                    return this.dimLamp();
                case 'openPortal':
                    return this.openPortal(spell.target);
                case 'openChest':
                    return this.openChest();
                case 'closeChest':
                    return this.closeChest();
                case 'gazeIntoCrystal':
                    return this.gazeIntoCrystal();
                case 'clearCrystal':
                    return this.clearCrystal();
                case 'readSpellBook':
                    return this.readSpellBook();
                case 'closeSpellBook':
                    return this.closeSpellBook();
                case 'brewPotion':
                    return this.brewPotion();
                case 'stopBrewing':
                    return this.stopBrewing();
                case 'castProtection':
                    return this.castProtection();
                case 'removeProtection':
                    return this.removeProtection();
                case 'showHelp':
                    return this.showHelp();
                case 'showSettings':
                    return this.showSettings();
                default:
                    return { success: false, message: 'Unknown spell action' };
            }
        } catch (error) {
            console.error('Error executing spell:', error);
            return { success: false, message: 'Spell execution failed due to magical interference' };
        }
    }
    
    /**
     * Ignite fireplace
     */
    igniteFireplace() {
        const fireplace = document.querySelector('.fireplace');
        if (fireplace) {
            fireplace.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Extinguish fireplace
     */
    extinguishFireplace() {
        const fireplace = document.querySelector('.fireplace');
        if (fireplace) {
            fireplace.classList.remove('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Illuminate lamp
     */
    illuminateLamp() {
        const lamp = document.querySelector('.lamp');
        if (lamp) {
            lamp.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Dim lamp
     */
    dimLamp() {
        const lamp = document.querySelector('.lamp');
        if (lamp) {
            lamp.classList.remove('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Open portal to room
     */
    openPortal(targetRoom) {
        console.log(`🔮 Opening portal to ${targetRoom}...`);
        
        // Check if room is accessible through room progression system
        if (typeof window.fantasyOS !== 'undefined' && 
            window.fantasyOS.components.roomProgression) {
            
            const roomProgression = window.fantasyOS.components.roomProgression;
            
            // Check if quest requirements are met
            const questRequirements = {
                'kitchen': 'credentials-recovery',
                'bedroom': 'dream-walker', 
                'workshop': 'crafting-mastery',
                'library': 'knowledge-seeker',
                'garden': 'nature-connection'
            };
            
            const requiredQuest = questRequirements[targetRoom];
            
            if (requiredQuest) {
                // Check if quest is completed
                const questCompleted = window.fantasyOS.components.questManager ? 
                    window.fantasyOS.components.questManager.isQuestCompleted(requiredQuest) : false;
                
                if (!questCompleted) {
                    // Quest not completed - show hobbit help
                    this.showHobbitHelp(targetRoom, requiredQuest);
                    return { 
                        success: false, 
                        message: `The portal to ${targetRoom} remains closed. Complete the ${requiredQuest} quest first!` 
                    };
                }
                
                // Quest completed - unlock room
                console.log(`✅ Quest ${requiredQuest} completed, unlocking ${targetRoom}`);
                roomProgression.unlockRoom(targetRoom);
            }
            
            if (!roomProgression.isRoomAccessible(targetRoom)) {
                // Room is still locked
                this.showHobbitHelp(targetRoom);
                return { 
                    success: false, 
                    message: `The portal to ${targetRoom} remains closed. The room is locked!` 
                };
            }
        }
        
        // Room is accessible - switch to it
        if (typeof RoomManager !== 'undefined') {
            const roomManager = new RoomManager();
            return { success: roomManager.switchToRoom(targetRoom) };
        }
        
        // Fallback: switch room directly
        const roomTab = document.querySelector(`[data-room="${targetRoom}"]`);
        if (roomTab) {
            roomTab.click();
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Show hobbit help for locked rooms
     */
    showHobbitHelp(targetRoom, requiredQuest = null) {
        const hobbitMessages = {
            'kitchen': requiredQuest ? 
                "The hobbit whispers: 'Complete the credentials recovery quest first, then the kitchen portal will open!'" :
                "The hobbit whispers: 'To unlock the kitchen, you must first complete the credentials recovery quest!'",
            'bedroom': requiredQuest ? 
                "The hobbit suggests: 'Finish the dream exploration quest, then the bedroom portal will open!'" :
                "The hobbit suggests: 'The bedroom requires completing the dream exploration quest!'",
            'workshop': requiredQuest ? 
                "The hobbit advises: 'Complete the crafting mastery quest, then the workshop portal will open!'" :
                "The hobbit advises: 'The workshop needs the crafting mastery quest to be completed!'",
            'library': requiredQuest ? 
                "The hobbit explains: 'Finish the knowledge seeking quest, then the library portal will open!'" :
                "The hobbit explains: 'The library awaits those who finish the knowledge seeking quest!'",
            'garden': requiredQuest ? 
                "The hobbit tells you: 'Complete the nature connection quest, then the garden portal will open!'" :
                "The hobbit tells you: 'The garden opens only after completing the nature connection quest!'"
        };
        
        const message = hobbitMessages[targetRoom] || `The hobbit looks confused about ${targetRoom}.`;
        
        // Show hobbit dialogue
        if (typeof window.fantasyOS !== 'undefined' && 
            window.fantasyOS.components.hobbitCompanion) {
            window.fantasyOS.components.hobbitCompanion.showDialogue(message);
        }
        
        console.log(`🧙‍♂️ Hobbit help: ${message}`);
    }
    
    /**
     * Open chest
     */
    openChest() {
        const chest = document.querySelector('.chest');
        if (chest) {
            chest.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Close chest
     */
    closeChest() {
        const chest = document.querySelector('.chest');
        if (chest) {
            chest.classList.remove('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Gaze into crystal ball
     */
    gazeIntoCrystal() {
        const crystalBall = document.querySelector('.crystal-ball');
        if (crystalBall) {
            crystalBall.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Clear crystal ball
     */
    clearCrystal() {
        const crystalBall = document.querySelector('.crystal-ball');
        if (crystalBall) {
            crystalBall.classList.remove('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Read spell book
     */
    readSpellBook() {
        const spellBook = document.querySelector('.spell-book');
        if (spellBook) {
            spellBook.classList.add('active');
            // Show help modal
            const helpModal = document.getElementById('helpModal');
            if (helpModal) {
                helpModal.classList.add('active');
            }
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Close spell book
     */
    closeSpellBook() {
        const spellBook = document.querySelector('.spell-book');
        if (spellBook) {
            spellBook.classList.remove('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Brew potion
     */
    brewPotion() {
        const cauldron = document.querySelector('.cauldron');
        if (cauldron) {
            cauldron.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Stop brewing
     */
    stopBrewing() {
        const cauldron = document.querySelector('.cauldron');
        if (cauldron) {
            cauldron.classList.remove('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Cast protection spell
     */
    castProtection() {
        // This would implement security features
        console.log('🛡️ Protection spell cast');
        return { success: true };
    }
    
    /**
     * Remove protection
     */
    removeProtection() {
        // This would remove security features
        console.log('🛡️ Protection spell removed');
        return { success: true };
    }
    
    /**
     * Show help
     */
    showHelp() {
        const helpModal = document.getElementById('helpModal');
        if (helpModal) {
            helpModal.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Show settings
     */
    showSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.classList.add('active');
            return { success: true };
        }
        return { success: false };
    }
    
    /**
     * Add spell to history
     */
    addToHistory(spellText) {
        const spellEntry = {
            spell: spellText,
            timestamp: new Date().toISOString(),
            success: this.spells[spellText] ? true : false
        };
        
        this.spellHistory.unshift(spellEntry);
        
        // Limit history size
        if (this.spellHistory.length > this.maxHistorySize) {
            this.spellHistory = this.spellHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Get spell history
     */
    getSpellHistory() {
        return [...this.spellHistory];
    }
    
    /**
     * Get all available spells
     */
    getAllSpells() {
        return Object.keys(this.spells).map(spellText => ({
            spell: spellText,
            ...this.spells[spellText]
        }));
    }
    
    /**
     * Search spells by keyword
     */
    searchSpells(keyword) {
        const normalizedKeyword = keyword.toLowerCase();
        return Object.keys(this.spells).filter(spellText => 
            spellText.includes(normalizedKeyword) ||
            this.spells[spellText].description.toLowerCase().includes(normalizedKeyword)
        ).map(spellText => ({
            spell: spellText,
            ...this.spells[spellText]
        }));
    }
    
    /**
     * Get spell information
     */
    getSpellInfo(spellText) {
        return this.spells[spellText.toLowerCase()] ? 
            { spell: spellText, ...this.spells[spellText.toLowerCase()] } : null;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpellParser;
}
