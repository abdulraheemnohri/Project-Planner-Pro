import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-hot-toast";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;