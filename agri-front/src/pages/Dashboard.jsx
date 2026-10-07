// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import DataRain from "../components/background/DataRain";
import FloatingLeaves from "../components/background/FloatingLeaves";
import Hologrid from "../components/background/Hologrid";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import { useLoading } from "../hooks/useLoading";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { loading, stopLoading, startLoading } = useLoading();

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const postData = async (dataToSend) => {
    if (!file) return;
    try {
      startLoading();
      const response = await fetch(
        "https://agri-back-fo2l.onrender.com/plant-healths/",
        {
          method: "POST",
          body: dataToSend,
        }
      );

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const result = await response.json();
      navigate("/analysis", { state: { result, image: file } });
      toast.success("Analyse lancée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'envoi");
      console.error("Erreur:", error);
    } finally {
      stopLoading();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("plant_image", file);
    postData(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <Header />
        <DataRain />
        <Hologrid />
        <FloatingLeaves />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16"
        >
          <motion.section
            className="text-center mb-20"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
                Solutions IA
              </span>{" "}
              pour l'agriculture moderne
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Optimisez chaque aspect de votre exploitation avec nos
              technologies intelligentes
            </motion.p>
          </motion.section>

          <motion.section
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
          >
            <ServiceCard
              title="Diagnostic Intelligent"
              content="Notre IA analyse en temps réel la santé de vos cultures avec une précision inégalée."
              buttonText="Démarrer l'analyse"
              action={() => setIsModalOpen(true)}
            />
            <ServiceCard
              title="Optimisation Culturale"
              content="Planification intelligente adaptée à votre sol, climat et objectifs de production."
              buttonText="Voir les recommandations"
              action={() => navigate("/recommandation")}
            />
          </motion.section>
        </motion.main>
      </div>
      {/* Modal futuriste */}
      {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg overflow-auto border border-gray-200/50"
            >
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
                      Analyse IA
                    </span>
                  </h2>
                  <motion.button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    whileHover={{ rotate: 90 }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <AiOutlineClose size={24} />
                  </motion.button>
                </div>

                <motion.div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    file
                      ? "border-emerald-400 bg-emerald-50/50"
                      : "border-gray-300 hover:border-emerald-300 bg-gray-50"
                  }`}
                  whileHover={{ scale: file ? 1 : 1.02 }}
                >
                  <label className="cursor-pointer">
                    <AiOutlineCloudUpload className="mx-auto text-4xl text-emerald-500 mb-4" />
                    <p className="text-gray-600 mb-2">
                      {file
                        ? "Image prête pour analyse"
                        : "Glissez-déposez ou cliquez pour sélectionner"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Formats supportés: JPG, PNG (max. 10MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </motion.div>

                {file && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6"
                  >
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={!file || loading}
                  className={`w-full mt-8 flex justify-center items-center py-3 px-6 rounded-xl font-medium text-white ${
                    loading
                      ? "bg-emerald-400"
                      : "bg-gradient-to-r from-emerald-500 to-lime-500 hover:shadow-lg"
                  } transition-all`}
                  whileHover={!loading && !file ? {} : { scale: 1.02 }}
                  whileTap={!loading && !file ? {} : { scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <ImSpinner9 className="animate-spin mr-3" />
                      <span>Analyse en cours...</span>
                    </>
                  ) : (
                    <span>
                      {file ? "Lancer l'analyse IA" : "Sélectionnez une image"}
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

      {/* Toaster personnalisé */}
      {toast.custom((t) => (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className={`px-6 py-3 rounded-xl shadow-xl ${
            t.type === "error"
              ? "bg-red-500"
              : "bg-gradient-to-r from-emerald-500 to-lime-500"
          } text-white font-medium`}
        >
          {t.message}
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;
