import { useEffect, useState } from 'react';
import { getDistance } from '../../utils/api-ak';
// need to pass in the orirgins from context (if this is where we store them) and the destinations from Michael's work
// Destinations currently in tuple format
// take 2 origins and 25 destinations
// call the google matrix api
// sort the results based on best travel times for each person

// define what the data looks like when it comes back from API for typescript
// individual distance calc - from one origin to 1 destination
interface DistanceElement {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
}

//collection of DistanceElement elements (all destinations from 1 sinlge origin)
interface DistanceRow {
  elements: DistanceElement[];
}

// complete response structure from API call to matrix
interface DistanceData {
  rows: DistanceRow[];
  destination_addresses: string[];
  origin_addresses: string[];
}

//////// changes props of friends coords and user coords
function coordsToString(coords: any): string {
  let finalCoords = '';
  coords.forEach((coord) => {
    finalCoords = finalCoords + coord.lat + ', ' + coord.lng + '|';
  });
  finalCoords = finalCoords.slice(0, -1);
  console.log(finalCoords, '<<<<<<<<<final coordas string');
}

const stringCoordinates = coordsToString([
  { lat: 53.480317250638684, lng: -2.249571489866583 },
  { lat: 53.80039855665654, lng: -1.5487809266636416 },
]);

function Matrix5() {
  const [distances, setDistances] = useState<DistanceRow[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState({
    origins:
      '51.5136375825016, -0.1365400240806151|51.46222995063997, 0.10913959392165778',
    destinations: stringCoordinates,
  });

  useEffect(() => {
    getDistance(coordinates.origins, coordinates.destinations)
      .then((data: DistanceData) => {
        // Calculate travel time diffs
        console.log(data, '<---------data');
        const travelTimeDifferences = data.rows[0].elements.map((_, index) => ({
          // returns array of objects with the index and the travel time difference
          index,
          difference: Math.abs(
            data.rows[0].elements[index].duration.value -
              data.rows[1].elements[index].duration.value
          ),
        }));

        // Sort dests based on differences in travel times
        const sortedDestinations = travelTimeDifferences
          .sort((a, b) => a.difference - b.difference)
          .slice(0, 10); // Slice top 10 destinations

        //sorted destinations has the index of the dest from data and the difference in time taken
        // looks like this {index: 24, difference: 65}
        console.log(sortedDestinations, '<------sorted destinations');
        // Update state with sorted data
        setDistances(
          //For each dest in sortedDestinations, a new object is created
          sortedDestinations.map((dest) => ({
            // so we set the distances using the index returned from sorted destinations and combine with the data from the API call returned in an object
            elements: data.rows.map((row) => row.elements[dest.index]),
          }))
        );
        setAddresses(
          sortedDestinations.map(
            // updates the addresses state with a sorted list of addresses using the index from sortedDestinatoins. mapp over the sorted indexes in sortedDestinations and get the corresponding addresses from the data.destination_addresses from api call
            (dest) => data.destination_addresses[dest.index]
          )
        );
        setOrigins(data.origin_addresses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [coordinates]); // Dependency on coordinates

  return (
    <div className="prose">
      <h1>PG 3</h1>

      {distances.map((distanceRow, rowIndex) => (
        <div key={rowIndex} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Destination {rowIndex + 1}: {addresses[rowIndex]}
            </h2>
            {distanceRow.elements.map((element, elementIndex) => (
              <div key={elementIndex}>
                <p>
                  Travel Time from Origin {elementIndex}
                  <br /> {origins[elementIndex]}: <br />
                  <strong> {element.duration.text}</strong>
                </p>
                <p>
                  Travel Distance from Origin {elementIndex}
                  <br /> {origins[elementIndex]}: <br />{' '}
                  <strong> {element.distance.text}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Matrix5;
