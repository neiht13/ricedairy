// components/MapComponent.jsx
'use client'; // Đảm bảo rằng thành phần này được render trên phía client

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icon issues with Webpack and Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Thành phần phụ để thay đổi vị trí của bản đồ
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) { // Đảm bảo vị trí hợp lệ
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

const MapComponent = ({ position, name }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '200px', width: '100%' }}
    >
      <ChangeView center={position} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://maps.google.com">VNPT ĐTP</a>'
        subdomains= {['mt0','mt1','mt2','mt3']}
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
