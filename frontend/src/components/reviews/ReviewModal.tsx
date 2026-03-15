import { useState } from "react";
import axios from "../../api/axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Rating,
  Box,
  Typography,
} from "@mui/material";

export default function ReviewModal({
  open,
  onClose,
  onSuccess,
}: any) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("message", form.message);
      formData.append("rating", form.rating.toString());

      if (image) formData.append("image", image);

      await axios.post("/reviews", formData);

      setSuccess(
        "Thank you! Your review has been submitted and is under verification."
      );

      setForm({ name: "", message: "", rating: 5 });
      setImage(null);

      onSuccess && onSuccess();   // ⭐ REFRESH REVIEWS

    } catch (err) {
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Write a Review</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>

          {success && (
            <Typography color="success.main">{success}</Typography>
          )}

          <TextField
            label="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <TextField
            label="Your Review"
            multiline
            rows={4}
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

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "120px", borderRadius: 8 }}
            />
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}