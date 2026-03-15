import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: "quote" | "visit";
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
  city: "",
  bill: "",
  propertyType: "",
  roofType: "",
  address: "",
  date: "",
};

const QuoteSiteVisitDialog = ({
  open,
  onClose,
  mode,
}: Props) => {
  const isQuote = mode === "quote";

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    type: "success" as "success" | "error",
    message: "",
  });

  /* ===== INPUT CHANGE ===== */

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ===== SUBMIT ===== */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            type: isQuote ? "quote" : "site_visit",
          }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      /* SUCCESS TOAST */
      setToast({
        open: true,
        type: "success",
        message:
          "Request submitted successfully! Our team will contact you soon.",
      });

      /* RESET FORM — NOT CLOSING DIALOG */
      setForm(initialForm);
    } catch {
      setToast({
        open: true,
        type: "error",
        message:
          "Submission failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= DIALOG ================= */}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent
          sx={{
            p: { xs: 3, md: 4 },
            background:
              "linear-gradient(180deg,#ECFDF5,#F0FDF4)",
          }}
        >
          {/* HEADER */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h5"
              fontWeight={900}
              color="#14532D"
            >
              {isQuote
                ? "Get Instant Solar Quote"
                : "Book Free Site Visit"}
            </Typography>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography color="#166534" mb={3}>
            {isQuote
              ? "Fill details to receive a customized solar estimate."
              : "Our expert will visit your location for inspection."}
          </Typography>

          {/* FORM CARD */}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "#FFFFFF",
              p: 3,
              borderRadius: 3,
              border: "1px solid #BBF7D0",
              boxShadow:
                "0 12px 28px rgba(0,0,0,0.06)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              {/* COMMON */}

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
                label="Email (optional)"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
              />

              {/* QUOTE MODE */}

              {isQuote ? (
                <>
                  <TextField
                    label="City / Pincode"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Monthly Electricity Bill (₹)"
                    name="bill"
                    value={form.bill}
                    onChange={handleChange}
                    required
                    fullWidth
                  />

                  <TextField
                    select
                    label="Property Type"
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    required
                    fullWidth
                  >
                    <MenuItem value="Residential">
                      Residential
                    </MenuItem>
                    <MenuItem value="Commercial">
                      Commercial
                    </MenuItem>
                    <MenuItem value="Industrial">
                      Industrial
                    </MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Roof Type"
                    name="roofType"
                    value={form.roofType}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="RCC">RCC</MenuItem>
                    <MenuItem value="Metal">
                      Metal Sheet
                    </MenuItem>
                    <MenuItem value="Tile">
                      Tile Roof
                    </MenuItem>
                  </TextField>
                </>
              ) : (
                <>
                  <TextField
                    label="Full Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                  />

                  <TextField
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ gridColumn: "1 / -1" }}
                  />
                </>
              )}

              {/* MESSAGE FIELD */}

              <TextField
                label="Message / Requirement (optional)"
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                sx={{ gridColumn: "1 / -1" }}
              />
            </Box>

            {/* CTA */}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.7,
                fontWeight: 800,
                fontSize: "1rem",
                borderRadius: 2,
                background:
                  "linear-gradient(90deg,#16A34A,#22C55E)",
                boxShadow:
                  "0 12px 25px rgba(22,163,74,0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg,#15803D,#16A34A)",
                },
              }}
            >
              {loading
                ? "Submitting..."
                : isQuote
                ? "Get My Quote ⚡"
                : "Book Visit"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ================= TOAST ================= */}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() =>
          setToast({ ...toast, open: false })
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ mb: 2, mr: 2 }}
      >
        <Alert
          severity={toast.type}
          variant="filled"
          onClose={() =>
            setToast({ ...toast, open: false })
          }
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuoteSiteVisitDialog;