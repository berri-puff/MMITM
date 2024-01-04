import { SuggestionsList } from './Suggestions/SuggestionsList';
import { SuggestionsMap } from './Suggestions/SuggestionsMap';
import { useEffect, useState } from 'react';
import { convertCoordsToCrosshair, sortPlaces } from '../utils/utils';
import { Place, SuggestionsProps } from '../types';
import { getAllPlaces, getPlaces } from '../utils/api-ma';

export const Suggestions = (props: SuggestionsProps) => {
  const crosshair = convertCoordsToCrosshair(props);
  const [places, setPlaces] = useState<Place[]>([]);
  const [finalPlaces, setFinalPlaces] = useState<Place[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const [loading, setLoading] = useState(true);

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
      setFinalPlaces((currPlaces) => {
        const sortedPlaces = sortPlaces(currPlaces);
        return sortedPlaces;
      });
      setIsSorted(true);
      setLoading(false);
    }
  }, [places]);

  //// for const loop of props and push each prop to new array
  /// call function with array
  /// Formatting for Matrix stuff
  function formatOriginCoords(props) {
    const arrayToReturn = [];
    for (const key in props) {
      arrayToReturn.push(props[key]);
    }
    return arrayToReturn;
  }
  formatOriginCoords(props);
  //////// changes props of friends coords and user coords
  function coordsToString(arrayToReturn: any): string {
    let finalCoords = '';
    arrayToReturn.forEach((coord) => {
      finalCoords = finalCoords + coord.lat + ', ' + coord.lng + '|';
    });
    return finalCoords.slice(0, -1);
  }

  const finalCoordsOrigins = coordsToString(formatOriginCoords(props));

  //////////////////// Matrix stuff
  function placesToPlacesID(finalPlaces) {
    let finalPlacesIDs = '';
    finalPlaces.forEach((place) => {
      finalPlacesIDs = finalPlacesIDs + place.place_id + '|';
    });
    return finalPlacesIDs.slice(0, -1);
  }
  let placesCoords;
  if (finalPlaces.length > 0) {
    placesCoords = placesToPlacesID(finalPlaces);
    console.log(placesCoords, '<<<<<<<<<<<<finalplaces');
  }
  // console.log(finalCoordsOrigins, '<<<<<<final coords origins');
  if (loading) {
    return <h3>Loading....</h3>;
  } else if (isSorted && !loading) {
    return (
      <div>
        <SuggestionsList places={finalPlaces} />
      </div>
    );
  }
};
