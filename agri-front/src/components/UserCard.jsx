// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const UserCard = ({ saison, month }) => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
              👨‍🌾
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              {user?.name.charAt(0)}
            </motion.div>
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-lg">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.pays}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
            <p className="text-xs text-emerald-600 mb-1">Région</p>
            <p className="font-medium">{user?.region}</p>
          </div>
          <div className="bg-lime-50/50 p-3 rounded-lg border border-lime-100">
            <p className="text-xs text-lime-600 mb-1">Mois</p>
            <p className="font-medium">{month}</p>
          </div>
          <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
            <p className="text-xs text-amber-600 mb-1">Saison</p>
            <p className="font-medium">{saison}</p>
          </div>
          <div className="bg-cyan-50/50 p-3 rounded-lg border border-cyan-100">
            <p className="text-xs text-cyan-600 mb-1">Statut</p>
            <p className="font-medium">Agriculteur</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
