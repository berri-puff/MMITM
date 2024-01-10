import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import db from "../../lib/fireBaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  Timestamp,
  GeoPoint,
} from "@firebase/firestore";
import { Users } from "../../types";
import { InviteConfirmation } from "./InviteConfirmation";
import { Loading } from "../Loading";

export const InviteForm: React.FC = ({chosenMeeting, transportation, userCoord, friendCoord, timeStamp, setHasClicked, foundUser, setFoundUser}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableSearchBtn, setDisableSearchBtn] = useState<boolean>(false)

  const { user } = useContext(UserContext);
  const retrieveUsers = async (searchUser: string) => {
    setDisableSearchBtn(true)

    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data: Users[] = querySnapshot.docs.map((person) => {
        return { ...person.data() };
      });
      setFoundUser(
        data.filter((person) => {
          if (
            person.username === searchUser
          ) {
            return { ...person };
          }
        })
      );
      setDisableSearchBtn(false)
      setIsLoading(false);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  function handleSearchUser(event: any): void {
    setSearchInput(event.target.value);
  }

  function searchForUser(event: any): void {
    event.preventDefault();
    setSearchInput("");
    setIsLoading(true);
    retrieveUsers(searchInput);
  }


  const openingHours = chosenMeeting.placeData.data.result.current_opening_hours.weekday_text[timeStamp.day.weekdayTextIndex]
  const postItinerary = (invitee: Users[]) => {
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
          username: user.username,
        },
      },
      meeting_time: timeStamp,
      
      venue: {
        coordinates: new GeoPoint(chosenMeeting.placeData.data.result.geometry.location.lat, chosenMeeting.placeData.data.result.geometry.location.lng),
        location: chosenMeeting.address,
        name: chosenMeeting.placeData.data.result.name,
        rating: chosenMeeting.placeData.data.result.rating,
        type: "Cafe",
        opening_hours: openingHours
      },
    };
    const collectionData = collection(db, "itineraries");
    addDoc(collectionData, itineraryBody)
  };
  
  if (isLoading) {
    return (
      <section>
        <form onSubmit={searchForUser}>
          <label htmlFor="invite-user">
            Search by firstname:
            <input
              id="searchUserInput"
              type="text"
              placeholder="second"
              onChange={handleSearchUser}
              value={searchInput}
            />
          </label>
          <button disabled={disableSearchBtn}>Search</button>
        </form>
        <Loading/>
      </section>
    );
  } else {
    
      
    
    return (
      <section>
        <form onSubmit={searchForUser}>
          <label htmlFor="invite-user">
            Search by username:
            <input
              id="searchUserInput"
              type="text"
              placeholder="second"
              onChange={handleSearchUser}
              value={searchInput}
            />
          </label>
          <button disabled={disableSearchBtn}>Search</button>
        </form>
        {foundUser.length !== 0 ? (
          <>
                <ul key={foundUser[0].id}>
                  <p>Name: {foundUser[0].first_name}</p>
                  <p>Username: {foundUser[0].username}</p>
                  <button
                    onClick={() => {
                      postItinerary(foundUser[0]);
                      setHasClicked(true)
                    }}
                   
                  >
                    Invite!
                  </button>
                </ul>
          </>
        ) : 
          null
        }
      </section>
    );
  }
};
