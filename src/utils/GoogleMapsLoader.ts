import { Loader } from '@googlemaps/js-api-loader';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries = ['places', 'routes']; // Include all libraries needed across the app

const googleMapsLoader = new Loader({
  apiKey,
  version: 'weekly',
  libraries,
});

export const initGoogleMapsAPI = async () => {
  await googleMapsLoader.importLibrary('maps');
  await googleMapsLoader.importLibrary('places');
  await googleMapsLoader.importLibrary('routes');
};

export default googleMapsLoader;
