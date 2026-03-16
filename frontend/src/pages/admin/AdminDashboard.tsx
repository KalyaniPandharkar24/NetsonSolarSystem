import { useEffect, useState } from "react";
import axios from "../../api/axios";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";

import ReviewsIcon from "@mui/icons-material/Reviews";
import MailIcon from "@mui/icons-material/Mail";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const token = localStorage.getItem("adminToken");

  const fetchStats = async () => {
    const res = await axios.get("/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <Typography color="text.secondary">
        Loading dashboard...
      </Typography>
    );
  }

  const cards = [
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: <ReviewsIcon fontSize="large" />,
      color: "#f59e0b",
      showWhenZero: true,
    },
    {
      title: "Contact Inquiries",
      value: stats.totalContacts,
      icon: <MailIcon fontSize="large" />,
      color: "#16a34a",
      showWhenZero: true,
    },
  ];

  const visibleCards = cards.filter(
    (card) => card.value > 0 || card.showWhenZero
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          Dashboard Overview
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Track incoming leads and review activity at a glance.
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 3,
          p: 2.5,
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          background:
            "linear-gradient(90deg, #F8FAFC 0%, #F1F5F9 100%)",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography fontWeight={700}>
              Projects are managed in the website code
            </Typography>
            <Typography color="text.secondary">
              You are using hardcoded project images, so the dashboard
              does not track project counts.
            </Typography>
          </Box>
          <Chip
            label="Static gallery"
            sx={{
              bgcolor: "#E2E8F0",
              color: "#0F172A",
              fontWeight: 600,
            }}
          />
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {visibleCards.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.title}>
            <Card
              sx={{
                borderRadius: 5,
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                boxShadow:
                  "0 16px 30px rgba(15, 23, 42, 0.08)",
                transition:
                  "transform .25s ease, box-shadow .25s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    "0 22px 40px rgba(15, 23, 42, 0.14)",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      fontWeight={600}
                      letterSpacing={0.3}
                    >
                      {s.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={800}
                      sx={{ mt: 0.6 }}
                    >
                      {s.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: s.color,
                      color: "#fff",
                      p: 1.8,
                      borderRadius: 3,
                      boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
                    }}
                  >
                    {s.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
