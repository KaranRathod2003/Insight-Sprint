// Layout.jsx
import { Box, Paper } from "@mui/material";
import Sidebar ,{ drawerWidth }  from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: `${drawerWidth}px` }, // Match sidebar width
          mt: { xs: 8, md: 2 }, // Adjust for mobile hamburger
          bgcolor: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            minHeight: "calc(100vh - 64px)",
            p: 3,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default Layout;