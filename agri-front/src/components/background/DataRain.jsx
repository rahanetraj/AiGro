// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMemo } from "react";

const DataRain = () => {
  const columns = useMemo(
    () =>
      Array.from({ length: Math.floor(window.innerWidth / 40) }, () =>
        Array.from({ length: 8 }, () => ({
          char: Math.random() > 0.7 ? "🌱" : Math.random() > 0.5 ? "1" : "0",
          size: Math.random() * 16 + 10,
          speed: Math.random() * 15 + 10,
          opacity: Math.random() * 0.6 + 0.2,
        }))
      ),
    []
  );

  return (
    <div className="absolute inset-0 flex justify-between overflow-hidden opacity-30 pointer-events-none">
      {columns.map((col, i) => (
        <div key={i} className="relative h-full w-px">
          {col.map((item, j) => (
            <motion.div
              key={j}
              className="absolute text-lime-300 font-mono"
              style={{
                left: 0,
                top: `${-20 - Math.random() * 20}%`,
                fontSize: `${item.size}px`,
                opacity: item.opacity,
              }}
              animate={{
                y: `150vh`,
              }}
              transition={{
                duration: item.speed,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {item.char}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataRain;
