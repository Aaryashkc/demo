import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSocket } from "../../utils/socket";
import useAuthStore from "../../stores/useAuthStore";

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // List of live pending pickup requests received via socket
  const [pendingPickups, setPendingPickups] = useState([]);

  // ── Socket: listen for new requests ─────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();

    const onCreated = (pickup) => {
      setPendingPickups((prev) => {
        // Avoid duplicates
        if (prev.some((p) => p.id === pickup.id)) return prev;
        return [pickup, ...prev];
      });
    };

    const onAccepted = ({ id }) => {
      // Remove the request from the list once it's been accepted (by someone)
      setPendingPickups((prev) => prev.filter((p) => p.id !== id));
    };

    const onCancelled = ({ id }) => {
      setPendingPickups((prev) => prev.filter((p) => p.id !== id));
    };

    socket.on("pickup:created", onCreated);
    socket.on("pickup:accepted", onAccepted);
    socket.on("pickup:cancelled", onCancelled);

    return () => {
      socket.off("pickup:created", onCreated);
      socket.off("pickup:accepted", onAccepted);
      socket.off("pickup:cancelled", onCancelled);
    };
  }, []);

  const handleViewRequest = (pickupId) => {
    navigate("/accept-task", { state: { pickupId } });
  };

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
                <span className="font-semibold text-[var(--primary)]">
                  {user?.name || "Driver"}
                </span>
              </span>
              <span className="hidden sm:inline text-[var(--primary)]/30">•</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
            </div>
          </div>

          <button
            className="w-11 h-11 rounded-full border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:shadow-sm active:scale-95 transition"
            aria-label="Profile"
          >
            <UserIcon />
          </button>
        </div>

        {/* ── Live incoming requests banner ───────────────────────────── */}
        {pendingPickups.length > 0 && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-amber-800 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                {pendingPickups.length} New Pickup Request{pendingPickups.length > 1 ? "s" : ""}
              </p>
              <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">Live</span>
            </div>

            <div className="space-y-2">
              {pendingPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="flex items-center justify-between bg-white rounded-xl border border-amber-200 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--primary)] truncate">
                      {pickup.location?.address || `${pickup.location?.latitude?.toFixed(3)}, ${pickup.location?.longitude?.toFixed(3)}`}
                    </p>
                    <p className="text-xs text-[var(--primary)]/60 mt-0.5">
                      {pickup.category} · {pickup.level} · {pickup.customerName || "Customer"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewRequest(pickup.id)}
                    className="ml-4 flex-shrink-0 bg-[var(--primary)] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 transition"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Driver card */}
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--primary)]/60">Driver</p>
                  <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-[var(--primary)]">
                    {user?.name || "Driver Name"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-[var(--primary)]">Online</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MiniStat label="Email" value={user?.email || "—"} />
                <MiniStat label="Phone" value={user?.phone || "—"} />
                <MiniStat label="Role" value="Driver" />
              </div>
            </Card>

            {/* Live request count */}
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--primary)]/60">Real-time requests</p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--primary)]">
                    {pendingPickups.length > 0
                      ? `${pendingPickups.length} pending`
                      : "No pending requests"}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${pendingPickups.length > 0
                      ? "bg-amber-100 text-amber-700"
                      : "bg-[var(--primary)]/10 text-[var(--primary)]"
                    }`}
                >
                  {pendingPickups.length > 0 ? "New" : "Quiet"}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <InfoTile label="Live requests" value={`${pendingPickups.length}`} />
                <InfoTile label="Socket" value="Connected" />
                <InfoTile label="Status" value="Active" />
                <InfoTile label="Priority" value="Normal" />
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-[var(--primary)]">Actions</h3>
              <div className="mt-4 space-y-3">
                <Link
                  to="/accept-task"
                  className="w-full relative bg-[#213a3d] text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md border-2 border-[var(--primary)]/20 flex items-center justify-center gap-2"
                >
                  <span>View Requests</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {pendingPickups.length > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 rounded-full bg-red-500 ring-4 ring-[#f5f1e8] animate-pulse flex items-center justify-center text-white text-[10px] font-bold px-1">
                      {pendingPickups.length}
                    </span>
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

            <Card>
              <h3 className="text-lg font-semibold text-[var(--primary)]">Quick status</h3>
              <div className="mt-4 space-y-3">
                <StatusRow label="GPS" value="Connected" />
                <StatusRow label="Network" value="Good" />
                <StatusRow label="Socket" value={pendingPickups.length >= 0 ? "Live" : "Reconnecting"} />
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

/* ── UI helpers ────────────────────────────────────────────────────────────── */

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
      <p className="mt-1 font-semibold text-[var(--primary)] truncate">{value}</p>
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
      <path d="M3 7h11v10H3V7Zm11 4h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="2" className="text-red-400" />
      <circle cx="7" cy="19" r="2" fill="currentColor" className="text-[var(--primary)]" />
      <circle cx="18" cy="19" r="2" fill="currentColor" className="text-[var(--primary)]" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
    </svg>
  );
}
