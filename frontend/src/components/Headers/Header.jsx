import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-[#354f52] w-full">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight"
            aria-label="SafaBin home"
          >
            SafaBin
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
            {/* Sign Up (outline button on mobile for better tap UX) */}
            <Link
              to="/signup"
              className="hidden xs:inline-flex items-center justify-center rounded-full border border-white/60 px-4 py-2 text-sm sm:text-base font-medium text-white hover:bg-white/10 transition"
            >
              Sign Up
            </Link>

            {/* If you want Sign Up visible even on tiny screens, use this instead:
                className="inline-flex ..."
                and remove the hidden xs:inline-flex above.
            */}

            {/* Login CTA */}
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 text-sm sm:text-base md:text-lg font-semibold text-[#354f52] hover:bg-white/90 transition active:scale-[0.98]"
            >
              Log In
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
