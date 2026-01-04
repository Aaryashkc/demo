import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Vehicles', icon: '🚛', path: '/dashboard/vehicles' },
        { name: 'Zones', icon: '📍', path: '/dashboard/zones' },
        { name: 'Reports', icon: '📑', path: '/dashboard/reports' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 pt-16 hidden md:block">
            <div className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-green-700'
                                    }`
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="absolute bottom-4 left-0 w-full p-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-1">System Status</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm text-green-700">Online</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
