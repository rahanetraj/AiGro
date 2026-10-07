// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BackIcon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-6 left-6 z-50"
    >
      <Link
        to="/"
        className="flex items-center gap-2 group"
        aria-label="Retour à l'accueil"
      >
        {/* Icône futuriste avec animation */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Cercle de fond */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-300" />

          {/* Flèche stylisée avec effet IA */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-600 h-6 w-6 group-hover:text-emerald-500 transition-colors"
          >
            {/* Effet de données (points) */}
            <motion.path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.path
              d="M12 5L5 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />

            {/* Effet de particules (points connectés) */}
            <motion.circle
              cx="5"
              cy="12"
              r="1"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />
            <motion.circle
              cx="12"
              cy="5"
              r="1"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />
            <motion.circle
              cx="12"
              cy="19"
              r="1"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            />
          </svg>
        </motion.div>

        {/* Texte avec animation */}
        <motion.span
          className="hidden sm:inline text-sm font-medium text-emerald-700 group-hover:text-emerald-600 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Retour à l'accueil
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default BackIcon;
