import React from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import VehicleCard from '../components/dashboard/VehicleCard';
import Button from '../components/common/Button';

const Dashboard = () => {
    // Mock Data based on backend models (Truck, Task, etc.)
    const stats = [
        { title: 'Total Vehicles', value: '24', icon: '🚛', label: '+2 new this month', trend: 'up' },
        { title: 'Active Routes', value: '12', icon: '📍', label: 'Optimized', trend: 'up' },
        { title: 'Tasks Pending', value: '8', icon: '📋', label: 'Requires attention', trend: 'down' },
        { title: 'Waste Collected', value: '1,240 kg', icon: '⚖️', label: 'Today', trend: 'up' },
    ];

    const vehicles = [
        {
            id: 1,
            licensePlate: 'BA 2 KA 9988',
            type: 'BIO',
            driver: 'Ram B.',
            route: 'Zone A - Thamel',
            status: 'Collected',
            capacity: 5000,
            currentLoad: 4200
        },
        {
            id: 2,
            licensePlate: 'BA 1 PA 2234',
            type: 'NON_BIO',
            driver: 'Shyam K.',
            route: 'Zone B - Lazimpat',
            status: 'In Transit',
            capacity: 8000,
            currentLoad: 2100
        },
        {
            id: 3,
            licensePlate: 'BA 3 KA 1100',
            type: 'BIO',
            driver: 'Hari S.',
            route: 'Zone C - Baluwatar',
            status: 'Idle',
            capacity: 5000,
            currentLoad: 0
        },
        {
            id: 4,
            licensePlate: 'BA 4 PA 4545',
            type: 'NON_BIO',
            driver: 'Sita M.',
            route: 'Zone D - Koteshwor',
            status: 'In Transit',
            capacity: 8000,
            currentLoad: 6500
        },
        {
            id: 5,
            licensePlate: 'BA 2 KA 7766',
            type: 'BIO',
            driver: 'Gopal R.',
            route: 'Zone A - Thamel',
            status: 'Maintenance',
            capacity: 4500,
            currentLoad: 0
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                    <p className="text-gray-600">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Download Report</Button>
                    <Button variant="primary">+ Assign Task</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Vehicle Status Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Live Vehicle Status</h3>
                            <Button variant="outline" className="text-sm py-1">View All</Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {vehicles.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity / Zones Column */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Urgent Alerts</h3>
                        <div className="space-y-4">
                            <AlertItem
                                type="warning"
                                title="Bin Overflow Warning"
                                time="10 min ago"
                                location="Zone A, Sector 4"
                            />
                            <AlertItem
                                type="info"
                                title="Route Deviation Detected"
                                time="25 min ago"
                                location="Vehicle BA 1 PA 2234"
                            />
                            <AlertItem
                                type="success"
                                title="Zone C Collection Complete"
                                time="1 hr ago"
                                location="Baluwatar Area"
                            />
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Collection Progress</h3>
                            <div className="space-y-4">
                                <ProgressItem zone="Zone A" progress={85} />
                                <ProgressItem zone="Zone B" progress={45} />
                                <ProgressItem zone="Zone C" progress={100} />
                                <ProgressItem zone="Zone D" progress={30} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const AlertItem = ({ type, title, time, location }) => {
    const colors = {
        warning: 'bg-orange-50 text-orange-700 border-orange-100',
        info: 'bg-blue-50 text-blue-700 border-blue-100',
        success: 'bg-green-50 text-green-700 border-green-100',
    };

    return (
        <div className={`p-3 rounded-lg border ${colors[type]} flex items-start gap-3`}>
            <div className="mt-0.5 font-bold">•</div>
            <div>
                <p className="font-semibold text-sm">{title}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs opacity-80">{time}</span>
                    <span className="text-xs opacity-60">|</span>
                    <span className="text-xs opacity-80">{location}</span>
                </div>
            </div>
        </div>
    )
}

const ProgressItem = ({ zone, progress }) => (
    <div>
        <div className="flex justify-between text-sm mb-1 text-gray-700">
            <span>{zone}</span>
            <span className="font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
            <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
)

export default Dashboard;
