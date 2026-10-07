// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const RecommandationCard = ({ data, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    {
      bg: "bg-white",
      border: "border-emerald-100",
      accent: "bg-emerald-950",
      text: "text-emerald-950",
      highlight: "bg-lime-300",
    },
    {
      bg: "bg-white",
      border: "border-emerald-50",
      accent: "bg-emerald-800",
      text: "text-emerald-800",
      highlight: "bg-lime-200",
    },
    {
      bg: "bg-white",
      border: "border-emerald-50",
      accent: "bg-emerald-700",
      text: "text-emerald-700",
      highlight: "bg-lime-100",
    },
  ];

  const colorSet = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`rounded-xl overflow-hidden shadow-sm ${colorSet.bg} ${colorSet.text} border ${colorSet.border} h-full relative`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Barre d'accentuation animée */}
      <motion.div
        className={`absolute top-0 left-0 h-1 ${colorSet.highlight}`}
        initial={{ width: "30%" }}
        animate={{ width: isHovered ? "100%" : "30%" }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        className="h-full flex flex-col"
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <motion.span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${colorSet.highlight}`}
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                />
                <h3 className="text-lg font-semibold truncate">{data.name}</h3>
              </div>
              <motion.span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${colorSet.accent} text-white`}
                animate={{
                  y: isHovered ? [0, -1, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                {data.type}
              </motion.span>
            </div>
            <motion.span
              className={`text-sm font-mono ${colorSet.text} opacity-70`}
              animate={{
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              #{index + 1}
            </motion.span>
          </div>

          <ul className="space-y-2 mb-4 flex-grow">
            {data.reasons.slice(0, 2).map((reason, i) => (
              <motion.li
                key={i}
                className="flex items-start"
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <motion.span
                  className={`mr-2 inline-block text-lime-300`}
                  animate={{
                    rotate: isHovered ? [0, 10, 0] : 0,
                  }}
                >
                  ▸
                </motion.span>
                <span className="text-sm">{reason}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                isHovered
                  ? `${colorSet.accent} text-white`
                  : "bg-white text-emerald-800 border border-emerald-100"
              } transition-colors`}
            >
              <span>{isHovered ? "Voir détails" : "Plus d'infos"}</span>
              <motion.span
                animate={{ x: isHovered ? [0, 2, 0] : 0 }}
                transition={{ duration: 0.6 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecommandationCard;
