import React from 'react';

const VehicleCard = ({ vehicle }) => {
    const statusColors = {
        'Collected': 'bg-green-100 text-green-700 border-green-200',
        'In Transit': 'bg-blue-100 text-blue-700 border-blue-200',
        'Idle': 'bg-gray-100 text-gray-700 border-gray-200',
        'Maintenance': 'bg-orange-100 text-orange-700 border-orange-200',
    };

    const currentStatusStyle = statusColors[vehicle.status] || statusColors['Idle'];

    // Calculate fill percentage based on capacity
    const fillPercentage = Math.round((vehicle.currentLoad / vehicle.capacity) * 100);

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-lg text-gray-900">{vehicle.licensePlate}</h4>
                    <p className="text-sm text-gray-500">{vehicle.type} Truck</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${currentStatusStyle}`}>
                    {vehicle.status}
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>👤</span>
                    <span className="font-medium">{vehicle.driver}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📍</span>
                    <span>{vehicle.route}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Load Capacity</span>
                    <span className="font-medium text-gray-900">{fillPercentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full rounded-full ${fillPercentage > 90 ? 'bg-red-500' : 'bg-green-600'}`}
                        style={{ width: `${fillPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
