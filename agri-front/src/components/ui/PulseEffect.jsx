import { motion } from "framer-motion";

const PulseEffect = () => (
  <motion.div
    className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-lime-300/5 pointer-events-none"
    style={{ transform: "translate(-50%, -50%)" }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.05, 0.1, 0.05],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default PulseEffect;
