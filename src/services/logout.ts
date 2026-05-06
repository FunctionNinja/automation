import {supabase} from "../providers/supabaseClient"

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error logging out:', error)
  }
};