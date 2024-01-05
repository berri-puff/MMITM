import { SuggestionsList } from "./Suggestions/SuggestionsList";
import { SuggestionsMap } from "./Suggestions/SuggestionsMap";
import { useEffect, useState } from "react";
import { convertCoordsToCrosshair, sortPlaces } from "../utils/utils";
import { Place, SuggestionsProps } from "../types";
import { getAllPlaces, getPlaces } from "../utils/api-ma";

export const Suggestions = (props: SuggestionsProps) => {
  const crosshair = convertCoordsToCrosshair(props);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const [loading, setLoading] = useState(true);
  console.log(props.transportation, '<<><><><<<<<<<<')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesData = await getAllPlaces(crosshair, setPlaces, apiKey);
        const placesArr = placesData.map((place) => {
          return place.results.map((result) => {
            return result;
          });
        });
        setPlaces(placesArr.flat());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (places.length === 100) {
      setPlaces((currPlaces) => {
        const sortedPlaces = sortPlaces(currPlaces);
        return sortedPlaces;
      });
      setIsSorted(true);
      setLoading(false);
    }
  }, [places]);

  if (loading) {
    return <h3>Loading....</h3>;
  } else if (isSorted && !loading) {
    return (
      <div>
        <SuggestionsList places={places} />
      </div>
    );
  }
};
