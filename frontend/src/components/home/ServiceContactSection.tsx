import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import ContactForm from "../contact/ContactForm";


const ServiceContactSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="lg">

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          alignItems="stretch"
        >
          {/* LEFT — FORM */}
          <Box sx={{ flex: 1 }}>
            <ContactForm />
          </Box>

          {/* RIGHT — INFO */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: "1px solid #E2E8F0",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              Contact Information
            </Typography>

            {/* ⭐ FULL ADDRESS */}
            <Typography
              component="a"
              href="https://www.google.com/maps/place/Chimbali+Phata,+Pune,+Maharashtra+410501"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mb: 2,
                display: "block",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  color: "#16a34a",
                  textDecoration: "underline"
                }
              }}
            >
              📍 Plot no. 161, Office no. 03, 1st Floor,
              Priyanka Warehouse, Pune–Nashik Road,
              Near Shell Petrol Pump, Chimbali Phata,
              Pune, Maharashtra — 410501
            </Typography>

            {/* ⭐ CLICKABLE PHONE */}
            <Typography
              component="a"
              href="tel:+918010966816"
              sx={{
                display: "block",
                mb: 1,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              📞 +91 8010966816
            </Typography>

            {/* ⭐ CLICKABLE EMAIL */}
            <Typography
              component="a"
              href="mailto:info@netsonsolarsystem.com"
              sx={{
                display: "block",
                mb: 3,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ✉️ info@netsonsolarsystem.com
            </Typography>

            <Box
              sx={{
                width: "100%",
                height: 280,
                mt: 3,
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              <iframe
                title="Netson Solar Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.google.com/maps?q=Pune&output=embed"
              />
            </Box>
          </Paper>

        </Stack>

      </Container>
    </Box>
  );
};

export default ServiceContactSection;