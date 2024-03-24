import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchLocalisations } from '../../services/LocalisationService';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    zoom: 4
  });

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

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={setViewport}
          mapboxAccessToken="pk.eyJ1Ijoic2FiMjYiLCJhIjoiY2xnajd2b2FlMTJ4OTN1dDF2bzI3cHk1OSJ9.lT-sd5DlES11aj4LfFwn7w"
        >
          {localisations.map((loc, index) => (
            <Marker
              key={index}
              latitude={loc.latitude}
              longitude={loc.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>Marqueur {loc.nom}</div>
            </Marker>
          ))}
        </ReactMapGL>
      )}
    </div>
  );
};

export default MapComponent;
