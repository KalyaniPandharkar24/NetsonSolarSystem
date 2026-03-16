import { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Section from "../layout/Section";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const features = [
  {
    title: "In-house EPC team",
    desc: "Design, structure, installation, and commissioning are handled by our own trained crews.",
  },
  {
    title: "Transparent project process",
    desc: "Clear timelines, documented checks, and clean site handover on every installation.",
  },
  {
    title: "Subsidy and net metering support",
    desc: "We guide paperwork and approvals so you can move from quote to commissioning faster.",
  },
  {
    title: "Service after commissioning",
    desc: "Easy support for inspections, maintenance, and performance tracking.",
  },
];

const stats = [
  { value: 100, suffix: "%", label: "Quality checks" },
  { value: 5, suffix: "k", label: "kW delivered" },
  { value: 203, suffix: "", label: "Projects" },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  // Trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Count up animation
  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      setCounts(stats.map((s) => Math.floor(progress * s.value)));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [started]);

  return (
    <Box ref={sectionRef} sx={{ bgcolor: "#f5f7fa" }}>
      <Section>

        <Grid container spacing={8} alignItems="center">

          {/* LEFT SIDE */}
          <Grid item xs={12} md={6}>

            {/* HEADING */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.5px",
                mb: 2,
              }}
            >
              Why Choose Us?
            </Typography>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                color: "#6b7280",
                lineHeight: 1.75,
                mb: 6,
                maxWidth: 560,
                fontSize: "1rem",
              }}
            >
              We build solar systems that perform well beyond commissioning.
              Our focus is on safe installation, clean routing, and dependable
              service so customers get consistent output and clear support.
            </Typography>

            {/* STATS */}
            <Grid container spacing={4}>
              {stats.map((s, i) => (
                <Grid item xs={4} key={s.label}>
                  <Typography
                    sx={{
                      fontSize: "2.8rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: "#111827",
                    }}
                  >
                    {counts[i]}
                    {s.suffix}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                      mt: 1,
                      fontSize: "0.95rem",
                    }}
                  >
                    {s.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={6}>
            {features.map((f) => (
              <Box
                key={f.title}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: "#16A34A",
                    mr: 2,
                    mt: "3px",
                    fontSize: 22,
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      color: "#111827",
                    }}
                  >
                    {f.title}:
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                      lineHeight: 1.7,
                      fontSize: "0.98rem",
                    }}
                  >
                    {f.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>

        </Grid>

      </Section>
    </Box>
  );
};

export default WhyChooseUs;
