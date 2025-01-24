import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";
import LoginPage from "./pages/LoginPage";
import NotFaundPage from "./pages/NotFaundPage";
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import { IS_LOGIN } from "./constants";
import AdminLayout from "./components/layouts/AdminLayout";

const App = () => {
  let [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem(IS_LOGIN)));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        {isLogin ? (
          <Route element={<AdminLayout setIsLogin={setIsLogin} />}>
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
          </Route>
        ) : null}

        <Route path="*" element={<NotFaundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
