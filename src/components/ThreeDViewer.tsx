import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ThreeDViewerProps {
  modelPath: string;
  placeName: string;
}

function Model({ url, scale, onError }: { url: string; scale: number; onError: (error: Error) => void }) {
  const gltf = useGLTF(url, undefined, undefined, undefined, (error: any) => {
    console.error('GLTF load error:', error);
    onError(new Error(String(error)));
  });
  console.log('GLTF loaded for', url, gltf);
  return <primitive object={gltf.scene} scale={scale} />;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
}

function FallbackView({ placeName }: { placeName: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🏛️</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{placeName}</h3>
        <p className="text-gray-600">3D model temporarily unavailable due to WebGL compatibility issues. Please try enabling hardware acceleration or using a different browser.</p>
      </div>

      {/* Model Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-semibold text-gray-800">{placeName}</h4>
        <p className="text-sm text-gray-600">WebGL Compatibility Issue</p>
      </div>
    </div>
  );
}

function ThreeDViewer({ modelPath, placeName }: ThreeDViewerProps) {
  const modelUrl = `${modelPath}.gltf`;
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
  }, []);

  console.log('Loading model from:', modelUrl);

  if (webGLSupported === false || loadError) {
    return <FallbackView placeName={placeName} />;
  }

  if (webGLSupported === null) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking WebGL support...</p>
        </div>
      </div>
    );
  }

  const modelName = modelPath.split('/').pop()?.replace('-', ' ') || '';
  const isTajMahal = modelName.toLowerCase().includes('taj');
  const cameraPosition = isTajMahal ? [0, 0, 20] : [0, 0, 3];
  const modelScale = isTajMahal ? 0.02 : 0.2;

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
      <Canvas
        camera={{ position: cameraPosition, fov: 75 }}
        gl={{ antialias: false, powerPreference: 'default' }}
        style={{ background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <Model url={modelUrl} scale={modelScale} onError={setLoadError} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>

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
