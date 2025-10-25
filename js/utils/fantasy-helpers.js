/**
 * Fantasy OS - Fantasy Helper Utilities
 * Fantasy-specific utility functions and helpers
 * Created: 2025-10-25T12:07:56.000Z
 */

class FantasyHelpers {
    /**
     * Generate random fantasy name
     */
    static generateFantasyName(type = 'character') {
        const prefixes = {
            character: ['Ael', 'Bren', 'Cael', 'Dain', 'Elen', 'Fael', 'Gwen', 'Hael', 'Iris', 'Jael'],
            place: ['Silver', 'Golden', 'Crystal', 'Mystic', 'Ancient', 'Sacred', 'Hidden', 'Lost', 'Forgotten', 'Eternal'],
            item: ['Mystic', 'Ancient', 'Sacred', 'Golden', 'Silver', 'Crystal', 'Enchanted', 'Blessed', 'Cursed', 'Legendary']
        };
        
        const suffixes = {
            character: ['wyn', 'ara', 'eth', 'ion', 'ara', 'wyn', 'eth', 'ion', 'ara', 'wyn'],
            place: ['wood', 'vale', 'peak', 'spring', 'grove', 'hill', 'dale', 'brook', 'ridge', 'moor'],
            item: ['blade', 'staff', 'crown', 'ring', 'amulet', 'crystal', 'orb', 'tome', 'scroll', 'potion']
        };
        
        const prefixList = prefixes[type] || prefixes.character;
        const suffixList = suffixes[type] || suffixes.character;
        
        const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];
        const suffix = suffixList[Math.floor(Math.random() * suffixList.length)];
        
        return prefix + suffix;
    }
    
    /**
     * Generate fantasy color
     */
    static generateFantasyColor() {
        const colors = [
            '#D4AF37', '#FF8C00', '#DC143C', '#4169E1', '#C0C0C0',
            '#8B4513', '#228B22', '#F5DEB3', '#9370DB', '#FF69B4',
            '#00CED1', '#4B0082', '#50C878', '#B87333', '#FFBF00'
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    /**
     * Generate magical effect description
     */
    static generateMagicalEffect() {
        const effects = [
            'sparkles with golden light',
            'shimmers with mystical energy',
            'glows with inner fire',
            'pulses with magical power',
            'radiates ethereal beauty',
            'dances with spectral flames',
            'shines with celestial brilliance',
            'shimmers like starlight',
            'glows with ancient wisdom',
            'sparkles with enchanted magic'
        ];
        
        return effects[Math.floor(Math.random() * effects.length)];
    }
    
    /**
     * Generate spell incantation
     */
    static generateSpellIncantation() {
        const words = [
            'Luminous', 'Mystical', 'Ancient', 'Sacred', 'Eternal',
            'Crystal', 'Golden', 'Silver', 'Starlight', 'Moonbeam',
            'Power', 'Wisdom', 'Strength', 'Protection', 'Healing',
            'Reveal', 'Conceal', 'Transform', 'Illuminate', 'Enchant'
        ];
        
        const word1 = words[Math.floor(Math.random() * words.length)];
        const word2 = words[Math.floor(Math.random() * words.length)];
        
        return `${word1} ${word2}`;
    }
    
    /**
     * Generate fantasy quote
     */
    static generateFantasyQuote() {
        const quotes = [
            "Magic flows through all things, waiting to be awakened.",
            "In the realm of fantasy, anything is possible.",
            "The greatest magic is the magic of imagination.",
            "Ancient wisdom speaks through the ages.",
            "Mystical forces guide those who believe.",
            "The power of dreams can shape reality.",
            "In darkness, light finds its greatest strength.",
            "The heart of magic beats in every soul.",
            "Fantasy is the bridge between worlds.",
            "Magic is not about power, but about wonder."
        ];
        
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    
    /**
     * Format time in fantasy style
     */
    static formatFantasyTime(date = new Date()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        const periods = [
            'Dawn', 'Morning', 'Midday', 'Afternoon', 'Evening', 'Twilight', 'Night', 'Midnight'
        ];
        
        const periodIndex = Math.floor(hours / 3);
        const period = periods[periodIndex];
        
        const hourNames = [
            'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth',
            'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'
        ];
        
        const fantasyHour = hourNames[hours % 12];
        
        return `${period} of the ${fantasyHour} Hour`;
    }
    
    /**
     * Generate magical number
     */
    static generateMagicalNumber(min = 1, max = 100) {
        const baseNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Add magical properties
        const magicalMultipliers = [1, 3, 7, 13, 21];
        const multiplier = magicalMultipliers[Math.floor(Math.random() * magicalMultipliers.length)];
        
        return baseNumber * multiplier;
    }
    
    /**
     * Create fantasy gradient
     */
    static createFantasyGradient(color1, color2, direction = '45deg') {
        return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
    }
    
    /**
     * Generate room description
     */
    static generateRoomDescription(roomType) {
        const descriptions = {
            'living-room': 'A cozy hearth where warmth and comfort embrace all who enter.',
            'kitchen': 'A bustling culinary realm where flavors dance and aromas enchant.',
            'bedroom': 'A peaceful sanctuary where dreams take flight and rest is restored.',
            'workshop': 'A creative forge where imagination meets craftsmanship.',
            'library': 'A repository of ancient wisdom and endless knowledge.',
            'garden': 'A verdant paradise where nature\'s magic blooms eternal.'
        };
        
        return descriptions[roomType] || 'A mystical chamber filled with wonder and possibility.';
    }
    
    /**
     * Generate object description
     */
    static generateObjectDescription(objectType) {
        const descriptions = {
            'fireplace': 'A crackling hearth that brings warmth and light to the darkest corners.',
            'lamp': 'A luminous beacon that banishes shadows and illuminates the path ahead.',
            'chest': 'A sturdy repository that safeguards treasures and secrets alike.',
            'crystal-ball': 'A mystical orb that reveals visions of distant realms.',
            'spell-book': 'An ancient tome containing the wisdom of ages past.',
            'cauldron': 'A bubbling vessel where magical brews and potions are born.'
        };
        
        return descriptions[objectType] || 'A mysterious artifact pulsing with hidden power.';
    }
    
    /**
     * Generate spell description
     */
    static generateSpellDescription(spellName) {
        const descriptions = {
            'ignite fireplace': 'Summons flames of pure magic to warm the hearth.',
            'summon light': 'Calls forth radiant illumination to banish darkness.',
            'open portal': 'Creates a gateway between realms of existence.',
            'store treasure': 'Secures precious items within magical protection.',
            'cast protection': 'Weaves a shield of mystical energy around the caster.',
            'brew potion': 'Combines magical ingredients to create powerful elixirs.'
        };
        
        return descriptions[spellName] || 'A mysterious incantation that channels ancient power.';
    }
    
    /**
     * Generate magical sound effect name
     */
    static generateMagicalSound() {
        const sounds = [
            'ethereal chime', 'mystical chime', 'celestial bell', 'magical sparkle',
            'enchanted whisper', 'mystical whoosh', 'magical pop', 'ethereal hum',
            'celestial chime', 'mystical tinkle', 'magical ding', 'enchanted chime'
        ];
        
        return sounds[Math.floor(Math.random() * sounds.length)];
    }
    
    /**
     * Generate particle effect name
     */
    static generateParticleEffect() {
        const effects = [
            'sparkle burst', 'magical shimmer', 'ethereal glow', 'mystical swirl',
            'celestial sparkle', 'enchanted dust', 'magical glitter', 'mystical aura',
            'ethereal mist', 'celestial radiance', 'magical ember', 'enchanted sparkle'
        ];
        
        return effects[Math.floor(Math.random() * effects.length)];
    }
    
    /**
     * Generate fantasy weather
     */
    static generateFantasyWeather() {
        const weather = [
            'Mystical mist swirls through the air',
            'Golden sunlight filters through enchanted clouds',
            'Silver moonlight bathes everything in ethereal glow',
            'Magical rain falls in sparkling droplets',
            'Aurora lights dance across the sky',
            'Crystal snowflakes drift gently down',
            'Mystical winds carry whispers of ancient magic',
            'Starlight twinkles in the velvet darkness'
        ];
        
        return weather[Math.floor(Math.random() * weather.length)];
    }
    
    /**
     * Generate magical item name
     */
    static generateMagicalItemName() {
        const adjectives = [
            'Ancient', 'Mystical', 'Sacred', 'Enchanted', 'Blessed',
            'Cursed', 'Legendary', 'Eternal', 'Divine', 'Celestial'
        ];
        
        const items = [
            'Sword', 'Staff', 'Crown', 'Ring', 'Amulet', 'Crystal',
            'Orb', 'Tome', 'Scroll', 'Potion', 'Wand', 'Chalice'
        ];
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const item = items[Math.floor(Math.random() * items.length)];
        
        return `${adjective} ${item}`;
    }
    
    /**
     * Generate fantasy creature name
     */
    static generateFantasyCreature() {
        const creatures = [
            'Dragon', 'Phoenix', 'Unicorn', 'Griffin', 'Pegasus',
            'Fairy', 'Elf', 'Dwarf', 'Wizard', 'Sorceress',
            'Knight', 'Princess', 'Prince', 'Mage', 'Enchanter'
        ];
        
        return creatures[Math.floor(Math.random() * creatures.length)];
    }
    
    /**
     * Generate magical realm name
     */
    static generateMagicalRealm() {
        const realms = [
            'Crystal Kingdom', 'Golden Valley', 'Silver Forest', 'Mystic Mountains',
            'Enchanted Garden', 'Celestial Realm', 'Ethereal Plains', 'Sacred Grove',
            'Ancient Citadel', 'Mystical Isle', 'Divine Sanctuary', 'Legendary Realm'
        ];
        
        return realms[Math.floor(Math.random() * realms.length)];
    }
    
    /**
     * Generate spell component
     */
    static generateSpellComponent() {
        const components = [
            'Eye of newt', 'Dragon scale', 'Phoenix feather', 'Unicorn hair',
            'Crystal shard', 'Moonstone', 'Stardust', 'Mystic herb',
            'Ancient rune', 'Sacred water', 'Ethereal essence', 'Magical gem'
        ];
        
        return components[Math.floor(Math.random() * components.length)];
    }
    
    /**
     * Generate magical incantation
     */
    static generateMagicalIncantation() {
        const words = [
            'Abracadabra', 'Hocus Pocus', 'Alakazam', 'Open Sesame',
            'Bibbidi Bobbidi Boo', 'Shazam', 'Expelliarmus', 'Lumos',
            'Wingardium Leviosa', 'Expecto Patronum', 'Accio', 'Protego'
        ];
        
        return words[Math.floor(Math.random() * words.length)];
    }
    
    /**
     * Generate fantasy achievement
     */
    static generateFantasyAchievement() {
        const achievements = [
            'Master of Mystical Arts', 'Keeper of Ancient Wisdom', 'Guardian of Sacred Secrets',
            'Champion of Light', 'Defender of Magic', 'Explorer of Ethereal Realms',
            'Creator of Wonder', 'Bearer of Legendary Power', 'Seeker of Truth',
            'Protector of Dreams', 'Weaver of Spells', 'Herald of Magic'
        ];
        
        return achievements[Math.floor(Math.random() * achievements.length)];
    }
    
    /**
     * Generate magical potion name
     */
    static generateMagicalPotion() {
        const potions = [
            'Elixir of Eternal Youth', 'Potion of Invisibility', 'Brew of Strength',
            'Tincture of Wisdom', 'Draught of Healing', 'Concoction of Luck',
            'Philter of Love', 'Mixture of Courage', 'Solution of Clarity',
            'Essence of Power', 'Liquid of Dreams', 'Serum of Magic'
        ];
        
        return potions[Math.floor(Math.random() * potions.length)];
    }
    
    /**
     * Generate fantasy curse
     */
    static generateFantasyCurse() {
        const curses = [
            'Curse of Eternal Sleep', 'Curse of Petrification', 'Curse of Transformation',
            'Curse of Silence', 'Curse of Blindness', 'Curse of Weakness',
            'Curse of Misfortune', 'Curse of Isolation', 'Curse of Forgetfulness',
            'Curse of Aging', 'Curse of Shadows', 'Curse of Chaos'
        ];
        
        return curses[Math.floor(Math.random() * curses.length)];
    }
    
    /**
     * Generate magical blessing
     */
    static generateMagicalBlessing() {
        const blessings = [
            'Blessing of Protection', 'Blessing of Healing', 'Blessing of Strength',
            'Blessing of Wisdom', 'Blessing of Courage', 'Blessing of Luck',
            'Blessing of Love', 'Blessing of Peace', 'Blessing of Prosperity',
            'Blessing of Longevity', 'Blessing of Clarity', 'Blessing of Magic'
        ];
        
        return blessings[Math.floor(Math.random() * blessings.length)];
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FantasyHelpers;
}
