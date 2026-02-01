import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AcceptTaskPage() {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const navigate = useNavigate();

  const task = useMemo(
    () => ({
      id: "TASK-2847",
      wasteType: "BIO-Waste",
      priority: "Standard",
      estVolume: "10 KG",
      estTime: "30 MINS",
      assignedVehicle: "TRUCK-042",
    }),
    []
  );

  const handleAccept = async () => {
    if (isAccepting || isDeclining) return;
    setIsAccepting(true);

    // TODO: call backend: POST /driver/tasks/:id/accept
    setTimeout(() => {
      setIsAccepting(false);
      alert("Task accepted. Redirect to route page next.");
    }, 900);

    navigate('/task-route');
  };

  const handleDecline = async () => {
    if (isAccepting || isDeclining) return;

    const ok = confirm("Decline this task?");
    if (!ok) return;

    setIsDeclining(true);

    // TODO: call backend: POST /driver/tasks/:id/decline
    setTimeout(() => {
      setIsDeclining(false);
      alert("Task declined. Back to dashboard.");
    }, 700);

    navigate('/driver-dashboard');
  };

  return (
    <div className="app-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--primary)]">
              New Task Request
            </h1>
            <div className="mt-2 h-[3px] w-56 bg-[var(--accent)] rounded-full" />
          </div>

          <button
            className="w-11 h-11 rounded-full border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:shadow-sm active:scale-95 transition"
            aria-label="Profile"
          >
            <UserIcon />
          </button>
        </div>

        {/* Card */}
        <div className="mt-6 sm:mt-10 bg-white rounded-3xl border border-[var(--primary)]/15 shadow-sm overflow-hidden">
          {/* Header row */}
          <div className="px-5 sm:px-7 py-5 sm:py-6 bg-[#f5f1e8] border-b border-[var(--primary)]/15 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[var(--primary)]/70">
                TASK DETAILS
              </p>
              <p className="text-sm text-[var(--primary)]/60 mt-1">
                Review and accept to start route planning.
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-[var(--primary)]/70">TASK ID</p>
              <p className="text-sm sm:text-base font-bold text-[var(--primary)]">
                {task.id}
              </p>
            </div>
          </div>

          {/* Body rows */}
          <div className="divide-y divide-[var(--primary)]/10">
            <Row
              leftLabel="WASTE TYPE"
              leftValue={task.wasteType}
              leftValueClass="text-[var(--accent)] font-semibold"
              rightLabel="PRIORITY"
              rightValue={task.priority}
            />

            <Row
              leftLabel="EST. VOLUME"
              leftValue={task.estVolume}
              rightLabel="EST. TIME"
              rightValue={task.estTime}
              rightValueClass="text-red-500 font-semibold"
            />

            <Row
              leftLabel="ASSIGNED VEHICLE"
              leftValue={task.assignedVehicle}
              rightLabel=" "
              rightValue=" "
              hideRightOnMobile
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleAccept}
            disabled={isAccepting || isDeclining}
            className={`w-full sm:w-auto sm:min-w-[220px] px-8 py-4 rounded-2xl font-semibold transition shadow-sm
              ${
                isAccepting || isDeclining
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[var(--primary)] text-white hover:opacity-95 active:scale-[0.99]"
              }
            `}
          >
            {isAccepting ? (
              <span className="inline-flex items-center gap-2">
                <Spinner /> Accepting...
              </span>
            ) : (
              "ACCEPT TASK"
            )}
          </button>

          <button
            onClick={handleDecline}
            disabled={isAccepting || isDeclining}
            className={`w-full sm:w-auto sm:min-w-[180px] px-8 py-4 rounded-2xl font-semibold transition shadow-sm
              ${
                isAccepting || isDeclining
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-red-400 text-white hover:bg-red-500 active:scale-[0.99]"
              }
            `}
          >
            {isDeclining ? (
              <span className="inline-flex items-center gap-2">
                <Spinner /> Declining...
              </span>
            ) : (
              "Decline"
            )}
          </button>
        </div>

        {/* Small hint (mobile-friendly) */}
        <p className="mt-4 text-sm text-[var(--primary)]/60">
          Tip: After accepting, your route and pickup points will appear in <span className="font-semibold">My Route</span>.
        </p>
      </div>
    </div>
  );
}

/* ---------- components ---------- */

function Row({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  leftValueClass = "",
  rightValueClass = "",
  hideRightOnMobile = false,
}) {
  return (
    <div className="px-5 sm:px-7 py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className="text-xs font-semibold tracking-wide text-[var(--primary)]/70">
          {leftLabel}
        </p>
        <p className={`mt-1 text-base text-[var(--primary)] ${leftValueClass}`}>
          {leftValue}
        </p>
      </div>

      <div className={`${hideRightOnMobile ? "hidden sm:block" : ""} sm:text-right`}>
        <p className="text-xs font-semibold tracking-wide text-[var(--primary)]/70">
          {rightLabel}
        </p>
        <p className={`mt-1 text-base text-[var(--primary)] ${rightValueClass}`}>
          {rightValue}
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
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
