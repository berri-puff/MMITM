import { SuggestionsList } from './Suggestions/SuggestionsList';
import { SuggestionsMap } from './Suggestions/SuggestionsMap';
import { useEffect, useState } from 'react';
import {
  areTheyOpen,
  convertCoordsToCrosshair,
  convertCrosshairToArray,
  sortPlaces,
} from '../utils/utils';
import { Place, SuggestionsProps } from '../types';
// import { getAllPlaces, getPlaces } from '../utils/api-ma';
import { getOpeningHours } from '../utils/api-cm';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';

export const Suggestions = (props: SuggestionsProps) => {
  const crosshair = convertCoordsToCrosshair(props);
  const [places, setPlaces] = useState<Place[]>([]);
  const [finalPlaces, setFinalPlaces] = useState<Place[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const [loading, setLoading] = useState(true);
  const [tempPlaces, setTempPlaces] = useState([]);

  const getPlaces = (coordinate, apiKey) => {
    return new Promise((resolve, reject) => {
      const coordsArray = coordinate.split(', ').map(Number);

      async function initMap() {
        const { Map } = (await google.maps.importLibrary(
          'maps'
        )) as google.maps.MapsLibrary;
        const { Places } = (await google.maps.importLibrary(
          'places'
        )) as google.maps.MapsLibrary;

        const map = new Map(document.getElementById('map3') as HTMLElement, {
          zoom: 15,
        });

        const request = {
          location: new google.maps.LatLng(coordsArray[0], coordsArray[1]),
          type: ['cafe'],
          rankBy: google.maps.places.RankBy.DISTANCE,
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            reject('Failed to fetch places');
          }
        });
      }

      initMap();
    });
  };

  const getAllPlaces = async (crosshair, apiKey) => {
    const coordinates = convertCrosshairToArray(crosshair);
    const placesPromises = coordinates.map((coordinate) =>
      getPlaces(coordinate, apiKey)
    );

    try {
      const dataArr = await Promise.all(placesPromises);
      return dataArr.flat();
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  ////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesData = await getAllPlaces(crosshair, apiKey);
        setPlaces(placesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (places.length === 100) {
      console.log(places, 'gets here <<<<<<<<');
      const sortedPlaces = sortPlaces(places);
      console.log(sortedPlaces, 'sortedPLaces');

      /////////////////
      const getOpeningHours = (places) => {
        const pendingPromises = places.map((place) => {
          return new Promise((resolve, reject) => {
            async function initMap() {
              const { Map } = (await google.maps.importLibrary(
                'maps'
              )) as google.maps.MapsLibrary;
              const { Places } = (await google.maps.importLibrary(
                'places'
              )) as google.maps.MapsLibrary;

              const map = new Map(
                document.getElementById('map3') as HTMLElement,
                {
                  zoom: 15,
                }
              );

              const request = {
                placeId: place.place_id,
              };

              const service = new google.maps.places.PlacesService(map);
              service.getDetails(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  console.log('resolved');
                  resolve(results);
                } else {
                  reject('Failed to fetch places');
                }
              });
            }

            initMap();
          });
        });
        return Promise.all(pendingPromises);
      };

      //////////////
      getOpeningHours(sortedPlaces).then((details) => {
        console.log(details, 'DETAILS');
        setFinalPlaces(areTheyOpen(details, props.timeStamp));
        setIsSorted(true);
        setLoading(false);
      });
    }
  }, [places]);

  //// for const loop of props and push each prop to new array
  /// call function with array
  /// Formatting for Matrix
  function formatOriginCoords(userCoord, friendCoord) {
    const arrayToReturn = [];
    arrayToReturn.push(userCoord);
    arrayToReturn.push(friendCoord);
    console.log(arrayToReturn, 'array to return');
    return arrayToReturn;
  }

  const finalCoordsOrigins = formatOriginCoords(
    props.userCoord,
    props.friendCoord
  );

  let placesCoords = finalPlaces.map((item) => item.formatted_address);

  if (loading) {
    return (
      <>
        <div id="map3" className="hidden"></div>
        <Loading />
      </>
    );
  } else if (finalPlaces.length === 0) {
    return (
      <>
        {' '}
        <div id="map3" className="hidden"></div>
        <h3>
          Unfortunatley, your search has not returned any results. It's possible
          that nothing is open at the time you have specified, please try again.
        </h3>
        <Link className="btn btn-primary mx-5" to={`/`}>
          Try again
        </Link>
      </>
    );
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
