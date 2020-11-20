import { motion } from "framer-motion";
import React from "react";

type myProps = {
  rev: number;
  top: string;
  left: string;
  width: string;
  swell: number;
  jiggle: number;
  img: any;
};

// animates a virus for the homepage
export default function VirusAnimate(props: myProps) {
  let scale = [
    (1 - props.swell) * props.rev,
    1 * props.rev,
    1 * props.rev,
    (1 - props.swell) * props.rev,
    (1 + props.swell) * props.rev,
    (1 + props.swell) * props.rev,
    (1 - props.swell) * props.rev,
  ];
  let rotate = [
    0,
    60 * props.rev,
    120 * props.rev,
    180 * props.rev,
    240 * props.rev,
    300 * props.rev,
    360 * props.rev,
  ];
  let y = [
    0,
    -props.jiggle * props.rev,
    props.jiggle * props.rev,
    -props.jiggle * props.rev,
    props.jiggle * props.rev,
    -props.jiggle * props.rev,
    0,
  ];
  return (
    <motion.img
      animate={{
        scale,
        rotate,
        y,
      }}
      transition={{
        duration: 20,
        loop: Infinity,
        ease: "linear",
      }}
      className="position-absolute mx-auto d-block"
      src={props.img}
      alt="Virus"
      style={{
        width: props.width,
        left: props.left,
        top: props.top,
      }}
    ></motion.img>
  );
}
