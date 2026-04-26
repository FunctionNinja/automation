import { Box, TextField, Button } from "@mui/material"
import ShadowBox from "../shared/ui/ShadowBox"



const Login = ({ toggleForm }: { toggleForm: () => void }) => {
  return (
    <ShadowBox width={350} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ fontSize: 20, fontWeight: 600 }}>Login please</Box>

      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Password" type="password" fullWidth />

      <Box 
      sx={{ display: "flex", flexDirection: "column" }}
      >

        <Button variant="contained" onClick={() => console.log('ku')}>Login</Button>
        <Button variant="text">Forgot password?</Button>

        <Button variant="text" onClick={toggleForm}>
          Sign up
        </Button>
      </Box>
    </ShadowBox>
  )
}

export default Login