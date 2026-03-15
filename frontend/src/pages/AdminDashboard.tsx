import MainLayout from "../components/layout/MainLayout";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const stats = [
  { title: "Total Projects", value: 120 },
  { title: "Active Installations", value: 32 },
  { title: "Customers", value: 280 },
  { title: "Reviews", value: 95 },
];

const AdminDashboard = () => {
  return (
    <MainLayout>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default AdminDashboard;
