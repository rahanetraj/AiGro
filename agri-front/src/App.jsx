import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthContextProvider from "./components/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectConnected from "./components/RedirectConnected";
import AnalysisPage from "./pages/AnalysisPage";
import Calendrier from "./pages/Calendrier";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CulturePlan from "./pages/CulturePlan";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectConnected>
                <Login />
              </RedirectConnected>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <RedirectConnected>
                <Home />
              </RedirectConnected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommandation"
            element={
              <ProtectedRoute>
                <Calendrier />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute>
                <AnalysisPage />
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/recommandation/culturePlan"
            element={
              <ProtectedRoute>
                <CulturePlan />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
