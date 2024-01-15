import { SuggestionsListProps } from '../../types';
import { useEffect, useState } from 'react';
import { SuggestionCard } from './SuggestionCard';
import { InviteUser } from '../InviteUser';
import { Element, scroller } from 'react-scroll';
import LinkToTop from './LinkkToTop';
import { SuggestionsMap } from './SuggestionsMap';
import { Loading } from '../Loading';
import { initGoogleMapsAPI } from '../../utils/GoogleMapsLoader';

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  places,
  placesCoords,
  finalCoordsOrigins,
  transportation,
  userCoord,
  friendCoord,
  timeStamp,
}) => {
  const [detailedTravelInfo, setDetailedTravelInfo] = useState<
    DetailedDestination[]
  >([]);

  const [chosenMeeting, setChosenMeeting] = useState({});

  useEffect(() => {
    const getDistance = async (
      finalCoordsOrigins,
      placesCoords,
      transportation
    ) => {
      await initGoogleMapsAPI();

      const originCoords = finalCoordsOrigins.map(
        (coord) => new google.maps.LatLng(coord.lat, coord.lng)
      );
      const service = new google.maps.DistanceMatrixService();
      return new Promise((resolve, reject) => {
        service.getDistanceMatrix(
          {
            origins: originCoords,
            destinations: placesCoords,
            travelMode: google.maps.TravelMode[transportation.toUpperCase()],
          },
          (response, status) => {
            if (status === 'OK') {
              resolve(response);
            } else {
              reject('DistanceMatrixService request failed');
            }
          }
        );
      });
    };

    getDistance(finalCoordsOrigins, placesCoords, transportation)
      .then((data) => {
        console.log('gets here data returned', data);
        ///
        const travelTimeDifferences = data.rows[0].elements.map((_, index) => ({
          index,
          difference: Math.abs(
            data.rows[0].elements[index].duration.value -
              data.rows[1].elements[index].duration.value
          ),
        }));

        const sortedDestinations = travelTimeDifferences
          .sort((a, b) => a.difference - b.difference)
          .slice(0, 10);
        console.log(sortedDestinations, 'sorted');
        const detailedDestinations = sortedDestinations.map((dest) => {
          console.log(data.destinationAddresses[8], 'address');

          const destinationDetails = {
            address: data.destinationAddresses[dest.index],
            placeData: places[dest.index],
            travelDetails: data.rows.map((row) => ({
              origin: data.originAddresses[data.rows.indexOf(row)],
              travelTime: row.elements[dest.index].duration.text,
              travelDistance: row.elements[dest.index].distance.text,
            })),
          };
          return destinationDetails;
        });
        console.log(detailedDestinations, 'detailed dest');
        setDetailedTravelInfo(detailedDestinations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const scrollToCard = (placeId) => {
    scroller.scrollTo(placeId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  if (chosenMeeting.placeData) {
    return (
      <InviteUser
        chosenMeeting={chosenMeeting}
        transportation={transportation}
        userCoord={userCoord}
        friendCoord={friendCoord}
        timeStamp={timeStamp}
      />
    );
  } else if (detailedTravelInfo.length > 0) {
    return (
      <>
        <div className="bg-base-100 max-h100">
          <SuggestionsMap
            detailedTravelInfo={detailedTravelInfo}
            scrollToCard={scrollToCard}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {detailedTravelInfo.map((destination, index) => (
            <Element
              name={destination.placeData.place_id}
              key={destination.placeData.place_id}
            >
              <SuggestionCard
                destination={destination}
                index={index}
                transportation={transportation}
                setChosenMeeting={setChosenMeeting}
                timeStamp={timeStamp}
              />
            </Element>
          ))}
        </div>
        <LinkToTop />
      </>
    );
  } else return <Loading />;
};
