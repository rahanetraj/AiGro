import DataRain from "./background/DataRain";
import FloatingLeaves from "./background/FloatingLeaves";
import Hologrid from "./background/Hologrid";
import PulseEffect from "./ui/PulseEffect";

const MainBackground = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 relative overflow-hidden">
      <Hologrid />
      <DataRain />
      <FloatingLeaves />
      <PulseEffect />
      {children}
    </div>
  );
};

export default MainBackground;
