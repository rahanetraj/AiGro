// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import robotAnimation from "../assets/robot-welcome.json";
import DataRain from "../components/background/DataRain";
import FloatingLeaves from "../components/background/FloatingLeaves";
import Hologrid from "../components/background/Hologrid";
import BackIcon from "../components/BackIcon";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { loading, stopLoading, startLoading } = useLoading();
  const navigate = useNavigate();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "🔐 Authentification en cours...",
    "🌱 Accès au système AgriTech",
    "📊 Chargement de vos données",
    "🤖 Vérification des identifiants",
    "⚡ Connexion sécurisée activée",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    startLoading();
    login(email, password)
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(console.log)
      .finally(stopLoading);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
      <BackIcon />
      <DataRain />
      <Hologrid />
      <FloatingLeaves />

      {/* Assistant IA avec Lottie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
      >
        {/* Bulle de dialogue */}
        <motion.div
          className="bg-white/95 backdrop-blur-md px-5 py-4 rounded-3xl shadow-xl border border-emerald-200/30 max-w-xs relative overflow-hidden"
          style={{
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium text-emerald-800">
                {messages[currentMessageIndex]}
              </p>
              <div className="flex justify-end space-x-1 mt-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-emerald-400 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Animation Lottie */}
        <motion.div
          className="w-48 h-48"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Lottie
            animationData={robotAnimation}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      </motion.div>

      {/* Formulaire de Connexion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-zinc-200/50 z-50 shadow-2xl"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-emerald-950"
          >
            <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
              Connexion
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 mt-3 text-sm"
          >
            Accédez à votre tableau de bord intelligent
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Champ Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50/70 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/30 focus:border-transparent transition-all duration-200 placeholder-zinc-400 text-zinc-700 text-sm"
                placeholder="email@entreprise.com"
                required
              />
            </div>
          </motion.div>

          {/* Champ Mot de passe */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700"
            >
              Mot de passe
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50/70 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/30 focus:border-transparent transition-all duration-200 placeholder-zinc-400 text-zinc-700 text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </motion.div>

          {/* Bouton de connexion */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 5px 15px rgba(16, 185, 129, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-emerald-500 to-lime-500 shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
          >
            {loading ? (
              <>
                <ImSpinner9 className="animate-spin" />
                <span>Authentification...</span>
              </>
            ) : (
              "Se connecter"
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-zinc-500"
        >
          Nouveau sur AiGro ?{" "}
          <Link
            to="/register"
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
          >
            Créer un compte
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
