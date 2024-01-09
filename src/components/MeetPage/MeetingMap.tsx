import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Coordinates, MeetingMapProps } from '../../types';

export const MeetingMap = (props: MeetingMapProps)=>{
    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      let center : Coordinates= {
        lat: 53.80083232820499, 
        lng: -1.5491218869883503
      };
 const {isLoaded} = useJsApiLoader({
    id : 'google-map-script',
    googleMapsApiKey:import.meta.env.VITE_GOOGLE_API_KEY
  })


    return isLoaded ?(
        <> 
        <div>
            <GoogleMap 
            mapContainerStyle={containerStyle}
            zoom={10}
            center={props.userCoord.lat ? props.userCoord: center}>
             {props.userCoord.lat ? <Marker position={props.userCoord}/> : null}
             {props.friendCoord.lat ? <Marker position={props.friendCoord}/> : null}
            </GoogleMap>
        </div>
        </>
   ) :<p>Oops, something's wrong</p>
}