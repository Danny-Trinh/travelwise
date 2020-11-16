import React from "react";
import { motion } from "framer-motion";
const bounce = 30;
const staggerDelay = 0.2;

const containerStyle = {
  width: "12rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
  margin: "2.5rem auto 5rem auto",
};
const circleStyle = {
  height: "2rem",
  width: "2rem",
  borderRadius: "50%",
  backgroundColor: "#319795",
};
const itemVariants = {
  animate: {
    y: [bounce, -bounce, bounce],
    transition: {
      ease: "easeInOut",
      duration: 2,
      loop: Infinity,
    },
  },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
};

export default function Loading(props: any) {
  return (
    <div className="container">
      <motion.div
        style={containerStyle}
        initial="hidden"
        animate="animate"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} style={circleStyle} />
        <motion.div variants={itemVariants} style={circleStyle} />
        <motion.div variants={itemVariants} style={circleStyle} />
      </motion.div>
    </div>
  );
}
