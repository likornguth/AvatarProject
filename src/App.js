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
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Model } from './ReadyPlayerMeAvatar.jsx';

function My3DModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function App() {
  
  
  const [playAnimation, setPlayAnimation] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const waveHello = () => {
    // Trigger the animation by setting playAnimation to true
    setPlayAnimation(true);
    

    // Optionally stop the animation after a short delay
    setTimeout(() => {
      setPlayAnimation(false); // Stop the animation after 2 seconds (optional)
    }, 3000);
  };

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
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center',  // Center horizontally
      alignItems: 'flex-start'   // Align to the top of the page
    }}>
      {/* "Say Hi" button */}
      <button
      style={{
        position: 'absolute',
        top: '15vh',
        left: '10vw', // Adjust this value to position slightly to the left
        zIndex: 1,
        padding: '10px 20px',
        fontSize: '24px',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)', // Semi-transparent background
        border: '2px solid white',
        color: isHovered ? 'black' : 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        borderRadius: 10
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={waveHello}
    >
      hi, welcome to my site &lt;3
    </button>

      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 1.5, 0.5]} // Positioning the camera to frame head and shoulders
          fov={45} // Field of view - adjust this to zoom in or out
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        {/* Render the model */}
        <Model mousePosition={mousePosition} playAnimation={playAnimation} wireframe={true} />
        <My3DModel url="/models/low-poly-living-room-with-furniture/source/Low_Poly_LivingRoom.glb" />

        <OrbitControls
          target={[0, 1.5, 0.5]}
          minDistance={0.25}
          maxDistance={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}


