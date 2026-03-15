import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Chip,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";

import PageHero from "../components/common/PageHero";
import SolarCTASection from "../components/home/SolarCTASection";

import p1 from "../assets/p1.jpeg";
import p2 from "../assets/p2.jpeg";
import p3 from "../assets/p3.jpeg";
import p4 from "../assets/p4.jpeg";
import p5 from "../assets/p5.jpeg";
import p6 from "../assets/p6.jpeg";
import p7 from "../assets/p7.jpeg";
import p8 from "../assets/p8.jpeg";
import p9 from "../assets/p9.jpeg";

const images = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

const highlightChips = [
  "Residential rooftops",
  "Commercial rooftops",
  "Industrial systems",
  "Structure design",
  "Net metering support",
  "Subsidy support",
];

const Projects = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      {/* HERO */}
      <PageHero
        title="Projects"
        subtitle="A portfolio of installations delivered across Maharashtra."
      />

      {/* INTRO */}
      <Box sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} align="center" gutterBottom>
            Installation gallery
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}
          >
            Browse recent rooftop and on-site solar installations delivered for
            homes, businesses, and industrial sites. Each project is engineered
            for safety, clean execution, and long-term performance, with
            end-to-end support from site survey to commissioning.
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
            mt={3}
          >
            {highlightChips.map((label) => (
              <Chip
                key={label}
                label={label}
                variant="outlined"
                sx={{
                  borderColor: "#CBD5E1",
                  fontWeight: 700,
                  backgroundColor: "rgba(15,23,42,0.02)",
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* GALLERY */}
      <Box sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#F8FAFC" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                className="project-tile"
                role="button"
                tabIndex={0}
                aria-label="Open project photo"
                onClick={() => openAt(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openAt(index);
                }}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  aspectRatio: "4 / 3",
                  cursor: "zoom-in",
                  position: "relative",
                  outline: "none",
                  "& .tile-overlay": {
                    opacity: 0,
                    transform: "translateY(4px)",
                    transition: "opacity 180ms ease, transform 180ms ease",
                  },
                  "&:hover .tile-overlay": { opacity: 1, transform: "translateY(0px)" },
                  "&:focus-visible": {
                    boxShadow:
                      "0 0 0 3px rgba(22,163,74,0.25), 0 8px 20px rgba(0,0,0,0.06)",
                  },
                  "&:focus-visible .tile-overlay": {
                    opacity: 1,
                    transform: "translateY(0px)",
                  },
                }}
              >
                <Box
                  className="tile-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    display: "grid",
                    placeItems: "center",
                    background:
                      "linear-gradient(180deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.40) 100%)",
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      color: "#E2E8F0",
                      backgroundColor: "rgba(15,23,42,0.55)",
                      border: "1px solid rgba(226,232,240,0.18)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                    }}
                  >
                    <ZoomInOutlinedIcon />
                  </Box>
                </Box>
                <Box
                  component="img"
                  src={img}
                  alt="Netson solar project photo"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    transform: "scale(1.02)",
                    transition: "transform 220ms ease",
                    ".project-tile:hover &": { transform: "scale(1.06)" },
                    "@media (prefers-reduced-motion: reduce)": {
                      transition: "none",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Dialog
        open={lightboxOpen}
        onClose={closeLightbox}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "#0B1220",
            borderRadius: { xs: 0, sm: 3 },
            overflow: "hidden",
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "center",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={closeLightbox}
            aria-label="Close"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              color: "#E2E8F0",
              backgroundColor: "rgba(15,23,42,0.55)",
              border: "1px solid rgba(226,232,240,0.18)",
              "&:hover": { backgroundColor: "rgba(15,23,42,0.75)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              setActiveIndex((i) => (i - 1 + images.length) % images.length)
            }
            aria-label="Previous"
            sx={{
              position: "absolute",
              top: "50%",
              left: 12,
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "#E2E8F0",
              backgroundColor: "rgba(15,23,42,0.55)",
              border: "1px solid rgba(226,232,240,0.18)",
              "&:hover": { backgroundColor: "rgba(15,23,42,0.75)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
            aria-label="Next"
            sx={{
              position: "absolute",
              top: "50%",
              right: 12,
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "#E2E8F0",
              backgroundColor: "rgba(15,23,42,0.55)",
              border: "1px solid rgba(226,232,240,0.18)",
              "&:hover": { backgroundColor: "rgba(15,23,42,0.75)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Box
            component="img"
            src={images[activeIndex]}
            alt="Project photo"
            sx={{
              width: "100%",
              maxHeight: "82vh",
              display: "block",
              objectFit: "contain",
              backgroundColor: "#0B1220",
            }}
          />
        </Box>
      </Dialog>

      {/* QUALITY */}
      <Box
        sx={{
          pt: { xs: 7, md: 10 },
          pb: { xs: 4, md: 5 },
          backgroundColor: "#F3F4F6",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  p: { xs: 4, md: 5 },
                  borderRadius: 3,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background: "linear-gradient(90deg,#16A34A,#22C55E)",
                    opacity: 0.9,
                  },
                }}
              >
                <Typography variant="h5" fontWeight={800} sx={{ mb: 2, color: "#111827" }}>
                  Quality you can verify
                </Typography>

                <Typography
                  sx={{
                    color: "#4B5563",
                    lineHeight: 1.9,
                    fontSize: "1.02rem",
                  }}
                >
                  Quality is a system, not a slogan. We follow disciplined
                  checks across structure, wiring routes, protection, and
                  commissioning so performance stays stable over time, not just
                  on handover day.
                  <br />
                  <br />
                  From site survey to final testing, we keep workmanship clean
                  and documentation clear so the system is easy to inspect,
                  maintain, and support.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  p: { xs: 4, md: 5 },
                  borderRadius: 3,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background: "linear-gradient(90deg,#16A34A,#22C55E)",
                    opacity: 0.9,
                  },
                }}
              >
                <Typography variant="h5" fontWeight={800} sx={{ mb: 2, color: "#111827" }}>
                  Precision, safety, accountability
                </Typography>

                <Typography
                  sx={{
                    color: "#4B5563",
                    lineHeight: 1.9,
                    fontSize: "1.02rem",
                  }}
                >
                  Every mounting point, earthing run, and electrical connection
                  is executed with attention to detail. We build for safe
                  operation, clean routing, and serviceability so support is
                  straightforward for years.
                  <br />
                  <br />
                  Our teams follow process checks during installation and
                  testing. That is how we deliver consistent outcomes and
                  dependable support, not just an installation.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <SolarCTASection />
    </>
  );
};

export default Projects;
