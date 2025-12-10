import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Avatar,
  Typography,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MoodIcon from "@mui/icons-material/Mood";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const drawerWidth = 250;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Tasks", icon: <AssignmentIcon />, path: "/tasks" },
    { text: "Habits", icon: <TrackChangesIcon />, path: "/habits" },
    { text: "Mood", icon: <MoodIcon />, path: "/mood" },
    { text: "Weekly Mood", icon: <MoodIcon />, path: "/mood-weekly" },
    { text: "AI Summary", icon: <InsightsIcon />, path: "/summary" },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        backdropFilter: "blur(18px)",
        background: "rgba(255,255,255,0.15)",
        padding: 2,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* APP BRAND */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{
            background: "linear-gradient(45deg,#fff,#e3e3e3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
        InsightSprint
        </Typography>

        {/* USER PROFILE */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48, mr: 1 }}>
            {user?.name?.slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography variant="body1" fontWeight={600}>
            {user?.name}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.25)", mb: 2 }} />

      {/* LINKS */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <Tooltip title={item.text} key={item.text} placement="right" arrow>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 3,
                my: 0.5,
                color: "#fff",
                transition: "0.3s",
                "&.Mui-selected": {
                  bgcolor: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
                },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.18)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.25)", my: 2 }} />

      {/* LOGOUT */}
      <ListItemButton
        onClick={logout}
        sx={{
          borderRadius: 3,
          color: "#fff",
          "&:hover": {
            bgcolor: "rgba(255,0,0,0.2)",
            transform: "translateX(4px)",
          },
        }}
      >
        <ListItemIcon sx={{ color: "red" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  );

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          display: { md: "none" },
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 2000,
          bgcolor: "#fff",
          "&:hover": { bgcolor: "#eee" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* MOBILE DRAWER */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(135deg, rgba(102,126,234,0.90), rgba(118,75,162,0.90))",
            backdropFilter: "blur(20px)",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)"
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* DESKTOP DRAWER */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            border: "none",
            background: "linear-gradient(135deg, rgba(102,126,234,0.85), rgba(118,75,162,0.85))",
            backdropFilter: "blur(18px)",
           boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
