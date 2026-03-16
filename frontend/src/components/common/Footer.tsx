import { Box, Typography, Grid, Divider, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import logo from "../../assets/logo.webp";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "#0f172a",
        color: "#fff",
        mt: "auto",
        borderTop: "4px solid #16A34A",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 3, md: 4 },
          py: { xs: 6, md: 7 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 2 }}
          columnSpacing={{ xs: 3, md: 1.5 }}
        >
          {/* Brand */}
          <Grid item xs={12} md={7} lg={6}>
            <Box
              component="img"
              src={logo}
              alt="Netson Solar"
              sx={{
                width: 200,
                mb: 2,
                background: "#fff",
                p: 1,
                borderRadius: 1,
                transition: "transform 180ms ease, box-shadow 180ms ease",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
                },
              }}
            />

            <Typography
              sx={{
                color: "#cbd5e1",
                lineHeight: 1.8,
                fontSize: 16,
                maxWidth: "100%",
                whiteSpace: "nowrap",
              }}
            >
              Providing reliable, affordable, and sustainable solar energy solutions for homes and businesses.
            </Typography>

            <Typography
              component="a"
              href="https://www.google.com/maps/place/Chimbali+Phata,+Pune,+Maharashtra+410501"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                ...contactStyle,
                display: "block",
                mt: 2,
                maxWidth: 360,
                fontSize: 14,
                lineHeight: 1.7,
                textDecoration: "none",
                "&:hover": {
                  color: "#16A34A",
                },
              }}
            >
              Plot no. 161, Office no. 03, 1st Floor, Priyanka Warehouse,
              Pune-Nashik Road, Near Shell Petrol Pump, Chimbali Phata, Pune,
              Maharashtra - 410501
            </Typography>
          </Grid>

          {/* Links + Contact (tighter grouping) */}
          <Grid item xs={12} md={5} lg={6}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 4, md: 2 },
                flexWrap: { xs: "wrap", md: "wrap", lg: "nowrap" },
                alignItems: "flex-start",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="h6" sx={headingStyle}>
                  Pages
                </Typography>

                <Box sx={underline} />

                <Typography component={Link} to="/" sx={linkStyle}>
                  Home
                </Typography>

                <Typography component={Link} to="/services" sx={linkStyle}>
                  Services
                </Typography>

                <Typography component={Link} to="/projects" sx={linkStyle}>
                  Projects
                </Typography>

                <Typography component={Link} to="/contact" sx={linkStyle}>
                  Contact
                </Typography>
              </Box>

              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" sx={headingStyle}>
                  Contact
                </Typography>

                <Box sx={underline} />

                <Stack spacing={1.25} sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PlaceOutlinedIcon sx={{ color: "#94a3b8" }} fontSize="small" />
                    <Typography sx={contactStyle}>Pune, Maharashtra</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <EmailOutlinedIcon sx={{ color: "#94a3b8" }} fontSize="small" />
                    <Typography sx={contactStyle}>netsonsolarsystem@gmail.com</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <LocalPhoneOutlinedIcon sx={{ color: "#94a3b8" }} fontSize="small" />
                    <Typography sx={contactStyle}>+91 8010966816</Typography>
                  </Stack>
                </Stack>

                {/* Social icons */}
                <Box sx={{ mt: 1 }}>
                  <IconButton sx={socialStyle} aria-label="Facebook">
                    <FacebookIcon />
                  </IconButton>

                  <IconButton sx={socialStyle} aria-label="Twitter">
                    <TwitterIcon />
                  </IconButton>

                  <IconButton sx={socialStyle} aria-label="LinkedIn">
                    <LinkedInIcon />
                  </IconButton>

                  <IconButton sx={socialStyle} aria-label="Instagram">
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: "#334155" }} />

        <Typography
          align="center"
          sx={{
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          © {new Date().getFullYear()} Netson Solar System. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

/* styles */

const headingStyle = {
  mb: 1,
  fontWeight: 600,
};

const underline = {
  width: 40,
  height: 2,
  background: "#16A34A",
  mb: 2,
};

const linkStyle = {
  color: "#cbd5e1",
  display: "block",
  mb: 1,
  textDecoration: "none",
  transition: "0.3s",
  "&:hover": {
    color: "#16A34A",
    transform: "translateX(3px)",
  },
};

const contactStyle = {
  color: "#cbd5e1",
  mb: 0,
};

const socialStyle = {
  color: "#cbd5e1",
  background: "#1e293b",
  mr: 1,
  transform: "translateY(0px) scale(1)",
  transition: "transform 180ms ease, background-color 180ms ease, color 180ms ease",
  "&:hover": {
    background: "rgba(22, 163, 74, 0.18)",
    color: "#16A34A",
    transform: "translateY(-2px) scale(1.06)",
  },
};

export default Footer;
