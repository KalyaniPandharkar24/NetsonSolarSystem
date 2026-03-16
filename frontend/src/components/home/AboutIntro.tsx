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
                color: "#16A34A",
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
              Netson Solar System delivers rooftop solar done right
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
              We are a Maharashtra based solar EPC team specializing in
              residential, commercial, and industrial rooftop systems. Our
              focus is simple: clean design, safe execution, and dependable
              performance for years after commissioning.
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
              From site survey and structure design to subsidy guidance and
              after-sales support, we handle the full project lifecycle with
              clear communication and documented quality checks.
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
