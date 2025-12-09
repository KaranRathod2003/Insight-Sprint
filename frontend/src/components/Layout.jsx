import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: "240px" },
          mt: { xs: 7, md: 2 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
