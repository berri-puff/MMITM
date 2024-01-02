import firebase from "firebase/compat/app";

export const convertTime = (timestamp: firebase.firestore.Timestamp): Date => {
  return timestamp.toDate();
};
