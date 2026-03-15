import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Services from "../pages/ServicesPage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Projects from "../pages/Projects";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default PublicRoutes;
