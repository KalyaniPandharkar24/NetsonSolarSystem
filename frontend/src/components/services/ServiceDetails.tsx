import { Box, Typography } from "@mui/material";
import { useState } from "react";

const services = [
  {
    title: "SOLAR POWER PLANT",
    desc: "We design, install, and commission large-scale solar power plants for residential, commercial, and industrial clients. Our systems are tailored to maximize energy production, reduce costs, and ensure long-term sustainability.",
  },
  {
    title: "SOLAR WATER HEATER",
    desc: "Our solar water heaters provide an eco-friendly and cost-effective solution for heating water using the sun’s energy. Ideal for homes and businesses, these systems reduce electricity consumption and lower utility bills.",
  },
  {
    title: "SOLAR STREET LIGHT",
    desc: "Our solar street lights are designed for reliable and energy-efficient outdoor lighting. Perfect for roads, parks, and public spaces, these lights operate independently from the grid, reducing energy costs and improving safety.",
  },
  {
    title: "HEAT PUMP",
    desc: "We offer advanced heat pump systems that provide efficient heating and cooling solutions for residential and commercial buildings, reducing energy consumption and enhancing comfort.",
  },
  {
    title: "SOLAR FENCING SYSTEM",
    desc: "We offer solar-powered fencing solutions for securing agricultural land, industrial sites, and residential properties. These systems are a sustainable and cost-effective alternative to traditional electric fencing.",
  },
  {
    title: "SOLAR POWER PLANT OPERATION & MAINTENANCE",
    desc: "We provide comprehensive operation and maintenance (O&M) services for solar power plants, ensuring optimal performance, minimal downtime, and long-term reliability.",
  },
  {
    title: "SOLAR WATER HEATER MAINTENANCE",
    desc: "Our maintenance services for solar water heaters include regular inspections, cleaning, and repairs to keep your system operating efficiently and extend its lifespan.",
  },
  {
    title: "ELECTRICAL CHARGING STATION",
    desc: "We design and install electric vehicle (EV) charging stations that are compatible with all major EV models. Our stations are built to provide fast, reliable charging while promoting the use of clean energy.",
  },
];

export default function ServiceDetails() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {services.map((s, i) => {
        const isActive = activeIndex === i;

        return (
          <Box
            key={s.title}
            onClick={() => setActiveIndex(i)}
            sx={{
              height: 300,
              px: 3,
              py: 4,
              cursor: "pointer",
              borderRadius: 2,

              backgroundColor: isActive ? "#16a34a" : "#f1f5f9",
              color: isActive ? "#ffffff" : "#1f2937",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",

              transition: "all .35s cubic-bezier(.4,0,.2,1)",

              boxShadow: isActive
                ? "0 18px 40px rgba(0,0,0,0.25)"
                : "none",

              transform: isActive
                ? "translateY(-6px)"
                : "none",

              "&:hover": {
                backgroundColor: isActive
                  ? "#15803d"
                  : "#22c55e",
                color: "#ffffff",
                transform: "translateY(-4px)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
              },

              // ⭐ underline heading when card is hovered
              "&:hover .service-title": {
                textDecoration: "underline",
                textUnderlineOffset: "6px",
              },
            }}
          >
            <Typography
              className="service-title"
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: 0.7,
                transition: "all .3s ease",
              }}
            >
              {s.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
              }}
            >
              {s.desc}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}