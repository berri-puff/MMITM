import firebase from "firebase/compat/app";

export const convertTime = (timestamp: firebase.firestore.Timestamp): Date => {
  return timestamp.toDate();
};

export const sortPlaces = (places) => {
  const reviewedPlaces = places.filter((place) => {
    return place.user_ratings_total >= 10;
  });
  return reviewedPlaces.sort((a, b) => {
    return b.rating - a.rating;
  });
};