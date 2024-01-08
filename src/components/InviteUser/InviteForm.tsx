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

export const InviteForm: React.FC = ({chosenMeeting, transportation, userCoord, friendCoord}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [foundUser, setFoundUser] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  console.log(chosenMeeting, 'Chosen Meeting<<<<')
  const retrieveUsers = async (searchUser: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data: Users[] = querySnapshot.docs.map((person) => {
        return { ...person.data() };
      });
      setFoundUser(
        data.filter((person) => {
          if (
            person.first_name === searchUser ||
            person.username === searchUser
          ) {
            return { ...person };
          }
        })
      );
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


  console.log(chosenMeeting, 'CHOSENMEETING')
  const postItinerary = (invitee: Users[]) => {
    console.log(invitee, 'inviteeeeee')
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
          username: user,
        },
      },
      meeting_time: Timestamp.fromDate(new Date()),
      venue: {
        coordinates: new GeoPoint(chosenMeeting.placeData.geometry.location.lat, chosenMeeting.placeData.geometry.location.lng),
        location: chosenMeeting.address,
        name: chosenMeeting.placeData.name,
        rating: chosenMeeting.placeData.rating,
        type: "Cafe",
      },
    };
    console.log(itineraryBody, 'itineraryBody<<<<<<')
    // const collectionData = collection(db, "Test-sendData");
    // addDoc(collectionData, itineraryBody).then((docRef) => {
    //   console.log(docRef.id, "with the id");
    //   console.log("posted!");
    // });
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
          <button>Search</button>
        </form>
        <p>Loading!</p>
      </section>
    );
  } else {
    
      
    
    return (
      
      <section>
        
        <form onSubmit={searchForUser}>
          <label htmlFor="invite-user">
            Search by firstname or username:
            <input
              id="searchUserInput"
              type="text"
              placeholder="second"
              onChange={handleSearchUser}
              value={searchInput}
            />
          </label>
          <button>Search</button>
        </form>
        {foundUser.length !== 0 ? (
          <>
                <ul key={foundUser[0].id}>
                  <p>Name: {foundUser[0].first_name}</p>
                  <p>Username: {foundUser[0].username}</p>
                  <button
                    onClick={() => {
                      postItinerary(foundUser[0]);
                    }}
                    disabled={disableButton}
                  >
                    Invite!
                  </button>
                </ul>
          </>
        ) : (
          <p>Start inviting friends!</p>
        )}
      </section>
    );
  }
};
