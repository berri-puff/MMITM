import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { SuggestionsMapProps } from "../../types";

export const SuggestionsMap: React.FC<SuggestionsMapProps> = ({
  lat,
  lng,
  places,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const mapContainer = {
    width: "100%",
    height: "400px",
  };
  const center = {
    lat: +lat,
    lng: +lng,
  };

  return (
    <>
      <h3>map view of suggestioned palces with pins here</h3>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={mapContainer} center={center} zoom={3}>
          {places.map((place) => {
            return (
              <Marker
                key={place.place_id}
                position={{
                  lat: place.geometry.location.lat,
                  lng: place.geometry.location.lng,
                }}
                title={place.name}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
