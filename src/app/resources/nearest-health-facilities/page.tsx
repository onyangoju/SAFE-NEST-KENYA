'use client';
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

interface Hospital {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags: {
    name?: string;
  };
}

export default function NearestHealthFacilitiesPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const Map = useMemo(() => dynamic(() => import('@/components/DynamicMap'), { 
    ssr: false 
  }), []);

  const handleFindLocation = () => {
    setLocating(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(userLocation);
          fetchHospitals(userLocation);
          setLocating(false);
        },
        (err) => {
          setError('Unable to retrieve your location. Please ensure location services are enabled in your browser settings.');
          setLocating(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLocating(false);
    }
  };

  const fetchHospitals = async (loc: { lat: number; lng: number }) => {
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000, ${loc.lat}, ${loc.lng});
        way["amenity"="hospital"](around:5000, ${loc.lat}, ${loc.lng});
        relation["amenity"="hospital"](around:5000, ${loc.lat}, ${loc.lng});
      );
      out center;
    `;
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery,
    });
    const data = await response.json();
    setHospitals(data.elements);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 my-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">🏥 Nearest Health Facilities</h1>
        <p className="text-gray-600 mb-6">Click the button to use your current location to find nearby hospitals and clinics. We respect your privacy; your location is not stored.</p>
        <button onClick={handleFindLocation} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg mb-6 transition-transform transform hover:scale-105" disabled={locating}>
          {locating ? 'Locating...' : 'Find Health Facilities'}
        </button>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
        
        {location && <Map location={location} hospitals={hospitals} />}
      </main>
    </div>
  );
} 