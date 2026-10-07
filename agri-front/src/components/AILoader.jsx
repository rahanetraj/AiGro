// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AILoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950">
      {/* Robot SVG stylisé */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="text-lime-300"
        >
          {/* Corps du robot */}
          <motion.path
            d="M60 30c-16.54 0-30 13.46-30 30v30h60V60c0-16.54-13.46-30-30-30z"
            fill="currentColor"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Tête */}
          <circle cx="60" cy="30" r="15" fill="currentColor" />

          {/* Yeux */}
          <motion.circle
            cx="50"
            cy="25"
            r="3"
            fill="#0f172a"
            animate={{ r: [3, 4, 3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle
            cx="70"
            cy="25"
            r="3"
            fill="#0f172a"
            animate={{ r: [3, 4, 3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Antenne */}
          <motion.path
            d="M60 15v-10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <circle cx="60" cy="5" r="3" fill="#ef4444" />
        </svg>
      </motion.div>

      {/* Contenu texte */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-6"
      >
        <h2 className="text-2xl font-bold text-lime-300">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ai
          </motion.span>
          <span className="text-white">Gro</span>
        </h2>

        {/* Barre de progression élégante */}
        <div className="w-64 h-2 bg-emerald-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-lime-300 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-emerald-200 font-mono text-sm">
          Chargement en cours... {progress}%
        </p>
      </motion.div>
    </div>
  );
};

export default AILoader;
