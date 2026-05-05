import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material"
import ShadowBox from "../shared/ui/ShadowBox"
import { supabase } from "../shared/api/supabaseClient"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router"

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  })
  
  const signUpMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data)
      setSnackbar({
        open: true,
        message: 'Registration successful! Redirecting to login...',
        severity: 'success'
      })
      
      // Редирект на страницу логина через 2 секунды
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    },
    onError: (error) => {
      console.error('Registration error:', error.message)
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    setPasswordError('')
    
    signUpMutation.mutate({ email, password })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <form onSubmit={handleSubmit}>
          <ShadowBox width={350} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>
              Create an account
            </Box>

            <TextField 
              label="Email" 
              variant="outlined" 
              fullWidth 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={signUpMutation.isPending}
            />
            
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={signUpMutation.isPending}
            />
            
            <TextField 
              label="Confirm Password" 
              type="password" 
              fullWidth 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              required
              disabled={signUpMutation.isPending}
            />

            <Button 
              variant="contained" 
              type="submit"
              disabled={signUpMutation.isPending}
              sx={{ alignSelf: 'center', width: '50%', mb: 1 }}
            >
              {signUpMutation.isPending ? 'Signing up...' : 'Signup'}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">
                Already have an account?
              </Typography>
              <Button 
                variant="text" 
                onClick={() => navigate('/login')} 
                sx={{ textTransform: 'none' }}
                disabled={signUpMutation.isPending}
              >
                Login
              </Button>
            </Box>
          </ShadowBox>
        </form>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Signup