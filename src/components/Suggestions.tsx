import { useEffect, useState } from 'react';
import { SuggestionsList } from './Suggestions/SuggestionsList';
import {
  areTheyOpen,
  convertCoordsToCrosshair,
  convertCrosshairToArray,
  sortPlaces,
} from '../utils/utils';
import { Place, SuggestionsProps } from '../types';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import { initGoogleMapsAPI } from '../utils/GoogleMapsLoader';

export const Suggestions = (props: SuggestionsProps) => {
  const crosshair = convertCoordsToCrosshair(props);
  const [places, setPlaces] = useState<Place[]>([]);
  const [finalPlaces, setFinalPlaces] = useState<Place[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const [loading, setLoading] = useState(true);

  const getPlaces = async (coordinate) => {
    await initGoogleMapsAPI();
    const coordsArray = coordinate.split(', ').map(Number);

    const map = new google.maps.Map(document.getElementById('map3'), {
      center: { lat: coordsArray[0], lng: coordsArray[1] },
      zoom: 15,
    });

    const request = {
      location: new google.maps.LatLng(coordsArray[0], coordsArray[1]),
      type: ['cafe'],
      rankBy: google.maps.places.RankBy.DISTANCE,
    };

    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject('Failed to fetch places');
        }
      });
    });
  };

  const getAllPlaces = async (crosshair) => {
    const coordinates = convertCrosshairToArray(crosshair);
    const placesPromises = coordinates.map((coordinate) =>
      getPlaces(coordinate)
    );

    try {
      const dataArr = await Promise.all(placesPromises);
      return dataArr.flat();
    } catch (err) {
      console.log(err);
      return [];
    }
  };

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

      const getOpeningHours = async (places) => {
        await initGoogleMapsAPI();

        const getPlaceDetails = (place) => {
          return new Promise((resolve, reject) => {
            const map = new google.maps.Map(document.getElementById('map3'), {
              center: { lat: 0, lng: 0 }, // Dummy center
              zoom: 15,
            });

            const request = {
              placeId: place.place_id,
            };

            const service = new google.maps.places.PlacesService(map);
            service.getDetails(request, (result, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(result);
              } else {
                reject('Failed to fetch place details');
              }
            });
          });
        };

        const detailsPromises = places.map((place) => getPlaceDetails(place));
        return Promise.all(detailsPromises);
      };

      getOpeningHours(sortedPlaces)
        .then((details) => {
          setFinalPlaces(areTheyOpen(details, props.timeStamp));
          setIsSorted(true);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [places]);
  function formatOriginCoords(userCoord, friendCoord) {
    const arrayToReturn = [userCoord, friendCoord];
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
