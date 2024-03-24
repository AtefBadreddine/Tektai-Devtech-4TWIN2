import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { fetchLocalisations } from '../../services/LocalisationService'; // Importez la fonction fetchLocalisations depuis le service localisation

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
        setLoading(false); // Marquez le chargement comme terminé une fois les données récupérées
      } catch (error) {
        console.error('Error fetching localisations:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Localisations:', localisations);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {loading && <div>Chargement...</div>}
      {!loading && (
        <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao" id="script-loader" async defer>
  <GoogleMap
    mapContainerStyle={{ height: '100vh', width: '100%' }}
    zoom={4}
    center={{ lat: 0, lng: 0 }}
  >
    {localisations.map((loc, index) => (
      <Marker
        key={index}
        position={{ lat: loc.latitude, lng: loc.longitude }}
        // Utilisez d'autres propriétés ou composants recommandés pour les marqueurs
      />
    ))}
  </GoogleMap>
</LoadScript>

      )}
    </div>
  );
};

export default MapComponent;