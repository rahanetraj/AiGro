// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiCalendar,
  FiDroplet,
  FiThermometer,
} from "react-icons/fi";

const stats = [
  {
    icon: <FiAlertCircle className="text-red-500 text-xl" />,
    title: "Maladie détectée",
    value: "symptoms.name",
    color: "bg-red-50",
  },
  {
    icon: <FiDroplet className="text-blue-500 text-xl" />,
    title: "Cause probable",
    value: "symptoms.cause",
    color: "bg-blue-50",
  },
  {
    icon: <FiThermometer className="text-orange-500 text-xl" />,
    title: "Gravité",
    value: "symptoms.severity",
    color: "bg-amber-50",
  },
  {
    icon: <FiCalendar className="text-emerald-500 text-xl" />,
    title: "Saison à risque",
    value: "symptoms.seasonal_tendency",
    color: "bg-emerald-50",
  },
];

export default function PlantHealth({ data }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-emerald-950">
          Diagnostic de la plante : {data.type}
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-4 p-4 ${stat.color} rounded-lg hover:shadow-md transition-all`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <motion.div whileHover={{ scale: 1.1 }}>{stat.icon}</motion.div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="font-semibold text-gray-900">
                {eval(`data.${stat.value}`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
