import { Box, Container } from "@mui/material";
import PageHero from "../components/common/PageHero";
import ServiceDetails from "../components/services/ServiceDetails";
import ServiceContactSection from "../components/home/ServiceContactSection";
import SolarCTASection from "../components/home/SolarCTASection"; // ⭐ ADD THIS

export default function ServicesPage() {
  return (
    <>
      {/* ⭐ HERO */}
      <PageHero
        title="Our Services"
        subtitle="Complete solar solutions for homes, businesses, and industries."
      />

      {/* ⭐ SERVICES CONTENT */}
      <Box sx={{ py: 8, backgroundColor: "#F8FAFC" }}>
        <Container maxWidth="lg">
          <ServiceDetails />
        </Container>
      </Box>

      {/* ⭐ SOLAR CTA SECTION */}
                  <SolarCTASection />


      {/* ⭐ CONTACT SECTION */}
      <ServiceContactSection />


    </>
  );
}