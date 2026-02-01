import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../components/layout/DashboardLayout';
import HomePage from '../pages/HomePage';
import { Footer } from '../components/Headers/Footer';
import CustomerLoginPage from '../components/auth/CustomerLogin';
import { Header } from '../components/Headers/Header';
import CustomerSignUpPage from '../components/auth/CustomerSignup';
import OTPVerificationPage from '../components/auth/OTPVerificationPage';
import CustomerLandingPage from '../components/users/CustomerLanding';
import CustomerDashboard from '../components/users/CustomerDashboard';
import SchedulePage from '../components/users/SchedulePage';
import UploadWastePage from '../components/users/UploadWastePage';
import SearchPage from '../components/sub-components/Searching';
import DriverDashboard from '../components/Driver/DriverDashboard';
import AcceptTaskPage from '../components/Driver/AcceptTaskPage';
import TaskRoutePage from '../components/Driver/TaskRoutePage';

const AppRoutes = () => {
    return (
        <div>
            <Header/>

            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<CustomerLoginPage />} />
            <Route path="/signup" element={<CustomerSignUpPage />} />
            <Route path="/otp-verification" element={<OTPVerificationPage />} />
            <Route path="/admin-login" element={<Login />} />



            <Route path="/customer-landing" element={<CustomerLandingPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/upload-waste" element={<UploadWastePage />} />
            <Route path="/searching" element={<SearchPage />} />


            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/accept-task" element={<AcceptTaskPage />} />
            <Route path="/task-route" element={<TaskRoutePage />} />


            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="vehicles" element={<div className="text-center py-20 text-gray-500">Vehicles Management Module (Coming Soon)</div>} />
                <Route path="zones" element={<div className="text-center py-20 text-gray-500">Zone Monitoring Module (Coming Soon)</div>} />
                <Route path="reports" element={<div className="text-center py-20 text-gray-500">Analytics & Reports Module (Coming Soon)</div>} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
        </div>
        
    );
};

export default AppRoutes;
