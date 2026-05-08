import React, { useEffect, useState } from "react";

const apiBase = import.meta.env.VITE_API_URL || "/api";

export default function PoliceStationFinder() {
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => {
        console.error("Failed to load cities", err);
        setError("Unable to load city data right now.");
      });
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;

    if (!cityId) {
      setStations([]);
      return;
    }

    fetch(`${apiBase}/police-stations/${cityId}`)
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load stations", err);
        setError("Unable to load police stations right now.");
      });
  };

  return (
    <div className="tricolor-page">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Badge */}
        <div className="text-center mb-8">
          <img
            src="/assets/maharashtra-police-badge.svg"
            alt="Maharashtra Police Badge"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Maharashtra Police Station Finder</h1>
          <p className="text-gray-600">Find police stations in your city for assistance and emergencies</p>
        </div>

        {/* City Selector */}
        <div className="tricolor-section mb-8 rounded-2xl">
          <label htmlFor="city-select" className="block text-lg font-semibold text-gray-700 mb-4">
            Select Your City
          </label>
          <select
            id="city-select"
            onChange={handleCityChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="">Choose a city...</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name} - {city.district}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => (
            <div
              key={station.station_id}
              className="rounded-lg border border-white/80 border-l-4 border-l-blue-500 bg-white/95 p-6 shadow-lg transition duration-300 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src="/assets/maharashtra-police-badge.svg"
                  alt="Police Station"
                  className="w-12 h-12 mr-3"
                />
                <h2 className="text-xl font-semibold text-gray-800">{station.station_name}</h2>
              </div>
              <div className="space-y-2 text-gray-600">
                <p><strong>Address:</strong> {station.address}</p>
                <p><strong>Phone:</strong> <a href={`tel:${station.phone}`} className="text-blue-600 hover:underline">{station.phone}</a></p>
                <p><strong>City:</strong> {station.city_name}</p>
              </div>
              <div className="mt-4">
                <a
                  href={`https://www.google.com/maps?q=${station.latitude},${station.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>For emergencies, call 100 immediately</p>
          <p className="mt-2">Maharashtra Police - Serving with Integrity</p>
        </div>
      </div>
    </div>
  );
}
