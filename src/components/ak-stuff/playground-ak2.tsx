// import { useEffect, useState } from 'react';
// import { getDistance } from '../../utils/api-ak';

// interface DistanceElement {
//   distance: { text: string; value: number };
//   duration: { text: string; value: number };
// }

// interface DistanceRow {
//   elements: DistanceElement[];
// }

// interface DistanceData {
//   rows: DistanceRow[];
//   destination_addresses: string[];
//   origin_addresses: string[];
// }

// function hasLargeDisparity(
//   route1: DistanceElement,
//   route2: DistanceElement,
//   threshold: number = 0.2
// ): { distanceBreached: boolean; timeBreached: boolean } {
//   const distanceDiff = Math.abs(route1.distance.value - route2.distance.value);
//   const durationDiff = Math.abs(route1.duration.value - route2.duration.value);

//   const largerDistance = Math.max(route1.distance.value, route2.distance.value);
//   const largerDuration = Math.max(route1.duration.value, route2.duration.value);

//   const distanceBreached = distanceDiff / largerDistance > threshold;
//   const timeBreached = durationDiff / largerDuration > threshold;

//   return { distanceBreached, timeBreached };
// }

// function Matrix2() {
//   // Use type annotations for state
//   const [distances, setDistances] = useState<DistanceRow[]>([]);
//   const [addresses, setAddresses] = useState<string[]>([]);
//   const [origins, setOrigins] = useState<string[]>([]);

//   useEffect(() => {
//     getDistance()
//       .then((data: DistanceData) => {
//         setDistances(data.rows);
//         setAddresses(data.destination_addresses);
//         setOrigins(data.origin_addresses);

//         if (data.rows.length === 2) {
//           // Assuming two origins
//           const route1 = data.rows[0].elements[0];
//           const route2 = data.rows[1].elements[0];

//           const disparity = hasLargeDisparity(route1, route2);

//           if (disparity.distanceBreached || disparity.timeBreached) {
//             console.log('Disparity deets:');
//             if (disparity.distanceBreached) {
//               console.log('Distance diff is higher than 20%');
//             }
//             if (disparity.timeBreached) {
//               console.log('Time diff is higher than 20%');
//             }
//             // Handle disparity
//           }
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   return (
//     <div className="prose">
//       <h1>PG 2</h1>
//       <h2>Distances</h2>
//       <div>
//         <p>From:</p>
//         <ul>
//           {origins.map((origin, index) => (
//             <li key={index}>{origin}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <p>To:</p>
//         <ul>
//           {addresses.map((address, index) => (
//             <li key={index}>{address}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         {distances.map((distance, index) => (
//           <div key={index}>
//             <h3>Route {index}</h3>
//             {distance.elements.map((element, idx) => (
//               <div key={idx}>
//                 <p>Distance: {element.distance.text}</p>
//                 <p>Distance metres: {element.distance.value}</p>

//                 <p>Duration: {element.duration.text}</p>
//                 <p>Duration seconds: {element.duration.value}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Matrix2;
