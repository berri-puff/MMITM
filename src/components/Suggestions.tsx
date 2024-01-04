import axios from "axios";
import { SuggestionsList } from "./Suggestions/SuggestionsList";
import { SuggestionsMap } from "./Suggestions/SuggestionsMap";
import { useEffect, useState } from "react";
import { sortPlaces } from "../utils/utils";
import { Place, SuggestionsProps } from "../types";

export const Suggestions = (props: SuggestionsProps) => {
    console.log(props)
  const [places, setPlaces] = useState<Place[]>([]);
  console.log(places);
  const [isSorted, setIsSorted] = useState(false);
  const coordinates = "53.7767, -2.2348";
  const lat: string = "53.7767";
  const lng: string = "-2.2348";
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getPlaces = async () => {
    let resultsCount = 0;
    let nextPageToken = null;
    try {
      while (resultsCount < 60) {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&type=cafe&opennow&rankby=distance&key=${apiKey}`;
        if (nextPageToken) {
          url += `&pagetoken=${nextPageToken}`;
        }
        let { results, next_page_token: newNextPageToken } =
          await getMorePlaces(url);

        setPlaces((currPlaces) => [...currPlaces, ...results]);
        resultsCount += results.length;
        nextPageToken = newNextPageToken;
        await delay(3000);
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
      setIsSorted(true);
    }
  }, [places]);
  if (isSorted) {
    return (
      <div>
        <SuggestionsList places={places} />
        <SuggestionsMap lat={lat} lng={lng} places={places} />
      </div>
    );
  }
};
