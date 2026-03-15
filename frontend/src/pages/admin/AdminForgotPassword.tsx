import { useState } from "react";
import axios from "../../api/axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const res = await axios.post("/auth/forgot-password", { email });
    setMsg(res.data.message);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5">Forgot Password</Typography>

        {msg && <Alert severity="success">{msg}</Alert>}

        <TextField
          label="Admin Email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={submit}>
          Send Reset Link
        </Button>
      </Paper>
    </Box>
  );
}