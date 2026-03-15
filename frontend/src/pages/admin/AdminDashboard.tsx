import { useEffect, useState } from "react";
import axios from "../../api/axios";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import SolarPowerIcon from "@mui/icons-material/SolarPower";
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

  if (!stats) return <Typography>Loading...</Typography>;

  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <SolarPowerIcon fontSize="large" />,
      color: "#2563eb",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: <ReviewsIcon fontSize="large" />,
      color: "#f59e0b",
    },
    {
      title: "Contact Inquiries",
      value: stats.totalContacts,
      icon: <MailIcon fontSize="large" />,
      color: "#16a34a",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={4}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {cards.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.title}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                "&:hover": { boxShadow: 10 },
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary">
                      {s.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={800}>
                      {s.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: s.color,
                      color: "#fff",
                      p: 1.5,
                      borderRadius: 2,
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