import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HandshakeIcon from "@mui/icons-material/Handshake";

const certifications = [
  {
    title: "MNRE Approved",
    description:
      "Registered vendor under Ministry of New & Renewable Energy for solar installations.",
    icon: <SolarPowerIcon fontSize="large" />,
  },
  {
    title: "ISO Certified Company",
    description:
      "Certified for quality management and safety standards in solar projects.",
    icon: <VerifiedIcon fontSize="large" />,
  },
  {
    title: "Experienced Engineers",
    description:
      "Team of trained and certified solar engineers with on-field experience.",
    icon: <EngineeringIcon fontSize="large" />,
  },
  {
    title: "Trusted Partners",
    description:
      "We use Tier-1 solar panels and inverters from trusted brands.",
    icon: <HandshakeIcon fontSize="large" />,
  },
];

const CertificationsSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Trusted & Certified Solar Experts
          </Typography>
          <Typography color="text.secondary" maxWidth={650} mx="auto">
            We follow government standards and use certified components to
            deliver safe and reliable solar solutions.
          </Typography>
        </Box>

        {/* Cards */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          flexWrap="wrap"
        >
          {certifications.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
                flex: "1 1 220px",
                minWidth: 220,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>

              <Typography fontWeight={600} gutterBottom>
                {item.title}
              </Typography>

              <Typography
                fontSize={14}
                color="text.secondary"
              >
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default CertificationsSection;
