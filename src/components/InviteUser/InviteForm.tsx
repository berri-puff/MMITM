import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import db from "../../lib/fireBaseConfig";
import { collection, getDocs, doc, updateDoc } from "@firebase/firestore";
import { Users } from "../../types";

export const InviteForm: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [foundUser, setFoundUser] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const retrieveUsers = async (searchUser: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data: Users[] = querySnapshot.docs.map((person) => {
        return {...person.data() };
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

  const sendIntinerary = async(invitee : Users[]) : Promise<void> => {
    const updateInviteBody = {
        attendees : {
            invitee_1 : {
            accepted: true,
            start_location : [55.96935528255473, -3.179227758736596],
            transportation: 'driving',
            travel_time : '1h30m',
            username: invitee.username
            },
            meeting_creator : {
                accepted: true,
                start_location : [55.98234946928965, -3.1774646553803034],
                transportation: 'driving',
                travel_time: '9m',
                username: user
            }
        }
       
    }
    const docRef = doc(db, 'itineraries', 'change to correct docu id here')
updateDoc(docRef, updateInviteBody).then(()=>{
    console.log('invite sent!')
})
  
  }

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
                  <button onClick={()=>{sendIntinerary(person)}}>Invite!</button>
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
