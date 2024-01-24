
import axios from "axios";
import {
  Invite,
  Coordinates,
  Users,
  User,
  ChosenMeeting,
  TimeStamp,
  Coord,
} from "../types";

import {
  DocumentData,
  DocumentSnapshot,
  GeoPoint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import db from '../lib/fireBaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from "react";



export const getInvites = async (user: string) => {
  try {
    const q = query(
      collection(db, 'itineraries'),
      where('attendees.invitee_1.username', '==', user)
    );
    const querySnapshot = await getDocs(q);
    const data: Invite[] = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Invite;
    });
    return data;
  } catch (err: any) {
    console.log('Error fetching invites:', err);
  }
};

export const updateInviteeInvite = async (id: string, accepted: boolean) => {
  const docRef = doc(db, 'itineraries', id);
  try {
    await updateDoc(docRef, {
      'attendees.invitee_1.accepted': accepted,
    });
  } catch (err) {
    console.log('Error updating invite:', err);
  }
};

export const updateCreatorInvite = async (id: string, accepted: boolean) => {
  const docRef = doc(db, 'itineraries', id);
  try {
    await updateDoc(docRef, {
      'attendees.meeting_creator.accepted': accepted,
    });
  } catch (err) {
    console.log('Error updating invite:', err);
  }
};

export const getCreatedInvites = async (user: string) => {
  try {
    const q = query(
      collection(db, 'itineraries'),
      where('attendees.meeting_creator.username', '==', user)
    );
    const querySnapshot = await getDocs(q);
    const data: Invite[] = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Invite;
    });
    return data;
  } catch (err: any) {
    console.log('Error fetching invites:', err);
  }
};

export const addressToCoord = async (
  userLocation: string
): Promise<Coordinates> => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=${apiKey}`;
    const { data } = await axios.get(url);
    return data.results[0].geometry.location;
  } catch (err) {
    throw err;
  }
};

export const deleteInvite = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'itineraries', id));
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
  setUserCreated: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const auth = getAuth();
    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', uid), {
      first_name: name,
      username: username,
      preferences: [],
      img_url: avatarUrl,
    });
    setUserCreated(true);
  } catch (err) {
    setUserCreated(false);
    console.log('unable to create account', err);
  }
};

export const logInAccount = async (
  email: string,
  password: string,
  setIsError: Dispatch<SetStateAction<boolean>>,

) => {
  try {
    const auth = getAuth();
    const {
      user: { uid },
    } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(doc(db, 'users', uid));
    const document = userDoc.data()
    if (document) {
      const username = document.username;
      const imgUrl = document.img_url;
      return {
        id: uid,
        username: username,
        imgUrl: imgUrl,
      };
    }
    
    
  } catch (err) {
    console.log('Could not sign in:', err);
    setIsError(true);
  }
};

export const checkUsernameExists = async (username: string) => {
  try {
    const q = query(collection(db, 'users'), where('username', '==', username));
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

export const getUser = async (username: string) => {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      const userData = doc.data();
      return {
        id: doc.id,
        username: userData.username || "",
        img_url: userData.img_url || "",
        first_name: userData.first_name || "",
        preferences: userData.preferences || [],
      };
    });
    return data;
  } catch (err) {
    console.error("Error retrieving users:", err);
  }
};

export const postItinerary = (
  invitee: Users,
  user: User,
  friendCoord: Coord,
  userCoord: Coord,
  transportation: string,
  chosenMeeting: ChosenMeeting,
  timeStamp: TimeStamp
) => {
  const openingHours =
    chosenMeeting.placeData.current_opening_hours.weekday_text[
      timeStamp.day.weekdayTextIndex
    ];
  console.log(chosenMeeting);
  const itineraryBody = {
    attendees: {
      invitee_1: {
        accepted: false,
        start_location: new GeoPoint(friendCoord.lat, friendCoord.lng),
        transportation: transportation,
        travel_time: chosenMeeting.travelDetails[1].travelTime,
        username: invitee.username,
      },
      meeting_creator: {
        accepted: true,
        start_location: new GeoPoint(userCoord.lat, userCoord.lng),
        transportation: transportation,
        travel_time: chosenMeeting.travelDetails[0].travelTime,
        username: user?.username,
      },
    },
    meeting_time: timeStamp,

    venue: {
      coordinates: new GeoPoint(
        chosenMeeting.placeData.geometry.location.lat(),
        chosenMeeting.placeData.geometry.location.lng()
      ),
      location: chosenMeeting.address,
      name: chosenMeeting.placeData.name,
      rating: chosenMeeting.placeData.rating,
      type: "Cafe",
      opening_hours: openingHours,
    },
  };
  const collectionData = collection(db, "itineraries");
  addDoc(collectionData, itineraryBody);
};
