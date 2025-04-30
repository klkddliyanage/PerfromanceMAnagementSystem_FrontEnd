import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Goals from "./components/Goals"; // Don't forget to create this

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Goals" element={<Goals />} />
    </Routes>
  );
}

export default App;
