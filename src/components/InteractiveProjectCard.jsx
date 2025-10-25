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
    },
    hover: { 
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
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
        className="bg-tertiary/20 backdrop-blur-md p-5 rounded-2xl sm:w-[360px] w-full h-[400px] relative preserve-3d border border-white/10 shadow-xl glass-card"
      >
        {/* Enhanced glowing border effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ padding: '1px' }}>
          <div className="bg-transparent rounded-2xl w-full h-full backdrop-blur-sm" />
        </div>

        {/* Front Face */}
        <AnimatePresence>
          {!isFlipped && (
            <motion.div
              className="absolute inset-6 z-10"
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
                      src={github}
                      alt="source code"
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden">
                <h3 className="text-white font-bold text-xl mb-2 break-words">{name}</h3>
                <p className="text-secondary text-sm leading-[1.3] break-words overflow-hidden" 
                   style={{
                     display: '-webkit-box',
                     WebkitLineClamp: 3,
                     WebkitBoxOrient: 'vertical',
                     overflow: 'hidden'
                   }}>
                  {description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Face */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              className="absolute inset-5 z-10 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl glass-card"
              variants={backVariants}
              initial="hidden"
              animate={isFlipped ? "visible" : "hidden"}
              exit="hidden"
              transition={{ duration: 0.6 }}
            >
              <div className="h-full flex flex-col justify-between overflow-hidden">
                <div className="overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-bold text-lg break-words flex-1 mr-4">{name}</h3>
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="text-white hover:text-purple-300 transition-colors flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed break-words overflow-hidden"
                     style={{
                       display: '-webkit-box',
                       WebkitLineClamp: 6,
                       WebkitBoxOrient: 'vertical',
                       overflow: 'hidden'
                     }}>
                    {description}
                  </p>

                  <div className="mb-2 w-full px-1 overflow-hidden">
                    <div className="flex flex-wrap gap-1 max-w-full">
                      {tags.slice(0, 4).map((tag) => (
                        <span
                          key={`${name}-back-${tag.name}`}
                          className={`text-xs px-2 py-1 rounded-full bg-black/30 border border-gray-600/30 ${tag.color} inline-block`}
                          style={{
                            maxWidth: '70px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          title={tag.name}
                        >
                          {tag.name}
                        </span>
                      ))}
                      {tags.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-black/30 border border-gray-600/30 text-gray-400 flex-shrink-0">
                          +{tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="space-y-3 flex-shrink-0 mt-auto">
                  {live_link && (
                    <button
                      onClick={() => window.open(live_link, "_blank")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-sm"
                    >
                      🚀 View Live Demo
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.open(source_code_link, "_blank")}
                    className="w-full bg-gray-700/80 hover:bg-gray-600/80 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-600/30 text-sm"
                  >
                    📂 View Source Code
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