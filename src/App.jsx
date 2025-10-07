// App.jsx (modified - import ProtectedRoute and wrap protected routes)
import React from "react";
import AuthForm from "./AuthForm.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepageview from "./view/homepageview.jsx";
import FiftyTwentyThirtyPage from "./view/50-20-30_homepageview.jsx";
import Zero_budget_strategy from "./view/zerobudgethomeview.jsx";
import Pay_yourself_first from "./view/payyourself_homeview.jsx";
import Build_your_own from "./view/build_your_own_homeview.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepageview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/50-20-30"
            element={
              <ProtectedRoute>
                <FiftyTwentyThirtyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/zero_budget_strategy"
            element={
              <ProtectedRoute>
                <Zero_budget_strategy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pay_your_self_first"
            element={
              <ProtectedRoute>
                <Pay_yourself_first />
              </ProtectedRoute>
            }
          />
          <Route
            path="/build_your_own_strategy"
            element={
              <ProtectedRoute>
                <Build_your_own />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
