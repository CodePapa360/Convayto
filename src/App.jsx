import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MessageView from "./layouts/MessageView";
import { UiProvider } from "./contexts/UiContext";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
    },
  },
});

function App() {
  return (
    <UiProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/:userId" element={<MessageView />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UiProvider>
  );
}

export default App;
