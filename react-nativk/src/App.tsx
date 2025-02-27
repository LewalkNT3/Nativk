import LoginPage from "./pages/AuthPages/LoginPage";
import MeasurementPage from "./pages/MeasurementPages/measurement";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import Navbar from "./Components/Navbar";

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../services/RoutesAuth/PrivateRoute"; // Importa PrivateRoute
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/measurement"
              element={
                <PrivateRoute>
                  <MeasurementPage />
                </PrivateRoute>
              }
            />{" "}
            {/* Ruta protegida */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />{" "}
            {/* Ruta protegida */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
