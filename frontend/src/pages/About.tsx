import MainLayout from "../components/layout/MainLayout";
import { Typography, Box } from "@mui/material";

const About = () => {
  return (
    <MainLayout>
      <Box sx={{ px: 3, py: 6, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          About Netson Solar System
        </Typography>

        <Typography sx={{ color: "#475569" }}>
          Netson Solar System is dedicated to promoting clean energy through
          reliable and affordable solar solutions.
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default About;
