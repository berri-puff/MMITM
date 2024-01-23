import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Coordinates, MeetingMapProps } from '../../types';
import { Loading } from '../Loading';

export const MeetingMap = (props: MeetingMapProps) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '1rem',
  };

  const defaultCenter: Coordinates = {
    lat: 55,
    lng: -4,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const center: Coordinates = props.friendCoord.lat
    ? props.friendCoord
    : props.userCoord;

  if (!isLoaded) {
    return <Loading />;
  }
  return isLoaded ? (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={center.lat === 0 ? 5 : 10}
          center={center.lat === 0 ? defaultCenter : center}
        >
          {props.userCoord.lat ? <Marker position={props.userCoord} /> : null}
          {props.friendCoord.lat ? (
            <Marker position={props.friendCoord} />
          ) : null}
        </GoogleMap>
      </div>
    </>
  ) : (
    <p>Oops, something's wrong</p>
  );
};
