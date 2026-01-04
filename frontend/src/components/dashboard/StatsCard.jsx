import React from 'react';

const StatsCard = ({ title, value, label, icon, trend }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-2xl">
                    {icon}
                </div>
            </div>
            <div>
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                    {label}
                </span>
            </div>
        </div>
    );
};

export default StatsCard;
