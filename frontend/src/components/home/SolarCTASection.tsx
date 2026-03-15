import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ⭐ YOUR IMAGES
import cta1 from "../../assets/cta1.jpg";
import cta2 from "../../assets/cta2.jpg";
import cta3 from "../../assets/cta3.jpg";
import cta4 from "../../assets/cta4.jpg";

const images = [cta1, cta2, cta3, cta4];

const SolarCTASection = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: { xs: 460, md: 580 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Backgrounds */}
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
            transform: i === index ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1.8s ease, transform 7s ease",
          }}
        />
      ))}

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,31,58,0.55), rgba(11,31,58,0.85))",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", maxWidth: 920, px: 3 }}>
        
        <Typography
          sx={{
            fontSize: { xs: "2.2rem", md: "3.2rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Start Your Solar Journey Today
        </Typography>

        <Box
          sx={{
            width: 140,
            height: 2,
            bgcolor: "rgba(255,255,255,0.7)",
            mx: "auto",
            my: 3,
          }}
        />

        <Typography
          sx={{
            fontSize: { xs: "1.05rem", md: "1.25rem" },
            opacity: 0.95,
            mb: 4,
          }}
        >
          Get a customized solar solution designed to reduce your electricity
          bills and maximize long-term savings.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
          sx={{
            bgcolor: "#F59E0B",
            color: "#000",
            px: 6,
            py: 1.6,
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: 2,
            boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
            "&:hover": {
              bgcolor: "#D97706",
              transform: "translateY(-2px)",
            },
          }}
        >
          GET A FREE QUOTE
        </Button>

        <Typography
          sx={{
            mt: 3,
            fontSize: "0.95rem",
            opacity: 0.85,
          }}
        >
          ✔ MNRE Approved • ✔ ISO Certified • ✔ Professional Installation
        </Typography>
      </Box>
    </Box>
  );
};

export default SolarCTASection;