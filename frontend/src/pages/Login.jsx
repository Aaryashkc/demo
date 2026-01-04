import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // No logic, just navigate
        navigate('/dashboard');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <AuthLayout
            title="Admin Portal"
            subtitle="Sign in to access the control panel"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    type="email"
                    active={true}
                    name="email"
                    placeholder="admin@ecotrack.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
                        />
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-green-700 hover:text-green-600">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full flex justify-center py-2.5"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
