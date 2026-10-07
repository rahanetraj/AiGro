// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router";
import AILoader from "../components/AILoader";
import BreadCrumb from "../components/BreadCrumb";
import ChatBot from "../components/ChatBot";
import GrowthChart from "../components/GrowthChart";
import Header from "../components/Header";
import PlantHealth from "../components/PlantHealth";
import SmartAnalysis from "../components/SmartAnalysis";
import FloatingChatBot from '../components/FloatingChatBot';
import { useState } from "react";

export default function AnalysisPage() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { result, image } = location.state || {};

  return (
    <div className={`relative min-h-screen bg-zinc-100 `}>
      <div className={`container mx-auto px-4 pb-4 ${isOpen? "blur-xs": "" }`}>
        <Header />
        <BreadCrumb />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ height: "320px" }}
            >
              {image ? (
                <>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Analyse plante"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <motion.h1
                      className="text-3xl font-bold text-white"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {result.type}
                    </motion.h1>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                  <AILoader size="lg" />
                </div>
              )}
            </motion.div>

            {/* PlantHealth */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <PlantHealth data={result} />
            </motion.div>
            {/* GrowthChart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <GrowthChart symptoms={result?.symptoms} />
            </motion.div>
          </div>

          {/* Deuxième ligne - 2 éléments côte-à-côte */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ChatBot */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ChatBot result={result} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </motion.div>

            {/* SmartAnalysis */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <SmartAnalysis />
            </motion.div>
          </div>
        </motion.div>
      </div>
      <FloatingChatBot isOpen={isOpen} setIsOpen={setIsOpen} result={result}/>
    </div>
  );
}
