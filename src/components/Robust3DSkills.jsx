import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Error Boundary Component
class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('3D Skills Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const SkillSphere = ({ position, skill, color, index, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.3;
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      
      // Scale effect for interaction
      const targetScale = hovered ? 1.4 : isSelected ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(skill);
  };

  return (
    <Float speed={1 + Math.random() * 0.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={position}>
        {/* Main 3D Sphere */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : isSelected ? 0.3 : 0.1}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={0.6}>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Skill label */}
        <Html 
          position={[0, -1.2, 0]} 
          center 
          distanceFactor={6}
          occlude="blending"
        >
          <div 
            className={`
              text-white font-bold text-xs px-3 py-2 rounded-lg transition-all duration-300 pointer-events-none select-none
              ${hovered || isSelected 
                ? 'bg-black/90 backdrop-blur-md scale-110 border border-white/20' 
                : 'bg-black/60 backdrop-blur-sm'
              }
            `}
            style={{
              boxShadow: hovered ? `0 0 15px ${color}66` : 'none',
            }}
          >
            {skill.name}
          </div>
        </Html>

        {/* Orbital rings for selected/hovered */}
        {(hovered || isSelected) && (
          <>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.0, 1.2, 32]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <ringGeometry args={[1.0, 1.2, 32]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}

        {/* Particle effects for selected skill */}
        {isSelected && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 1.8;
              return (
                <Float key={i} speed={2} rotationIntensity={0.1}>
                  <mesh
                    position={[
                      Math.cos(angle) * radius,
                      Math.sin(angle) * radius * 0.5,
                      Math.sin(angle * 2) * 0.5
                    ]}
                  >
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial 
                      color={color}
                      emissive={color}
                      emissiveIntensity={0.5}
                    />
                  </mesh>
                </Float>
              );
            })}
          </>
        )}
      </group>
    </Float>
  );
};

const SkillsScene = ({ skills, selectedSkill, onSkillClick }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && !selectedSkill) {
      groupRef.current.rotation.y += 0.004; // Slow automatic rotation
    }
  });

  return (
    <group ref={groupRef}>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, 15, 0]} intensity={0.6} color="#ff6b6b" />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
        castShadow
      />
      
      {/* Skills arranged in 3D space */}
      {skills.map((skill, index) => (
        <SkillSphere
          key={skill.name}
          position={skill.position}
          skill={skill}
          color={skill.color}
          index={index}
          onClick={onSkillClick}
          isSelected={selectedSkill?.name === skill.name}
        />
      ))}

      {/* Central energy core */}
      <Float speed={0.5} rotationIntensity={0.2}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#fed7aa"
            emissive="#fed7aa"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Energy connections between core and skills */}
      {selectedSkill && (
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 8, 8]} />
          <meshBasicMaterial 
            color={selectedSkill.color}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
};

// Fallback component for when 3D fails
const Fallback3DSkills = ({ skills, selectedSkill, onSkillClick }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center text-white">
      <div className="text-xl mb-4">🔄 Loading 3D Skills...</div>
      <div className="grid grid-cols-4 gap-4 max-w-md">
        {skills.slice(0, 8).map((skill, index) => (
          <motion.div
            key={skill.name}
            className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer text-xs font-bold"
            style={{ backgroundColor: skill.color }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onSkillClick(skill)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {skill.name.substring(0, 4)}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const Robust3DSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [is3DReady, setIs3DReady] = useState(false);

  // Your comprehensive skills with 3D positioning
  const skills = [
    // Inner sphere - Core Programming
    { name: 'Python', color: '#3776AB', position: [3, 2, 0] },
    { name: 'JavaScript', color: '#F7DF1E', position: [-3, 2, 0] },
    { name: 'Java', color: '#ED8B00', position: [0, 2, 3] },
    { name: 'C++', color: '#00599C', position: [0, 2, -3] },
    
    // Middle sphere - Web & Frameworks
    { name: 'React.js', color: '#61DAFB', position: [5, 0, 2] },
    { name: 'Node.js', color: '#339933', position: [-5, 0, 2] },
    { name: 'HTML5', color: '#E34F26', position: [5, 0, -2] },
    { name: 'CSS', color: '#1572B6', position: [-5, 0, -2] },
    { name: 'Flutter', color: '#02569B', position: [2, 0, 5] },
    { name: 'SQL', color: '#336791', position: [-2, 0, 5] },
    { name: 'Flask', color: '#000000', position: [2, 0, -5] },
    { name: 'Dart', color: '#0175C2', position: [-2, 0, -5] },
    
    // Outer sphere - Tools & Systems
    { name: 'Docker', color: '#2496ED', position: [7, -2, 0] },
    { name: 'AWS', color: '#FF9900', position: [-7, -2, 0] },
    { name: 'Git', color: '#F05032', position: [0, -2, 7] },
    { name: 'Linux', color: '#FCC624', position: [0, -2, -7] },
    { name: 'TensorFlow', color: '#FF6F00', position: [5, -2, 5] },
    { name: 'PyTorch', color: '#EE4C2C', position: [-5, -2, 5] },
    { name: 'OpenCV', color: '#5C3EE8', position: [5, -2, -5] },
    { name: 'Raspberry Pi', color: '#A22846', position: [-5, -2, -5] },
  ];

  useEffect(() => {
    // Test WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIs3DReady(!!gl);
  }, []);

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  const resetView = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="w-full h-96 relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
      <ThreeJSErrorBoundary fallback={<Fallback3DSkills skills={skills} selectedSkill={selectedSkill} onSkillClick={handleSkillClick} />}>
        {is3DReady ? (
          <Suspense fallback={<Fallback3DSkills skills={skills} selectedSkill={selectedSkill} onSkillClick={handleSkillClick} />}>
            <Canvas 
              camera={{ position: [0, 5, 15], fov: 60 }}
              gl={{ antialias: true, alpha: true }}
              onError={(error) => {
                console.error('Canvas error:', error);
                setIs3DReady(false);
              }}
            >
              {/* Enhanced controls with smooth interaction */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxDistance={25}
                minDistance={8}
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
                zoomSpeed={0.8}
                panSpeed={0.8}
              />
              
              {/* 3D Skills Scene */}
              <SkillsScene 
                skills={skills}
                selectedSkill={selectedSkill}
                onSkillClick={handleSkillClick}
              />
            </Canvas>
          </Suspense>
        ) : (
          <Fallback3DSkills skills={skills} selectedSkill={selectedSkill} onSkillClick={handleSkillClick} />
        )}
      </ThreeJSErrorBoundary>

      {/* UI Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <h4 className="font-bold mb-1">🚀 3D Skills Universe</h4>
          <p className="text-xs opacity-75">
            Click orbs • Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={resetView}
          className="bg-orange-500/80 hover:bg-orange-500 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105"
        >
          Reset View
        </button>
      </div>

      {/* Selected skill detailed info */}
      {selectedSkill && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 z-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div 
            className="bg-black/90 backdrop-blur-md rounded-xl p-4 text-white border"
            style={{ borderColor: `${selectedSkill.color}44` }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: selectedSkill.color }}>
              {selectedSkill.name}
            </h3>
            <p className="text-sm opacity-75 mb-2">
              {selectedSkill.position[1] > 1 ? '🔵 Core Programming Language' :
               selectedSkill.position[1] === 0 ? '🟢 Web Technology & Framework' :
               '🟡 Development Tool & System'}
            </p>
            <div className="text-xs opacity-50">
              Position: [{selectedSkill.position.join(', ')}]
            </div>
          </div>
        </motion.div>
      )}

      {/* Layer indicators */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
          <h4 className="text-white font-bold text-xs mb-2">3D Layers</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-white">Top: Programming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white">Mid: Frameworks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white">Bottom: Tools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robust3DSkills;