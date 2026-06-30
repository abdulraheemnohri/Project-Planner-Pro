import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import { Dashboard, Projects, Sprints, SprintBoard, Issues, Roadmap, Releases, Analytics, Docs, Git, Settings } from "./pages";
import { Login, Register } from "./pages/auth";
import ProtectedRoute from "./components/common/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="sprints" element={<Sprints />} />
            <Route path="sprints/:id/board" element={<SprintBoard />} />
            <Route path="issues" element={<Issues />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="releases" element={<Releases />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="docs" element={<Docs />} />
            <Route path="git" element={<Git />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;