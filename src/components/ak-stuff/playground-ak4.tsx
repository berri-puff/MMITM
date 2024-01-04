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
function coordsToString(coords: [number, number][]): string {
  return coords.map((coord) => `${coord[0]}, ${coord[1]}`).join('|');
}

const stringCoordinates = coordsToString([
  [51.597630976683575, -0.2732336792288419],
  [51.4923195147037, -0.12049658430727044],
  [51.59984722532381, 0.23544105610424687],
  [51.32584128084675, -0.7654959892267881],
  [51.4041750397602, -0.6621698702399466],
  [51.301553422081504, 0.47211920978824123],
  [51.22460516621709, -0.45217983514793625],
  [51.33252809300577, 0.4937865920980126],
  [51.84439821825004, 0.1795058813367564],
  [51.496323311602374, -0.13455019701245272],
  [51.506261518661226, -0.12608687839467908],
  [51.66432952633861, -0.059211097884884226],
  [51.11731366814202, -0.4664466401889335],
  [51.61765095806744, 0.09415305471862002],
  [51.333858310104894, -0.15524317422617034],
  [51.58370474642532, 0.09898213228432408],
  [51.48415935290426, -0.2378025392886295],
  [51.863975641701884, 0.2007219118677326],
  [51.497266678327485, -0.09501438422623514],
  [51.88564190154513, -0.35538841301412005],
  [51.59685001326861, 0.0479775724547812],
  [51.20554639447207, -0.17117985958384682],
  [51.57676104357755, -0.15098578993357703],
  [51.48765079167082, -0.11365151010382107],
  [51.184390846793995, -0.12227437052191713],
]);

console.log(stringCoordinates, '<------------string for destinations');

function Matrix4() {
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

export default Matrix4;
