import LoginPage from "./pages/AuthPages/LoginPage";
import MeasurementPage from "./pages/MeasurementPages/measurement";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AllMeasurementsPage from "./pages/MeasurementPages/all-measurements";

import Navbar from "./Components/Navbar";

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../services/RoutesAuth/PrivateRoute"; // Importa PrivateRoute
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-10 h-full max-w-[900px]">
          <div>
            <Navbar />
          </div>
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/measurements"
                element={
                  <PrivateRoute>
                    <AllMeasurementsPage />
                  </PrivateRoute>
                }
              />{" "}
              <Route
                path="measurements/create"
                element={
                  <PrivateRoute>
                    <MeasurementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />{" "}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
