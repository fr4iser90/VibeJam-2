#!/bin/bash

# 🎵 Fantasy Sound Download Script für VibeJam-2
# Dieses Script lädt echte Fantasy-Sounds von verschiedenen Quellen herunter

echo "🎵 Fantasy Sound Downloader für VibeJam-2"
echo "=========================================="

# Erstelle Verzeichnisse falls sie nicht existieren
mkdir -p assets/sounds/actions
mkdir -p assets/sounds/ambient

# Funktion zum Download mit curl
download_sound() {
    local url="$1"
    local filename="$2"
    local description="$3"
    
    echo "📥 Lade herunter: $description"
    echo "   URL: $url"
    echo "   Datei: $filename"
    
    if curl -L -o "$filename" "$url" 2>/dev/null; then
        echo "✅ Erfolgreich: $filename"
        echo ""
    else
        echo "❌ Fehler beim Download: $filename"
        echo ""
    fi
}

# Funktion zum Download mit wget
download_sound_wget() {
    local url="$1"
    local filename="$2"
    local description="$3"
    
    echo "📥 Lade herunter: $description"
    echo "   URL: $url"
    echo "   Datei: $filename"
    
    if wget -O "$filename" "$url" 2>/dev/null; then
        echo "✅ Erfolgreich: $filename"
        echo ""
    else
        echo "❌ Fehler beim Download: $filename"
        echo ""
    fi
}

echo ""
echo "🎯 Option 1: OpenGameArt.org (Direkte Downloads)"
echo "================================================"

# OpenGameArt Fantasy Sound Effects Library
# Diese URLs sind Beispiele - Sie müssen die aktuellen URLs von der Website holen
echo "📋 Beispiel-Downloads von OpenGameArt.org:"
echo "   Gehen Sie zu: https://opengameart.org/content/fantasy-sound-effects-library"
echo "   Klicken Sie auf 'Download' für die gewünschten Sounds"
echo ""

# Beispiel für direkte Downloads (URLs müssen aktualisiert werden)
# download_sound "https://opengameart.org/sites/default/files/dragon_roar_0.mp3" "assets/sounds/actions/dragon-roar.mp3" "Dragon Roar"
# download_sound "https://opengameart.org/sites/default/files/magic_spell_0.mp3" "assets/sounds/actions/spell-cast.mp3" "Magic Spell"

echo ""
echo "🎯 Option 2: Pixabay (Kostenlose Sounds)"
echo "========================================="

# Pixabay Beispiel-URLs (müssen aktualisiert werden)
echo "📋 Beispiel-Downloads von Pixabay:"
echo "   Gehen Sie zu: https://pixabay.com/sound-effects/search/fantasy/"
echo "   Wählen Sie Sounds aus und kopieren Sie die Download-URLs"
echo ""

# Beispiel für Pixabay Downloads
# download_sound "https://cdn.pixabay.com/download/audio/2021/08/09/audio_bb630cc098.mp3" "assets/sounds/ambient/fantasy-ambient.mp3" "Fantasy Ambient"

echo ""
echo "🎯 Option 3: Freesound.org (Manuelle Downloads)"
echo "==============================================="

echo "📋 Anleitung für Freesound.org:"
echo "   1. Gehen Sie zu: https://freesound.org"
echo "   2. Registrieren Sie sich kostenlos"
echo "   3. Suchen Sie nach: 'fantasy', 'magical', 'cozy'"
echo "   4. Filtern Sie nach 'Creative Commons'"
echo "   5. Laden Sie MP3-Dateien herunter"
echo ""

echo "🔍 Empfohlene Suchbegriffe für Freesound:"
echo "   - 'fireplace crackling'"
echo "   - 'magical sparkle'"
echo "   - 'spell cast'"
echo "   - 'portal open'"
echo "   - 'chest open'"
echo "   - 'book page turn'"
echo "   - 'crystal ball'"
echo "   - 'cauldron bubble'"
echo ""

echo "🎯 Option 4: Zapsplat.com (Professionelle Qualität)"
echo "==================================================="

echo "📋 Anleitung für Zapsplat.com:"
echo "   1. Gehen Sie zu: https://zapsplat.com"
echo "   2. Registrieren Sie sich kostenlos"
echo "   3. Suchen Sie nach: 'fantasy', 'magical', 'medieval'"
echo "   4. Laden Sie MP3-Dateien herunter"
echo ""

echo "🎯 Option 5: BBC Sound Effects (Professionell)"
echo "=============================================="

echo "📋 Anleitung für BBC Sound Effects:"
echo "   1. Gehen Sie zu: https://sound-effects.bbcrewind.co.uk"
echo "   2. Suchen Sie nach: 'fire', 'ambient', 'nature'"
echo "   3. Laden Sie MP3-Dateien herunter"
echo ""

echo "🎯 Option 6: Tabletop Audio (Ambient Sounds)"
echo "============================================="

echo "📋 Anleitung für Tabletop Audio:"
echo "   1. Gehen Sie zu: https://tabletopaudio.com"
echo "   2. Suchen Sie nach: 'fantasy', 'cozy', 'magical'"
echo "   3. Laden Sie MP3-Dateien herunter"
echo ""

echo "📝 Manuelle Download-Anleitung:"
echo "==============================="
echo ""
echo "1. Öffnen Sie die gewünschte Website"
echo "2. Suchen Sie nach den Sounds"
echo "3. Kopieren Sie die Download-URL"
echo "4. Verwenden Sie einen dieser Befehle:"
echo ""
echo "   # Mit curl:"
echo "   curl -L -o 'assets/sounds/actions/spell-cast.mp3' 'URL_HIER'"
echo ""
echo "   # Mit wget:"
echo "   wget -O 'assets/sounds/actions/spell-cast.mp3' 'URL_HIER'"
echo ""

echo "🎵 Sound-Organisation:"
echo "====================="
echo ""
echo "Legen Sie die Sounds in diese Verzeichnisse:"
echo "   actions/     - Kurze Sound-Effekte (1-3 Sekunden)"
echo "   ambient/     - Lange Ambient-Sounds (30+ Sekunden)"
echo ""

echo "📋 Benötigte Sounds für VibeJam-2:"
echo "=================================="
echo ""
echo "Actions (1-3 Sekunden):"
echo "  - book-open.mp3"
echo "  - cauldron-bubble.mp3"
echo "  - chest-open.mp3"
echo "  - crystal-ball.mp3"
echo "  - fireplace-ignite.mp3"
echo "  - gesture-recognized.mp3"
echo "  - lamp-on.mp3"
echo "  - magic-fail.mp3"
echo "  - magic-success.mp3"
echo "  - object-click.mp3"
echo "  - room-change.mp3"
echo "  - spell-cast.mp3"
echo ""
echo "Ambient (30+ Sekunden):"
echo "  - fireplace.mp3"
echo ""

echo "🎯 Schnellstart-Empfehlung:"
echo "=========================="
echo ""
echo "1. Starten Sie mit OpenGameArt.org (keine Registrierung nötig)"
echo "2. Laden Sie 2-3 Sounds herunter"
echo "3. Testen Sie sie in Ihrem Projekt"
echo "4. Erweitern Sie mit Freesound.org für mehr Vielfalt"
echo ""

echo "✅ Script beendet!"
echo "   Verwenden Sie die obigen Anleitungen, um echte Fantasy-Sounds herunterzuladen."
