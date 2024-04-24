import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./features/authentication/Signup";
import Signin from "./features/authentication/Signin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MessageView from "./components/MessageView";
import { UiProvider } from "./contexts/UiContext";
import { AppDataProvider } from "./contexts/AppDataContext";
import ResetPassword from "./features/authentication/ResetPassword";

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
      <AppDataProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
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
      </AppDataProvider>
    </UiProvider>
  );
}

export default App;
