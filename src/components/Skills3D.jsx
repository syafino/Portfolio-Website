import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

const SkillSphere = ({ position, skill, color, index, onClick, isSelected }) => {
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
        meshRef.current.scale.setScalar(pulse * (hovered ? 1.3 : 1));
      } else {
        meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
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
        >
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : isSelected ? 0.3 : 0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Skill label */}
        <Html position={[0, -1, 0]} center distanceFactor={8}>
          <div 
            className={`
              text-white font-bold text-xs px-2 py-1 rounded transition-all duration-300 pointer-events-none
              ${hovered || isSelected 
                ? 'bg-black/80 backdrop-blur-sm scale-110' 
                : 'bg-black/50'
              }
            `}
          >
            {skill.name}
          </div>
        </Html>

        {/* Outer ring when hovered/selected */}
        {(hovered || isSelected) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.0, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

const Skills3D = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const groupRef = useRef();

  // Your skills with proper organization
  const skills = [
    // Inner ring - Core Programming
    { name: 'Python', color: '#3776AB', ring: 0 },
    { name: 'JavaScript', color: '#F7DF1E', ring: 0 },
    { name: 'Java', color: '#ED8B00', ring: 0 },
    { name: 'C++', color: '#00599C', ring: 0 },
    
    // Middle ring - Web & Frameworks
    { name: 'React.js', color: '#61DAFB', ring: 1 },
    { name: 'Node.js', color: '#339933', ring: 1 },
    { name: 'HTML5', color: '#E34F26', ring: 1 },
    { name: 'CSS', color: '#1572B6', ring: 1 },
    { name: 'Flutter', color: '#02569B', ring: 1 },
    { name: 'SQL', color: '#336791', ring: 1 },
    
    // Outer ring - Tools & Systems
    { name: 'Docker', color: '#2496ED', ring: 2 },
    { name: 'AWS', color: '#FF9900', ring: 2 },
    { name: 'Git', color: '#F05032', ring: 2 },
    { name: 'Linux', color: '#FCC624', ring: 2 },
    { name: 'TensorFlow', color: '#FF6F00', ring: 2 },
    { name: 'PyTorch', color: '#EE4C2C', ring: 2 },
  ];

  // Generate positions in concentric circles
  const skillsWithPositions = skills.map((skill, index) => {
    const ringRadius = [3, 5, 7][skill.ring]; // Different radii for each ring
    const skillsInRing = skills.filter(s => s.ring === skill.ring);
    const indexInRing = skillsInRing.findIndex(s => s.name === skill.name);
    const angle = (indexInRing / skillsInRing.length) * Math.PI * 2;
    
    return {
      ...skill,
      position: [
        Math.cos(angle) * ringRadius,
        skill.ring === 1 ? 1 : skill.ring === 2 ? -1 : 0, // Slight height variation
        Math.sin(angle) * ringRadius
      ]
    };
  });

  useFrame(() => {
    if (groupRef.current && !selectedSkill) {
      groupRef.current.rotation.y += 0.003; // Slow auto-rotation
    }
  });

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  const resetView = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="w-full h-96 relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p>Loading 3D Skills...</p>
          </div>
        </div>
      }>
        <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
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
            autoRotate={false}
          />
          
          {/* Skills group */}
          <group ref={groupRef}>
            {skillsWithPositions.map((skill, index) => (
              <SkillSphere
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
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color="#fed7aa"
                emissive="#fed7aa"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </Canvas>
      </Suspense>

      {/* UI Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <h4 className="font-bold mb-1">🚀 3D Skills</h4>
          <p className="text-xs opacity-75">Click • Drag • Zoom</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={resetView}
          className="bg-orange-500/80 hover:bg-orange-500 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
        >
          Reset
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
            <h3 className="text-lg font-bold">{selectedSkill.name}</h3>
            <p className="text-sm opacity-75">
              Ring {selectedSkill.ring + 1} • {
                selectedSkill.ring === 0 ? 'Core Programming' :
                selectedSkill.ring === 1 ? 'Web & Frameworks' :
                'Tools & Systems'
              }
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Skills3D;