#!/usr/bin/env python3
"""
Fantasy OS - Object Extraction Script
Extracts interactive objects from room images and saves them as separate files
"""

import os
from PIL import Image, ImageDraw
import json

class ObjectExtractor:
    def __init__(self, base_path="/home/fr4iser/Documents/Git/VibeJam-2"):
        self.base_path = base_path
        self.rooms_path = os.path.join(base_path, "assets/images/rooms")
        self.objects_path = os.path.join(base_path, "assets/images/objects")
        
        # Define object extraction coordinates for each room
        self.object_definitions = {
            "living-room": {
                "fireplace": {"x": 50, "y": 200, "width": 200, "height": 300},
                "wall-lamp": {"x": 100, "y": 150, "width": 80, "height": 120},
                "bookshelf": {"x": 300, "y": 100, "width": 150, "height": 400},
                "round-door": {"x": 600, "y": 150, "width": 200, "height": 300},
                "armchair": {"x": 500, "y": 300, "width": 120, "height": 150},
                "round-table": {"x": 450, "y": 400, "width": 100, "height": 80},
                "table-lamp": {"x": 470, "y": 380, "width": 60, "height": 100}
            },
            "kitchen": {
                "fireplace": {"x": 50, "y": 200, "width": 200, "height": 300},
                "oil-lamp": {"x": 100, "y": 150, "width": 60, "height": 100},
                "shelves": {"x": 300, "y": 100, "width": 400, "height": 200},
                "hanging-pots": {"x": 350, "y": 300, "width": 300, "height": 100},
                "round-table": {"x": 200, "y": 400, "width": 150, "height": 120},
                "fruit-bowl": {"x": 220, "y": 420, "width": 80, "height": 60},
                "chairs": {"x": 150, "y": 450, "width": 250, "height": 100},
                "window": {"x": 400, "y": 150, "width": 120, "height": 150}
            },
            "library": {
                "left-bookshelf": {"x": 50, "y": 100, "width": 200, "height": 400},
                "right-bookshelf": {"x": 600, "y": 100, "width": 150, "height": 400},
                "armchair": {"x": 400, "y": 300, "width": 120, "height": 150},
                "small-table": {"x": 350, "y": 400, "width": 100, "height": 80},
                "oil-lamp": {"x": 370, "y": 380, "width": 60, "height": 100},
                "round-window": {"x": 350, "y": 150, "width": 150, "height": 150},
                "curtain": {"x": 300, "y": 150, "width": 50, "height": 200}
            },
            "workshop": {
                "workbench-1": {"x": 100, "y": 350, "width": 200, "height": 100},
                "workbench-2": {"x": 400, "y": 300, "width": 300, "height": 120},
                "hanging-tools": {"x": 50, "y": 200, "width": 150, "height": 200},
                "shelves": {"x": 300, "y": 100, "width": 400, "height": 150},
                "wooden-crates": {"x": 200, "y": 400, "width": 100, "height": 80},
                "stool": {"x": 150, "y": 450, "width": 60, "height": 60},
                "wall-lantern-left": {"x": 50, "y": 150, "width": 80, "height": 120},
                "wall-lantern-right": {"x": 700, "y": 150, "width": 80, "height": 120}
            },
            "bedroom": {
                "bed": {"x": 500, "y": 200, "width": 200, "height": 300},
                "nightstand": {"x": 450, "y": 250, "width": 80, "height": 100},
                "oil-lamp": {"x": 470, "y": 230, "width": 60, "height": 100},
                "round-window": {"x": 100, "y": 150, "width": 150, "height": 150},
                "curtains": {"x": 50, "y": 150, "width": 200, "height": 200},
                "small-table": {"x": 200, "y": 400, "width": 100, "height": 80}
            },
            "garden": {
                "round-door": {"x": 200, "y": 300, "width": 200, "height": 300},
                "round-window-left": {"x": 100, "y": 250, "width": 80, "height": 80},
                "round-window-right": {"x": 400, "y": 250, "width": 80, "height": 80},
                "flowers-red": {"x": 50, "y": 200, "width": 100, "height": 150},
                "flowers-mixed": {"x": 150, "y": 400, "width": 200, "height": 100},
                "flowers-orange": {"x": 500, "y": 300, "width": 150, "height": 120},
                "wooden-fence": {"x": 300, "y": 200, "width": 300, "height": 80},
                "stone-path": {"x": 200, "y": 500, "width": 200, "height": 100},
                "large-tree": {"x": 600, "y": 100, "width": 200, "height": 300}
            }
        }
    
    def extract_object(self, room_name, object_name, coords, is_dark=False):
        """Extract a single object from a room image"""
        try:
            # Determine image file
            if is_dark:
                image_file = f"{room_name}-dark.png"
            else:
                image_file = f"{room_name}.png"
            
            image_path = os.path.join(self.rooms_path, image_file)
            
            if not os.path.exists(image_path):
                print(f"Warning: {image_path} not found")
                return False
            
            # Open image
            with Image.open(image_path) as img:
                # Extract object area
                x, y, width, height = coords["x"], coords["y"], coords["width"], coords["height"]
                
                # Ensure coordinates are within image bounds
                x = max(0, min(x, img.width - width))
                y = max(0, min(y, img.height - height))
                width = min(width, img.width - x)
                height = min(height, img.height - y)
                
                # Crop the object
                object_img = img.crop((x, y, x + width, y + height))
                
                # Create output directory
                output_dir = os.path.join(self.objects_path, room_name)
                os.makedirs(output_dir, exist_ok=True)
                
                # Save object
                object_filename = f"{object_name}.png"
                if is_dark:
                    object_filename = f"{object_name}-dark.png"
                
                output_path = os.path.join(output_dir, object_filename)
                object_img.save(output_path)
                
                print(f"✓ Extracted {object_name} from {room_name} ({'dark' if is_dark else 'light'} mode)")
                return True
                
        except Exception as e:
            print(f"Error extracting {object_name} from {room_name}: {e}")
            return False
    
    def extract_all_objects(self):
        """Extract all objects from all rooms"""
        print("🎨 Starting object extraction from room images...")
        
        total_objects = 0
        successful_extractions = 0
        
        for room_name, objects in self.object_definitions.items():
            print(f"\n🏠 Processing {room_name}...")
            
            for object_name, coords in objects.items():
                # Extract light mode
                if self.extract_object(room_name, object_name, coords, is_dark=False):
                    successful_extractions += 1
                total_objects += 1
                
                # Extract dark mode if dark image exists
                dark_image_path = os.path.join(self.rooms_path, f"{room_name}-dark.png")
                if os.path.exists(dark_image_path):
                    if self.extract_object(room_name, object_name, coords, is_dark=True):
                        successful_extractions += 1
                    total_objects += 1
        
        print(f"\n✨ Extraction complete!")
        print(f"📊 Successfully extracted {successful_extractions}/{total_objects} objects")
        
        return successful_extractions, total_objects
    
    def create_object_manifest(self):
        """Create a JSON manifest of all extracted objects"""
        manifest = {
            "extracted_objects": {},
            "extraction_date": "2024-12-19",
            "total_rooms": len(self.object_definitions)
        }
        
        for room_name, objects in self.object_definitions.items():
            manifest["extracted_objects"][room_name] = {
                "objects": list(objects.keys()),
                "object_count": len(objects),
                "has_dark_mode": os.path.exists(os.path.join(self.rooms_path, f"{room_name}-dark.png"))
            }
        
        manifest_path = os.path.join(self.base_path, "object_manifest.json")
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        print(f"📋 Object manifest saved to {manifest_path}")
        return manifest

def main():
    extractor = ObjectExtractor()
    
    # Extract all objects
    successful, total = extractor.extract_all_objects()
    
    # Create manifest
    manifest = extractor.create_object_manifest()
    
    if successful == total:
        print("🎉 All objects extracted successfully!")
    else:
        print(f"⚠️  {total - successful} objects failed to extract")

if __name__ == "__main__":
    main()
