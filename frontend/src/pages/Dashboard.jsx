import React, { useMemo } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import VehicleCard from "../components/dashboard/VehicleCard";
import Button from "../components/common/Button";

const Dashboard = () => {
  // keep your mock data, but memo it so it doesn't recreate on every render
  const stats = useMemo(
    () => [
      { title: "Total Vehicles", value: "24", icon: "🚛", label: "+2 new this month", trend: "up" },
      { title: "Active Routes", value: "12", icon: "📍", label: "Optimized", trend: "up" },
      { title: "Tasks Pending", value: "8", icon: "📋", label: "Requires attention", trend: "down" },
      { title: "Waste Collected", value: "1,240 kg", icon: "⚖️", label: "Today", trend: "up" },
    ],
    []
  );

  const vehicles = useMemo(
    () => [
      {
        id: 1,
        licensePlate: "BA 2 KA 9988",
        type: "BIO",
        driver: "Ram B.",
        route: "Zone A - Thamel",
        status: "Collected",
        capacity: 5000,
        currentLoad: 4200,
      },
      {
        id: 2,
        licensePlate: "BA 1 PA 2234",
        type: "NON_BIO",
        driver: "Shyam K.",
        route: "Zone B - Lazimpat",
        status: "In Transit",
        capacity: 8000,
        currentLoad: 2100,
      },
      {
        id: 3,
        licensePlate: "BA 3 KA 1100",
        type: "BIO",
        driver: "Hari S.",
        route: "Zone C - Baluwatar",
        status: "Idle",
        capacity: 5000,
        currentLoad: 0,
      },
      {
        id: 4,
        licensePlate: "BA 4 PA 4545",
        type: "NON_BIO",
        driver: "Sita M.",
        route: "Zone D - Koteshwor",
        status: "In Transit",
        capacity: 8000,
        currentLoad: 6500,
      },
      {
        id: 5,
        licensePlate: "BA 2 KA 7766",
        type: "BIO",
        driver: "Gopal R.",
        route: "Zone A - Thamel",
        status: "Maintenance",
        capacity: 4500,
        currentLoad: 0,
      },
    ],
    []
  );

  return (
    <div className="app-bg">
      <div className="app-container space-y-6">
        {/* Top Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] tracking-tight">
              Overview
            </h2>
            <p className="text-sm sm:text-base text-[var(--primary)]/70">
              Welcome back — here’s what’s happening today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button variant="outline">Download Report</Button>
            <Button variant="primary">+ Assign Task</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-5"
            >
              {/* If your StatsCard already has styling, remove this wrapper and just render StatsCard.
                  But wrapping fixes layout inconsistency without touching your component. */}
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle column */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm">
              <div className="px-6 py-5 border-b border-[var(--primary)]/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[var(--primary)]">
                    Live Vehicle Status
                  </h3>
                  <p className="text-sm text-[var(--primary)]/65">
                    Track fleet activity in real time.
                  </p>
                </div>

                <Button variant="outline" className="text-sm py-2">
                  View All
                </Button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-2xl border border-[var(--primary)]/12 hover:border-[var(--primary)]/25 transition"
                    >
                      <VehicleCard vehicle={v} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className="space-y-6">
            {/* Alerts */}
            <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm">
              <div className="px-6 py-5 border-b border-[var(--primary)]/10">
                <h3 className="text-lg font-bold text-[var(--primary)]">
                  Urgent Alerts
                </h3>
                <p className="text-sm text-[var(--primary)]/65">
                  Items that need attention.
                </p>
              </div>

              <div className="p-6 space-y-3">
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
            </div>

            {/* Progress */}
            <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm">
              <div className="px-6 py-5 border-b border-[var(--primary)]/10">
                <h3 className="text-lg font-bold text-[var(--primary)]">
                  Collection Progress
                </h3>
                <p className="text-sm text-[var(--primary)]/65">
                  Completion status by zone.
                </p>
              </div>

              <div className="p-6 space-y-4">
                <ProgressItem zone="Zone A" progress={85} />
                <ProgressItem zone="Zone B" progress={45} />
                <ProgressItem zone="Zone C" progress={100} />
                <ProgressItem zone="Zone D" progress={30} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const AlertItem = ({ type, title, time, location }) => {
  // Use YOUR palette, not random blue/orange/green cards
  const tone = {
    warning: {
      dot: "bg-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200/70",
      text: "text-orange-900",
      sub: "text-orange-900/70",
    },
    info: {
      dot: "bg-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200/70",
      text: "text-blue-900",
      sub: "text-blue-900/70",
    },
    success: {
      dot: "bg-[var(--accent)]",
      bg: "bg-[#f2f7ee]",
      border: "border-[var(--accent)]/25",
      text: "text-[var(--primary)]",
      sub: "text-[var(--primary)]/70",
    },
  }[type];

  return (
    <div className={`p-4 rounded-2xl border ${tone.border} ${tone.bg} flex gap-3`}>
      <span className={`mt-1 w-2.5 h-2.5 rounded-full ${tone.dot}`} />
      <div className="min-w-0">
        <p className={`font-semibold text-sm ${tone.text}`}>{title}</p>
        <p className={`text-xs mt-1 ${tone.sub} truncate`}>
          {time} • {location}
        </p>
      </div>
    </div>
  );
};

const ProgressItem = ({ zone, progress }) => (
  <div>
    <div className="flex justify-between text-sm mb-2 text-[var(--primary)]">
      <span className="font-medium">{zone}</span>
      <span className="font-semibold">{progress}%</span>
    </div>
    <div className="w-full bg-black/10 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-[var(--accent)] h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default Dashboard;
