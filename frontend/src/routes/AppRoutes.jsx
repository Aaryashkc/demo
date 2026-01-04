import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../components/layout/DashboardLayout';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes (Static Demo - No real auth guard) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                {/* Placeholder routes for other sidebar items to prevent 404s if clicked */}
                <Route path="vehicles" element={<div className="text-center py-20 text-gray-500">Vehicles Management Module (Coming Soon)</div>} />
                <Route path="zones" element={<div className="text-center py-20 text-gray-500">Zone Monitoring Module (Coming Soon)</div>} />
                <Route path="reports" element={<div className="text-center py-20 text-gray-500">Analytics & Reports Module (Coming Soon)</div>} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
