import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExploreUniversities from "./pages/ExploreUniversities";
import UniversityDetails from "./pages/UniversityDetails";
import About from "./pages/About";
import Shortlist from "./pages/Shortlist";
import AdminUniversities from "./pages/AdminUniversities";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<ExploreUniversities />} />
          <Route path="/universities/:id" element={<UniversityDetails />} />
          <Route path="/shortlist" element={<Shortlist />} />
          <Route path="/admin/universities" element={<AdminUniversities />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
