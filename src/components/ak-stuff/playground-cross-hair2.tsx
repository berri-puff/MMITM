type MapCompProps = {
    midPoint: {
        lat: number,
        lng: number
    },
    pos1: {
        lat: number,
        lng: number
    },
    pos2: {
        lat: number,
        lng: number
    },
    posNorth: {
        lat: number,
        lng: number
    },
    posSouth: {
        lat: number,
        lng: number
    },
    posEast: {
        lat: number,
        lng: number
    },
    posWest: {
        lat: number,
        lng: number
    },
    mapID: string
}

import { useEffect, useState } from 'react'
import { Map, Pin, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps'
import axios from "axios";


export const MapComp = (props: MapCompProps) => {

    const [locations, setLocations] = useState([])
    
    
    const rankBy = "distance";
    const placeType = "cafe";

        useEffect(() => {
            axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${props.midPoint.lat},${props.midPoint.lng}&rankby=${rankBy}&type=${placeType}&key=${apiKey}`).then(({data: {results}}) => {
           
            const openLocations = results.filter((location) => {
                return location.business_status === "OPERATIONAL" && location.rating
            });
            const sortedVenues = openLocations.sort((a, b) => {
                return b.rating - a.rating;
            });
    
            const top3 = sortedVenues.slice(0, 3)
            setLocations(top3)
            });
        }, [])
  
  
    return <Map 
            zoom={9} 
            center={props.midPoint}
            mapId={props.mapID}>
                <AdvancedMarker position={props.pos1}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
                {/* {locations.map((location) => {
                    return <AdvancedMarker key={location.reference}position={location.geometry.location}>
                                <Pin background={"grey"} borderColor={"green"} glyphColor={"green"}></Pin>
                                </AdvancedMarker>
                 })} */}
                 <AdvancedMarker position={props.midPoint}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
                <AdvancedMarker position={props.pos2}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
                <AdvancedMarker position={props.posNorth}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
                <AdvancedMarker position={props.posSouth}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
                <AdvancedMarker position={props.posEast}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
                <AdvancedMarker position={props.posWest}>
                    <Pin background={"pink"} borderColor={"green"} glyphColor={"green"}></Pin>
                </AdvancedMarker>
            </Map>
}