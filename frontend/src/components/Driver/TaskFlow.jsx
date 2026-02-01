import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Single-file demo flow:
 * 1) Update Status (ongoing) -> click Update Status
 * 2) Task Execution (checklist) -> check items
 * 3) Mark Collection Complete -> goes back to Update Status (completed)
 * 4) Continue to Next Location -> advances to next point -> goes to Task Execution
 */

const CHECK_ITEMS = [
  { key: "containerLocated", label: "Container Located" },
  { key: "loadSecured", label: "Load Secured" },
  { key: "volumeVerified", label: "Volume Verified" },
  { key: "siteClean", label: "Site Clean" },
];

function nowTimeLabel() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function TaskFlow() {
  const navigate = useNavigate();
  
  // mock task data INSIDE this file, as you asked
  const task = useMemo(
    () => ({
      id: "TASK-2847",
      wasteType: "BIO-Waste",
      priority: "Standard",
      points: [
        { id: "P1", title: "Municipal Building A", address: "Kumari Tole, Dhobidhara", estTons: 0.8 },
        { id: "P2", title: "Municipal Building B", address: "Dillibazar Pipal Bot", estTons: 0.6 },
        { id: "P3", title: "Municipal Building C", address: "Thamel, Kathmandu", estTons: 0.7 },
      ],
    }),
    []
  );

  // "4 pages" state (no router)
  // 1 = UpdateStatus (ongoing or completed view depends on point status)
  // 2 = TaskExecution (active)
  const [page, setPage] = useState(1);

  // which point are we currently doing?
  const [pointIndex, setPointIndex] = useState(0);

  // store completion per point
  const [pointStatus, setPointStatus] = useState(() =>
    task.points.map(() => ({
      status: "ongoing", // ongoing | completed
      collectedTons: null,
      time: null,
    }))
  );

  // checklist state for current point (resets on next point)
  const [checks, setChecks] = useState(() => ({
    containerLocated: false,
    loadSecured: false,
    volumeVerified: false,
    siteClean: false,
  }));

  const currentPoint = task.points[pointIndex];
  const currentStatus = pointStatus[pointIndex];

  const doneCount = pointStatus.filter((p) => p.status === "completed").length;
  const totalCount = task.points.length;

  const allChecked = Object.values(checks).every(Boolean);
  const isCurrentCompleted = currentStatus?.status === "completed";
  const isAllDone = doneCount === totalCount;

  function resetChecklist() {
    setChecks({
      containerLocated: false,
      loadSecured: false,
      volumeVerified: false,
      siteClean: false,
    });
  }

  function goToExecution() {
    if (isAllDone) return;
    setPage(2);
  }

  function toggleCheck(key) {
    if (isCurrentCompleted) return;
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function markComplete() {
    if (!allChecked) return;

    setPointStatus((prev) => {
      const copy = [...prev];
      copy[pointIndex] = {
        status: "completed",
        collectedTons: currentPoint.estTons,
        time: nowTimeLabel(),
      };
      return copy;
    });

    // after marking complete -> show Update Status page (completed state)
    setPage(1);
  }

  function continueNext() {
    // move to next point (if exists) and go to Task Execution page
    const next = pointIndex + 1;

    if (next >= task.points.length) {
      // no next => all done => show update status "all done"
      setPage(1);
      return;
    }

    setPointIndex(next);
    resetChecklist();
    setPage(2);
  }

  function backToUpdate() {
    setPage(1);
  }

  return (
    <div className="app-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--primary)]">
            {page === 1 ? "Update Status" : "Task Execution"}
          </h1>

          <button
            className="w-10 h-10 rounded-full border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:shadow-sm active:scale-95 transition"
            aria-label="Profile"
          >
            <UserIcon />
          </button>
        </div>

        {/* ALL DONE STATE */}
        {isAllDone ? (
          <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-8">
            <p className="text-sm font-semibold text-[var(--primary)] mb-2">
              TASK COMPLETE
            </p>
            <p className="text-2xl font-bold text-[var(--primary)] mb-2">
              {task.id}
            </p>
            <p className="text-[var(--primary)]/70 mb-6">
              All {totalCount} collection points are completed.
            </p>
            <button
              onClick={() => navigate("/driver-dashboard")}
              className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-95 active:scale-95 transition"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <>
            {page === 1 ? (
              <UpdateStatusPageUI
                task={task}
                point={currentPoint}
                status={currentStatus}
                doneCount={doneCount}
                totalCount={totalCount}
                onUpdateStatus={goToExecution}
                onContinueNext={continueNext}
              />
            ) : (
              <TaskExecutionPageUI
                task={task}
                point={currentPoint}
                pointIndex={pointIndex}
                totalCount={totalCount}
                checks={checks}
                checkItems={CHECK_ITEMS}
                onToggle={toggleCheck}
                allChecked={allChecked}
                isCompleted={isCurrentCompleted}
                onMarkComplete={markComplete}
                onBack={backToUpdate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =========================
   PAGE 1: UPDATE STATUS UI
   ========================= */

function UpdateStatusPageUI({
  point,
  status,
  doneCount,
  totalCount,
  onUpdateStatus,
  onContinueNext,
}) {
  const isCompleted = status?.status === "completed";

  return (
    <>
      {/* Location Status Card */}
      <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm overflow-hidden mb-6 sm:mb-10">
        <div className="px-6 py-5 border-b border-[var(--primary)]/15 bg-[#f5f1e8] flex justify-between items-start gap-4">
          <div>
            <p className="text-xs font-semibold text-[var(--primary)]/70">
              LOCATION STATUS
            </p>
            <p className="font-bold text-[var(--primary)]">{point.title}</p>
            <p className="text-sm text-[var(--primary)]/70">{point.address}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              isCompleted ? "bg-[var(--accent)] text-white" : "bg-[var(--accent)] text-white"
            }`}
          >
            {isCompleted ? "Completed" : "Ongoing"}
          </span>
        </div>

        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[var(--primary)]/70">
              COLLECTED
            </p>
            <p className="text-sm font-semibold text-[var(--accent)]">
              {isCompleted ? `${status.collectedTons} tons` : "—"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold text-[var(--primary)]/70">
              TIME
            </p>
            <p className="text-sm text-[var(--primary)]">
              {isCompleted ? status.time : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Progress + Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-6">
          <p className="text-sm font-semibold text-[var(--primary)] mb-3">
            TASK PROGRESS
          </p>
          <ProgressBar done={doneCount} total={totalCount} />
          <p className="mt-2 text-xs text-[var(--primary)]/70">
            {doneCount} of {totalCount} Complete
          </p>
        </div>

        <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
          {!isCompleted ? (
            <button
              onClick={onUpdateStatus}
              className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-95 active:scale-95 transition"
            >
              Update Status
            </button>
          ) : (
            <button
              onClick={onContinueNext}
              className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-95 active:scale-95 transition"
            >
              Continue to Next Location
            </button>
          )}

          <button
            onClick={() => alert("Return to dashboard (not included)")}
            className="px-6 py-3 rounded-2xl font-semibold border border-[var(--primary)]/25 text-[var(--primary)] hover:bg-white/60 transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================
   PAGE 2/3: TASK EXECUTION UI
   ========================= */

function TaskExecutionPageUI({
  task,
  point,
  pointIndex,
  totalCount,
  checks,
  checkItems,
  onToggle,
  allChecked,
  isCompleted,
  onMarkComplete,
  onBack,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[var(--primary)]/70">
                CURRENT LOCATION
              </p>
              <p className="mt-1 font-bold text-[var(--primary)]">{point.title}</p>
              <p className="text-sm text-[var(--primary)]/70">{point.address}</p>
            </div>

            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 text-white">
              POINT {pointIndex + 1}/{totalCount}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-6">
          <p className="text-sm font-semibold text-[var(--primary)] mb-4">
            COLLECTION CHECKLIST
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checkItems.map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 border border-[var(--primary)]/20 rounded-xl px-4 py-3 select-none ${
                  isCompleted ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checks[item.key]}
                  disabled={isCompleted}
                  onChange={() => onToggle(item.key)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-[var(--primary)]">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm p-6">
          <p className="text-sm font-semibold text-[var(--primary)] mb-4">
            WASTE DETAILS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--primary)]/60">TYPE</p>
              <p className="mt-1 font-semibold text-[var(--primary)]">
                {task.wasteType}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--primary)]/60">
                EST VOLUME
              </p>
              <p className="mt-1 font-semibold text-[var(--primary)]">
                {point.estTons} tons
              </p>
            </div>
          </div>
        </div>

        {!isCompleted ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onMarkComplete}
              disabled={!allChecked}
              className={`px-6 py-3 rounded-2xl font-semibold transition ${
                allChecked
                  ? "bg-[var(--primary)] text-white hover:opacity-95 active:scale-95"
                  : "bg-black/10 text-black/40 cursor-not-allowed"
              }`}
            >
              Mark Collection Complete
            </button>

            <button
              onClick={() => alert("Report issue flow later")}
              className="px-6 py-3 rounded-2xl font-semibold border border-red-500/40 text-red-600 hover:bg-red-50 transition"
            >
              Report Issue
            </button>

            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl font-semibold border border-[var(--primary)]/25 text-[var(--primary)] hover:bg-white/60 transition"
            >
              Back
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={() => alert("This screen should not show when completed in this demo")}
              className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Continue to Next Location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   SMALL UI HELPERS
   ========================= */

function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden">
      <div className="h-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
    </div>
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
