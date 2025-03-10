import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import Signup from "./Login/Signup";
import LandingPage from "./Pages/LandingPage"
import { useAuth } from "../context/Auth"; // changed from useAuth to useAuth
import Background from "./Common/Background/Background";
import {Layout, Spin} from 'antd'
import Category from "./Pages/Category";

const PrivateRoute = ({ element, requiredRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> {/* Adjust height as needed */}
      <Spin size="large" />
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user has at least one of the required roles
  const hasAccess = user?.roles?.some(role => requiredRoles.includes(role)) || true;

  return hasAccess ? element : <Navigate to="/login" replace />;
};

const PublicRoutes = () => {
  return (
    <Layout className="main-layout">
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryId" element={<Category />}></Route>
        <Route
          path="/*"
          element={
            <Background>
              <Outlet />
            </Background>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute element={<h1>Dashboard</h1>} requiredRoles={["admin"]} />} />
        {/* <Route
          path="apps"
          element={
            <RestrictedRoute>
              <CartPage />
            </RestrictedRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
