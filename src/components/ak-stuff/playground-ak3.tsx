import { useEffect, useState } from 'react';
import { getDistance } from '../../utils/api-ak';

interface DistanceElement {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
}

interface DistanceRow {
  elements: DistanceElement[];
}

interface DistanceData {
  rows: DistanceRow[];
  destination_addresses: string[];
  origin_addresses: string[];
}

function hasLargeDisparity(
  route1: DistanceElement,
  route2: DistanceElement,
  threshold: number = 0.2
): { distanceBreached: boolean; timeBreached: boolean } {
  const distanceDiff = Math.abs(route1.distance.value - route2.distance.value);
  const durationDiff = Math.abs(route1.duration.value - route2.duration.value);

  const largerDistance = Math.max(route1.distance.value, route2.distance.value);
  const largerDuration = Math.max(route1.duration.value, route2.duration.value);

  const distanceBreached = distanceDiff / largerDistance > threshold;
  const timeBreached = durationDiff / largerDuration > threshold;

  return { distanceBreached, timeBreached };
}
function Matrix3() {
  const [distances, setDistances] = useState<DistanceRow[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);

  const [coordinates, setCoordinates] = useState({
    origins:
      '51.5136375825016, -0.1365400240806151|51.46222995063997, 0.10913959392165778',
    destination: '51.51104942119124, -0.03696107287824183',
  });

  useEffect(() => {
    getDistance(coordinates.origins, coordinates.destination)
      .then((data: DistanceData) => {
        console.log(data.rows);
        setDistances(data.rows);
        setAddresses(data.destination_addresses);
        setOrigins(data.origin_addresses);

        if (data.rows.length === 2) {
          const route1 = data.rows[0].elements[0];
          const route2 = data.rows[1].elements[0];
          const disparity = hasLargeDisparity(route1, route2);

          if (disparity.distanceBreached || disparity.timeBreached) {
            // Handle disparity: Recalculate coordinates
            console.log('threshold breached');
            const newOrigins =
              '51.5136375825016, -0.1365400240806151|51.46222995063997, 0.10913959392165778';
            /* need logic to determine new origins */
            const newDestination =
              '51.487933766571,-0.013700215079479'; /* need logic to determine new destination */
            setCoordinates({
              origins: newOrigins,
              destination: newDestination,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [coordinates]); // Dependency on coordinates

  return (
    <div className="prose">
      <h1>PG 3</h1>
      <h2>Distances</h2>
      <div>
        <p>From:</p>
        <ul>
          {origins.map((origin, index) => (
            <li key={index}>{origin}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>To:</p>
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </div>

      <div>
        {distances.map((distance, index) => (
          <div key={index}>
            <h3>Route {index}</h3>
            {distance.elements.map((element, idx) => (
              <div key={idx}>
                <p>Distance: {element.distance.text}</p>
                <p>Distance metres: {element.distance.value}</p>

                <p>Duration: {element.duration.text}</p>
                <p>Duration seconds: {element.duration.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matrix3;
