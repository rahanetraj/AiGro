// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AuthButtons = () => (
  <motion.div
    className="flex gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <Link to="/login">
      <motion.button
        className="px-4 py-2 rounded-full text-sm font-medium border-2 border-white text-white bg-white/0 shadow-lg shadow-white/10"
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        Se Connecter
      </motion.button>
    </Link>
    <Link to="/register">
      <motion.button
        className="px-4 py-2 rounded-full text-sm font-medium bg-lime-300 border-2 border-lime-300 text-emerald-900 shadow-lg shadow-lime-300/20"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(190, 242, 100, 0.7)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        S'inscrire
      </motion.button>
    </Link>
  </motion.div>
);

export default AuthButtons;
