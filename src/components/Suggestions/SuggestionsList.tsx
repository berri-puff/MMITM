import { useEffect, useState } from 'react';
import { SuggestionCard } from './SuggestionCard';
import { InviteUser } from '../InviteUser';
import { Element, scroller } from 'react-scroll';
import LinkToTop from './LinkkToTop';
import { SuggestionsMap } from './SuggestionsMap';
import { Loading } from '../Loading';

import {
  DetailedDestination,
  ChosenMeeting,
  SuggestionsListProps,
  DistanceMatrixResponse,
  PlaceData,
} from '../../types';
import { getDistance } from '../../utils/utils';

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

  const [chosenMeeting, setChosenMeeting] = useState<ChosenMeeting>({
    address: '',
    placeData: {
      name: '',
      rating: 0,
      geometry: {
        location: {
          lat: 0,
          lng: 0,
        },
      },
      current_opening_hours: {
        weekday_text: [],
      },
      photos: [],
    },
    travelDetails: [],
  });

  useEffect(() => {
    getDistance(finalCoordsOrigins, placesCoords, transportation)
      .then((data: DistanceMatrixResponse) => {
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

        const detailedDestinations = sortedDestinations.map((dest) => {
          const destinationDetails = {
            address: data.destinationAddresses[dest.index],
            placeData: places[dest.index] as PlaceData,
            travelDetails: data.rows.map((row) => ({
              origin: data.originAddresses[data.rows.indexOf(row)],
              travelTime: row.elements[dest.index].duration.text,
              travelDistance: row.elements[dest.index].distance.text,
            })),
          };
          return destinationDetails;
        });

        setDetailedTravelInfo(detailedDestinations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const scrollToCard = (placeId: string) => {
    scroller.scrollTo(placeId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  if (chosenMeeting.placeData.name.length > 0) {
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
        <div className="bg-base-100">
          <SuggestionsMap
            detailedTravelInfo={detailedTravelInfo}
            scrollToCard={scrollToCard}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
