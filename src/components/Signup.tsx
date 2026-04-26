import { Box, TextField, Button, Typography } from "@mui/material"
import ShadowBox from "../shared/ui/ShadowBox"

const Signup = ({ toggleForm }: { toggleForm: () => void }) => {
  return (
    <ShadowBox width={350} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ fontSize: 20, fontWeight: 600 }}>Create an account</Box>

      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Password" type="password" fullWidth />
      <TextField label="Confirm Password" type="password" fullWidth />

      <Button variant="contained" onClick={() => console.log('ku')} sx={{ alignSelf: 'center', width: '50%', mb: 1 }}>Signup</Button>

      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Typography variant="body2">
          Already have an account?
        </Typography>
        <Button variant="text" onClick={toggleForm} sx={{ textTransform: 'none' }}>
          Login
        </Button>
      </Box>
    </ShadowBox>
  )
}

export default Signup