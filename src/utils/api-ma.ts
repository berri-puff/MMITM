import axios from "axios";
import { Place, Invite, Coordinates } from "../types";
import { convertCrosshairToArray } from "./utils";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../lib/fireBaseConfig";

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
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=${apiKey}`;
  const { data } = await axios.get(url);
  return data.results[0].geometry.location;
};

export const deleteInvite = async (id) => {
  try {
    await deleteDoc(doc(db, "itineraries", id));
  } catch (err) {
    console.log(err);
  }
};
