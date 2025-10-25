/**
 * Fantasy OS - Quest Content System
 * Quest storylines, content definitions, and quest data
 * Created: 2025-10-25T16:06:31.000Z
 */

/**
 * Main Questline: The Hobbit's Lost Legacy
 * A five-act storyline that expands the current credential recovery quest
 */
const mainQuestline = {
    'hobbit-legacy': {
        title: 'The Hobbit\'s Lost Legacy',
        description: 'Help the Hobbit recover his lost magical abilities and restore the Fantasy OS',
        type: 'main',
        acts: {
            'act-1': {
                id: 'credentials-recovery',
                title: 'Credential Recovery',
                description: 'Help the Hobbit recover his Fantasy OS credentials',
                status: 'active',
                type: 'main',
                act: 1,
                steps: [
                    { 
                        id: 'start', 
                        title: 'Meet the Hobbit', 
                        description: 'Talk to the Hobbit in the living room', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['hobbit-interaction'],
                        hobbitDialogue: "I have lost my Fantasy OS credentials! I need help! Can you light up the place?"
                    },
                    { 
                        id: 'light-lamp1', 
                        title: 'Light Lamp 1', 
                        description: 'Turn on the first lamp to illuminate the room', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['lamp1-illuminate'],
                        objectCoords: { x: 722, y: 455 },
                        spell: 'illuminate',
                        hobbitDialogue: "Great! Now I can see better! Please search in the shelf or maybe the vase somewhere for my credentials!"
                    },
                    { 
                        id: 'light-lamp2', 
                        title: 'Light Lamp 2', 
                        description: 'Turn on the second lamp for more light', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['lamp2-illuminate'],
                        objectCoords: { x: 706, y: 760 },
                        spell: 'illuminate',
                        hobbitDialogue: "Excellent! Both lamps are lit! The room is much brighter now. Check the vase or bookshelf for clues!"
                    },
                    { 
                        id: 'ignite-fireplace', 
                        title: 'Ignite Fireplace', 
                        description: 'Light the fireplace to warm up the room', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['fireplace-ignite'],
                        objectCoords: { x: 160, y: 816 },
                        spell: 'ignite'
                    },
                    { 
                        id: 'read-book', 
                        title: 'Read Book', 
                        description: 'Read the book to find the portal spell (unlocks kitchen portal)', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['book-browse'],
                        objectCoords: { x: 538, y: 433 },
                        spell: 'browse',
                        hobbitDialogue: "Thank you! Now I can see better. I need to read something to find the portal spell!",
                        unlocks: ['kitchen-portal']
                    },
                    { 
                        id: 'cast-portal-spell', 
                        title: 'Cast Portal Spell', 
                        description: 'Cast the portal spell to open the kitchen', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['portal-spell-cast'],
                        spell: 'open portal to kitchen',
                        hobbitDialogue: "Perfect! I found the portal spell! Now I can open the kitchen!"
                    },
                    { 
                        id: 'examine-vase', 
                        title: 'Examine Vase', 
                        description: 'Check the vase for hints about the next quest', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['vase-examine'],
                        objectCoords: { x: -4, y: 763 },
                        spell: 'examine',
                        hobbitDialogue: "The vase contains hints about the kitchen quest!"
                    }
                ],
                rewards: ['unlock-kitchen', 'magic-level-10'],
                dependencies: [],
                triggers: ['hobbit-interaction', 'lamp1-illuminate', 'lamp2-illuminate', 'fireplace-ignite', 'book-browse', 'portal-spell-cast', 'vase-examine'],
                status: 'active'
            },
            'act-2': {
                id: 'ancient-artifacts',
                title: 'Ancient Artifacts Discovery',
                description: 'Discover ancient magical artifacts hidden in the rooms',
                type: 'main',
                act: 2,
                steps: [
                    { 
                        id: 'discover-artifacts', 
                        title: 'Discover Artifacts', 
                        description: 'Find ancient artifacts in each room', 
                        room: 'kitchen', 
                        completed: false,
                        triggers: ['artifact-discovery']
                    },
                    { 
                        id: 'analyze-artifacts', 
                        title: 'Analyze Artifacts', 
                        description: 'Study the magical properties of discovered artifacts', 
                        room: 'library', 
                        completed: false,
                        triggers: ['artifact-analysis']
                    },
                    { 
                        id: 'restore-artifacts', 
                        title: 'Restore Artifacts', 
                        description: 'Restore the power of ancient artifacts', 
                        room: 'workshop', 
                        completed: false,
                        triggers: ['artifact-restoration']
                    },
                    { 
                        id: 'activate-artifacts', 
                        title: 'Activate Artifacts', 
                        description: 'Activate the restored artifacts', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['artifact-activation']
                    }
                ],
                rewards: ['unlock-workshop', 'spell-unlock-fireball'],
                dependencies: ['credentials-recovery'],
                triggers: ['artifact-discovery'],
                status: 'locked'
            },
            'act-3': {
                id: 'magic-system-restoration',
                title: 'Magic System Restoration',
                description: 'Restore the corrupted magic system',
                type: 'main',
                act: 3,
                steps: [
                    { 
                        id: 'diagnose-corruption', 
                        title: 'Diagnose Corruption', 
                        description: 'Identify the source of magic system corruption', 
                        room: 'library', 
                        completed: false,
                        triggers: ['corruption-diagnosis']
                    },
                    { 
                        id: 'gather-restoration-materials', 
                        title: 'Gather Materials', 
                        description: 'Collect materials needed for restoration', 
                        room: 'workshop', 
                        completed: false,
                        triggers: ['material-gathering']
                    },
                    { 
                        id: 'perform-restoration', 
                        title: 'Perform Restoration', 
                        description: 'Execute the magic system restoration ritual', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['restoration-ritual']
                    },
                    { 
                        id: 'test-restoration', 
                        title: 'Test Restoration', 
                        description: 'Verify the magic system is working properly', 
                        room: 'garden', 
                        completed: false,
                        triggers: ['restoration-test']
                    }
                ],
                rewards: ['unlock-library', 'gesture-unlock-spiral'],
                dependencies: ['ancient-artifacts'],
                triggers: ['magic-restoration'],
                status: 'locked'
            },
            'act-4': {
                id: 'portal-network-activation',
                title: 'Portal Network Activation',
                description: 'Activate the portal network between rooms',
                type: 'main',
                act: 4,
                steps: [
                    { 
                        id: 'locate-portals', 
                        title: 'Locate Portals', 
                        description: 'Find hidden portal locations in each room', 
                        room: 'bedroom', 
                        completed: false,
                        triggers: ['portal-discovery']
                    },
                    { 
                        id: 'activate-portals', 
                        title: 'Activate Portals', 
                        description: 'Activate the portal network', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['portal-activation']
                    },
                    { 
                        id: 'test-portals', 
                        title: 'Test Portals', 
                        description: 'Test portal functionality between rooms', 
                        room: 'garden', 
                        completed: false,
                        triggers: ['portal-testing']
                    },
                    { 
                        id: 'master-portals', 
                        title: 'Master Portals', 
                        description: 'Master the art of portal navigation', 
                        room: 'workshop', 
                        completed: false,
                        triggers: ['portal-mastery']
                    }
                ],
                rewards: ['unlock-bedroom', 'portal-mastery'],
                dependencies: ['magic-system-restoration'],
                triggers: ['portal-activation'],
                status: 'locked'
            },
            'act-5': {
                id: 'fantasy-os-mastery',
                title: 'Fantasy OS Mastery',
                description: 'Master the complete Fantasy OS system',
                type: 'main',
                act: 5,
                steps: [
                    { 
                        id: 'integrate-systems', 
                        title: 'Integrate Systems', 
                        description: 'Integrate all Fantasy OS systems', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['system-integration']
                    },
                    { 
                        id: 'master-magic', 
                        title: 'Master Magic', 
                        description: 'Achieve mastery over all magical abilities', 
                        room: 'library', 
                        completed: false,
                        triggers: ['magic-mastery']
                    },
                    { 
                        id: 'complete-journey', 
                        title: 'Complete Journey', 
                        description: 'Complete the Hobbit\'s journey', 
                        room: 'garden', 
                        completed: false,
                        triggers: ['journey-completion']
                    },
                    { 
                        id: 'become-master', 
                        title: 'Become Master', 
                        description: 'Achieve Fantasy OS Master status', 
                        room: 'living-room', 
                        completed: false,
                        triggers: ['master-achievement']
                    }
                ],
                rewards: ['unlock-garden', 'fantasy-os-master'],
                dependencies: ['portal-network-activation'],
                triggers: ['fantasy-os-mastery'],
                status: 'locked'
            }
        }
    }
};

/**
 * Room-Specific Questlines
 * Individual quests for each room that complement the main storyline
 */
const roomQuests = {
    'kitchen': {
        id: 'culinary-magic',
        title: 'Culinary Magic',
        description: 'Master the art of magical cooking and brewing',
        type: 'room',
        room: 'kitchen',
        steps: [
            { 
                id: 'discover-cauldron', 
                title: 'Discover Cauldron', 
                description: 'Find and interact with the magical cauldron', 
                room: 'kitchen', 
                completed: false,
                triggers: ['cauldron-interaction']
            },
            { 
                id: 'brew-healing-potion', 
                title: 'Brew Healing Potion', 
                description: 'Brew a healing potion using magical ingredients', 
                room: 'kitchen', 
                completed: false,
                triggers: ['potion-brewing']
            },
            { 
                id: 'create-magic-ingredients', 
                title: 'Create Magic Ingredients', 
                description: 'Create magical ingredients for advanced recipes', 
                room: 'kitchen', 
                completed: false,
                triggers: ['ingredient-creation']
            },
            { 
                id: 'master-culinary-spells', 
                title: 'Master Culinary Spells', 
                description: 'Learn and master culinary magic spells', 
                room: 'kitchen', 
                completed: false,
                triggers: ['culinary-spell-mastery']
            }
        ],
        rewards: ['cauldron-mastery', 'healing-potion-recipe'],
        dependencies: ['credentials-recovery'],
        triggers: ['cauldron-click', 'ingredient-collection'],
        status: 'locked'
    },
    'library': {
        id: 'knowledge-seeker',
        title: 'Knowledge Seeker',
        description: 'Uncover ancient knowledge and restore corrupted texts',
        type: 'room',
        room: 'library',
        steps: [
            { 
                id: 'find-corrupted-tome', 
                title: 'Find Corrupted Tome', 
                description: 'Locate a corrupted ancient tome', 
                room: 'library', 
                completed: false,
                triggers: ['book-interaction']
            },
            { 
                id: 'restore-ancient-text', 
                title: 'Restore Ancient Text', 
                description: 'Restore the corrupted text using magic', 
                room: 'library', 
                completed: false,
                triggers: ['text-restoration']
            },
            { 
                id: 'discover-spell-formulas', 
                title: 'Discover Spell Formulas', 
                description: 'Uncover ancient spell formulas', 
                room: 'library', 
                completed: false,
                triggers: ['formula-discovery']
            },
            { 
                id: 'master-knowledge-magic', 
                title: 'Master Knowledge Magic', 
                description: 'Master the art of knowledge magic', 
                room: 'library', 
                completed: false,
                triggers: ['knowledge-mastery']
            }
        ],
        rewards: ['spell-formula-unlock', 'knowledge-mastery'],
        dependencies: ['ancient-artifacts'],
        triggers: ['book-interaction', 'text-restoration'],
        status: 'locked'
    },
    'workshop': {
        id: 'master-craftsman',
        title: 'Master Craftsman',
        description: 'Craft magical tools and repair ancient artifacts',
        type: 'room',
        room: 'workshop',
        steps: [
            { 
                id: 'discover-crafting-tools', 
                title: 'Discover Crafting Tools', 
                description: 'Find and examine crafting tools', 
                room: 'workshop', 
                completed: false,
                triggers: ['tool-interaction']
            },
            { 
                id: 'repair-broken-artifacts', 
                title: 'Repair Broken Artifacts', 
                description: 'Repair broken magical artifacts', 
                room: 'workshop', 
                completed: false,
                triggers: ['artifact-repair']
            },
            { 
                id: 'craft-magic-tools', 
                title: 'Craft Magic Tools', 
                description: 'Craft new magical tools', 
                room: 'workshop', 
                completed: false,
                triggers: ['tool-crafting']
            },
            { 
                id: 'master-crafting-spells', 
                title: 'Master Crafting Spells', 
                description: 'Learn and master crafting magic', 
                room: 'workshop', 
                completed: false,
                triggers: ['crafting-spell-mastery']
            }
        ],
        rewards: ['crafting-mastery', 'magic-tool-unlock'],
        dependencies: ['magic-system-restoration'],
        triggers: ['tool-interaction', 'crafting-action'],
        status: 'locked'
    },
    'bedroom': {
        id: 'dream-walker',
        title: 'Dream Walker',
        description: 'Explore the realm of dreams and recover lost memories',
        type: 'room',
        room: 'bedroom',
        steps: [
            { 
                id: 'enter-dream-state', 
                title: 'Enter Dream State', 
                description: 'Enter the dream realm through meditation', 
                room: 'bedroom', 
                completed: false,
                triggers: ['sleep-interaction']
            },
            { 
                id: 'recover-lost-memories', 
                title: 'Recover Lost Memories', 
                description: 'Recover lost memories in the dream realm', 
                room: 'bedroom', 
                completed: false,
                triggers: ['memory-recovery']
            },
            { 
                id: 'navigate-dream-realm', 
                title: 'Navigate Dream Realm', 
                description: 'Learn to navigate the dream realm', 
                room: 'bedroom', 
                completed: false,
                triggers: ['dream-navigation']
            },
            { 
                id: 'master-dream-magic', 
                title: 'Master Dream Magic', 
                description: 'Master the art of dream magic', 
                room: 'bedroom', 
                completed: false,
                triggers: ['dream-magic-mastery']
            }
        ],
        rewards: ['dream-mastery', 'memory-restoration'],
        dependencies: ['portal-network-activation'],
        triggers: ['sleep-interaction', 'dream-navigation'],
        status: 'locked'
    },
    'garden': {
        id: 'natures-guardian',
        title: 'Nature\'s Guardian',
        description: 'Connect with nature and restore the garden\'s magic',
        type: 'room',
        room: 'garden',
        steps: [
            { 
                id: 'discover-garden-secrets', 
                title: 'Discover Garden Secrets', 
                description: 'Uncover the hidden secrets of the garden', 
                room: 'garden', 
                completed: false,
                triggers: ['garden-interaction']
            },
            { 
                id: 'restore-natural-magic', 
                title: 'Restore Natural Magic', 
                description: 'Restore the natural magic of the garden', 
                room: 'garden', 
                completed: false,
                triggers: ['nature-restoration']
            },
            { 
                id: 'connect-with-nature', 
                title: 'Connect with Nature', 
                description: 'Form a deep connection with nature', 
                room: 'garden', 
                completed: false,
                triggers: ['nature-connection']
            },
            { 
                id: 'master-nature-spells', 
                title: 'Master Nature Spells', 
                description: 'Master the art of nature magic', 
                room: 'garden', 
                completed: false,
                triggers: ['nature-spell-mastery']
            }
        ],
        rewards: ['nature-mastery', 'garden-magic-unlock'],
        dependencies: ['fantasy-os-mastery'],
        triggers: ['garden-interaction', 'nature-connection'],
        status: 'locked'
    }
};

/**
 * Achievement System
 * Achievements that can be earned through quest completion and exploration
 */
const achievements = {
    'first-quest': {
        id: 'first-quest',
        title: 'First Steps',
        description: 'Complete your first quest',
        type: 'quest',
        requirement: 'complete-quest',
        target: 1,
        reward: 'achievement-badge',
        icon: '🎯'
    },
    'room-explorer': {
        id: 'room-explorer',
        title: 'Room Explorer',
        description: 'Visit all rooms in the Fantasy OS',
        type: 'exploration',
        requirement: 'visit-rooms',
        target: 6,
        reward: 'explorer-badge',
        icon: '🏠'
    },
    'magic-master': {
        id: 'magic-master',
        title: 'Magic Master',
        description: 'Master all magical abilities',
        type: 'magic',
        requirement: 'master-magic',
        target: 10,
        reward: 'magic-badge',
        icon: '🔮'
    },
    'artifact-collector': {
        id: 'artifact-collector',
        title: 'Artifact Collector',
        description: 'Collect all ancient artifacts',
        type: 'collection',
        requirement: 'collect-artifacts',
        target: 5,
        reward: 'collector-badge',
        icon: '🏺'
    },
    'hobbit-companion': {
        id: 'hobbit-companion',
        title: 'Hobbit Companion',
        description: 'Become the Hobbit\'s trusted companion',
        type: 'companion',
        requirement: 'hobbit-trust',
        target: 100,
        reward: 'companion-badge',
        icon: '🧙‍♂️'
    }
};

/**
 * Quest Content Export
 * Main export object containing all quest content
 */
const questContent = {
    // Main questline
    ...Object.fromEntries(
        Object.entries(mainQuestline['hobbit-legacy'].acts).map(([key, act]) => [act.id, act])
    ),
    
    // Room quests
    ...roomQuests,
    
    // Achievements
    ...achievements
};

/**
 * Quest Triggers
 * Define what actions trigger quest progress
 */
const questTriggers = {
    'hobbit-interaction': {
        description: 'Interact with the Hobbit companion',
        action: 'click',
        target: '.hobbit-companion'
    },
    'fireplace-interaction': {
        description: 'Interact with the fireplace',
        action: 'click',
        target: '.fireplace'
    },
    'lamp-interaction': {
        description: 'Interact with the lamp',
        action: 'click',
        target: '.lamp'
    },
    'cauldron-interaction': {
        description: 'Interact with the cauldron',
        action: 'click',
        target: '.cauldron'
    },
    'book-interaction': {
        description: 'Interact with books',
        action: 'click',
        target: '.spell-book'
    },
    'crystal-ball-interaction': {
        description: 'Interact with the crystal ball',
        action: 'click',
        target: '.crystal-ball'
    },
    'tool-interaction': {
        description: 'Interact with tools',
        action: 'click',
        target: '.tool'
    },
    'bed-interaction': {
        description: 'Interact with the bed',
        action: 'click',
        target: '.bed'
    },
    'garden-interaction': {
        description: 'Interact with garden elements',
        action: 'click',
        target: '.garden-element'
    }
};

/**
 * Quest Rewards
 * Define what rewards are available
 */
const questRewards = {
    'unlock-kitchen': {
        type: 'room-unlock',
        description: 'Unlock the Kitchen room',
        effect: 'enable-room-navigation'
    },
    'unlock-workshop': {
        type: 'room-unlock',
        description: 'Unlock the Workshop room',
        effect: 'enable-room-navigation'
    },
    'unlock-library': {
        type: 'room-unlock',
        description: 'Unlock the Library room',
        effect: 'enable-room-navigation'
    },
    'unlock-bedroom': {
        type: 'room-unlock',
        description: 'Unlock the Bedroom room',
        effect: 'enable-room-navigation'
    },
    'unlock-garden': {
        type: 'room-unlock',
        description: 'Unlock the Garden room',
        effect: 'enable-room-navigation'
    },
    'magic-level-10': {
        type: 'magic-boost',
        description: 'Increase magic level by 10',
        effect: 'increase-magic-level'
    },
    'spell-unlock-fireball': {
        type: 'spell-unlock',
        description: 'Unlock Fireball spell',
        effect: 'add-spell'
    },
    'gesture-unlock-spiral': {
        type: 'gesture-unlock',
        description: 'Unlock Spiral gesture',
        effect: 'add-gesture'
    },
    'portal-mastery': {
        type: 'ability-unlock',
        description: 'Master portal navigation',
        effect: 'enable-portal-navigation'
    },
    'fantasy-os-master': {
        type: 'title-unlock',
        description: 'Achieve Fantasy OS Master status',
        effect: 'unlock-master-features'
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        questContent,
        mainQuestline,
        roomQuests,
        achievements,
        questTriggers,
        questRewards
    };
}
