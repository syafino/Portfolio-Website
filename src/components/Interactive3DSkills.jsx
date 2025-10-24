import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Html, Float, OrbitControls, Environment, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Extend Three.js with custom materials
extend({ MeshDistortMaterial });

const SkillSphere = ({ position, skill, color, category, onClick, isSelected }) => {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Rotation based on interaction
      if (hovered || isSelected) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.rotation.x += 0.01;
      } else {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(skill);
  };

  const scale = hovered ? 1.2 : isSelected ? 1.1 : 1;
  const intensity = hovered ? 2 : isSelected ? 1.5 : 1;

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.2}>
      <group position={position}>
        {/* Main skill sphere */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={scale}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={hovered ? 0.4 : 0.2}
            speed={hovered ? 3 : 1}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Skill name text - using HTML overlay for reliability */}
        <Html position={[0, 0, 0.9]} center>
          <div className="text-white font-bold text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
            {skill.length > 8 ? skill.substring(0, 8) + '...' : skill}
          </div>
        </Html>

        {/* Category indicator */}
        <mesh position={[0, -1.2, 0]} scale={[0.1, 0.1, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={category === 'Programming' ? '#ff6b6b' : category === 'Frameworks' ? '#4ecdc4' : '#45b7d1'} />
        </mesh>

        {/* Glowing ring effect */}
        {(hovered || isSelected) && (
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[1.2, 1.4, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Floating particles around selected skill */}
        {isSelected && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 1.5;
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius * 0.5,
                    Math.sin(angle) * 0.5
                  ]}
                >
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshBasicMaterial color={color} />
                </mesh>
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
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002; // Slow overall rotation
    }
  });

  const arrangedSkills = useMemo(() => {
    const skillsWithPositions = [];
    const categories = ['Programming', 'Frameworks', 'Hardware'];
    
    categories.forEach((category, categoryIndex) => {
      const categorySkills = skills.filter(skill => skill.category === category);
      const radius = 4 + categoryIndex * 2; // Different radius for each category
      
      categorySkills.forEach((skill, index) => {
        const angle = (index / categorySkills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (categoryIndex - 1) * 1.5; // Stack categories vertically
        
        skillsWithPositions.push({
          ...skill,
          position: [x, y, z]
        });
      });
    });
    
    return skillsWithPositions;
  }, [skills]);

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Key lighting */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[0, 20, 0]} intensity={0.8} color="#ff6b6b" />
      
      {/* Skills spheres */}
      {arrangedSkills.map((skill, index) => (
        <SkillSphere
          key={skill.name}
          position={skill.position}
          skill={skill.name}
          color={skill.color}
          category={skill.category}
          onClick={onSkillClick}
          isSelected={selectedSkill === skill.name}
        />
      ))}

      {/* Central core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#fed7aa"
          emissive="#fed7aa"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const Interactive3DSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [cameraControls, setCameraControls] = useState(true);

  // Your actual skills organized by category
  const skills = [
    // Programming Languages
    { name: 'Python', category: 'Programming', color: '#3776AB' },
    { name: 'JavaScript', category: 'Programming', color: '#F7DF1E' },
    { name: 'Java', category: 'Programming', color: '#ED8B00' },
    { name: 'C++', category: 'Programming', color: '#00599C' },
    { name: 'C', category: 'Programming', color: '#A8B9CC' },
    { name: 'HTML5', category: 'Programming', color: '#E34F26' },
    { name: 'CSS', category: 'Programming', color: '#1572B6' },
    { name: 'SQL', category: 'Programming', color: '#336791' },
    { name: 'Dart', category: 'Programming', color: '#0175C2' },
    { name: 'R', category: 'Programming', color: '#276DC3' },
    
    // Frameworks & Tools
    { name: 'React.js', category: 'Frameworks', color: '#61DAFB' },
    { name: 'Node.js', category: 'Frameworks', color: '#339933' },
    { name: 'Flutter', category: 'Frameworks', color: '#02569B' },
    { name: 'TensorFlow', category: 'Frameworks', color: '#FF6F00' },
    { name: 'PyTorch', category: 'Frameworks', color: '#EE4C2C' },
    { name: 'Docker', category: 'Frameworks', color: '#2496ED' },
    { name: 'AWS', category: 'Frameworks', color: '#FF9900' },
    { name: 'Git', category: 'Frameworks', color: '#F05032' },
    { name: 'OpenCV', category: 'Frameworks', color: '#5C3EE8' },
    { name: 'Flask', category: 'Frameworks', color: '#000000' },
    
    // Hardware & OS
    { name: 'Linux', category: 'Hardware', color: '#FCC624' },
    { name: 'MacOS', category: 'Hardware', color: '#000000' },
    { name: 'Windows', category: 'Hardware', color: '#0078D4' },
    { name: 'Raspberry Pi', category: 'Hardware', color: '#A22846' },
  ];

  const handleSkillClick = (skillName) => {
    setSelectedSkill(selectedSkill === skillName ? null : skillName);
  };

  const resetCamera = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="w-full h-96 relative">
      {/* Canvas container */}
      <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-xl">Loading 3D Skills...</div>
          </div>
        }>
          <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
            {/* Environment for better lighting */}
            <Environment preset="night" />
            
            {/* Interactive controls */}
            <OrbitControls
              enabled={cameraControls}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={false}
              maxDistance={25}
              minDistance={8}
            />
            
            {/* Skills scene */}
            <SkillsScene 
              skills={skills}
              selectedSkill={selectedSkill}
              onSkillClick={handleSkillClick}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* UI Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <p className="text-sm mb-2">🎮 Interactive 3D Skills</p>
          <p className="text-xs opacity-75">Click spheres • Drag to rotate • Scroll to zoom</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={resetCamera}
          className="bg-orange-500/80 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
        >
          Reset View
        </button>
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
            <h3 className="text-lg font-bold">{selectedSkill}</h3>
            <p className="text-sm opacity-75">
              {skills.find(s => s.name === selectedSkill)?.category} Technology
            </p>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="flex flex-col space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-white">Programming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded"></div>
              <span className="text-white">Frameworks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-white">Hardware/OS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interactive3DSkills;