import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import PageHero from "../components/common/PageHero";
import ContactForm from "../components/contact/ContactForm";

type QuickContact = {
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
};

const ContactPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const phoneInput = document.querySelector<HTMLInputElement>('input[name="phone"]');
      phoneInput?.focus();
    }, 200);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("callback") === "1") {
      handleScrollToForm();
      navigate("/contact", { replace: true });
    }
  }, [location.search, navigate]);

  const quickContacts: QuickContact[] = [
    {
      title: "WhatsApp expert desk",
      description:
        "Share photos, site requirements, or subsidy queries. Get quick guidance from our solar team.",
      actionLabel: "Open WhatsApp",
      href: "https://wa.me/918010966816",
      icon: <WhatsAppIcon color="success" />,
    },
    {
      title: "Dedicated service hotline",
      description:
        "Call now or request a callback to schedule a free site visit.",
      actionLabel: "Request callback",
      onClick: handleScrollToForm,
      icon: <PhoneCallbackIcon color="primary" />,
    },
    {
      title: "Saturday solar clinics",
      description:
        "Book a weekend consultation at our Chimbali Phata office.",
      actionLabel: "Book visit",
      href: "https://www.google.com/maps/place/Chimbali+Phata,+Pune,+Maharashtra+410501",
      icon: <LocationOnIcon color="warning" />,
    },
  ];

  const commitments = [
    "Response guarantee: new inquiries receive a reply within one working day.",
    "Site visit report delivered within 24h of survey.",
    "Subsidy guidance and documentation help until commissioning.",
  ];

  const serviceAreas = ["Pune", "Mumbai", "Nashik", "Aurangabad", "Satara", "Kolhapur"];

  useEffect(() => {
    document.title = "Contact Netson Solar System | Free Solar Consultation";
  }, []);

  return (
    <>
      {/* HERO */}
      <PageHero
        title="Contact Netson Solar System"
        subtitle="Get a free site visit, system design consultation, and subsidy guidance from our solar experts."
      />

      {/* MAIN */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#F8FAFC" }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="stretch">
            {/* LEFT - FORM */}
            <Box sx={{ flex: 1 }} id="contact-form">
              <ContactForm />
            </Box>

            {/* RIGHT - CONTACT INFO */}
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

              {/* FULL ADDRESS */}
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
                    textDecoration: "underline",
                  },
                }}
              >
                📍 Plot no. 161, Office no. 03, 1st Floor, Priyanka Warehouse, Pune-Nashik
                Road, Near Shell Petrol Pump, Chimbali Phata, Pune, Maharashtra - 410501
              </Typography>

              {/* CLICKABLE PHONE */}
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

              {/* CLICKABLE EMAIL */}
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

              {/* GOOGLE MAP */}
              <Box
                sx={{
                  width: "100%",
                  height: 280,
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
                  src="https://www.google.com/maps?q=Chimbali%20Phata%20Pune&output=embed"
                />
              </Box>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* QUICK CONTACTS */}
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          backgroundColor: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={1} mb={4}>
            <Typography variant="h5" fontWeight={800}>
              Need help faster?
            </Typography>
            <Typography color="text.secondary">
              Choose the channel that works best. Every option reaches our in-house team for site visit scheduling, estimates, and subsidy guidance.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="stretch">
            {quickContacts.map((contact, idx) => (
              <Paper
                key={contact.title}
                elevation={0}
                sx={{
                  flex: 1,
                  border: "1px solid #E2E8F0",
                  borderRadius: 4,
                  p: { xs: 2.5, md: 3 },
                  minHeight: { xs: "auto", md: 240 },
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "4px solid #16A34A",
                  background:
                    "linear-gradient(180deg, rgba(22,163,74,0.08) 0%, rgba(255,255,255,1) 60%)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: 0,
                  transform: "translateY(10px)",
                  animation: "contactCardIn 540ms cubic-bezier(0.2, 0.75, 0.2, 1) forwards",
                  animationDelay: `${idx * 90}ms`,
                  transition:
                    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, filter 180ms ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(600px 120px at 30% 0%, rgba(22,163,74,0.16), transparent 55%)",
                    opacity: 0,
                    transition: "opacity 220ms ease",
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.015)",
                    boxShadow: "0 24px 55px rgba(15, 23, 42, 0.12)",
                    borderColor: "rgba(22,163,74,0.35)",
                    "&::before": { opacity: 1 },
                    "& .qc-badge": {
                      transform: "translateY(-4px) rotate(-4deg) scale(1.04)",
                    },
                  },
                  "&:active": {
                    transform: "translateY(-2px) scale(0.995)",
                  },
                  "@keyframes contactCardIn": {
                    "0%": { opacity: 0, transform: "translateY(10px)" },
                    "100%": { opacity: 1, transform: "translateY(0px)" },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    opacity: 1,
                    transform: "none",
                    transition: "none",
                    "&::before": { transition: "none" },
                  },
                }}
              >
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Box
                    className="qc-badge"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "rgba(22,163,74,0.10)",
                      border: "1px solid rgba(22,163,74,0.22)",
                      transition: "transform 220ms ease",
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {contact.title}
                  </Typography>
                </Stack>

                <Typography color="text.secondary" mt={1} flexGrow={1}>
                  {contact.description}
                </Typography>

                {contact.href ? (
                  <Button
                    component="a"
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderRadius: 999,
                      fontWeight: 700,
                      textTransform: "none",
                      py: 1.0,
                      backgroundColor: "#16A34A",
                      "&:hover": { backgroundColor: "#15803D" },
                    }}
                    variant="contained"
                  >
                    {contact.actionLabel}
                  </Button>
                ) : (
                  <Button
                    onClick={contact.onClick}
                    fullWidth
                    sx={{
                      mt: 2,
                      borderRadius: 999,
                      fontWeight: 700,
                      textTransform: "none",
                      py: 1.0,
                      backgroundColor: "#16A34A",
                      "&:hover": { backgroundColor: "#15803D" },
                    }}
                    variant="contained"
                  >
                    {contact.actionLabel}
                  </Button>
                )}
              </Paper>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* COMMITMENTS + COVERAGE */}
      <Box sx={{ py: { xs: 7, md: 9 }, backgroundColor: "#F8FAFC" }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: 5,
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
              overflow: "hidden",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }}>
              <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" fontWeight={800} mb={1.5}>
                  Our promise to every contact
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Clear timelines so you always know what happens next.
                </Typography>
                <List dense sx={{ p: 0 }}>
                  {commitments.map((promise) => (
                    <ListItem
                      key={promise}
                      disableGutters
                      sx={{ py: 1, alignItems: "flex-start" }}
                    >
                      <ListItemIcon sx={{ minWidth: 34, mt: "2px" }}>
                        <CheckCircleOutlineIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={promise}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Divider
                flexItem
                orientation="vertical"
                sx={{ display: { xs: "none", md: "block" }, borderColor: "#E2E8F0" }}
              />
              <Divider
                sx={{ display: { xs: "block", md: "none" }, borderColor: "#E2E8F0" }}
              />

              <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" fontWeight={800} mb={1.5}>
                  Service reach and hours
                </Typography>
                <Typography color="text.secondary" mb={2.5}>
                  Field engineers and subsidy experts cover these zones. WhatsApp support runs round-the-clock.
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2.5 }}>
                  {serviceAreas.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "#CBD5E1",
                        backgroundColor: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.25}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <AccessTimeIcon color="action" />
                    <Typography variant="body2" fontWeight={800}>
                      Office hours: Mon-Sat, 9AM-6PM
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label="WhatsApp 24x7"
                    sx={{
                      backgroundColor: "rgba(22, 163, 74, 0.10)",
                      color: "#166534",
                      fontWeight: 800,
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ContactPage;
