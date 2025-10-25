# 🏰 Fantasy OS - Objekt-Übersicht

## 🏠 Living Room (living-room.png)
**Koordinaten-basierte Klickbereiche:**

1. **Fireplace (Kamin)** - `x: 150, y: 250, width: 200, height: 300`
   - **Aktion:** `ignite` - Zündet Feuer an/löscht es
   - **Effekt:** Wechselt automatisch zu Dark Mode
   - **Sound:** `fireplace-ignite`

2. **Lamp (Lampe)** - `x: 140, y: 210, width: 60, height: 100`
   - **Aktion:** `illuminate` - Schaltet Licht an/aus
   - **Effekt:** Wechselt automatisch zu Dark Mode
   - **Sound:** `lamp-on`

3. **Chest (Truhe)** - `x: 400, y: 300, width: 120, height: 100`
   - **Aktion:** `open` - Öffnet Datei-Manager
   - **Effekt:** File Manager Interface
   - **Sound:** `chest-open`

4. **Crystal Ball (Kristallkugel)** - `x: 500, y: 200, width: 80, height: 100`
   - **Aktion:** `gaze` - Zeigt System-Informationen
   - **Effekt:** System Monitor Interface
   - **Sound:** `crystal-ball`

5. **Spell Book (Zauberbuch)** - `x: 300, y: 150, width: 100, height: 120`
   - **Aktion:** `read` - Öffnet Dokumentation
   - **Effekt:** Documentation Interface
   - **Sound:** `book-open`

6. **Cauldron (Kessel)** - `x: 200, y: 400, width: 100, height: 120`
   - **Aktion:** `brew` - Download Manager
   - **Effekt:** Download Interface
   - **Sound:** `cauldron-bubble`

## 🍳 Kitchen (kitchen.png)
**Definierte Objekte:**

1. **Kitchen Fireplace** - `x: 50, y: 200, width: 200, height: 300`
2. **Oil Lamp** - `x: 100, y: 150, width: 60, height: 100`
3. **Kitchen Shelves** - `x: 300, y: 100, width: 400, height: 200`
4. **Hanging Pots** - `x: 350, y: 300, width: 300, height: 100`
5. **Kitchen Table** - `x: 200, y: 400, width: 150, height: 120`
6. **Fruit Bowl** - `x: 250, y: 450, width: 80, height: 60`

## 📚 Library (library.png)
**Definierte Objekte:**

1. **Library Fireplace** - `x: 50, y: 200, width: 200, height: 300`
2. **Reading Lamp** - `x: 300, y: 150, width: 60, height: 100`
3. **Bookshelves** - `x: 400, y: 100, width: 300, height: 400`
4. **Reading Chair** - `x: 200, y: 300, width: 120, height: 150`
5. **Study Desk** - `x: 150, y: 400, width: 200, height: 100`
6. **Ancient Tome** - `x: 180, y: 420, width: 80, height: 60`

## 🔨 Workshop (workshop.png)
**Definierte Objekte:**

1. **Workshop Fireplace** - `x: 50, y: 200, width: 200, height: 300`
2. **Work Lamp** - `x: 300, y: 150, width: 60, height: 100`
3. **Tool Rack** - `x: 400, y: 100, width: 200, height: 300`
4. **Workbench** - `x: 200, y: 300, width: 300, height: 150`
5. **Anvil** - `x: 250, y: 400, width: 100, height: 80`
6. **Forge** - `x: 100, y: 350, width: 150, height: 100`

## 🛏️ Bedroom (bedroom.png)
**Definierte Objekte:**

1. **Bed** - `x: 200, y: 300, width: 200, height: 150`
2. **Nightstand** - `x: 150, y: 250, width: 80, height: 100`
3. **Bedside Lamp** - `x: 170, y: 200, width: 40, height: 60`
4. **Wardrobe** - `x: 400, y: 200, width: 150, height: 200`
5. **Window** - `x: 50, y: 100, width: 200, height: 300`
6. **Mirror** - `x: 450, y: 150, width: 100, height: 150`

## 🌿 Garden (garden.png)
**Definierte Objekte:**

1. **Fountain** - `x: 300, y: 200, width: 150, height: 150`
2. **Garden Bench** - `x: 150, y: 300, width: 120, height: 80`
3. **Flower Beds** - `x: 100, y: 400, width: 400, height: 100`
4. **Garden Shed** - `x: 500, y: 300, width: 150, height: 200`
5. **Bird Bath** - `x: 200, y: 250, width: 80, height: 60`
6. **Garden Path** - `x: 250, y: 350, width: 200, height: 50`

## 🎯 Was passiert beim Klicken:

### **Living Room Objekte:**
- **Fireplace:** Wechselt Dark Mode, zeigt Feuer-Animation
- **Lamp:** Wechselt Dark Mode, zeigt Licht-Animation  
- **Chest:** Öffnet File Manager (geplant)
- **Crystal Ball:** Zeigt System Monitor (geplant)
- **Spell Book:** Öffnet Dokumentation (geplant)
- **Cauldron:** Öffnet Download Manager (geplant)

### **Andere Räume:**
- **Kitchen:** Koch-Utilities (geplant)
- **Library:** Lese-Interface (geplant)
- **Workshop:** Werkzeug-Interface (geplant)
- **Bedroom:** Ruhe-Modus (geplant)
- **Garden:** Entspannungs-Modus (geplant)

## 🔧 Aktueller Status:
- ✅ **Klick-Erkennung:** Funktioniert
- ✅ **Hover-Effekte:** Funktioniert
- ✅ **Sound-Effekte:** Funktioniert
- ⚠️ **Interface-Öffnung:** Noch nicht implementiert
- ⚠️ **Dark Mode:** Teilweise implementiert
