// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import video from "./../assets/audio.mp3";

export default function SmartAnalysis() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-emerald-950">
            Recommendation de traitement
          </h2>
          <p className="text-sm text-emerald-800">
            Audio guide pour le traitement
          </p>
        </motion.div>

        <audio controls>
          <source src={video}></source>
        </audio>
      </div>

      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FiVolume2 className="text-emerald-600" />

        <div className="flex-1 h-auto">
          <div className="w-full h-full bg-emerald-50 rounded-lg overflow-hidden">
            <div className="h-full flex items-center space-x-1 px-2">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-6 bg-emerald-600 rounded"
                  initial={{ opacity: 0.2, scaleY: 0.5 }}
                  animate={{
                    opacity: isPlaying ? [0.3, 0.8, 0.3] : 0.3,
                    scaleY: isPlaying ? [0.5, 1.2, 0.5] : 0.5,
                  }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 1.5,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <span className="text-sm text-emerald-800">02:45</span>
      </motion.div>
    </motion.div>
  );
}
