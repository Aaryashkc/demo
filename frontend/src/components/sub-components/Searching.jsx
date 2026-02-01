import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ThankYouPage from "./ThankYouPage";

// Component to handle map clicks
function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng);
    },
  });
  return null;
}

// Component to update map view when center changes (only when needed)
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  
  return null;
}

// Custom Leaflet Search Control Component (rendered outside map)
function MapSearchControl({ onLocationSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'SafaBin-WasteManagement/1.0'
          }
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching address:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    onLocationSelect([lat, lon], result.display_name || `${result.address?.road || ''}, ${result.address?.city || result.address?.town || ''}`.trim());
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
          title="Search location"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Search location</span>
        </button>
      ) : (
        <div className="w-80 max-h-96 flex flex-col">
          <div className="flex items-center gap-2 p-3 border-b">
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Search address..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[var(--primary)] text-sm"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="p-2 hover:bg-gray-100 rounded transition"
              title="Close"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {searchQuery && (
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="mx-3 mt-2 px-4 py-2 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary)]/90 transition text-sm font-medium disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          )}
          {searchResults.length > 0 && (
            <div className="overflow-y-auto max-h-64 p-2">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded transition text-sm"
                >
                  <div className="font-medium text-gray-800">{result.display_name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Flow states:
 *  - "confirm": user sees location + Confirm/Cancel
 *  - "searching": app is searching drivers + Cancel Searching
 *  - "found": driver found + Call Driver/Cancel + 60s countdown
 *  - "thankyou": thank you page after calling driver
 */
function SearchPage() {
  const [flow, setFlow] = useState("confirm");
  const [userName] = useState("user hello"); // replace with actual user

  // Map state
  const [mapCenter, setMapCenter] = useState([27.7172, 85.3240]); // Kathmandu
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); // Store full address for backend


  // Dynamic address label
  const addressLabel = selectedAddress
    ? selectedAddress
    : selectedLocation
    ? `Location: ${selectedLocation[0].toFixed(4)}, ${selectedLocation[1].toFixed(4)}`
    : "Manage waste collection with precision and ease";

  // Driver info (mock)
  const driver = useMemo(
    () => ({
      truckId: "TRUCK-042",
      phone: "+9779800000000",
    }),
    []
  );

  // Countdown only when driver found
  const [secondsLeft, setSecondsLeft] = useState(60);
  const intervalRef = useRef(null);

  // When driver is found, start countdown
  useEffect(() => {
    if (flow !== "found") {
      // Clear interval if flow changes away from "found"
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval before creating a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset countdown (deferred to avoid linter warning)
    setTimeout(() => {
      setSecondsLeft(60);
    }, 0);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [flow]);

  // Demo transitions (replace with real API logic)
  const handleConfirm = () => {
    if (!selectedLocation) {
      alert("Please select a location on the map first");
      return;
    }
    setFlow("searching");

    // simulate "searching" then "found" in 2.5s
    setTimeout(() => setFlow("found"), 2500);
  };

  const handleCancel = () => {
    // in real app: cancel order / go back
    setFlow("confirm");
  };

  const handleCancelSearching = () => {
    // in real app: cancel searching request
    setFlow("confirm");
  };

  const handleCallDriver = () => {
    // Show thank you page after clicking call driver
    setFlow("thankyou");
    // Optionally, you can still trigger the phone call
    // window.location.href = `tel:${driver.phone}`;
  };

  const handleBackToHome = () => {
    // Reset flow to initial state
    setFlow("confirm");
    setSelectedLocation(null);
    setSelectedAddress(null);
  };

  const handleMapClick = (latlng) => {
    const newLocation = [latlng.lat, latlng.lng];
    setSelectedLocation(newLocation);
    setMapCenter(newLocation);
    setSelectedAddress(null); // Clear address when clicking map
  };


  // Handle location select from map search control
  const handleMapSearchSelect = (location, address) => {
    setSelectedLocation(location);
    setMapCenter(location);
    setSelectedAddress(address);
    console.log('Selected location from map search:', {
      address: address,
      latitude: location[0],
      longitude: location[1]
    });
  };

  // Check if cancel should be disabled (after 1 minute)
  const canCancel = secondsLeft > 0;

  // Placeholder map image (replace with Leaflet later)
  // const mapImg =
  //   "https://images.unsplash.com/photo-1533777419517-3e4017e2e15c?auto=format&fit=crop&w=1600&q=80";

  // Show thank you page when flow is "thankyou"
  if (flow === "thankyou") {
    return (
      <ThankYouPage 
        driverInfo={driver} 
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="app-bg">
      
      <main className="app-container">
        {/* Map Area */}
        <section className="bg-white rounded-2xl overflow-hidden border border-black/10 shadow-sm">
          <div className="h-[320px] md:h-[360px] w-full bg-black/5 relative">
            <MapSearchControl onLocationSelect={handleMapSearchSelect} />
            <MapContainer
              center={mapCenter}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              <ChangeMapView center={mapCenter} zoom={15} />

              {selectedLocation && <Marker position={selectedLocation} />}

              <MapClickHandler onClick={handleMapClick} />
            </MapContainer>
          </div>

          {/* Bottom Status Panel */}
          <div className="bg-[#f5f1e8] px-8 py-7 relative">
            {/* Title */}
            {flow === "confirm" && (
              <>
                <h2 className="text-3xl font-semibold text-black mb-2">{userName}</h2>
                <p className="text-[var(--accent)] text-sm mb-6">{addressLabel}</p>

                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="border-2 border-[var(--primary)] text-[var(--primary)] px-10 py-3 rounded-2xl bg-transparent hover:bg-white active:scale-95 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleConfirm}
                    disabled={!selectedLocation}
                    className={`px-10 py-3 rounded-2xl transition shadow-sm ${
                      selectedLocation
                        ? 'bg-[var(--primary)] text-white hover:opacity-95 active:scale-95 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                    title={!selectedLocation ? 'Please select a location on the map first' : ''}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}

            {flow === "searching" && (
              <>
                <h2 className="text-3xl font-semibold text-black mb-2">Searching Drivers</h2>
                <p className="text-[var(--accent)] text-sm mb-6">{addressLabel}</p>

                <div className="flex gap-4">
                  <button
                    onClick={handleCancelSearching}
                    className="border-2 border-[var(--primary)] text-[var(--primary)] px-10 py-3 rounded-2xl bg-transparent hover:bg-white active:scale-95 transition"
                  >
                    Cancel Searching
                  </button>
                </div>
              </>
            )}

            {flow === "found" && (
              <>
                <div className="flex items-baseline gap-6 mb-2">
                  <h2 className="text-2xl md:text-3xl font-semibold text-black">
                    DRIVER FOUND
                  </h2>
                  <span className="text-[var(--accent)] text-sm font-medium">
                    {driver.truckId}
                  </span>
                </div>

                <p className="text-[var(--accent)] text-sm mb-2">
                  Truck is on it&apos;s way. Be Patient.
                </p>

                <p className="text-[var(--primary)]/80 text-sm mb-6">
                  Cancel with in {" "}
                  <span className="font-semibold text-[var(--primary)]">
                    {String(secondsLeft).padStart(2, "0")}s
                  </span>
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleCallDriver}
                    className="bg-[var(--primary)] text-white px-10 py-3 rounded-2xl hover:opacity-95 active:scale-95 transition shadow-sm"
                  >
                    CALL DRIVER
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={!canCancel}
                    className={`px-10 py-3 rounded-2xl active:scale-95 transition shadow-sm ${
                      canCancel
                        ? 'bg-red-400 text-white hover:bg-red-500 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                    title={!canCancel ? 'Cannot cancel after 1 minute' : ''}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SearchPage;