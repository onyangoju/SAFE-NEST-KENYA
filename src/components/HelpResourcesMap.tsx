'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom police station icon
const policeIcon = new L.Icon({
  iconUrl: '/police-icon.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Custom safe house icon
const safeHouseIcon = new L.Icon({
  iconUrl: '/safe-house-icon.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// User location icon
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

interface Resource {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags: {
    name?: string;
    amenity?: string;
  };
}

interface HelpResourcesMapProps {
  location: { lat: number, lng: number };
  policeStations: Resource[];
  safeHouses: Resource[];
}

const HelpResourcesMap: React.FC<HelpResourcesMapProps> = ({ location, policeStations, safeHouses }) => {
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
      
      {/* Police Station Markers */}
      {policeStations.map(station => {
        const lat = station.lat ?? station.center?.lat;
        const lon = station.lon ?? station.center?.lon;

        if (lat === undefined || lon === undefined) {
          return null;
        }

        return (
          <Marker key={`police-${station.id}`} position={[lat, lon]} icon={policeIcon}>
            <Popup>{station.tags?.name || 'Police Station'}</Popup>
          </Marker>
        );
      })}

      {/* Safe House Markers */}
      {safeHouses.map(house => {
        const lat = house.lat ?? house.center?.lat;
        const lon = house.lon ?? house.center?.lon;

        if (lat === undefined || lon === undefined) {
          return null;
        }

        return (
          <Marker key={`safe-${house.id}`} position={[lat, lon]} icon={safeHouseIcon}>
            <Popup>{house.tags?.name || 'Safe House'}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default HelpResourcesMap; 