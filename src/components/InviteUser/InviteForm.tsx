import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

import db from '../../lib/fireBaseConfig';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  Timestamp,
  GeoPoint,
} from '@firebase/firestore';
import { Users } from '../../types';

export const InviteForm: React.FC = ({
  chosenMeeting,
  transportation,
  userCoord,
  friendCoord,
  timeStamp,
}) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [foundUser, setFoundUser] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const retrieveUsers = async (searchUser: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
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
    setSearchInput('');
    setIsLoading(true);
    retrieveUsers(searchInput);
  }

  const openingHours =
    chosenMeeting.placeData.data.result.current_opening_hours.weekday_text[
      timeStamp.day.weekdayTextIndex
    ];
  const postItinerary = (invitee: Users[]) => {
    console.log(invitee, 'inviteeeeee');
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
      meeting_time: timeStamp,

      venue: {
        coordinates: new GeoPoint(
          chosenMeeting.placeData.data.result.geometry.location.lat,
          chosenMeeting.placeData.data.result.geometry.location.lng
        ),
        location: chosenMeeting.address,
        name: chosenMeeting.placeData.data.result.name,
        rating: chosenMeeting.placeData.data.result.rating,
        type: 'Cafe',
        opening_hours: openingHours,
      },
    };
    const collectionData = collection(db, 'itineraries');
    addDoc(collectionData, itineraryBody);
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
          <label htmlFor="searchUserInput" className="label">
            Search by name or username{' '}
          </label>
          <input
            id="searchUserInput"
            type="text"
            placeholder="Search a name"
            onChange={handleSearchUser}
            value={searchInput}
            className="input input-bordered w-full max-w-xs"
          />

          <button className="btn btn-primary ml-5">Search</button>
        </form>
        {foundUser.length !== 0 ? (
          <>
            <ul key={foundUser[0].id}>
              <div className="m-10">
                <p>
                  We found{' '}
                  <span className="capitalize">{foundUser[0].first_name}</span>
                </p>
                {/* <p>Username: {foundUser[0].username}</p> */}
                <button
                  onClick={() => {
                    postItinerary(foundUser[0]);
                  }}
                  disabled={disableButton}
                  className="btn btn-primary"
                >
                  Invite{' '}
                  <span className="capitalize">{foundUser[0].first_name}</span>
                </button>
              </div>
            </ul>
          </>
        ) : (
          <p>Invite</p>
        )}
      </section>
    );
  }
};
