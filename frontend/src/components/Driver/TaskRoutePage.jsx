import { useMemo } from "react";

export default function TaskRoutePage() {
  // mock data – later fetch by taskId
  const task = useMemo(
    () => ({
      id: "TASK-2847",
      wasteType: "BIO-Waste",
      priority: "Standard",
      points: [
        {
          id: 1,
          title: "Municipal Building A",
          address: "Dillibazar Pipal Bot",
        },
        {
          id: 2,
          title: "Municipal Building B",
          address: "Dillibazar Pipal Bot",
        },
        {
          id: 3,
          title: "Municipal Building C",
          address: "Dillibazar Pipal Bot",
        },
      ],
    }),
    []
  );

  const handleStartCollection = () => {
    alert("Collection started. Move to active route page.");
  };

  return (
    <div className="app-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--primary)]">
            New Task Request
          </h1>

          <button
            className="w-10 h-10 rounded-full border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:shadow-sm active:scale-95 transition"
            aria-label="Profile"
          >
            <UserIcon />
          </button>
        </div>

        {/* Task details */}
        <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm overflow-hidden mb-6 sm:mb-10">
          <div className="px-6 py-5 border-b border-[var(--primary)]/15 bg-[#f5f1e8] flex justify-between">
            <p className="text-sm font-semibold text-[var(--primary)]">
              TASK DETAILS
            </p>
            <div className="text-right">
              <p className="text-xs text-[var(--primary)]/60">TASK ID</p>
              <p className="font-semibold text-[var(--primary)]">
                {task.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-6">
            <Detail label="WASTE TYPE" value={task.wasteType} accent />
            <Detail label="PRIORITY" value={task.priority} />
          </div>
        </div>

        {/* Route + Points */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map placeholder */}
          <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-6 flex flex-col items-center justify-center">
            <button className="self-start mb-4 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg">
              MAP VIEW
            </button>

            <div className="flex flex-col items-center justify-center text-center">
              <MapPin />
              <p className="mt-2 text-sm text-[var(--primary)]/70">
                Location
              </p>
            </div>

            {/*
              Leaflet later:
              <MapContainer ... />
            */}
          </div>

          {/* Collection points */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-6">
            <p className="text-sm font-semibold text-[var(--primary)] mb-4">
              COLLECTION POINTS
            </p>

            <div className="space-y-3">
              {task.points.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-start gap-4 border border-[var(--primary)]/20 rounded-xl p-4"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--primary)] text-sm font-semibold text-[var(--primary)]">
                    {idx + 1}
                  </span>

                  <div>
                    <p className="font-semibold text-[var(--primary)]">
                      {p.title}
                    </p>
                    <p className="text-sm text-[var(--primary)]/60">
                      {p.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartCollection}
              className="mt-6 bg-[var(--primary)] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-95 active:scale-95 transition shadow-sm"
            >
              START COLLECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- helpers -------- */

function Detail({ label, value, accent }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[var(--primary)]/60">
        {label}
      </p>
      <p
        className={`mt-1 text-base font-semibold ${
          accent ? "text-[var(--accent)]" : "text-[var(--primary)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MapPin() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-red-500"
      />
      <circle cx="12" cy="10" r="3" fill="currentColor" className="text-red-500" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
