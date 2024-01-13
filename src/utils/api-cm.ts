import axios from 'axios';
const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/details',
});

export const getOpeningHours = (places) => {
  const pendingPromises = places.map((place) => {
    return api.get(`/json?place_id=${place.place_id}&key=${apiKey}`);
  });
  return Promise.all(pendingPromises);
};
