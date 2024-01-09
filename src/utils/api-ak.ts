import axios from 'axios';

const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/distancematrix',
});

const photoApi = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
});

export const getDistance = (
  origins: string,
  destinations: string,
  transportation: string
) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const mode = transportation;
  return api
    .get(
      `/json?destinations=${destinations}&origins=${origins}&units=metric&mode=${mode}&key=${apiKey}`
    )
    .then((response) => {
      return response.data;
    });
};

export const getPhoto = (photoReference: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const photoRef = photoReference;

  return photoApi
    .get(`photo?maxwidth=400&photoreference=${photoRef}&key=${apiKey}`, {
      responseType: 'blob', // Important for handling binary data
    })
    .then((response) => {
      // Create a URL from the Blob//
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(response.data);
      console.log(imageUrl, 'imgUrl in api call');
      return imageUrl;
    })
    .catch((error) => {
      console.error('Error fetching image:', error);
    });
};
