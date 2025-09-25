# 3D Models Directory

This directory structure is ready for your 3D model files (.gltf and .bin).

## Directory Structure:
- `/taj-mahal/` - Place taj-mahal.gltf and taj-mahal.bin here
- `/qutub-minar/` - Place qutub-minar.gltf and qutub-minar.bin here  
- `/hampi/` - Place hampi.gltf and hampi.bin here
- `/red-fort/` - Place red-fort.gltf and red-fort.bin here
- `/ajanta-caves/` - Place ajanta-caves.gltf and ajanta-caves.bin here
- `/khajuraho/` - Place khajuraho.gltf and khajuraho.bin here

## Expected File Format:
Each monument should have:
- `[monument-name].gltf` - The 3D model definition file
- `[monument-name].bin` - The binary data file

## Integration:
The ThreeDViewer component in `/src/components/ThreeDViewer.tsx` is ready to load your 3D models from these paths.