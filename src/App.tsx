import Authentication from "./components/routes/Authentication";
import Dashboard from "./components/routes/Dashboard";
import { Route, Routes } from "react-router-dom";
import Header from "./shared/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/authenication" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
