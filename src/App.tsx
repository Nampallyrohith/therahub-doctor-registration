import Authentication from "./components/routes/Authentication";
import Dashboard from "./components/routes/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" replace />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
