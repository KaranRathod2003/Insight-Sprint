import { useState } from 'react'
import AppRouter from './router/AppRouter.jsx'
import RefreshingOverlay from "./components/RefreshingOverlay";
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <RefreshingOverlay />
   <AppRouter />
   </>
  )
}

export default App
