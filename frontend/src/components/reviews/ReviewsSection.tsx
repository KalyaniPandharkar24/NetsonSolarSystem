import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import ReviewModal from "./ReviewModal";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("/reviews").then((res) => {
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.reviews || [];
      setReviews(data);
    });
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Customer Reviews
      </Typography>

      <Grid container spacing={4}>
        {reviews.length === 0 && (
          <Typography align="center" sx={{ width: "100%" }}>
            No reviews yet
          </Typography>
        )}

        {reviews.map((r) => (
          <Grid item xs={12} md={4} key={r._id}>
            <Card sx={{ p: 2, height: "100%" }}>
              <CardContent>
                <Avatar
                  src={`http://localhost:5000${r.image}`}
                  sx={{ width: 60, height: 60, mb: 2 }}
                />

                <Typography variant="h6">{r.name}</Typography>

                <Rating value={r.rating} readOnly size="small" />

                <Typography mt={1}>{r.message}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        size="large"
        sx={{ display: "block", mx: "auto", mt: 6 }}
        onClick={() => setOpen(true)}
      >
        Write a Review
      </Button>

      <ReviewModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}