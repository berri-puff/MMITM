import axios from "axios";
import { Place } from "../types";

export const getPlaces = async (coordinatesArr, setPlaces, apiKey) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  let resultsCount = 0;
  let nextPageToken = null;
  try {
    while (resultsCount < 60) {
      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&type=cafe&opennow&rankby=distance&key=${apiKey}`;
      if (nextPageToken) {
        url += `&pagetoken=${nextPageToken}`;
      }
      let { results, next_page_token: newNextPageToken } = await getMorePlaces(
        url
      );

      setPlaces((currPlaces: Place[]) => [...currPlaces, ...results]);
      resultsCount += results.length;
      nextPageToken = newNextPageToken;
      await delay(1000);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getMorePlaces = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const getAllPlaces = async (coordinatesArr, setPlaces, apiKey) => {
  const placesPromises = [] 
  await coordinatesArr.map((coordinates) => {
    return getPlaces(coordinates, setPlaces, apiKey);
  });
  console.log(placesPromises)
};
