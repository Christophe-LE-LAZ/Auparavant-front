import React, { useCallback } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';

export default function Map() {
  // Fonction de gestionnaire d'événements pour le clic sur la carte
  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    // Obtenez les coordonnées latlng du clic
    const { lat, lng } = event.latlng;

    // Afficher les coordonnées dans la console
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);

    // Vous pouvez également stocker les coordonnées dans l'état du composant ou effectuer d'autres actions
  }, []);

  return (
    <div className="p-5 m-auto">
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}

// Composant pour gérer les événements de clic sur la carte
function MapClickHandler({ onClick }: { onClick: (event: LeafletMouseEvent) => void }) {
  useMapEvent('click', (event) => {
    onClick(event);
  });
  return null;
}
