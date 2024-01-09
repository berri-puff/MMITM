import { SuggestionsListProps } from '../../types';
import { useEffect, useState } from 'react';
import { getDistance } from '../../utils/api-ak';
import { SuggestionCard } from './SuggestionCard';
import { InviteUser } from '../InviteUser';
import { getOpeningHours } from '../../utils/api-cm';
import { SuggestionsMap } from './SuggestionsMap';
import { Element, scroller } from 'react-scroll';
import LinkToTop from './LinkkToTop';

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
  const [openPlaces, setOpenPlaces] = useState([])
  const [chosenMeeting, setChosenMeeting] = useState({});

  // const getFirstPartOfAddress = (address) => {
  //   return address.split(',')[0].trim();
  // };

  useEffect(() => {
    getOpeningHours(places).then((results) => {
      console.log(results, 'RESSSSULLLLLTTTTSSSSS!!!!!!!')
    })
    
    getDistance(finalCoordsOrigins, placesCoords, transportation)
      .then((data) => {
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
            address: data.destination_addresses[dest.index],
            placeData: places[dest.index],
            travelDetails: data.rows.map((row) => ({
              origin: data.origin_addresses[data.rows.indexOf(row)],
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
  } else {
    return (
      <>
        {console.log(detailedTravelInfo, 'deet travel')}
        <SuggestionsMap
          detailedTravelInfo={detailedTravelInfo}
          scrollToCard={scrollToCard}
        />
        <div>
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
  }
};
