import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
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

export const InviteForm: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [foundUser, setFoundUser] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { user } = useContext(UserContext);
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

  const patchItinerary = async (invitee: Users[]): Promise<void> => {
    setDisableButton(true);
    const updateInviteBody = {
      attendees: {
        invitee_1: {
          accepted: false,
          start_location: new GeoPoint(55.96935528255473, -3.179227758736596),
          transportation: "driving",
          travel_time: "1h30m",
          username: invitee.username,
        },
        meeting_creator: {
          accepted: true,
          start_location: new GeoPoint(55.98234946928965, -3.1774646553803034),
          transportation: "walking",
          travel_time: "9m",
          username: user,
        },
      },
    };
    const docRef = doc(db, "Test-sendData", "2I8Nn4RIbgi3r01EBwFK");
    updateDoc(docRef, updateInviteBody)
      .then(() => {
        setDisableButton(false);
        console.log("invite sent!");
      })
      .catch((e) => {
        console.log(e);
        setDisableButton(false);
      });
  };

  const postItinerary = (invitee: Users[]) => {
    const itneraryBody = {
      attendees: {
        invitee_1: {
          accepted: true,
          start_location: new GeoPoint(55.96935528255473,-3.179227758736596),
          transportation: "driving",
          travel_time: "1h30m",
          username: invitee.username,
        },
        meeting_creator: {
          accepted: true,
          start_location: new GeoPoint(55.98234946928965, -3.1774646553803034),
          transportation: "walking",
          travel_time: "9m",
          username: user,
        },
      },
      meeting_time: Timestamp.fromDate(new Date()),
      venue: {
        coordinates: new GeoPoint(55.94416136249669, -3.268433485994756),
        location: "Edinburgh",
        name: "Edinburgh Zoo",
        rating: 4.9,
        type: "zoo",
      },
    };
    const collectionData = collection(db, "Test-sendData");
    addDoc(collectionData, itneraryBody).then((docRef) => {
      console.log(docRef.id, "with the id");
      console.log("posted!");
    });
  };

  if (user === "Nobody") {
    return (
      <p>
        Please <Link to={`/log_in`}>LogIn</Link> to invite someone
      </p>
    );
  }
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
            {foundUser.map((person) => {
              return (
                <ul key={person.id}>
                  <p>Name: {person.first_name}</p>
                  <p>Username: {person.username}</p>
                  <button
                    onClick={() => {
                      patchItinerary(person);
                    }}
                    disabled={disableButton}
                  >
                    Invite!
                  </button>
                </ul>
              );
            })}
          </>
        ) : (
          <p>Start inviting friends!</p>
        )}
      </section>
    );
  }
};
