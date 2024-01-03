import axios from "axios";
import { SuggestionsList } from "./Suggestions/SuggestionsList";
import { SuggestionsMap } from "./Suggestions/SuggestionsMap";
import { useEffect, useState } from "react";
import { sortPlaces } from "../utils/utils";

export const Suggestions = () => {
  const [places, setPlaces] = useState([]);
  const coordinates = "53.7767590187112, -2.2348233608134205";
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const getPlaces = async () => {
    let resultsCount = 0;
    let nextPageToken = null;
    try {
      while (resultsCount < 60) {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&type=cafe&opennow&rankby=distance&key=${apiKey}`;
        if (nextPageToken) {
          url += `&pagetoken=${nextPageToken}`;
        }
        console.log(url)
        let { results, next_page_token: newNextPageToken } = await getMorePlaces(url);

        setPlaces((currPlaces) => [...currPlaces, ...results]);
        resultsCount += results.length;
        nextPageToken = newNextPageToken;
        await delay(3000)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getMorePlaces = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  };

  useEffect(() => {
    getPlaces();
  }, []);

  useEffect(() => {
    if (places.length === 60) {
      setPlaces((currPlaces) => {
        const sortedPlaces = sortPlaces(currPlaces);
        return sortedPlaces;
      });
    }
  }, [places]);
  console.log(places);
  return (
    <div>
      <SuggestionsList />
      <SuggestionsMap />
    </div>
  );
};
