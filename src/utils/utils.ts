import firebase from "firebase/compat/app";
import { Coordinates, CrosshairProps } from "../types";

export const convertTime = (timestamp: firebase.firestore.Timestamp): Date => {
  return timestamp.toDate();
};

export const sortPlaces = (places) => {
  const reviewedPlaces = places.filter((place) => {
    return place.user_ratings_total >= 5;
  });
  const sortedPlaces = reviewedPlaces.sort((a, b) => {
    return b.rating - a.rating;
  });
  const uniquePlaces = sortedPlaces.reduce((accumulator, current) => {
    if(!accumulator.find((item) => item.place_id === current.place_id)) {
      accumulator.push(current)
    }
    return accumulator
  }, [])
  return uniquePlaces.slice(0, 25)
};

export const convertToNumberCoord = (coordInString: string): Coordinates => {
  const latitude = coordInString.split(", ");
  const longitude = coordInString.split(", ");
  const coordNums: Coordinates = {
    lat: Number(latitude[0]),
    lng: Number(longitude[1]),
  };

  return coordNums;
};

export const convertCoordsToCrosshair = (props: CrosshairProps) => {
  const midPoint = { lat: 0, lng: 0 };
  const posNorth = { lat: 0, lng: 0 };
  const posSouth = { lat: 0, lng: 0 };
  const posEast = { lat: 0, lng: 0 };
  const posWest = { lat: 0, lng: 0 };

  //Equation to work out midpoint coordinates from props.userCoord and props.friendCoord
  let latDif = 0;
  let halfLatDif = 0;
  let lngDif = 0;
  let halfLngDif = 0;
  if (props.userCoord.lat > props.friendCoord.lat) {
    latDif = props.userCoord.lat - props.friendCoord.lat;
    halfLatDif = latDif / 2;
    midPoint.lat = props.userCoord.lat - halfLatDif;
  } else if (props.userCoord.lat < props.friendCoord.lat) {
    latDif = props.friendCoord.lat - props.userCoord.lat;
    halfLatDif = latDif / 2;
    midPoint.lat = props.friendCoord.lat - halfLatDif;
  }
  if (props.userCoord.lng > props.friendCoord.lng) {
    lngDif = props.userCoord.lng - props.friendCoord.lng;
    halfLngDif = lngDif / 2;
    midPoint.lng = props.userCoord.lng - halfLngDif;
  } else if (props.userCoord.lng < props.friendCoord.lng) {
    lngDif = props.friendCoord.lng - props.userCoord.lng;
    halfLngDif = lngDif / 2;
    midPoint.lng = props.friendCoord.lng - halfLngDif;
  }
  //Equation to work out midpoint coordinates from props.userCoord and props.friendCoord

  // Equation to work out distance(s) to midpoint from one of the points
  let diffLat = midPoint.lat - props.userCoord.lat;
  let squareLat = diffLat * diffLat;
  let diffLng = props.userCoord.lng - midPoint.lng;
  let squareLng = diffLng * diffLng;
  let totalOfSquaredLatLng = squareLng + squareLat;
  let distanceToMid = Math.sqrt(totalOfSquaredLatLng);
  let twentyPercentDist = distanceToMid / 5;
  let fortyPercentDist = twentyPercentDist * 2;
  // Equation to work out distance(s) to midpoint from one of the points

  // Equation to work out points spread out in the cardinal directions
  posNorth.lat = midPoint.lat + twentyPercentDist;
  posNorth.lng = midPoint.lng;
  posSouth.lat = midPoint.lat - twentyPercentDist;
  posSouth.lng = midPoint.lng;
  posEast.lat = midPoint.lat;
  posEast.lng = midPoint.lng + fortyPercentDist;
  posWest.lat = midPoint.lat;
  posWest.lng = midPoint.lng - fortyPercentDist;

  return {
    midpoint: midPoint,
    posNorth: posNorth,
    posEast: posEast,
    posSouth: posSouth,
    posWest: posWest,
  };
};

export const convertCrosshairToArray = (crosshair) => {
  const coordinates = [];
  let string = "";
  string = crosshair.midpoint.lat + ", " + crosshair.midpoint.lng;
  coordinates.push(string);
  string = crosshair.posNorth.lat + ", " + crosshair.posNorth.lng;
  coordinates.push(string);
  string = crosshair.posEast.lat + ", " + crosshair.posEast.lng;
  coordinates.push(string);
  string = crosshair.posSouth.lat + ", " + crosshair.posSouth.lng;
  coordinates.push(string);
  string = crosshair.posWest.lat + ", " + crosshair.posWest.lng;
  coordinates.push(string);
  return coordinates;
};
