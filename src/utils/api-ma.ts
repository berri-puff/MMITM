import axios from "axios";
import { Place, Invite, Coordinates } from "../types";
import { convertCrosshairToArray } from "./utils";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../lib/fireBaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const getPlaces = async (coordinate, setPlaces, apiKey) => {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate}&type=cafe&rankby=distance&key=${apiKey}`;
  const { data } = await axios.get(url);
  return data;
};

export const getAllPlaces = async (crosshair, setPlaces, apiKey) => {
  const coordinates = convertCrosshairToArray(crosshair);
  const placesPromises = [];
  await coordinates.map((coordinate) => {
    placesPromises.push(getPlaces(coordinate, setPlaces, apiKey));
  });
  try {
    const dataArr = await Promise.all(placesPromises);
    return dataArr;
  } catch (err) {
    console.log(err);
  }
};

export const getInvites = async (user: string) => {
  try {
    const q = query(
      collection(db, "itineraries"),
      where("attendees.invitee_1.username", "==", user)
    );
    const querySnapshot = await getDocs(q);
    const data: Invite[] = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Invite;
    });
    return data;
  } catch (err: any) {
    console.log("Error fetching invites:", err);
  }
};

export const updateInviteeInvite = async (id: string, accepted: boolean) => {
  const docRef = doc(db, "itineraries", id);
  try {
    await updateDoc(docRef, {
      "attendees.invitee_1.accepted": accepted,
    });
  } catch (err) {
    console.log("Error updating invite:", err);
  }
};

export const updateCreatorInvite = async (id: string, accepted: boolean) => {
  const docRef = doc(db, "itineraries", id);
  try {
    await updateDoc(docRef, {
      "attendees.meeting_creator.accepted": accepted,
    });
  } catch (err) {
    console.log("Error updating invite:", err);
  }
};

export const getCreatedInvites = async (user: string) => {
  try {
    const q = query(
      collection(db, "itineraries"),
      where("attendees.meeting_creator.username", "==", user)
    );
    const querySnapshot = await getDocs(q);
    const data: Invite[] = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Invite;
    });
    return data;
  } catch (err: any) {
    console.log("Error fetching invites:", err);
  }
};

export const addressToCoord = async (
  userLocation: string[]
): Promise<Coordinates> => {
  try {
     const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=${apiKey}`;
  const { data } = await axios.get(url);
  return data.results[0].geometry.location;
  } catch (err) {

   throw err
  }
 
};

export const deleteInvite = async (id) => {
  try {
    await deleteDoc(doc(db, "itineraries", id));
  } catch (err) {
    console.log(err);
  }
};

export const createAccount = async (
  name: string,
  username: string,
  avatarUrl: string,
  email: string,
  password: string,
  setUserCreated
) => {
  try {
    const auth = getAuth();
    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", uid), {
      first_name: name,
      username: username,
      preferences: [],
      img_url: avatarUrl,
    });
    setUserCreated(true);
  } catch (err) {
    setUserCreated(false);
    console.log("unable to create account", err);
  }
};

export const logInAccount = async (
  email: string,
  password: string,
  setIsError
) => {
  try {
    const auth = getAuth();
    const {
      user: { uid },
    } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", uid));
    const username = userDoc.data().username;
    const imgUrl = userDoc.data().img_url;

    return {
      id: uid,
      username: username,
      imgUrl: imgUrl,
    };
  } catch (err) {
    console.log("Could not sign in:", err);
    setIsError(true);
  }
};

export const checkUsernameExists = async (username) => {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
