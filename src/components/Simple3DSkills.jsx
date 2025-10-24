import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const SkillOrb = ({ position, skill, color, index, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2;
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      
      // Pulsing effect when selected
      if (isSelected) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
        meshRef.current.scale.setScalar(pulse);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(skill);
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <group position={position}>
        {/* Main sphere */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : isSelected ? 0.3 : 0.1}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={hovered ? 0.9 : 0.8}
          />
        </mesh>

        {/* Skill label */}
        <Html position={[0, -1, 0]} center>
          <div 
            className={`
              text-white font-bold text-xs px-2 py-1 rounded transition-all duration-300
              ${hovered || isSelected 
                ? 'bg-black/80 backdrop-blur-sm scale-110' 
                : 'bg-black/50'
              }
            `}
          >
            {skill.name}
          </div>
        </Html>

        {/* Outer glow ring when selected */}
        {(hovered || isSelected) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.0, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

const Simple3DSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const groupRef = useRef();

  // Your categorized skills with colors
  const skillCategories = {
    'Programming Languages': {
      skills: [
        { name: 'Python', color: '#3776AB' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'Java', color: '#ED8B00' },
        { name: 'C++', color: '#00599C' },
        { name: 'C', color: '#A8B9CC' },
        { name: 'HTML5', color: '#E34F26' },
        { name: 'CSS', color: '#1572B6' },
        { name: 'SQL', color: '#336791' },
      ],
      radius: 4,
      height: 2
    },
    'Frameworks & Tools': {
      skills: [
        { name: 'React.js', color: '#61DAFB' },
        { name: 'Node.js', color: '#339933' },
        { name: 'Flutter', color: '#02569B' },
        { name: 'TensorFlow', color: '#FF6F00' },
        { name: 'Docker', color: '#2496ED' },
        { name: 'AWS', color: '#FF9900' },
        { name: 'Git', color: '#F05032' },
        { name: 'PyTorch', color: '#EE4C2C' },
      ],
      radius: 6,
      height: 0
    },
    'Hardware & Systems': {
      skills: [
        { name: 'Linux', color: '#FCC624' },
        { name: 'MacOS', color: '#000000' },
        { name: 'Windows', color: '#0078D4' },
        { name: 'Raspberry Pi', color: '#A22846' },
      ],
      radius: 3,
      height: -2
    }
  };

  // Generate positions for all skills
  const allSkills = [];
  Object.entries(skillCategories).forEach(([category, data]) => {
    data.skills.forEach((skill, index) => {
      const angle = (index / data.skills.length) * Math.PI * 2;
      const position = [
        Math.cos(angle) * data.radius,
        data.height,
        Math.sin(angle) * data.radius
      ];
      allSkills.push({ ...skill, position, category });
    });
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  return (
    <div className="w-full h-96 relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p>Loading 3D Skills Universe...</p>
          </div>
        </div>
      }>
        <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
          
          {/* Interactive controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={20}
            minDistance={5}
            autoRotate={!selectedSkill}
            autoRotateSpeed={0.5}
          />
          
          {/* Skills group */}
          <group ref={groupRef}>
            {allSkills.map((skill, index) => (
              <SkillOrb
                key={skill.name}
                position={skill.position}
                skill={skill}
                color={skill.color}
                index={index}
                onClick={handleSkillClick}
                isSelected={selectedSkill?.name === skill.name}
              />
            ))}
            
            {/* Central core */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial
                color="#fed7aa"
                emissive="#fed7aa"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </Canvas>
      </Suspense>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <h4 className="font-bold mb-1">🚀 3D Skills Universe</h4>
          <p className="text-xs opacity-75">Click orbs • Drag to rotate • Scroll to zoom</p>
        </div>
      </div>

      {/* Selected skill info */}
      {selectedSkill && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold">{selectedSkill.name}</h3>
            <p className="text-sm opacity-75">Category: {selectedSkill.category}</p>
          </div>
        </motion.div>
      )}

      {/* Category legend */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
          <h4 className="text-white font-bold text-xs mb-2">Categories</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-white">Programming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white">Frameworks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white">Hardware/OS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple3DSkills;