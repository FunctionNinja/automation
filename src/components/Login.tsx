import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material"
import ShadowBox from "../shared/ui/ShadowBox"
import { supabase } from "../shared/api/supabaseClient"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  })
  
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      console.log('Login successful:', data)
      setSnackbar({
        open: true,
        message: 'Login successful! Redirecting to dashboard...',
        severity: 'success'
      })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    },
    onError: (error) => {
      console.error('Login error:', error.message)
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ email, password })
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
              Welcome Back
            </Box>

            <TextField 
              label="Email" 
              variant="outlined" 
              fullWidth 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loginMutation.isPending}
            />
            
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loginMutation.isPending}
            />

            <Button 
              variant="contained" 
              type="submit"
              disabled={loginMutation.isPending}
              sx={{ alignSelf: 'center', width: '50%', mb: 1 }}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">
                Don't have an account?
              </Typography>
              <Button 
                variant="text" 
                onClick={() => navigate('/signup')} 
                sx={{ textTransform: 'none' }}
                disabled={loginMutation.isPending}
              >
                Signup
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

export default Login