'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom hospital icon
const hospitalIcon = new L.Icon({
  iconUrl: '/hospital-icon.png',
  iconSize: [24, 24], // Made smaller
  iconAnchor: [12, 24], // Adjusted anchor point for new size
  popupAnchor: [0, -24], // Adjusted popup anchor for new size
});

// User location icon
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

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

interface DynamicMapProps {
  location: { lat: number, lng: number };
  hospitals: Hospital[];
}

const DynamicMap: React.FC<DynamicMapProps> = ({ location, hospitals }) => {
  const userPosition = new L.LatLng(location.lat, location.lng);

  return (
    <MapContainer center={userPosition} zoom={14} style={{ height: '600px', width: '100%' }} className="rounded-lg shadow-inner border">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={userPosition} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>
      {hospitals.map(hospital => {
        const lat = hospital.lat ?? hospital.center?.lat;
        const lon = hospital.lon ?? hospital.center?.lon;

        if (lat === undefined || lon === undefined) {
          return null;
        }

        return (
          <Marker key={hospital.id} position={[lat, lon]} icon={hospitalIcon}>
            <Popup>{hospital.tags?.name || 'Hospital'}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default DynamicMap; 