import { Box, Typography, LinearProgress, Container } from "@mui/material";

import skillsImg from "../../assets/skills.webp";

const skills = [
  { label: "Best Performance", value: 95 },
  { label: "High Quality", value: 98 },
  { label: "Top Team", value: 95 },
];

const SkillsSection = () => {
  return (
    <Box sx={{ bgcolor: "#f5f7fa", py: 10 }}>
      <Container maxWidth="lg">

        {/* ⭐ FLEX ROW (guaranteed side-by-side) */}
        <Box
          sx={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" }, // mobile stack
          }}
        >

          {/* ===== LEFT IMAGE ===== */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
            }}
          >
            {/* Orange Accent */}
            <Box
              sx={{
                position: "absolute",
                top: -20,
                left: -20,
                width: 110,
                height: 110,
                bgcolor: "#ff3d00",
                zIndex: 0,
              }}
            />

            <Box
              component="img"
              src={skillsImg}
              alt="Skills"
              sx={{
                width: "100%",
                maxHeight: 340,
                objectFit: "cover",
                borderRadius: 2,
                position: "relative",
                zIndex: 1,
                display: "block",
                boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
              }}
            />
          </Box>

          {/* ===== RIGHT TEXT ===== */}
          <Box sx={{ flex: 1 }}>

            <Typography
              sx={{
                color: "#ff3d00",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Skills
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 4,
                lineHeight: 1.2,
                color: "#111827",
              }}
            >
              Turning Solar Knowledge into Real-World Impact
            </Typography>

            {skills.map((s) => (
              <Box key={s.label} sx={{ mb: 3 }}>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: "#374151" }}>
                    {s.label}
                  </Typography>

                  <Typography sx={{ color: "#374151" }}>
                    {s.value} %
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={s.value}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    bgcolor: "#e5e7eb",

                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#ff3d00",
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
            ))}

          </Box>

        </Box>

      </Container>
    </Box>
  );
};

export default SkillsSection;
