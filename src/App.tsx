import { JSX } from "react";
import Authentication from "./components/routes/Authentication";
import Dashboard from "./components/routes/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./shared/NotFound";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("doctorToken");
  return token ? children : <Navigate to="/authentication" replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("doctorToken");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/authentication" replace />} />

      <Route
        path="/authentication"
        element={
          <PublicRoute>
            <Authentication />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
