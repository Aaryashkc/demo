import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function DriverDashboard() {

  const driver = useMemo(
    () => ({
      name: "Driver Name",
      online: true,
      truckId: "TRUCK-047",
      lastSync: "09:41 am",
      shift: {
        start: "06:00 am",
        end: "10:00 am",
        area: "Kathmandu",
      },
      assignment: {
        taskId: "TASK-2847",
        type: "BIO-Waste",
        points: 3,
        estVolumeTons: 2.4,
      },
      hasNewTask: true,
    }),
    []
  );

  return (
    <div className="app-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--primary)]">
              Driver Dashboard
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--primary)]/70">
              <span className="inline-flex items-center gap-2">
                <TruckIcon />
                <span className="font-semibold text-[var(--primary)]">{driver.truckId}</span>
              </span>

              <span className="hidden sm:inline text-[var(--primary)]/30">•</span>

              <span>
                Last sync: <span className="font-medium text-[var(--primary)]">{driver.lastSync}</span>
              </span>
            </div>
          </div>

          {/* Profile icon */}
          <button
            className="w-11 h-11 rounded-full border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:shadow-sm active:scale-95 transition"
            aria-label="Profile"
          >
            <UserIcon />
          </button>
        </div>

        {/* Main grid */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Driver card */}
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--primary)]/60">Driver</p>
                  <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-[var(--primary)]">
                    {driver.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      driver.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium text-[var(--primary)]">
                    {driver.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MiniStat label="Truck" value={driver.truckId} />
                <MiniStat label="Shift" value={`${driver.shift.start} - ${driver.shift.end}`} />
                <MiniStat label="Area" value={driver.shift.area} />
              </div>
            </Card>

            {/* Current assignment */}
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--primary)]/60">Current assignment</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary)]">
                      {driver.assignment.taskId}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)]">
                      {driver.assignment.type}
                    </span>
                  </div>
                </div>

                <button className="px-4 py-2 rounded-xl border border-[var(--primary)]/30 bg-white text-[var(--primary)] text-sm font-semibold hover:shadow-sm active:scale-95 transition">
                  Details
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <InfoTile label="Collection points" value={`${driver.assignment.points}`} />
                <InfoTile label="Est. volume" value={`${driver.assignment.estVolumeTons} tons`} />
                <InfoTile label="Status" value={driver.online ? "Active" : "Paused"} />
                <InfoTile label="Priority" value="Normal" />
              </div>
            </Card>
          </div>

          {/* Right column actions */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-[var(--primary)]">Actions</h3>

              <div className="mt-4 space-y-3">
                <Link
                    to="/accept-task"
                  className="w-full relative bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark,#2a3f41)] text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md border-2 border-[var(--primary)]/20 flex items-center justify-center gap-2"
                >
                  <span>View New Task</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {driver.hasNewTask && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 ring-4 ring-[#f5f1e8] animate-pulse" />
                  )}
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <button className="w-full py-3 rounded-2xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold bg-transparent hover:bg-white active:scale-[0.99] transition">
                    My Route
                  </button>

                  <button className="w-full py-3 rounded-2xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold bg-transparent hover:bg-white active:scale-[0.99] transition">
                    History
                  </button>
                </div>
              </div>
            </Card>

            {/* Optional: Quick status */}
            <Card>
              <h3 className="text-lg font-semibold text-[var(--primary)]">Quick status</h3>

              <div className="mt-4 space-y-3">
                <StatusRow label="GPS" value="Connected" />
                <StatusRow label="Network" value="Good" />
                <StatusRow label="Battery" value="Normal" />
              </div>

              <button className="mt-5 w-full py-3 rounded-2xl bg-[var(--accent)] text-white font-semibold hover:opacity-95 active:scale-[0.99] transition">
                Start Shift
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small UI helpers ---------- */

function Card({ children }) {
  return (
    <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-5 sm:p-7">
      {children}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--primary)]/10 bg-[#f5f1e8] p-4">
      <p className="text-xs text-[var(--primary)]/60">{label}</p>
      <p className="mt-1 font-semibold text-[var(--primary)]">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--primary)]/10 bg-white p-4">
      <p className="text-xs text-[var(--primary)]/60">{label}</p>
      <p className="mt-1 font-semibold text-[var(--primary)]">{value}</p>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--primary)]/10 bg-[#f5f1e8] px-4 py-3">
      <span className="text-sm text-[var(--primary)]/70">{label}</span>
      <span className="text-sm font-semibold text-[var(--primary)]">{value}</span>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7h11v10H3V7Zm11 4h4l3 3v3h-7v-6Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-red-400"
      />
      <circle cx="7" cy="19" r="2" fill="currentColor" className="text-[var(--primary)]" />
      <circle cx="18" cy="19" r="2" fill="currentColor" className="text-[var(--primary)]" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[var(--primary)]"
      />
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[var(--primary)]"
      />
    </svg>
  );
}
