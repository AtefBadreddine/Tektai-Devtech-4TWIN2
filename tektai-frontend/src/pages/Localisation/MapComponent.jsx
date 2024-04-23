import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchLocalisations } from '../../services/LocalisationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "leaflet/dist/leaflet.css";
const MapComponent = () => {
  const [localisations, setLocalisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching localisations...');
        const data = await fetchLocalisations();
        console.log('Localisations fetched:', data);
        setLocalisations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching localisations:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Localisations:', localisations);

  // Créer une icône personnalisée en utilisant Font Awesome avec L.divIcon
  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div style="color: red;">             a      </div>`, // Utiliser Font Awesome dans le HTML de l'icône
  });
   /*<FontAwesomeIcon icon={faLocationDot} />*/

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ height: '50vh', width: '50%' }}>
        {loading && <div>Chargement...</div>}
        {!loading && (
          <MapContainer center={[36.8649356, 10.0976468]} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {localisations.map((loc, index) => (
              <Marker key={index} position={[loc.latitude, loc.longitude]} icon={customIcon}>
                <Popup>{/* Contenu de la fenêtre contextuelle ici */}</Popup>
              </Marker>
            ))}
          </MapContainer>
          // <FontAwesomeIcon icon={faLocationDot} /></div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;