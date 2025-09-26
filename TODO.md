# TODO: Fix WebGL Context Error in ThreeDViewer

- [ ] Add useState for webGLSupported in ThreeDViewer.tsx
- [ ] Add useEffect to test WebGL support using canvas.getContext('webgl') or 'experimental-webgl'
- [ ] Conditionally render FallbackView if WebGL not supported
- [ ] Render <Canvas> with gl props { antialias: false, powerPreference: 'default' } if supported
- [ ] Update FallbackView message to mention WebGL incompatibility
- [ ] Preserve existing loadError handling for GLTF issues
- [ ] Test the changes by running dev server and checking fallback behavior
