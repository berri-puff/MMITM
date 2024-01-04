import { SuggestionsList } from "./Suggestions/SuggestionsList";
import { SuggestionsMap } from "./Suggestions/SuggestionsMap";
import { useEffect, useState } from "react";
import { sortPlaces } from "../utils/utils";
import { Place } from "../types";
import { getAllPlaces, getPlaces } from "../utils/api-ma";

export const Suggestions = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const coordinatesArr = ['53.31021296380358, -1.267900019270819', '53.17276291450375, -1.261083628609555', '53.25840402161476, -1.4630509181253877', '53.252622852967264, -0.9992025977062506', '53.24587716867708, -1.2485210699315368']
  const coordinates = "53.7767, -2.2348";
  const lat: string = "53.7767";
  const lng: string = "-2.2348";
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    getAllPlaces(coordinatesArr, setPlaces, apiKey);
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
