import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Container, Grid, Card, CardContent, Typography, Avatar, Rating } from "@mui/material";

export default function ReviewsList() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/reviews").then((res) => {
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.reviews || [];
      setReviews(data);
    });
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Customer Reviews
      </Typography>

      <Grid container spacing={3}>
        {reviews.length === 0 && (
          <Typography align="center" sx={{ width: "100%" }}>
            No reviews yet
          </Typography>
        )}

        {reviews.map((r) => (
          <Grid item xs={12} md={4} key={r._id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Avatar
                  src={`http://localhost:5000${r.image}`}
                  sx={{ width: 60, height: 60, mb: 2 }}
                />

                <Typography variant="h6">{r.name}</Typography>

                <Rating value={r.rating} readOnly />

                <Typography sx={{ mt: 1 }}>
                  {r.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}