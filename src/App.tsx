import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Users from './components/Users'

import './App.css'
import Posts from './components/Posts'
import Todos from './components/Todos'

const queryClient = new QueryClient()
function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Users/>
      <Posts/>
      <Todos/>
    </QueryClientProvider>
  )
}

export default App
