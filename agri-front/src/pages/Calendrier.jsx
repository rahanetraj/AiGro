/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import AILoader from "../components/AILoader";
import BreadCrumb from "../components/BreadCrumb";
import Header from "../components/Header";
import LocationSearch from "../components/LocationSearch";
import RecommandationCard from "../components/RecommandationCard";
import RecommandationModal from "../components/RecommandationModal";
import StatBox from "../components/StatBox";
import UserCard from "../components/UserCard";
import { useAuth } from "../hooks/useAuth";

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const Calendrier = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("fr-FR", { month: "long" })
  );
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const uri = "https://agri-back-fo2l.onrender.com/recommandations/";
  const { user } = useAuth();
  const [madagascarRegions, setMadagascarRegions] = useState(user?.region);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insightData, setInsightData] = useState(null);

  const fetchRecommendations = useCallback(
    (month) => {
      setIsLoading(true);
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: user?.pays,
          region: madagascarRegions,
          month: month,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRecommendations(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setIsLoading(false);
        });
    },
    [user?.pays, madagascarRegions]
  );

  useEffect(() => {
    fetchRecommendations(selectedMonth);
  }, [fetchRecommendations, selectedMonth]);
  [selectedMonth, user?.pays, user?.region];

  useEffect(() => {
    setInsightData((prev) => ({
      ...prev,
      selectedMonth,
      madagascarRegions,
      selectedCard,
    }));
  }, [selectedMonth, selectedCard, madagascarRegions]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-zinc-100">
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-4">
          <Header />
          <BreadCrumb />

          {/* Grille principale */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-6"
          >
            {/* Colonne de gauche */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
                className="space-y-6"
              >
                <UserCard
                  saison={recommendations?.season}
                  month={selectedMonth}
                  compact
                />

                {/* LocationSearch placé en dessous de UserCard */}
                <LocationSearch selectRegion={setMadagascarRegions} />
              </motion.div>

              {/* Carte Statistiques */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-emerald-950 flex items-center">
                    <span className="w-2 h-2 bg-lime-300 rounded-full mr-2"></span>
                    Statistiques Clés
                  </h2>
                </div>

                <div className="space-y-3">
                  <StatBox
                    label="Saison"
                    value={recommendations?.season || "N/A"}
                    delay={0.4}
                  />
                  {recommendations?.recommendations?.length > 0 && (
                    <>
                      <StatBox
                        label="Recommandations"
                        value={recommendations.recommendations.length}
                        delay={0.5}
                      />
                      <StatBox
                        label="Invest. moyen"
                        value={
                          recommendations.recommendations[0]
                            ?.estimated_cost_per_ha?.total_investment || "N/A"
                        }
                        delay={0.6}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Colonne de droite */}
            <div className="lg:col-span-4">
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-emerald-950">
                  <span className="text-lime-300">//</span> Recommandations pour{" "}
                  {selectedMonth}
                </h2>
                <div className="relative">
                  <button
                    onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                    className="px-4 py-2 text-base bg-white hover:bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between min-w-[180px] transition-colors duration-200 shadow-sm"
                  >
                    <span className="font-medium text-emerald-900 capitalize">
                      {selectedMonth}
                    </span>
                    <svg
                      className={`ml-2 w-5 h-5 transition-transform duration-200 text-emerald-600 ${
                        isMonthDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isMonthDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-lg z-10 border border-emerald-100 overflow-hidden"
                    >
                      {MONTHS.map((month) => (
                        <button
                          key={month}
                          onClick={() => handleMonthChange(month)}
                          className={`block w-full text-left px-4 py-3 text-base hover:bg-emerald-50 transition-colors duration-150 ${
                            month === selectedMonth
                              ? "bg-emerald-100 text-emerald-900 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {month.charAt(0).toUpperCase() + month.slice(1)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Grid des recommandations */}
              {isLoading ? (
                <div className="grid place-items-center min-h-[400px]">
                  <AILoader size="lg" />
                </div>
              ) : recommendations?.recommendations?.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence>
                    {recommendations.recommendations.map((rec, index) => (
                      <RecommandationCard
                        key={rec.id || index}
                        data={rec}
                        index={index}
                        onClick={() => {
                          setIsModalOpen(true);
                          setSelectedCard(rec);
                        }}
                        compact
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-white rounded-2xl p-8 text-center border border-emerald-50 shadow-lg"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="inline-block mb-4">
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-emerald-100"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-950 mb-2">
                    Aucune recommandation
                  </h3>
                  <p className="text-emerald-800">
                    L'IA n'a trouvé aucune suggestion pour {selectedMonth}.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {isModalOpen && (
        <RecommandationModal
          data={insightData}
          onClose={() => setInsightData(null)}
        />
      )}
    </div>
  );
};

export default Calendrier;
