import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Sprints from './pages/Sprints'
import Issues from './pages/Issues'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/issues" element={<Issues />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App