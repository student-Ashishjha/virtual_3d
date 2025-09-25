import React, { useEffect, useRef } from 'react';
import { Package, Upload } from 'lucide-react';

interface ThreeDViewerProps {
  modelPath: string;
  placeName: string;
}

function ThreeDViewer({ modelPath, placeName }: ThreeDViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where you'll integrate your 3D model loading logic
    // For now, we'll show a placeholder that indicates where your models will go
    console.log(`Loading 3D model from: ${modelPath}`);
    console.log(`Expected files: ${modelPath}.bin and ${modelPath}.gltf`);
  }, [modelPath]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
      {/* Placeholder for 3D Model */}
      <div className="text-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">3D Model Viewer</h3>
          <p className="text-gray-600 mb-4">
            Replace this placeholder with your 3D model viewer component
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left text-sm">
            <p className="text-gray-700 mb-2"><strong>Model Location:</strong></p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              {modelPath}.gltf<br />
              {modelPath}.bin
            </code>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Ready for your 3D files</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Place your .gltf and .bin files in the public{modelPath} directory
            </p>
          </div>
        </div>
      </div>

      {/* Model Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800">{placeName}</h4>
        <p className="text-sm text-gray-600">3D Model View</p>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="flex space-x-2 text-sm text-gray-600">
          <span>🖱️ Rotate</span>
          <span>🔍 Zoom</span>
          <span>✋ Pan</span>
        </div>
      </div>
    </div>
  );
}

export default ThreeDViewer;