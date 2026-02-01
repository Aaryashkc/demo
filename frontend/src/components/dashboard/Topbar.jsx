import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const Topbar = ({ name = "Admin User", role = "System Administrator" }) => {
  const navigate = useNavigate();

  const initials = React.useMemo(() => {
    const parts = String(name).trim().split(/\s+/).slice(0, 2);
    const a = parts[0]?.[0] ?? "A";
    const b = parts[1]?.[0] ?? "U";
    return (a + b).toUpperCase();
  }, [name]);

  const handleLogout = () => {
    // ✅ admin logout should go to admin login, not customer login
    navigate("/admin-login", { replace: true });
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur border-b border-[var(--primary)]/12 fixed top-0 right-0 left-0 z-40">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile brand icon */}
          <div className="md:hidden w-10 h-10 rounded-2xl bg-[#f5f1e8] border border-[var(--primary)]/12 flex items-center justify-center">
            <span className="text-xl">♻️</span>
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-[var(--primary)] tracking-tight truncate">
              Admin Console
            </h1>
            <p className="hidden sm:block text-xs text-[var(--primary)]/60 truncate">
              Monitor vehicles, routes, and collections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-[var(--primary)]">
                {name}
              </p>
              <p className="text-xs text-[var(--primary)]/60">{role}</p>
            </div>

            <div className="h-10 w-10 rounded-2xl bg-[#f5f1e8] border border-[var(--primary)]/12 flex items-center justify-center font-bold text-[var(--primary)]">
              {initials}
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-[var(--primary)]/10" />

          <Button
            variant="outline"
            onClick={handleLogout}
            className="!px-3 !py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/25"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
