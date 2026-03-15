import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ApprovalIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import PowerIcon from "@mui/icons-material/Power";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const steps = [
  {
    title: "Site Survey & Analysis",
    description:
      "Our experts visit your location to evaluate roof space, sunlight exposure, and power requirements.",
    icon: <AssessmentIcon />,
  },
  {
    title: "Custom System Design",
    description:
      "We design a solar solution tailored to your energy usage and property layout.",
    icon: <DesignServicesIcon />,
  },
  {
    title: "Government Approvals",
    description:
      "We handle all documentation, subsidy processing, and net-metering approvals.",
    icon: <ApprovalIcon />,
  },
  {
    title: "Installation & Setup",
    description:
      "Certified technicians install panels, inverter, and wiring with safety standards.",
    icon: <BuildIcon />,
  },
  {
    title: "Testing & Commissioning",
    description:
      "System is tested and connected to the grid for optimal performance.",
    icon: <PowerIcon />,
  },
  {
    title: "After-Sales Support",
    description:
      "Ongoing maintenance, monitoring, and customer support for peace of mind.",
    icon: <SupportAgentIcon />,
  },
];

const InstallationProcessSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Our Solar Installation Process
          </Typography>
          <Typography color="text.secondary" maxWidth={650} mx="auto">
            From consultation to commissioning, we follow a transparent and
            hassle-free process to deliver reliable solar solutions.
          </Typography>
        </Box>

        {/* Steps */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          flexWrap="wrap"
          justifyContent="center"
        >
          {steps.map((step, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
                flex: "1 1 30%",
                minWidth: 260,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
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
                  borderRadius: "50%",
                  backgroundColor: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                {step.icon}
              </Box>

              <Typography fontWeight={600} gutterBottom>
                {step.title}
              </Typography>

              <Typography color="text.secondary" fontSize={14}>
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default InstallationProcessSection;
