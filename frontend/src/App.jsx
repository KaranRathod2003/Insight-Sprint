import { useState } from "react";
import AppRouter from "./router/AppRouter.jsx";
import RefreshingOverlay from "./components/RefreshingOverlay";

function App() {
  return (
    <>
      <RefreshingOverlay />
      <AppRouter />
    </>
  );
}

export default App;

