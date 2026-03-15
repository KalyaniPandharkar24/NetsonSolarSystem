import { Box, Typography, Button, Stack } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useEffect, useState } from "react";
import Section from "../layout/Section";
import QuoteSiteVisitDialog from "../common/QuoteSiteVisitDialog";

const images = [
  "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1600",
  "https://images.unsplash.com/photo-1629726797843-618688139f5a?w=1600",
  "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1600",
  "https://plus.unsplash.com/premium_photo-1679917152411-353fd633e218?w=1600",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [visitOpen, setVisitOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      data-navbar-hero="true"
      sx={{
        position: "relative",
        height: { xs: 580, md: 680 },
        overflow: "hidden",
        color: "#FFFFFF",
      }}
    >
      {images.map((img, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.55)",
        }}
      />

      <Section>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: 560,
            pt: { xs: 6, md: 7 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.4rem", md: "3.4rem" },
              fontWeight: 800,
              lineHeight: 1.12,
              mb: 3,
            }}
          >
            Reliable Rooftop Solar
            <br />
            Installation
            <br />
            Experts
          </Typography>

          <Typography
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              mb: 5,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Reduce electricity bills by up to 90% with
            high-quality solar systems for homes,
            businesses, and industries - installed by
            certified professionals.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setVisitOpen(true)}
              startIcon={
                <CalendarMonthRoundedIcon />
              }
              sx={{
                bgcolor: "#F59E0B",
                color: "#000",
                fontWeight: 700,
                px: 4,
                py: 1.4,
                borderRadius: 999,
                "&:hover": { bgcolor: "#D97706" },
              }}
            >
              Get Free Site Visit
            </Button>

            <Button
              variant="outlined"
              size="large"
              component="a"
              href="tel:+918010966816"
              sx={{
                borderColor: "#FFFFFF",
                color: "#FFFFFF",
                px: 3,
                borderRadius: 999,
                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.12)",
                },
              }}
            >
              Call Now
            </Button>
          </Stack>

          <Typography
            sx={{
              mt: 4,
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            MNRE Approved | ISO Certified | 5,000+ Installations
          </Typography>
        </Box>
      </Section>

      <QuoteSiteVisitDialog
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
        mode="visit"
      />
    </Box>
  );
};

export default Hero;
