import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
  Divider,
  MenuItem,
} from "@mui/material";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);

      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* TITLE */}
      <Typography variant="h5" fontWeight={700} mb={1}>
        Request a Free Consultation
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Fill out the form and our solar experts will contact you shortly.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2.5} component="form" onSubmit={handleSubmit}>
        {success && (
          <Alert severity="success">
            Thank you! Our team will contact you soon.
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />

        {/* ⭐ SERVICE DROPDOWN */}
        <TextField
          select
          label="Service Interested In"
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          fullWidth
        >
          <MenuItem value="Solar Power Plant">Solar Power Plant</MenuItem>
          <MenuItem value="Solar Water Heater">Solar Water Heater</MenuItem>
          <MenuItem value="Solar Street Light">Solar Street Light</MenuItem>
          <MenuItem value="Heat Pump">Heat Pump</MenuItem>
          <MenuItem value="Solar Fencing">Solar Fencing System</MenuItem>
          <MenuItem value="EV Charging Station">
            EV Charging Station
          </MenuItem>
          <MenuItem value="Maintenance">Maintenance / Service</MenuItem>
        </TextField>

        <TextField
          label="Message (Optional)"
          name="message"
          value={form.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            py: 1.6,
            fontWeight: 700,
            fontSize: "16px",
            backgroundColor: "#16A34A",
            "&:hover": { backgroundColor: "#15803D" },
          }}
        >
          {loading ? "Submitting..." : "Get Free Consultation"}
        </Button>
      </Stack>

      
    </Paper>
  );
};

export default ContactForm;