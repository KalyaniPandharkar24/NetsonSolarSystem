import { useState } from "react";
import axios from "../../api/axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Rating,
  Box,
} from "@mui/material";

export default function ReviewForm() {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("message", form.message);
    data.append("rating", form.rating.toString());
    if (image) data.append("image", image);

    await axios.post("/reviews", data);

    alert("Review submitted for approval ✅");

    setForm({ name: "", message: "", rating: 5 });
    setImage(null);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Your Review
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Your Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <TextField
          label="Your Review"
          multiline
          rows={4}
          required
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <Rating
          value={form.rating}
          onChange={(_, value) =>
            setForm({ ...form, rating: value || 5 })
          }
        />

        <Button variant="outlined" component="label">
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
        </Button>

        <Button type="submit" variant="contained" size="large">
          Submit Review
        </Button>
      </Box>
    </Container>
  );
}