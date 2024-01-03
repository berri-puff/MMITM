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

// function Matrix() {
//   // Use type annotations for state
//   const [distances, setDistances] = useState<DistanceRow[]>([]);
//   const [addresses, setAddresses] = useState<string[]>([]);
//   const [origins, setOrigins] = useState<string[]>([]);

//   useEffect(() => {
//     getDistance()
//       .then((data: DistanceData) => {
//         // Type annotation for data
//         setDistances(data.rows);
//         setAddresses(data.destination_addresses);
//         setOrigins(data.origin_addresses);
//         console.log(data.rows, 'data.rows');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div className="prose">
//       <h1>PG 1</h1>
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
//           <div key={index} className="prose">
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

// export default Matrix;
