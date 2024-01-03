import firebase from "firebase/compat/app";
import { Coordinates } from "../types";

export const convertTime = (timestamp: firebase.firestore.Timestamp): Date => {
  return timestamp.toDate();
};

export const convertToNumberCoord = (coordInString : string):Coordinates => {

  const latitude = coordInString.split(', ')
  const longitude = coordInString.split(', ')
  const coordNums : Coordinates = {
    lat : Number(latitude[0]),
    lng : Number(longitude[1])
  }
  
return coordNums
}