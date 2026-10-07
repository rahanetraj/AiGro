import React, { useEffect, useMemo, useRef, useState } from "react";

const LocationSearch = ({ selectRegion }) => {
  // Liste complète des régions et provinces de Madagascar
  const madagascarRegions = useMemo(() => {
    return [
      { id: "R1", name: "Analamanga", type: "Région", capital: "Antananarivo" },
      {
        id: "R2",
        name: "Vakinankaratra",
        type: "Région",
        capital: "Antsirabe",
      },
      { id: "R3", name: "Itasy", type: "Région", capital: "Miarinarivo" },
      {
        id: "R4",
        name: "Bongolava",
        type: "Région",
        capital: "Tsiroanomandidy",
      },
      { id: "R5", name: "Sofia", type: "Région", capital: "Antsohihy" },
      { id: "R6", name: "Boeny", type: "Région", capital: "Mahajanga" },
      { id: "R7", name: "Betsiboka", type: "Région", capital: "Maevatanana" },
      { id: "R8", name: "Melaky", type: "Région", capital: "Maintirano" },
      {
        id: "R9",
        name: "Alaotra-Mangoro",
        type: "Région",
        capital: "Ambatondrazaka",
      },
      { id: "R10", name: "Atsinanana", type: "Région", capital: "Toamasina" },
      {
        id: "R11",
        name: "Analanjirofo",
        type: "Région",
        capital: "Fenoarivo Atsinanana",
      },
      {
        id: "R12",
        name: "Amoron'i Mania",
        type: "Région",
        capital: "Ambositra",
      },
      {
        id: "R13",
        name: "Haute Matsiatra",
        type: "Région",
        capital: "Fianarantsoa",
      },
      {
        id: "R14",
        name: "Vatovavy-Fitovinany",
        type: "Région",
        capital: "Manakara",
      },
      {
        id: "R15",
        name: "Atsimo-Atsinanana",
        type: "Région",
        capital: "Farafangana",
      },
      { id: "R16", name: "Ihorombe", type: "Région", capital: "Ihosy" },
      { id: "R17", name: "Menabe", type: "Région", capital: "Morondava" },
      {
        id: "R18",
        name: "Atsimo-Andrefana",
        type: "Région",
        capital: "Toliara",
      },
      { id: "R19", name: "Androy", type: "Région", capital: "Ambovombe" },
      { id: "R20", name: "Anosy", type: "Région", capital: "Tôlanaro" },
      { id: "R21", name: "Diana", type: "Région", capital: "Antsiranana" },
      { id: "R22", name: "Sava", type: "Région", capital: "Sambava" },
      { id: "P1", name: "Antananarivo", type: "Province" },
      { id: "P2", name: "Antsiranana", type: "Province" },
      { id: "P3", name: "Fianarantsoa", type: "Province" },
      { id: "P4", name: "Mahajanga", type: "Province" },
      { id: "P5", name: "Toamasina", type: "Province" },
      { id: "P6", name: "Toliara", type: "Province" },
    ];
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(madagascarRegions);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filtre les résultats
  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions(madagascarRegions);
      return;
    }

    const filtered = madagascarRegions.filter(
      (item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.capital &&
          item.capital.toLowerCase().includes(inputValue.toLowerCase()))
    );

    setSuggestions(filtered);
  }, [inputValue, madagascarRegions]);

  // Gestion du clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (location) => {
    setSelectedLocation(location);
    selectRegion(location.capital);
    setInputValue(location.name);
    setShowDropdown(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedLocation(null);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Recherchez une région ou province de Madagascar..."
          className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-100 outline-none transition-all text-gray-700 shadow-xl bg-white"
        />
        <div className="absolute left-4 top-4.5 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {showDropdown && (
        <div className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-auto">
          <div className="px-4 py-2 bg-gray-50 border-b text-sm font-medium text-gray-500">
            {inputValue ? "Résultats" : "Toutes les régions/provinces"}
          </div>
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-3 hover:bg-lime-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-800 flex items-center">
                  {item.type === "Province" ? (
                    <span className="mr-2 text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="mr-2 text-lime-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                  {item.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span
                    className={`inline-block ${
                      item.type === "Province"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-lime-100 text-lime-800"
                    } text-xs px-2 py-0.5 rounded mr-2`}
                  >
                    {item.type}
                  </span>
                  {item.capital && <span>Capitale: {item.capital}</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">Aucun résultat trouvé</div>
          )}
        </div>
      )}

      {selectedLocation && (
        <div className="mt-6 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start">
            <div
              className={`flex-shrink-0 p-3 rounded-lg ${
                selectedLocation.type === "Province"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-lime-100 text-lime-600"
              }`}
            >
              {selectedLocation.type === "Province" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedLocation.name}
              </h3>
              <div className="mt-1">
                <span
                  className={`inline-block ${
                    selectedLocation.type === "Province"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-lime-100 text-lime-800"
                  } text-xs font-medium px-2.5 py-0.5 rounded-full`}
                >
                  {selectedLocation.type}
                </span>
              </div>
              {selectedLocation.capital && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-500">
                    Capitale régionale:
                  </h4>
                  <p className="text-gray-700">{selectedLocation.capital}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
