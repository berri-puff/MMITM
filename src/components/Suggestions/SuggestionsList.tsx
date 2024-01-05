import { SuggestionsListProps } from '../../types';
import { useEffect, useState } from 'react';
import { getDistance } from '../../utils/api-ak';

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  places,
  placesCoords,
  finalCoordsOrigins,
  transportation,
}) => {
  const [detailedTravelInfo, setDetailedTravelInfo] = useState<
    DetailedDestination[]
  >([]);

  const getFirstPartOfAddress = (address) => {
    return address.split(',')[0].trim();
  };

  useEffect(() => {
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

  return (
    <>
      {console.log(detailedTravelInfo, 'detailedTravelInfo')}
      {console.log(places, 'places')}
      <ul>
        {places.map((place) => (
          <li key={place.place_id} className="suggested-place">
            <h3>{place.name}</h3>
            <p>Rating: {place.rating}/5</p>
            <p># of Ratings: {place.user_ratings_total}</p>
            <p>Address: {place.vicinity}</p>
          </li>
        ))}
      </ul>

      <div>
        {detailedTravelInfo.map((destination, index) => (
          <div key={index} className="destination-details">
            <h3>
              Destination {index + 1}: {destination.address}
            </h3>
            {destination.travelDetails.map((detail, detailIndex) => (
              <div key={detailIndex} className="travel-detail">
                <p>From: {detail.origin}</p>
                <p>Travel Time: {detail.travelTime}</p>
                <p>Travel Distance: {detail.travelDistance}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <hr />
    </>
  );
};
