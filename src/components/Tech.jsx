import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import Robust3DSkills from "./Robust3DSkills";
import SimpleInteractiveSkills from "./SimpleInteractiveSkills";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

const renderTechnologies = () => {
  return technologies.map(({ name, icon }) => (
    <div className="w-28 h-28" key={name}>
      <BallCanvas icon={icon} />
    </div>
  ));
};

const Tech = () => (
  <div className="space-y-12">
    {/* 3D Interactive Skills */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-4xl font-bold text-white mb-6">Interactive 3D Skills Universe</h2>
      <p className="text-gray-300 mb-6">🚀 Click orbs • Drag to rotate • Scroll to zoom • Full 3D interaction</p>
      <Robust3DSkills />
    </motion.div>

    {/* 2D Skills Grid */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Skills Overview</h3>
      <SimpleInteractiveSkills />
    </motion.div>

    {/* Traditional Tech Stack */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="pb-8"
    >
      <h3 className="text-2xl font-bold text-white text-center mb-6">Technology Stack</h3>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {renderTechnologies()}
      </div>
    </motion.div>
  </div>
);

// Custom wrapper with reduced padding for Tech section
const TechWithWrapper = () => (
  <motion.section
    variants={staggerContainer()}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className="sm:px-16 px-6 sm:py-8 py-6 max-w-7xl mx-auto relative z-0" // Reduced padding
  >
    <span className="hash-span" id="">
      &nbsp;
    </span>
    <Tech />
  </motion.section>
);

export default TechWithWrapper;
