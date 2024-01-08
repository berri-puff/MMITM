import axios from 'axios';
const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/details',
  });
  
  export const getOpeningHours = (
    places
  ) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    
    const pendingPromises = places.map((place) => {
        console.log(place, 'plaaaace')
        return api.get(`/json?place_id=${place.place_id}&key=${apiKey}`)
    })
    return Promise.all(pendingPromises)




    // return api
    //   .get(
        
    //   )
    //   .then((response) => {
    //     return response.data;
    //   });
  };
  