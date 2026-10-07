// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroContent = () => {
  return (
    <motion.div
      className="lg:w-1/2"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        whileHover={{ x: 5 }}
      >
        <span className="text-lime-300">Agriculture</span>
        <br />
        <span className="text-white">Intelligente</span>
      </motion.h2>

      <motion.p
        className="text-white/80 mb-8 text-lg max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Solution complète d'agriculture intelligente utilisant l'IA pour
        optimiser vos rendements.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link to="/login">
          <motion.button
            className="px-6 py-3 rounded-full font-medium text-emerald-950 bg-lime-300 shadow-lg shadow-lime-300/30"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(190, 242, 100, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explorer la Plateforme
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
