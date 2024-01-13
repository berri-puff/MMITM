import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';

export const SuggestionsMap: React.FC<SuggestionsMapProps> = ({
  detailedTravelInfo,
  scrollToCard,
}) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  console.log(
    detailedTravelInfo[0].placeData.geometry.location.lat,
    'detailed travel info suggestions map'
  );
  useEffect(() => {
    if (detailedTravelInfo && detailedTravelInfo.length > 0) {
      setMapCenter({
        lat: detailedTravelInfo[0].placeData.geometry.location.lat,
        lng: detailedTravelInfo[0].placeData.geometry.location.lng,
      });
    }
  }, [detailedTravelInfo]);

  const onMarkerClick = (place) => {
    setSelectedPlace(place);
    setMapCenter({
      lat: place.placeData.geometry.location.lat,
      lng: place.placeData.geometry.location.lng,
    });
  };

  const onInfoWindowClick = (placeId) => {
    scrollToCard(placeId);
  };

  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '1rem',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={13}
        center={mapCenter}
      >
        {detailedTravelInfo.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.placeData.geometry.location.lat,
              lng: place.placeData.geometry.location.lng,
            }}
            onClick={() => onMarkerClick(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.placeData.geometry.location.lat,
              lng: selectedPlace.placeData.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="max-w-40">
              <h2 className="text-black">{selectedPlace.placeData.name}</h2>

              <p className="text-black p-0.5 my-3">
                Address: {selectedPlace.address}
              </p>

              <p className="text-black">
                Rating: {selectedPlace.placeData.rating}
              </p>
              <button
                className="btn btn-primary btn-sm mt-3"
                onClick={() =>
                  onInfoWindowClick(selectedPlace.placeData.place_id)
                }
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  ) : (
    <p>Oops, something's wrong</p>
  );
};
