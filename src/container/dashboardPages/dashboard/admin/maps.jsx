/** @format */

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Example data with closer points
const points = [
  { lat: 24.29304494, long: 54.47741559, status: true }, // Point 1 (in spec)
  { lat: 24.29394494, long: 54.47791559, status: false }, // Close to Point 1 (out of spec)
  { lat: 24.29214494, long: 54.47691559, status: true }, // Close to Point 1 (in spec)
  { lat: 24.29404494, long: 54.47841559, status: false }, // Close to Point 1 (out of spec)
  { lat: 24.376111, long: 54.734306, status: true }, // Point 2 (in spec)
  { lat: 24.377111, long: 54.735306, status: false }, // Close to Point 2 (out of spec)
];

// Custom icons for markers
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const WorldMap = () => {
  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[24.29304494, 54.47741559]} // Centered around Point 1
        zoom={12}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.long]}
            icon={point.status ? greenIcon : redIcon}
          >
            <Popup>{point.status ? "In Spec" : "Out of Spec"}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
