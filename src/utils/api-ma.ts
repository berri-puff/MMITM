import axios from "axios";
import { Place } from "../types";
import { convertCrosshairToArray } from "./utils";

export const getPlaces = async (coordinate, setPlaces, apiKey) => {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate}&type=cafe&opennow&rankby=distance&key=${apiKey}`;
  const { data } = await axios.get(url);
  return data
};

export const getAllPlaces = async (crosshair, setPlaces, apiKey) => {
  const coordinates = convertCrosshairToArray(crosshair);
  const placesPromises = [];
  await coordinates.map((coordinate) => {
    placesPromises.push(getPlaces(coordinate, setPlaces, apiKey));
  })
  try {
    const dataArr = await Promise.all(placesPromises)
    return dataArr
  } catch (err) {
    console.log(err)
  }

};
