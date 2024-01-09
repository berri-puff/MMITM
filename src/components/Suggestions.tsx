import { SuggestionsList } from './Suggestions/SuggestionsList';
import { SuggestionsMap } from './Suggestions/SuggestionsMap';
import { useEffect, useState } from 'react';
import { areTheyOpen, convertCoordsToCrosshair, sortPlaces } from '../utils/utils';
import { Place, SuggestionsProps } from '../types';
import { getAllPlaces, getPlaces } from '../utils/api-ma';
import { getOpeningHours } from '../utils/api-cm';

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
      getOpeningHours(sortPlaces(places)).then((details) => {
        setFinalPlaces(areTheyOpen(details, props.timeStamp));
        setIsSorted(true);
        setLoading(false);
      })
      
    }
  }, [places]);
console.log(finalPlaces, 'FINAL PLACESSSS')
  //console.log(finalPlaces, 'final places');

  //// for const loop of props and push each prop to new array
  /// call function with array
  /// Formatting for Matrix stuff
  function formatOriginCoords(userCoord, friendCoord) {
    const arrayToReturn = [];
    arrayToReturn.push(userCoord);
    arrayToReturn.push(friendCoord);
    return arrayToReturn;
  }

  //////// changes props of friends coords and user coords
  function coordsToString(arrayToReturn: any): string {
    let finalCoords = '';
    arrayToReturn.forEach((coord) => {
      finalCoords = finalCoords + coord.lat + ', ' + coord.lng + '|';
    });
    return finalCoords.slice(0, -1);
  }

  const finalCoordsOrigins = coordsToString(
    formatOriginCoords(props.userCoord, props.friendCoord)
  );

  //////////////////// Matrix stuff
  function placesToPlacesID(finalPlaces) {
    console.log(finalPlaces, 'FINAL PLA')
    let finalPlacesIDs = '';
    finalPlaces.forEach((place) => {
      finalPlacesIDs = finalPlacesIDs + 'place_id:' + place.data.result.place_id + '|';
    });
    return finalPlacesIDs.slice(0, -1);
  }

  let placesCoords;
  if (finalPlaces.length > 0) {
    placesCoords = placesToPlacesID(finalPlaces);
    //console.log(placesCoords, '<<<<<<<<<<<<<finalplaces in the if statement');
  }
  //console.log(placesCoords, '<<<<<<placesCoords');
  if (loading) {
    return <h3>Loading....</h3>;
  } else if (isSorted && !loading) {
    // console.log(
    //   places,
    //   'places',
    //   placesCoords,
    //   'placesCoords',
    //   finalCoordsOrigins,
    //   'finalCoordsOrigins'
    // );
    return (
      <div>
        <SuggestionsList
          places={finalPlaces}
          placesCoords={placesCoords}
          finalCoordsOrigins={finalCoordsOrigins}
          transportation={props.transportation}
          userCoord={props.userCoord} 
          friendCoord={props.friendCoord}
          timeStamp={props.timeStamp}
        />
      </div>
    );
  }
};
