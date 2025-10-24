import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import InteractiveProjectCard from "./InteractiveProjectCard";
import ScrollReveal, { ScrollRevealContainer } from "./ScrollReveal";

const Works = () => {
  return (
    <>
      <ScrollReveal direction="fade" delay={0.2}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText}`}>Interactive Projects</h2>
        </motion.div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div className="w-full flex">
          <motion.p variants={fadeIn("", "", 0.1)} className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
            Explore my projects with interactive 3D cards! Click on any card to flip it and discover more details, 
            including live demos and source code. Each project showcases different aspects of my technical expertise.
          </motion.p>
        </div>
      </ScrollReveal>

      <ScrollRevealContainer staggerDelay={0.2} className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <InteractiveProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </ScrollRevealContainer>
    </>
  );
};

export default SectionWrapper(Works, "");
