// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMemo } from "react";

const FloatingLeaves = () => {
  const leaves = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        size: Math.random() * 24 + 12,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute text-lime-300/40"
          style={{
            fontSize: `${leaf.size}px`,
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
          }}
          animate={{
            y: [0, Math.random() * 60 - 30],
            x: [0, Math.random() * 60 - 30],
            rotate: 360,
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
