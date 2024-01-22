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
    lat: 53.80083232820499,
    lng: -1.5491218869883503,
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
          zoom={10}
          center={center.length === 0 ? defaultCenter : center}
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
