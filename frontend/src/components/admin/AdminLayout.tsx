import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link, useNavigate, Outlet } from "react-router-dom";

const drawerWidth = 240;

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* ========= SIDEBAR ========= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            Netson Admin
          </Typography>
        </Toolbar>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

        <List>

          <ListItemButton component={Link} to="/admin">
            <DashboardIcon sx={{ mr: 1 }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/reviews">
            <ReviewsIcon sx={{ mr: 1 }} />
            <ListItemText primary="Reviews" />
          </ListItemButton>

          {/* ⭐ NEW CONTACT CRM */}
          <ListItemButton component={Link} to="/admin/contacts">
            <MailIcon sx={{ mr: 1 }} />
            <ListItemText primary="Contact Inquiries" />
          </ListItemButton>

          <ListItemButton component={Link} to="/">
            <VisibilityIcon sx={{ mr: 1 }} />
            <ListItemText primary="View Site" />
          </ListItemButton>

        </List>
      </Drawer>

      {/* ========= MAIN AREA ========= */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <AppBar
          position="static"
          elevation={0}
          color="default"
          sx={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={700}>
              Admin Panel
            </Typography>

            <Button
              variant="contained"
              color="error"
              onClick={logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            p: 4,
            background: "#f8fafc",
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
}