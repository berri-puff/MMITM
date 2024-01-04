import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import db from "../../lib/fireBaseConfig";
import { collection, getDocs } from "@firebase/firestore";
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
        return { ...person.data() };
      });
      setFoundUser(
        data.filter((person) => {
          if (person.first_name === searchUser || person.username === searchUser) {
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

  if (user === "Nobody") {
    return (
      <p>
        Please <Link to={`/log_in`}>LogIn</Link> to invite someone
      </p>
    );
  }
  if (isLoading) {
  return (  <section>
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
    </section>)
  } else {
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
        {foundUser.length !== 0 ? (
          <ul>
            {foundUser.map((person) => {
              return (
                <li key={person.id}>
                  <p>Name: {person.first_name}</p>
                  <p>Username: {person.username}</p>
                  <button>Invite!</button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No one here yet</p>
        )}
      </section>
    );
  }
};
