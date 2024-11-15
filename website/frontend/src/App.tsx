import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Heart from "./pages/Heart"; // Adjust the path as needed
import Home from "./pages/Home";
import Diabetes from "./pages/Diabetes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heart-analysis" element={<Heart />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Redirect to home for unknown routes */}
      </Routes>
    </Router>
  );
};

export default App;
