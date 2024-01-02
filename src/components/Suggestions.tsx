import axios from "axios";
import { SuggestionsList } from "./Suggestions/SuggestionsList";
import { SuggestionsMap } from "./Suggestions/SuggestionsMap";
import { useEffect, useState } from "react";

export const Suggestions = () => {
  const [places, setPlaces] = useState([]);
  const coordinates = "53.7767590187112, -2.2348233608134205";
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const getPlaces = async () => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=50000&key=${apiKey}`
    );
    setPlaces(data.results);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div>
      <SuggestionsList />
      <SuggestionsMap />
    </div>
  );
};
