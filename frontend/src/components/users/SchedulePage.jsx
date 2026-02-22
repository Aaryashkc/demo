import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useScheduleStore from "../../stores/useScheduleStore";

function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  // selectedLocation = { city, area, label }
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const { schedules, loading, error, fetchAllData } = useScheduleStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Run observer after main content is in the DOM (when loading is false). On first mount we're loading so ref isn't attached yet.
  useEffect(() => {
    if (loading) return;

    const container = pageRef.current;
    if (!container) return;

    const revealItems = container.querySelectorAll(".lp-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lp-in-view");
          } else {
            entry.target.classList.remove("lp-in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [loading]);

  const allSchedules = useMemo(
    () =>
      schedules.map((s) => ({
        ...s,
        label: `${s.city} — ${s.area}`
      })),
    [schedules]
  );

  // ✅ Unique city+area locations: Derived from actual schedules
  const uniqueLocations = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const s of allSchedules) {
      const key = `${s.city}||${s.area}`;
      if (!seen.has(key)) {
        seen.add(key);
        list.push({ city: s.city, area: s.area, label: s.label });
      }
    }
    return list;
  }, [allSchedules]);

  // ✅ Filter schedules by city OR area OR label
  const filteredSchedules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return allSchedules.filter((s) => {
      return (
        s.city.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.label.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, allSchedules]);

  // ✅ Display schedules logic
  const displaySchedules = useMemo(() => {
    if (selectedLocation) {
      return allSchedules.filter(
        (s) => s.city === selectedLocation.city && s.area === selectedLocation.area
      );
    }
    if (searchQuery.trim()) return filteredSchedules;
    return allSchedules.slice(0, 20); // Show more by default or keep logic? Original was slice(0, 2). Let's keep 2 or maybe slightly more? Original code: `return allSchedules.slice(0, 2);`
  }, [selectedLocation, searchQuery, filteredSchedules, allSchedules]);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const match = uniqueLocations.find((loc) => {
      return (
        loc.city.toLowerCase().includes(q) ||
        loc.area.toLowerCase().includes(q) ||
        loc.label.toLowerCase().includes(q)
      );
    });

    if (match) setSelectedLocation(match);
  };

  const handleBack = () => {
    navigate("/customer-dashboard");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  if (loading) {
    return (
      <div className="bg-[#f5f1e8] min-h-screen flex items-center justify-center">
        <p className="text-[#354f52] text-xl font-['Poppins',sans-serif]">Loading schedules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f5f1e8] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 text-xl font-['Poppins',sans-serif]">{error}</p>
        <button onClick={fetchAllData} className="px-4 py-2 bg-[#354f52] text-white rounded-lg">Retry</button>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="bg-[#f5f1e8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button - visible immediately so page is never blank */}
        <button
          onClick={handleBack}
          className="lp-reveal lp-in-view lp-delay-0 bg-[#354f52] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:bg-[#2a3f41] transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2 active:scale-95 transform mb-8 sm:mb-10"
          aria-label="Go back"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="#f5f1e8" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Page Title - visible immediately */}
        <h2 className="lp-reveal lp-in-view lp-delay-1 font-['Outfit',sans-serif] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#354f52] text-center mb-8 sm:mb-12">
          See Your Scheduling
        </h2>

        {/* Search Bar */}
        <div className="lp-reveal lp-delay-2 max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="flex gap-0 shadow-lg rounded-full overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLocation(null); // ✅ important: reset when typing
              }}
              onKeyPress={handleKeyPress}
              placeholder="Search by city or area (e.g., Kathmandu, Pokhara, Lalitpur)"
              className="flex-1 px-6 sm:px-8 py-4 sm:py-5 bg-[#84a98c] text-white placeholder:text-white/80 font-['Poppins',sans-serif] text-base sm:text-lg focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-[#354f52] px-6 sm:px-10 py-4 sm:py-5 font-['Inter',sans-serif] font-medium text-white text-base sm:text-lg hover:bg-[#2a3f41] transition-colors focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-inset flex items-center gap-2"
            >
              Search
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* No Results */}
          {searchQuery && filteredSchedules.length === 0 && (
            <p className="text-center mt-4 text-[#354f52] font-['Poppins',sans-serif]">
              No schedules found. Try: {uniqueLocations.slice(0, 3).map((l) => l.label).join(", ")}
            </p>
          )}
        </div>

        {/* Location Title */}
        {selectedLocation && (
          <div className="max-w-5xl mx-auto mb-6">
            <h3 className="font-['Outfit',sans-serif] font-bold text-2xl sm:text-3xl text-[#354f52] mb-2">
              {selectedLocation.city} — {selectedLocation.area}
            </h3>
          </div>
        )}

        {/* Routine Pick Up Section */}
        <div className="lp-reveal lp-delay-3 max-w-5xl mx-auto">
          <h3 className="font-['Poppins',sans-serif] font-semibold text-xl sm:text-2xl text-[#354f52] mb-6 sm:mb-8">
            Routine Pick Up Around Your Area:
          </h3>

          {/* Schedule Cards */}
          <div className="space-y-6 sm:space-y-8">
            {displaySchedules.length === 0 && !loading && (
              <p className="text-[#354f52] italic">No schedules to display.</p>
            )}
            {displaySchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Truck Icon */}
                  <div className="flex-shrink-0">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 80 80" fill="none">
                      <rect x="20" y="30" width="40" height="35" rx="3" stroke="#ef4444" strokeWidth="3" fill="none" />
                      <path d="M25 30V25C25 22 27 20 30 20H50C53 20 55 22 55 25V30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="25" cy="62" r="5" fill="#ef4444" />
                      <circle cx="55" cy="62" r="5" fill="#ef4444" />
                      <line x1="20" y1="65" x2="60" y2="65" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* ✅ Details + City/Area UI */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center rounded-full bg-[#354f52] px-3 py-1 text-xs sm:text-sm font-semibold text-white">
                        {schedule.city}
                      </span>
                      <span className="text-sm sm:text-base text-[#354f52]/80 font-['Poppins',sans-serif]">
                        {schedule.area}
                      </span>

                      {/* Optional: quick filter by this location */}
                      <button
                        onClick={() => setSelectedLocation({ city: schedule.city, area: schedule.area, label: schedule.label })}
                        className="ml-auto text-xs sm:text-sm text-[#354f52] underline hover:text-[#2a3f41]"
                      >
                        View all for this area
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm sm:text-base text-[#354f52] mb-1">
                          Truck Name
                        </p>
                        <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-[#354f52]">
                          {schedule.truckName}
                        </p>
                      </div>

                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm sm:text-base text-[#354f52] mb-1">
                          Truck ID
                        </p>
                        <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-[#354f52]">
                          {schedule.truckId || schedule.truckObjectId || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm sm:text-base text-[#354f52] mb-1">
                          Truck type
                        </p>
                        <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-[#354f52]">
                          {schedule.truckType}
                        </p>
                      </div>

                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm sm:text-base text-[#354f52] mb-1">
                          Assigned Driver
                        </p>
                        <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-[#354f52]">
                          {schedule.driver}
                        </p>
                      </div>

                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm sm:text-base text-[#354f52] mb-1">
                          Day
                        </p>
                        <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-[#354f52]">
                          {schedule.day}
                        </p>
                      </div>

                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm sm:text-base text-[#354f52] mb-1">
                          Time
                        </p>
                        <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-[#354f52]">
                          {schedule.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!selectedLocation && !searchQuery && displaySchedules.length < allSchedules.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setSearchQuery("Kathmandu")}
                className="font-['Poppins',sans-serif] text-base sm:text-lg text-[#354f52] hover:text-[#296200] transition-colors underline"
              >
                Search for more locations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
