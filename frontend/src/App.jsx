import { useState } from 'react'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <h1>Hello world</h1>
   <Button variant="outlined">Outlined</Button>
   <br />
   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
   <br />
   <TextField id="standard-basic" label="Standard" variant="standard" />
   </>
  )
}

export default App
