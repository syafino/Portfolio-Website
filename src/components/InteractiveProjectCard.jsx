import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { github } from '../assets';

const InteractiveProjectCard = ({ 
  index, 
  name, 
  description, 
  tags, 
  image, 
  source_code_link,
  live_link = null // Make live_link optional
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    rest: { 
      scale: 1,
      rotateY: 0,
    },
    hover: { 
      scale: 1.05,
      rotateY: isFlipped ? 180 : 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const frontVariants = {
    visible: { rotateY: 0, opacity: 1 },
    hidden: { rotateY: 180, opacity: 0 }
  };

  const backVariants = {
    visible: { rotateY: 0, opacity: 1 },
    hidden: { rotateY: -180, opacity: 0 }
  };

  return (
    <motion.div
      className="perspective-1000"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[400px] relative preserve-3d"
      >
        {/* Glowing border effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-opacity duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'}`} style={{ padding: '2px' }}>
          <div className="bg-tertiary rounded-2xl w-full h-full" />
        </div>

        {/* Front Face */}
        <AnimatePresence>
          {!isFlipped && (
            <motion.div
              className="absolute inset-5 z-10"
              variants={frontVariants}
              initial="visible"
              animate={isFlipped ? "hidden" : "visible"}
              exit="hidden"
              transition={{ duration: 0.6 }}
            >
              <div
                className="relative w-full h-[230px] cursor-pointer"
                onClick={() => setIsFlipped(true)}
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-white font-bold">Click to flip</span>
                </div>

                <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(source_code_link, "_blank");
                    }}
                    className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  >
                    <img
                      src="/github.png"
                      alt="source code"
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-white font-bold text-[24px]">{name}</h3>
                <p className="mt-2 text-secondary text-[14px] line-clamp-4">
                  {description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <p
                    key={`${name}-${tag.name}`}
                    className={`text-[14px] ${tag.color}`}
                  >
                    #{tag.name}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Face */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              className="absolute inset-5 z-10 bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-6"
              variants={backVariants}
              initial="hidden"
              animate={isFlipped ? "visible" : "hidden"}
              exit="hidden"
              transition={{ duration: 0.6 }}
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="float-right text-white hover:text-purple-300 transition-colors mb-4"
                  >
                    ✕
                  </button>
                  
                  <h3 className="text-white font-bold text-[20px] mb-4">{name}</h3>
                  
                  <p className="text-gray-300 text-[14px] mb-6">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <span
                        key={`${name}-back-${tag.name}`}
                        className={`text-[12px] px-3 py-1 rounded-full bg-black/30 ${tag.color}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {live_link && (
                    <button
                      onClick={() => window.open(live_link, "_blank")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      View Live Demo
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.open(source_code_link, "_blank")}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    View Source Code
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles effect */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full"
                initial={{ 
                  x: '50%', 
                  y: '50%',
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </Tilt>
    </motion.div>
  );
};

export default InteractiveProjectCard;