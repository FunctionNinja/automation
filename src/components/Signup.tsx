import { Box, TextField, Button } from "@mui/material"
import ShadowBox from "../shared/ui/ShadowBox"

const Signup = ({ toggleForm }: { toggleForm: () => void }) => {
  return (
    <ShadowBox width={350} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ fontSize: 20, fontWeight: 600 }}>Sign up</Box>

      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Password" type="password" fullWidth />

      <Button variant="contained" onClick={() => console.log('ku')}>Signup</Button>

      <Button variant="text" onClick={toggleForm}>
        Login
      </Button>
    </ShadowBox>
  )
}

export default Signup