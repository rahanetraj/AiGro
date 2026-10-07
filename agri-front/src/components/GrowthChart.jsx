import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GrowthChart({ symptoms }) {
  const [data, setData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("Month");

  useEffect(() => {
    if (symptoms && symptoms.progression_speed) {
      const speed = symptoms.progression_speed;
      const initialValue = 2;

      let generatedData = [];

      if (selectedPeriod === "Month") {
        generatedData = Array.from({ length: 5 }, (_, index) => ({
          name: ["Jan", "Feb", "Mar", "Apr", "May"][index],
          value: initialValue + index * (speed / 10),
        }));
      } else if (selectedPeriod === "Week") {
        generatedData = Array.from({ length: 7 }, (_, index) => ({
          name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
          value: initialValue + index * (speed / 20),
        }));
      } else if (selectedPeriod === "Year") {
        generatedData = Array.from({ length: 12 }, (_, index) => ({
          name: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][index],
          value: initialValue + index * (speed / 5),
        }));
      }

      setData(generatedData);
    }
  }, [symptoms, selectedPeriod]);

  return (
    <div className="grid grid-rows-1 space-y-6">
      <div className="bg-[#E8F3DC] rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Croissance</h2>
          <select
            className="bg-transparent border-none text-sm cursor-pointer hover:opacity-75"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="Month">Mois</option>
            <option value="Week">Semaine</option>
            <option value="Year">Année</option>
          </select>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#333" }} />
              <YAxis tick={{ fill: "#333" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
