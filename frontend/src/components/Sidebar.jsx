// Sidebar.jsx
import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  Divider,
  Typography,
  Avatar,
  Tooltip,
  Fade,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MoodIcon from "@mui/icons-material/Mood";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const drawerWidth = 280; // Slightly wider for better spacing

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, user } = useAuth(); // Assuming user is available from context
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(false); // For potential submenus, if needed

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmenuToggle = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Tasks", icon: <AssignmentIcon />, path: "/tasks" },
    { text: "Habits", icon: <TrackChangesIcon />, path: "/habits" },
    { text: "Mood", icon: <MoodIcon />, path: "/mood" },
    { text: "AI Summary", icon: <InsightsIcon />, path: "/summary" },
  ];

  const drawerContent = (
    <Fade in timeout={800}>
      <Box
        sx={{
          height: "100%",
          background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo and User Profile */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              background: "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            InsightSprint
          </Typography>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 50,
                  height: 50,
                  mr: 1,
                  boxShadow: 3,
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1" fontWeight={600}>
                {user.name}
              </Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 2 }} />

        {/* Menu Items */}
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <Tooltip key={item.text} title={item.text} placement="right" arrow>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 3,
                  my: 0.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.2)",
                    transform: "translateX(5px)",
                  },
                  "&.Mui-selected": {
                    bgcolor: "rgba(255,255,255,0.3)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    "& .MuiSvgIcon-root": { color: "white" },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Tooltip>
          ))}

          {/* Example Submenu (if needed for future expansion) */}
          <ListItemButton
            onClick={handleSubmenuToggle}
            sx={{
              borderRadius: 3,
              my: 0.5,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <InsightsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {openSubmenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  borderRadius: 3,
                  my: 0.5,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <ListItemText primary="Weekly" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4,
                  borderRadius: 3,
                  my: 0.5,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <ListItemText primary="Monthly" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", my: 2 }} />

        {/* Logout */}
        <Tooltip title="Logout" arrow>
          <ListItemButton
            onClick={logout}
            sx={{
              borderRadius: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Tooltip>
      </Box>
    </Fade>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleDrawer}
        sx={{
          display: { md: "none" },
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 2000,
          bgcolor: "rgba(255,255,255,0.9)",
          boxShadow: 3,
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "white", transform: "scale(1.1)" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },
        }}
        open
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;