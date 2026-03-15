import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");

    } catch (err) {
      setError("Invalid email or password");
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
      <Paper sx={{ p: 4, width: 360, borderRadius: 3 }}>
        <Typography variant="h5" mb={2}>
          Admin Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={login}
        >
          Login
        </Button>

        <Link
          component="button"
          onClick={() => navigate("/admin/forgot-password")}
          sx={{ mt: 2, display: "block" }}
        >
          Forgot password?
        </Link>
      </Paper>
    </Box>
  );
}