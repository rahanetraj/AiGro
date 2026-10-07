// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { VscArrowRight } from "react-icons/vsc";

const ServiceCard = ({ title, content, buttonText, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all z-20"
    >
      <div className="flex flex-col h-full space-y-5">
        <div>
          <div className="w-8 h-1 bg-gradient-to-r from-emerald-400 to-lime-400 mb-3 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>

        <p className="text-gray-600 flex-grow">{content}</p>

        <motion.button
          whileHover={{
            boxShadow: "0 4px 15px rgba(134, 239, 172, X)",
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.96 }}
          className="w-full px-6 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-emerald-500 to-lime-500 shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
          onClick={action}
        >
          <span>{buttonText}</span>
          <motion.div
            animate={{
              x: [0, 4, 0],
              transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              },
            }}
          >
            <VscArrowRight size={18} className="text-emerald-950" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
