import axios from 'axios';

const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/distancematrix',
});

// export const getDistance = () => {
//   const origins =
//     '51.5136375825016, -0.1365400240806151|51.46222995063997, 0.10913959392165778';
//   const destination = '51.51104942119124, -0.03696107287824183';
//   const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
//   const mode = 'walking';

//   return api
//     .get(
//       `/json?destinations=${destination}&origins=${origins}&units=metric&mode=${mode}&key=${apiKey}`
//     )
//     .then((response) => {
//       console.log(response, 'res');
//       return response.data;
//     });
// };

export const getDistance = (origins: string, destination: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const mode = 'walking';

  return api
    .get(
      `/json?destinations=${destination}&origins=${origins}&units=metric&mode=${mode}&key=${apiKey}`
    )
    .then((response) => {
      return response.data;
    });
};
