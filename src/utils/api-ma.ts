import axios from "axios";
import { Place, Invite } from "../types";
import { convertCrosshairToArray } from "./utils";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../lib/fireBaseConfig";

export const getPlaces = async (coordinate, setPlaces, apiKey) => {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate}&type=cafe&opennow&rankby=distance&key=${apiKey}`;
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
