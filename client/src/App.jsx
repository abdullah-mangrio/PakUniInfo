import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import ExploreUniversities from "./pages/ExploreUniversities";
import UniversityDetails from "./pages/UniversityDetails";
import About from "./pages/About";
import Shortlist from "./pages/Shortlist";
import AdminUniversities from "./pages/AdminUniversities";
import Compare from "./pages/Compare";
import Guidance from "./pages/Guidance";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<ExploreUniversities />} />
          <Route path="/universities/:id" element={<UniversityDetails />} />
          <Route path="/shortlist" element={<Shortlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/guidance" element={<Guidance />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/universities" element={<AdminUniversities />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
