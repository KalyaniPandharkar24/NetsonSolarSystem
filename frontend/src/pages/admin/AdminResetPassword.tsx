import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export default function AdminResetPassword() {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setMsg("");

    if (!password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      setMsg(res.data.message);

      // Redirect to login after success
      setTimeout(() => navigate("/admin/login"), 2000);

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Reset failed. Link may be expired."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
      }}
    >
      <Paper sx={{ p: 4, width: 380, borderRadius: 3 }}>
        <Typography variant="h5" mb={2}>
          Reset Password
        </Typography>

        {msg && <Alert severity="success">{msg}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={submit}
        >
          Update Password
        </Button>
      </Paper>
    </Box>
  );
}
