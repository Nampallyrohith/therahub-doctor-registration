import Authentication from "./components/routes/Authentication";
import Dashboard from "./components/routes/Dashboard";
import DoctorProfile from "./components/doctorProfile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/authenication" element={<Authentication />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/doctorProfile" element={<DoctorProfile />} />
    </Routes>
  );
}

export default App;
