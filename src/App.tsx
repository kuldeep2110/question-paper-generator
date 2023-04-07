import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/main/Dashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./index.css";
import Profile from "./pages/Profile";
import AddSubject from "./pages/main/Subject/Subjects";
import AddQuestion from "./pages/main/Question/AddQuestion";
import Generate from "./pages/main/Generate/Generate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="subjects"
            element={
              <ProtectedRoute>
                <AddSubject />
              </ProtectedRoute>
            }
          />

          <Route
            path="questions"
            element={
              <ProtectedRoute>
                <AddQuestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="generate"
            element={
              <ProtectedRoute>
                <Generate />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
