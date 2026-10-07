// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const StatBox = ({ label, value, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-3 rounded-lg border border-emerald-50 hover:border-lime-300 transition-colors"
    >
      <p className="text-xs text-emerald-800 mb-1">{label}</p>
      <motion.p
        className="text-lg font-semibold text-emerald-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

export default StatBox;
