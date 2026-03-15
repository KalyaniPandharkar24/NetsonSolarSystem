import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

const timelineData = [
  {
    year: "2020 - Foundation Year",
    date: "MARCH 2020",
    title: "Company Established",
    description:
      "Netson Solar System was established with a vision to make clean energy accessible and affordable. Began offering residential solar solutions in local markets."
  },
  {
    year: "100 kW Milestone",
    date: "JUNE 2021",
    title: "1st Milestone",
    description:
      "Installed over 100 kW of rooftop solar systems across Maharashtra. Partnered with certified component manufacturers for quality assurance."
  },
  {
    year: "Expansion into Commercial Sector",
    date: "DECEMBER 2021",
    title: "Commercial Expansion",
    description:
      "Successfully delivered 30+ commercial projects including schools, factories, and hospitals. Introduced net metering support and consulting services."
  },
  {
    year: "1 MW Cumulative Installation",
    date: "SEPTEMBER 2022",
    title: "2nd Milestone",
    description:
      "Crossed 1 Megawatt total installation mark. Launched Annual Maintenance Contracts (AMC) for long-term service support."
  },
  {
    year: "Achieved 150+ Satisfied Customers",
    date: "DECEMBER 2022",
    title: "Satisfied Customers",
    description:
      "Crossed the mark of 150+ solar system installations & other service work with glowing client reviews and zero system failures."
  },
  {
    year: "Installed 500 kW & 330 kW Government STP Plants Project at Chalisgaon",
    date: "FEBRUARY 2023",
    title: "3rd Milestone",
    description:
      "Successfully commissioned two government solar power plant projects (500 kW & 330 kW) at the Sewage Treatment Plant (STP) in Chalisgaon under strict compliance with government norms."
  },
  {
    year: "Commissioned 1.5 MW Solar Power Plant at Kannad Ghat, Ch. Sambhajinagar",
    date: "JUNE 2023",
    title: "4th Milestone",
    description:
      "Successfully executed a 1.5 MW ground-mounted solar power project with Avaada, showcasing engineering excellence and EPC strength."
  },
  {
    year: "Expansion Service & Support",
    date: "MAY 2024",
    title: "Service Centers Established",
    description:
      "Established service & support centers across major cities in Maharashtra to strengthen after-sales support and AMC response."
  }
];

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;

      const scrollPos = window.scrollY + window.innerHeight * 0.5;

      const pct = (scrollPos - sectionTop) / sectionHeight;
      const clamped = Math.min(Math.max(pct, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box ref={sectionRef} sx={{ py: 14, bgcolor: "#f8f9fb" }}>
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h3" fontWeight={800}>
            Company Timeline
          </Typography>

          <Typography color="text.secondary">
            Our Journey Towards Solar Excellence
          </Typography>
        </Box>

        {/* TIMELINE */}
        <Box sx={{ position: "relative" }}>

          {/* BASE LINE */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              bgcolor: "#e5e7eb",
              transform: "translateX(-50%)"
            }}
          />

          {/* PROGRESS LINE */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "2px",
              height: `${progress * 100}%`,
              bgcolor: "#ff3b00",
              transform: "translateX(-50%)",
              transition: "height 0.2s ease"
            }}
          />

          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0;

            return (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  mb: 14
                }}
              >

                {/* CARD */}
                <Paper
                  elevation={0}
                  sx={{
                    width: { xs: "100%", md: "38%" },
                    p: 4,
                    borderRadius: 2,
                    border: "2px solid #22c55e",
                    background: "#fff",
                    transition: "all .25s ease",
                    zIndex: 1,

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
                      borderColor: "#16a34a"
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.32rem",
                      fontWeight: 600,
                      mb: 0.8,
                      color: "#111827",
                      letterSpacing: "-0.2px"
                    }}
                  >
                    {item.year}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontSize: "0.96rem",
                      lineHeight: 1.7
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>

                {/* DOT */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: 48,
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    bgcolor: "#ff3b00",
                    border: "3px solid white",
                    boxShadow: "0 0 0 4px rgba(255,59,0,0.18)",
                    zIndex: 2
                  }}
                />

                {/* SIDE LABEL */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 44,
                    left: isLeft ? "55%" : "auto",
                    right: isLeft ? "auto" : "55%",
                    width: 220,
                    textAlign: isLeft ? "left" : "right",
                    display: { xs: "none", md: "block" }
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ff3b00",
                      fontWeight: 700
                    }}
                  >
                    {item.date}
                  </Typography>

                  <Typography color="text.secondary">
                    {item.title}
                  </Typography>
                </Box>

              </Box>
            );
          })}
        </Box>

      </Container>
    </Box>
  );
};

export default TimelineSection;