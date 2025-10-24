import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SimpleInteractiveSkills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const skills = [
    // Programming Languages
    { name: 'C', color: '#A8B9CC', category: 'Programming' },
    { name: 'C++', color: '#00599C', category: 'Programming' },
    { name: 'Python', color: '#3776AB', category: 'Programming' },
    { name: 'Java', color: '#ED8B00', category: 'Programming' },
    { name: 'JavaScript', color: '#F7DF1E', category: 'Programming' },
    { name: 'HTML5', color: '#E34F26', category: 'Programming' },
    { name: 'CSS', color: '#1572B6', category: 'Programming' },
    { name: 'SQL', color: '#336791', category: 'Programming' },
    { name: 'MySQL', color: '#4479A1', category: 'Programming' },
    { name: 'PostgreSQL', color: '#336791', category: 'Programming' },
    { name: 'Oracle', color: '#F80000', category: 'Programming' },
    { name: 'Dart', color: '#0175C2', category: 'Programming' },
    { name: 'R', color: '#276DC3', category: 'Programming' },
    
    // Frameworks & Tools
    { name: 'Git', color: '#F05032', category: 'Tools' },
    { name: 'Docker', color: '#2496ED', category: 'Tools' },
    { name: 'AWS', color: '#FF9900', category: 'Tools' },
    { name: 'React.js', color: '#61DAFB', category: 'Tools' },
    { name: 'Node.js', color: '#339933', category: 'Tools' },
    { name: 'MQTT', color: '#660066', category: 'Tools' },
    { name: 'Flutter', color: '#02569B', category: 'Tools' },
    { name: 'Android Studio', color: '#3DDC84', category: 'Tools' },
    { name: 'Xcode', color: '#1575F9', category: 'Tools' },
    { name: 'Pandas', color: '#150458', category: 'Tools' },
    { name: 'NumPy', color: '#013243', category: 'Tools' },
    { name: 'Matplotlib', color: '#11557C', category: 'Tools' },
    { name: 'Scikit-learn', color: '#F7931E', category: 'Tools' },
    { name: 'Jupyter', color: '#F37626', category: 'Tools' },
    { name: 'MS Office', color: '#D83B01', category: 'Tools' },
    { name: 'PyTorch', color: '#EE4C2C', category: 'Tools' },
    { name: 'TensorFlow', color: '#FF6F00', category: 'Tools' },
    { name: 'OpenCV', color: '#5C3EE8', category: 'Tools' },
    { name: 'Flask', color: '#000000', category: 'Tools' },
    { name: 'GCP', color: '#4285F4', category: 'Tools' },
    
    // Hardware & OS
    { name: 'Raspberry Pi', color: '#A22846', category: 'Hardware' },
    { name: 'Linux', color: '#FCC624', category: 'Hardware' },
    { name: 'MacOS', color: '#000000', category: 'Hardware' },
    { name: 'Windows', color: '#0078D4', category: 'Hardware' },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-white font-semibold text-xl mb-2">Skills & Technologies</h3>
        <p className="text-gray-400 text-sm">{skills.length} technologies • Hover to pause • Scroll to explore</p>
      </div>

      {/* Scroll Controls */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => scroll('left')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-300 border border-white/20"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-300 border border-white/20"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Infinite Scrolling Container */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-8"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Infinite loop animation */}
          <motion.div 
            className="flex space-x-6"
            animate={{
              x: isHovered ? 0 : [0, -100 * skills.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: skills.length * 2, // 2 seconds per skill
                ease: "linear"
              }
            }}
          >
            {/* First set of skills */}
            {skills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-1`}
                className="relative group cursor-pointer flex-shrink-0"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Main skill circle */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-2xl transition-all duration-300 group-hover:shadow-xl relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
                    boxShadow: `0 8px 25px ${skill.color}44, 0 0 0 1px ${skill.color}22`
                  }}
                >
                  {/* Animated background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${skill.color}, transparent)`
                    }}
                  />
                  
                  {/* Skill name */}
                  <span className="relative z-10 text-center leading-tight">
                    {skill.name}
                  </span>
                  
                  {/* Rotating border */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-60 transition-all duration-500 animate-spin"
                    style={{ 
                      borderColor: skill.color,
                    }}
                  />
                </div>

                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10"
                  style={{ backgroundColor: skill.color }}
                />
              </motion.div>
            ))}

            {/* Second set for seamless loop */}
            {skills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-2`}
                className="relative group cursor-pointer flex-shrink-0"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Main skill circle */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-2xl transition-all duration-300 group-hover:shadow-xl relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
                    boxShadow: `0 8px 25px ${skill.color}44, 0 0 0 1px ${skill.color}22`
                  }}
                >
                  {/* Animated background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${skill.color}, transparent)`
                    }}
                  />
                  
                  {/* Skill name */}
                  <span className="relative z-10 text-center leading-tight">
                    {skill.name}
                  </span>
                  
                  {/* Rotating border */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-60 transition-all duration-500 animate-spin"
                    style={{ 
                      borderColor: skill.color,
                    }}
                  />
                </div>

                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10"
                  style={{ backgroundColor: skill.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInteractiveSkills;