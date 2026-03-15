import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const SolarCalculatorSection = () => {
  const [bill, setBill] = useState<number | "">("");
  const [type, setType] = useState("residential");
  const [result, setResult] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    message: "",
  });

  // ===== CALCULATE =====
  const calculate = () => {
    if (!bill || bill <= 0) return;

    const units = bill / 8;
    const systemSize = +(units / 120).toFixed(1);
    const monthlySavings = Math.round(bill * 0.75);
    const annualSavings = monthlySavings * 12;
    const payback = type === "residential" ? 4 : 3;

    setResult({
      systemSize,
      monthlySavings,
      annualSavings,
      payback,
    });
  };

  // ===== SEND TO WHATSAPP =====
  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.city) {
      alert("Please fill required fields");
      return;
    }

    const message = `
Hello Netson Solar,

I am interested in rooftop solar installation.

Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Email: ${form.email || "Not provided"}

Estimated System Size: ${result?.systemSize || "-"} kW
Estimated Monthly Savings: ₹${result?.monthlySavings?.toLocaleString() || "-"}

Additional Details:
${form.message || "None"}
    `;

    const url =
      "https://wa.me/918010966816?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");

    setOpen(false);
    setForm({
      name: "",
      phone: "",
      city: "",
      email: "",
      message: "",
    });
  };

  return (
    <Box
      sx={{
        py: { xs: 7, md: 9 },
        background: "linear-gradient(180deg,#ECFDF5,#F8FAFC)",
      }}
    >
      <Container maxWidth="sm">
        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h5"
            fontWeight={900}
            color="#14532D"
          >
            💰 Save Up To 90% on Your Electricity Bill
          </Typography>

          <Typography mt={1} color="text.secondary">
            Enter your monthly bill to see solar savings instantly
          </Typography>
        </Box>

        {/* MAIN CARD */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #BBF7D0",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
          }}
        >
          <Stack spacing={2.5}>
            <TextField
              size="small"
              label="Monthly Bill (₹)"
              type="number"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              fullWidth
            />

            <TextField
              size="small"
              select
              label="Property Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
            >
              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
            </TextField>

            <Button
              variant="contained"
              onClick={calculate}
              sx={{
                backgroundColor: "#16A34A",
                fontWeight: 800,
                py: 1.2,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#15803D" },
              }}
            >
              Calculate My Savings
            </Button>

            {/* RESULT */}
            {result && (
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  backgroundColor: "#F0FDF4",
                  border: "1px solid #86EFAC",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={900}
                  color="#166534"
                  textAlign="center"
                  mb={1}
                >
                  ₹{result.monthlySavings.toLocaleString()} / month savings
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1}>
                  <Row label="System Size" value={result.systemSize + " kW"} />
                  <Row
                    label="Annual Savings"
                    value={"₹" + result.annualSavings.toLocaleString()}
                  />
                  <Row label="Payback" value={result.payback + " years"} />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box textAlign="center">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{
                      backgroundColor: "#16A34A",
                      fontWeight: 800,
                    }}
                  >
                    Get Exact Quote on WhatsApp
                  </Button>
                </Box>
              </Paper>
            )}
          </Stack>
        </Paper>
      </Container>

      {/* WHATSAPP MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Get Your Solar Quote</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              size="small"
              label="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              size="small"
              label="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Email (Optional)"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              fullWidth
            />

            {/* ⭐ CUSTOM MESSAGE FIELD */}
            <TextField
              size="small"
              label="Additional Details (Optional)"
              multiline
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#16A34A", fontWeight: 700 }}
          >
            Send via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const Row = ({ label, value }: any) => (
  <Box display="flex" justifyContent="space-between">
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={600}>{value}</Typography>
  </Box>
);

export default SolarCalculatorSection;