import { useCallback, useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLocations } from '../../store/locationsReducer';
import { fetchMemories } from '../../store/memoriesReducer';
import { Link } from 'react-router-dom';
import {
  setCoordState,
  setLocationState,
} from '../../store/createMemoryReducer';

export default function Map() {
  // Récupération des locations et des memories depuis l'API
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchMemories());
  }, []);

  // Récupération de la liste des locations
  const locationsList = useAppSelector((state) => state.locations.list);

  // Récupération de la liste des memories
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
    const { lat, lng } = event.latlng;
    const coord = { lat, lng };
    dispatch(setCoordState(coord));
  }, []);

  // Fonction de gestionnaire d'événements pour le clic sur un pointeur
  const handleClickPopup = (event: LeafletMouseEvent, location: any) => {
    dispatch(setLocationState(location));
  };

  // État pour stocker le type de lieu sélectionné
  const [selectedType, setSelectedType] = useState('');

  // Filtrer la liste des lieux en fonction du type de lieu sélectionné
  const filteredLocations = locationsList.filter((location) => {
    const memoriesInLocation = memoriesList.filter(
      (memory) => memory.location.id === location.id
    );
    const typesInLocation = memoriesInLocation.map(
      (memory) => memory.place.type
    );
    return typesInLocation.includes(selectedType) || selectedType === '';
  });

  return (
    <div className="p-5 m-auto">
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* On mappe sur la liste des locations filtrées pour afficher un marqueur pour chacune */}
        {filteredLocations.map((location) => (
          <div key={location.id}>
            <Marker
              position={[Number(location.latitude), Number(location.longitude)]}
              eventHandlers={{
                click: (event: LeafletMouseEvent) =>
                  handleClickPopup(event, location),
              }}
            >
              {/* On mappe sur la liste des souvenirs pour afficher le titre du souvenir s'ils correspondent à la bonne location et au bon type de lieu*/}
              <Popup>
                {memoriesList.map((memory) => {
                  if (
                    location.id === memory.location.id &&
                    (selectedType === '' || memory.place.type === selectedType)
                  ) {
                    return (
                      <Link to={`/memories/${memory.id}`} key={memory.id}>
                        <p>{memory.title}</p>
                      </Link>
                    );
                  }
                  return null;
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
