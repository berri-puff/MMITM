
const api = axios.create({
    baseURL: '/maps.googleapis.com/maps/api/place/details',
  });
  
  export const getOpeningHours = (
    places
  ) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const pendingPromises = places.map((place) => {
        return api.get(`/json?place_id=${place.placeData.place_id}&key=${apiKey}`)
    })


    
    return api
      .get(
        
      )
      .then((response) => {
        return response.data;
      });
  };
  