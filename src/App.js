// import { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Model } from './ReadyPlayerMeAvatar.jsx'




// export default function App() {
//   return (
//     <Canvas>
//       <ambientLight intensity={Math.PI / 2} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//       <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//       <Model />
//       <OrbitControls />
//     </Canvas>
//   )
// }

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Model } from './ReadyPlayerMeAvatar.jsx';


export default function App() {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (

    <Canvas>
      {/* Adjusting camera with PerspectiveCamera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 1.5, 1]} // Positioning the camera to frame head and shoulders
        fov={45} // Field of view - adjust this to zoom in or out
      />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      
      {/* Render the model */}
      <Model mousePosition={mousePosition} wireframe ={true}/>
      
      {/* Controls to allow orbiting around the model */}
      {/* Orbit controls with zoom and pan limits */}
      <OrbitControls
        target={[0, 1.5, 0]} // Center controls on the head
        minDistance={.5} // Minimum zoom distance
        maxDistance={1} // Maximum zoom distance
        minPolarAngle={Math.PI / 4} // Limit vertical rotation (up/down)
        maxPolarAngle={Math.PI / 2} // Limit to looking straight at the head
        minAzimuthAngle={-Math.PI / 4} // Limit horizontal rotation (left/right)
        maxAzimuthAngle={Math.PI / 4}  // Limit horizontal rotation (left/right)
      />
    </Canvas>
  );
}

