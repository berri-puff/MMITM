import { useEffect, useState } from 'react';
import { SuggestionsList } from './Suggestions/SuggestionsList';
import {
  areTheyOpen,
  convertCoordsToCrosshair,
  sortPlaces,
  getAllPlaces,
  getOpeningHours,
  formatOriginCoords,
} from '../utils/utils';
import { Place, SuggestionsProps } from '../types';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';

export const Suggestions = (props: SuggestionsProps) => {
  const crosshair = convertCoordsToCrosshair(props);
  const [places, setPlaces] = useState<Place[]>([]);
  const [finalPlaces, setFinalPlaces] = useState<Place[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesData = await getAllPlaces(crosshair);
        setPlaces(placesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (places.length === 100) {
      const sortedPlaces = sortPlaces(places);

      getOpeningHours(sortedPlaces)
        .then((details) => {
          setFinalPlaces(areTheyOpen(details, props.timeStamp));
          setIsSorted(true);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [places]);

  const finalCoordsOrigins = formatOriginCoords(
    props.userCoord,
    props.friendCoord
  );

  let placesCoords = finalPlaces.map((item) => item.formatted_address);

  if (loading) {
    return (
      <>
        <p>Finding some great places...</p>
        <Loading />
        <div id="map3" className="hidden"></div>
      </>
    );
  } else if (finalPlaces.length === 0) {
    return (
      <>
        <h3>
          Unfortunatley, your search has not returned any results. It's possible
          that nothing is open at the time you have specified, please try again.
        </h3>
        <Link className="btn btn-primary mx-5" to={`/`}>
          Try again
        </Link>
        <div id="map3" className="hidden"></div>
      </>
    );
  } else if (isSorted && !loading) {
    return (
      <div className="container mx-auto mt-5">
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
