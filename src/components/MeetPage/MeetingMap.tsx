import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { convertToNumberCoord } from '../../utils/utils';
import React from 'react';

export const MeetingMap : React.FC = (props: MeetingMapProps)=>{
    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const center = {
        lat: 53.80083232820499, 
        lng: -1.5491218869883503
      };
 const {isLoaded} = useJsApiLoader({
    id : 'google-map-script',
    googleMapsApiKey:import.meta.env.VITE_GOOGLE_API_KEY
  })


    return isLoaded ?(
        <> <h3>Map View</h3>
        <div>
            <GoogleMap 
            mapContainerStyle={containerStyle}
            zoom={7}
            center={center}>
             {props.userCoord.lat ? <Marker position={props.userCoord}/>  : <Marker position={center}/>}
             {props.friendCoord.lat ? <Marker position={props.friendCoord}/> : null}
            </GoogleMap>
        </div>
        </>
   ) :<p>Oops, something's wrong</p>
}