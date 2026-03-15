import { Box, Grid, Typography } from "@mui/material";
import Section from "../layout/Section";

import teamImg from "../../assets/team.webp";

const AboutSection = () => {
  return (
    <Box sx={{ bgcolor: "#f6f8fb" }}>
      <Section>

        <Grid container spacing={8} alignItems="center">

          {/* ===== LEFT CONTENT ===== */}
          <Grid item xs={12} md={6}>

            {/* SMALL LABEL */}
            <Typography
              sx={{
                color: "#ef4444",
                fontWeight: 600,
                mb: 2,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              About Us
            </Typography>

            {/* MAIN HEADING */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                lineHeight: 1.18,
                mb: 3,
                maxWidth: 520,
                color: "#111827",
              }}
            >
              We Are a Powerful Modern Team in Renovating
            </Typography>

            {/* PARAGRAPH 1 */}
            <Typography
              sx={{
                color: "#4b5563",
                lineHeight: 1.8,
                mb: 2.5,
                maxWidth: 560,
                fontSize: "1.02rem",
              }}
            >
              At Netson Solar System, we are pioneers in delivering
              sustainable energy solutions that meet the growing demand
              for renewable power. Our company was founded on the
              principles of innovation, reliability, and customer
              satisfaction.
            </Typography>

            {/* PARAGRAPH 2 */}
            <Typography
              sx={{
                color: "#4b5563",
                lineHeight: 1.8,
                maxWidth: 560,
                fontSize: "1.02rem",
              }}
            >
              With a dedicated team of solar experts, we provide
              comprehensive solar energy solutions tailored to the
              needs of residential, commercial, and industrial clients
              while supporting a cleaner, greener future.
            </Typography>

          </Grid>

          {/* ===== RIGHT IMAGE ===== */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={teamImg}
                alt="Netson Solar Team"
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  height: 360,
                  objectFit: "cover",
                  borderRadius: 4, // ⭐ slightly more premium
                  boxShadow:
                    "0 30px 60px rgba(0,0,0,0.10), 0 8px 20px rgba(0,0,0,0.06)",
                }}
              />
            </Box>
          </Grid>

        </Grid>

      </Section>
    </Box>
  );
};

export default AboutSection;
