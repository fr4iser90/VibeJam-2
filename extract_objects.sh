#!/bin/bash
# Fantasy OS - Object Extraction Script (Bash Version)
# Extracts interactive objects from room images using ImageMagick

BASE_PATH="/home/fr4iser/Documents/Git/VibeJam-2"
ROOMS_PATH="$BASE_PATH/assets/images/rooms"
OBJECTS_PATH="$BASE_PATH/assets/images/objects"

echo "🎨 Starting object extraction from room images..."

# Create object directories
mkdir -p "$OBJECTS_PATH/living-room"
mkdir -p "$OBJECTS_PATH/kitchen"
mkdir -p "$OBJECTS_PATH/library"
mkdir -p "$OBJECTS_PATH/workshop"
mkdir -p "$OBJECTS_PATH/bedroom"
mkdir -p "$OBJECTS_PATH/garden"

# Function to extract object
extract_object() {
    local room=$1
    local object=$2
    local x=$3
    local y=$4
    local width=$5
    local height=$6
    local is_dark=$7
    
    if [ "$is_dark" = "true" ]; then
        source_file="$ROOMS_PATH/${room}-dark.png"
        output_file="$OBJECTS_PATH/$room/${object}-dark.png"
    else
        source_file="$ROOMS_PATH/${room}.png"
        output_file="$OBJECTS_PATH/$room/${object}.png"
    fi
    
    if [ -f "$source_file" ]; then
        # Use ImageMagick to crop the object
        if command -v convert >/dev/null 2>&1; then
            convert "$source_file" -crop "${width}x${height}+${x}+${y}" "$output_file"
            echo "✓ Extracted $object from $room ($([ "$is_dark" = "true" ] && echo "dark" || echo "light") mode)"
        else
            echo "⚠️  ImageMagick not found, creating placeholder for $object"
            # Create a placeholder file
            echo "Placeholder for $object" > "$output_file"
        fi
    else
        echo "⚠️  Source file $source_file not found"
    fi
}

# Extract Living Room objects
echo "🏠 Processing living-room..."
extract_object "living-room" "fireplace" 50 200 200 300 false
extract_object "living-room" "wall-lamp" 100 150 80 120 false
extract_object "living-room" "bookshelf" 300 100 150 400 false
extract_object "living-room" "round-door" 600 150 200 300 false
extract_object "living-room" "armchair" 500 300 120 150 false
extract_object "living-room" "round-table" 450 400 100 80 false
extract_object "living-room" "table-lamp" 470 380 60 100 false

# Extract Living Room dark objects
if [ -f "$ROOMS_PATH/living-room-dark.png" ]; then
    extract_object "living-room" "fireplace" 50 200 200 300 true
    extract_object "living-room" "wall-lamp" 100 150 80 120 true
    extract_object "living-room" "bookshelf" 300 100 150 400 true
    extract_object "living-room" "round-door" 600 150 200 300 true
    extract_object "living-room" "armchair" 500 300 120 150 true
    extract_object "living-room" "round-table" 450 400 100 80 true
    extract_object "living-room" "table-lamp" 470 380 60 100 true
fi

# Extract Kitchen objects
echo "🍳 Processing kitchen..."
extract_object "kitchen" "fireplace" 50 200 200 300 false
extract_object "kitchen" "oil-lamp" 100 150 60 100 false
extract_object "kitchen" "shelves" 300 100 400 200 false
extract_object "kitchen" "hanging-pots" 350 300 300 100 false
extract_object "kitchen" "round-table" 200 400 150 120 false
extract_object "kitchen" "fruit-bowl" 220 420 80 60 false
extract_object "kitchen" "chairs" 150 450 250 100 false
extract_object "kitchen" "window" 400 150 120 150 false

# Extract Kitchen dark objects
if [ -f "$ROOMS_PATH/kitchen-dark.png" ]; then
    extract_object "kitchen" "fireplace" 50 200 200 300 true
    extract_object "kitchen" "oil-lamp" 100 150 60 100 true
    extract_object "kitchen" "shelves" 300 100 400 200 true
    extract_object "kitchen" "hanging-pots" 350 300 300 100 true
    extract_object "kitchen" "round-table" 200 400 150 120 true
    extract_object "kitchen" "fruit-bowl" 220 420 80 60 true
    extract_object "kitchen" "chairs" 150 450 250 100 true
    extract_object "kitchen" "window" 400 150 120 150 true
fi

# Extract Library objects
echo "📚 Processing library..."
extract_object "library" "left-bookshelf" 50 100 200 400 false
extract_object "library" "right-bookshelf" 600 100 150 400 false
extract_object "library" "armchair" 400 300 120 150 false
extract_object "library" "small-table" 350 400 100 80 false
extract_object "library" "oil-lamp" 370 380 60 100 false
extract_object "library" "round-window" 350 150 150 150 false
extract_object "library" "curtain" 300 150 50 200 false

# Extract Library dark objects
if [ -f "$ROOMS_PATH/library-dark.png" ]; then
    extract_object "library" "left-bookshelf" 50 100 200 400 true
    extract_object "library" "right-bookshelf" 600 100 150 400 true
    extract_object "library" "armchair" 400 300 120 150 true
    extract_object "library" "small-table" 350 400 100 80 true
    extract_object "library" "oil-lamp" 370 380 60 100 true
    extract_object "library" "round-window" 350 150 150 150 true
    extract_object "library" "curtain" 300 150 50 200 true
fi

# Extract Workshop objects
echo "🔨 Processing workshop..."
extract_object "workshop" "workbench-1" 100 350 200 100 false
extract_object "workshop" "workbench-2" 400 300 300 120 false
extract_object "workshop" "hanging-tools" 50 200 150 200 false
extract_object "workshop" "shelves" 300 100 400 150 false
extract_object "workshop" "wooden-crates" 200 400 100 80 false
extract_object "workshop" "stool" 150 450 60 60 false
extract_object "workshop" "wall-lantern-left" 50 150 80 120 false
extract_object "workshop" "wall-lantern-right" 700 150 80 120 false

# Extract Workshop dark objects
if [ -f "$ROOMS_PATH/workshop-dark.png" ]; then
    extract_object "workshop" "workbench-1" 100 350 200 100 true
    extract_object "workshop" "workbench-2" 400 300 300 120 true
    extract_object "workshop" "hanging-tools" 50 200 150 200 true
    extract_object "workshop" "shelves" 300 100 400 150 true
    extract_object "workshop" "wooden-crates" 200 400 100 80 true
    extract_object "workshop" "stool" 150 450 60 60 true
    extract_object "workshop" "wall-lantern-left" 50 150 80 120 true
    extract_object "workshop" "wall-lantern-right" 700 150 80 120 true
fi

# Extract Bedroom objects
echo "🛏️ Processing bedroom..."
extract_object "bedroom" "bed" 500 200 200 300 false
extract_object "bedroom" "nightstand" 450 250 80 100 false
extract_object "bedroom" "oil-lamp" 470 230 60 100 false
extract_object "bedroom" "round-window" 100 150 150 150 false
extract_object "bedroom" "curtains" 50 150 200 200 false
extract_object "bedroom" "small-table" 200 400 100 80 false

# Extract Garden objects
echo "🌿 Processing garden..."
extract_object "garden" "round-door" 200 300 200 300 false
extract_object "garden" "round-window-left" 100 250 80 80 false
extract_object "garden" "round-window-right" 400 250 80 80 false
extract_object "garden" "flowers-red" 50 200 100 150 false
extract_object "garden" "flowers-mixed" 150 400 200 100 false
extract_object "garden" "flowers-orange" 500 300 150 120 false
extract_object "garden" "wooden-fence" 300 200 300 80 false
extract_object "garden" "stone-path" 200 500 200 100 false
extract_object "garden" "large-tree" 600 100 200 300 false

echo "✨ Extraction complete!"
echo "📊 Objects extracted to: $OBJECTS_PATH"

# Create object manifest
cat > "$BASE_PATH/object_manifest.json" << EOF
{
  "extracted_objects": {
    "living-room": {
      "objects": ["fireplace", "wall-lamp", "bookshelf", "round-door", "armchair", "round-table", "table-lamp"],
      "object_count": 7,
      "has_dark_mode": true
    },
    "kitchen": {
      "objects": ["fireplace", "oil-lamp", "shelves", "hanging-pots", "round-table", "fruit-bowl", "chairs", "window"],
      "object_count": 8,
      "has_dark_mode": true
    },
    "library": {
      "objects": ["left-bookshelf", "right-bookshelf", "armchair", "small-table", "oil-lamp", "round-window", "curtain"],
      "object_count": 7,
      "has_dark_mode": true
    },
    "workshop": {
      "objects": ["workbench-1", "workbench-2", "hanging-tools", "shelves", "wooden-crates", "stool", "wall-lantern-left", "wall-lantern-right"],
      "object_count": 8,
      "has_dark_mode": true
    },
    "bedroom": {
      "objects": ["bed", "nightstand", "oil-lamp", "round-window", "curtains", "small-table"],
      "object_count": 6,
      "has_dark_mode": false
    },
    "garden": {
      "objects": ["round-door", "round-window-left", "round-window-right", "flowers-red", "flowers-mixed", "flowers-orange", "wooden-fence", "stone-path", "large-tree"],
      "object_count": 9,
      "has_dark_mode": false
    }
  },
  "extraction_date": "2024-12-19",
  "total_rooms": 6
}
EOF

echo "📋 Object manifest saved to $BASE_PATH/object_manifest.json"
echo "🎉 Object extraction completed successfully!"
