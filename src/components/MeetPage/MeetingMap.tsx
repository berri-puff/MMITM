import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export const MeetingMap = ()=>{
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
    googleMapsApiKey: process.env.APIkey
  })
    return isLoaded ?(
        <> <h3>Map View</h3>
        <div>
            <GoogleMap 
            mapContainerStyle={containerStyle}
            zoom={10}
            center={center}>
                <Marker position={center}/>
            </GoogleMap>
        </div>
        </>
   ) :<p>Oops, something's wrong</p>
}

