import React, { useCallback, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from 'react-leaflet';
import {
  LeafletKeyboardEventHandlerFn,
  LeafletMouseEvent,
  LeafletMouseEventHandlerFn,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLocations } from '../../store/locationReducer';
import { fetchMemories } from '../../store/memoriesReducer';
import { Link } from 'react-router-dom';

export default function Map() {
  // Récupération des locations depuis l'API
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  // Récupération des souvenirs depuis l'API
  useEffect(() => {
    dispatch(fetchMemories());
  }, []);

  // Récupération de la liste des locations
  const locationsList = useAppSelector((state) => state.location.list);

  const memoriesList = useAppSelector((state) => state.memories.list);

  // Composant pour gérer les événements de clic sur la carte
  function MapClickHandler({
    onClick,
  }: {
    onClick: (event: LeafletMouseEvent) => void;
  }) {
    useMapEvent('click', (event) => {
      onClick(event);
    });
    return null;
  }

  // Fonction de gestionnaire d'événements pour le clic sur la carte
  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    // Obtenir les coordonnées latlng du clic
    const { lat, lng } = event.latlng;

    // Afficher les coordonnées dans la console
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);

    // Vous pouvez également stocker les coordonnées dans l'état du composant ou effectuer d'autres actions
  }, []);

  const handleClickPopup = (event) => {
    console.log(event.sourceTarget.options.location);
  };

  return (
    <div className="p-5 m-auto">
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* On mappe sur la liste des locations pour afficher un marqueur pour chacune */}
        {locationsList.map((location) => (
          <div key={location.id}>
          <Marker
            location={location}
            position={[Number(location.latitude), Number(location.longitude)]}
            eventHandlers={{ click: handleClickPopup }}
          >
            {/* On mappe sur la liste des souvenirs pour afficher le titre du souvenir s'ils correspondent à la bonne location */}

            <Popup>
              {memoriesList.map((memory) => {
                if (location.id === memory.location.id) {
                  return (
                    <Link to={`/memories/${memory.id}`} key={memory.id}>
                      <p>{memory.title}</p>
                    </Link>
                  );
                }
              })}
            </Popup>
          </Marker>
          </div>
        ))}

        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}
