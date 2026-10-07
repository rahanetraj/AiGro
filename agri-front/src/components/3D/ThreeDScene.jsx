import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import AICore from "./AICore";

const ThreeDScene = () => {
  return (
    <motion.div
      className="w-full lg:w-1/2 h-64 md:h-80 lg:h-[35rem] relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#bef264" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#ffffff"
        />
        <AICore />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
          enablePan={false}
        />
      </Canvas>
    </motion.div>
  );
};

export default ThreeDScene;
