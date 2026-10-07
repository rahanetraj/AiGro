import { ChevronDownIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Header from "../components/Header";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Icônes pour les sections
const sectionIcons = {
  "Préparation du sol": "🌱",
  Plantation: "🪴",
  Entretien: "✂️",
  Récolte: "🧺",
  Conseils: "💡",
  default: "✅",
};

// Palette de couleurs sécurisées
const colors = {
  primary: {
    from: "#059669", // emerald-600
    to: "#84cc16", // lime-500
  },
  text: {
    dark: "#1e293b", // slate-800
    light: "#f8fafc", // slate-50
  },
  background: {
    from: "#f8fafc", // slate-50
    to: "#e0f2fe", // blue-50
  },
  accent: "#059669", // emerald-600
  muted: "#94a3b8", // slate-400
};

const CulturePlan = () => {
  const location = useLocation();
  const responseData = location.state || {};
  const [expandedSection, setExpandedSection] = useState(null);
  const pdfRef = useRef();

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Couleurs aléatoires compatibles
  const getRandomColor = () => {
    const colorSets = [
      "bg-blue-50 text-blue-800 border-blue-100",
      "bg-green-50 text-green-800 border-green-100",
      "bg-yellow-50 text-yellow-800 border-yellow-100",
      "bg-purple-50 text-purple-800 border-purple-100",
      "bg-pink-50 text-pink-800 border-pink-100",
      "bg-indigo-50 text-indigo-800 border-indigo-100",
    ];
    return colorSets[Math.floor(Math.random() * colorSets.length)];
  };

  const downloadPDF = async () => {
    try {
      // Ouvrir toutes les sections avant capture
      const allSections = responseData.map((_, i) => i);
      setExpandedSection(allSections);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const element = pdfRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: colors.text.light,
        ignoreElements: (el) => {
          // Ignorer les éléments avec des animations
          return (
            el.classList.contains("animate-bounce") ||
            el.classList.contains("transition-transform")
          );
        },
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("plan-culture.pdf");

      // Réinitialiser l'état des sections
      setExpandedSection(null);
    } catch (error) {
      console.error("Erreur PDF:", error);
      alert("Erreur lors de la génération. Essayez avec Chrome ou Firefox.");
    }
  };

  return (
    <div
      className="min-h-screen px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.background.from}, ${colors.background.to})`,
      }}
    >
      <div className="container mx-auto">
        <Header />
        <BreadCrumb />
        <div className="max-w-4xl mx-auto" ref={pdfRef}>
          {/* En-tête */}
          <div className="pdf-header flex flex-col items-center mb-8">
            <div
              className="relative rounded-full p-4 mb-4 shadow-xl animate-bounce"
              style={{
                background: `linear-gradient(to right, ${colors.primary.from}, ${colors.primary.to})`,
              }}
            >
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
            <h1
              className="text-4xl font-bold text-center mb-2"
              style={{ color: colors.text.dark }}
            >
              Votre Plan de Culture{" "}
              <span
                style={{
                  background: `linear-gradient(to right, ${colors.primary.from}, ${colors.primary.to})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Personnalisé
              </span>
            </h1>
            <p
              className="font-medium mb-4 flex items-center"
              style={{ color: colors.primary.from }}
            >
              <span className="mr-2">✨</span> Conseils adaptés à vos besoins
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-5">
            {responseData.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md transition-all duration-200 overflow-hidden"
                style={{
                  border:
                    expandedSection === index
                      ? `2px solid ${colors.primary.from}`
                      : "none",
                }}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-5 flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="text-xl"
                      style={{
                        transform:
                          expandedSection === index ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      {sectionIcons[section.name] || sectionIcons.default}
                    </div>
                    <h2
                      className="text-lg font-semibold"
                      style={{
                        color:
                          expandedSection === index
                            ? colors.primary.from
                            : colors.text.dark,
                      }}
                    >
                      {section.name}
                    </h2>
                  </div>
                  <ChevronDownIcon
                    className="w-5 h-5 transition-transform"
                    style={{
                      transform:
                        expandedSection === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      color:
                        expandedSection === index
                          ? colors.primary.from
                          : colors.muted,
                    }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: expandedSection === index ? "1000px" : "0",
                    opacity: expandedSection === index ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-5 pt-0 grid md:grid-cols-2 gap-4">
                    {section.content.map((item, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-lg flex items-start gap-3 transition-all hover:scale-[1.02] ${getRandomColor()}`}
                      >
                        <div className="mt-1 flex-shrink-0 text-xl">
                          {i % 3 === 0 ? "🌿" : i % 3 === 1 ? "💧" : "☀️"}
                        </div>
                        <p className="leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton de téléchargement */}
          <div
            className="mt-10 rounded-2xl p-6 text-center text-white shadow-xl transition-transform hover:scale-[1.01]"
            style={{
              background: `linear-gradient(to right, ${colors.primary.from}, ${colors.primary.to})`,
            }}
          >
            <div className="flex justify-center mb-3">
              <div
                className="relative rounded-full p-4 mb-4 shadow-xl animate-bounce"
                style={{
                  background: `linear-gradient(to right, ${colors.primary.from}, ${colors.primary.to})`,
                }}
              >
                <SparklesIcon className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Votre culture optimisée</h3>
            <p className="mb-4 opacity-90">
              Appliquez ces conseils pour de meilleurs résultats
            </p>
            <button
              onClick={downloadPDF}
              className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex items-center mx-auto"
              style={{ color: colors.primary.from }}
            >
              <span>Télécharger le guide</span>
              <ChevronDownIcon className="w-4 h-4 ml-2 transform rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturePlan;
