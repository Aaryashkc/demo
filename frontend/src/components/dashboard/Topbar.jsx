import React from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
                {/* Mobile menu trigger could go here */}
                <span className="text-2xl md:hidden">♻️</span>
                <h1 className="text-xl font-bold text-gray-800 hidden md:block">Admin Console</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500">System Administrator</p>
                    </div>
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold border-2 border-green-200">
                        AU
                    </div>
                </div>
                <div className="h-8 w-px bg-gray-200 mx-1"></div>
                <Button variant="outline" onClick={handleLogout} className="!px-3 !py-1 text-sm">
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default Topbar;
