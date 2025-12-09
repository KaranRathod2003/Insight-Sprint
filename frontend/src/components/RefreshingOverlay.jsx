import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function RefreshingOverlay() {
  const { refreshing } = useAuth();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 9999, flexDirection: "column" }}
      open={refreshing}
    >
      <CircularProgress color="inherit" size={60} />
      <Typography sx={{ mt: 2, fontSize: 18 }}>
        Refreshing session...
      </Typography>
    </Backdrop>
  );
}
