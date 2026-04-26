import { Box, TextField, Button, Typography } from "@mui/material"
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

        <Button variant="contained" onClick={() => console.log('ku')} sx={{ mb: 1, width: '50%', alignSelf: 'center' }}>Login</Button>
        <Button variant="text" sx={{ alignSelf: "flex-end", textTransform: 'none' }}>
          Forgot password?
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Typography variant="body2">
          Don't have an account?
        </Typography>
        <Button variant="text" onClick={toggleForm} sx={{ textTransform: 'none' }}>
          Sign up
        </Button>
      </Box>
    </ShadowBox>
  )
}

export default Login