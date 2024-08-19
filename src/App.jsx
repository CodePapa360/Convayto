import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./features/authentication/Signup";
import Signin from "./features/authentication/Signin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MessageView from "./features/messageArea/MessageView";
import { UiProvider } from "./contexts/UiContext";
import NewPasswordPage from "./features/authentication/NewPasswordPage";
import ResetPasswordPage from "./features/authentication/ResetPasswordPage";
import NotFound from "./components/NotFound";
import { Toaster } from "react-hot-toast";
import AccountConfirmation from "./components/AccountConfirmation";
import AllRoutesWrapper from "./components/AllRoutesWrapper";
import AboutPage from "./components/AboutPage";

const queryClient = new QueryClient();

/*
 * Copyright [2024] [Al-Amin]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function App() {
  return (
    <UiProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster
          position="top-center"
          toastOptions={{
            error: {
              duration: 5000,
            },
            style: {
              maxWidth: "500px",
            },
          }}
        />

        <BrowserRouter>
          <AllRoutesWrapper>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/m/:userId" element={<MessageView />} />
              </Route>

              <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<Signin />} />
              <Route path="new-password" element={<NewPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route
                path="account-confirmation"
                element={<AccountConfirmation />}
              />
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AllRoutesWrapper>
        </BrowserRouter>
      </QueryClientProvider>
    </UiProvider>
  );
}

export default App;
