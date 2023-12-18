import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import AddJob from "./pages/AddJob/AddJob";
import ViewJob from "./pages/ViewJob/ViewJob";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/view-job/:jobId" element={<ViewJob />} />
      </Routes>
    </>
  );
}

export default App;
