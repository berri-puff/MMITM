import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { InviteFormProps } from "../../types";
import { Loading } from "../Loading";
import { getUser, postItinerary } from "../../utils/api-ma";

export const InviteForm: React.FC<InviteFormProps> = ({
  chosenMeeting,
  transportation,
  userCoord,
  friendCoord,
  timeStamp,
  setHasClicked,
  foundUser,
  setFoundUser,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableSearchBtn, setDisableSearchBtn] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const retrieveUser = async (searchUser: string) => {
    try {
      setDisableSearchBtn(true);
      const invitedUser = await getUser(searchUser);
      setFoundUser(invitedUser);
      setDisableSearchBtn(false);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  function handleSearchUser(event: any): void {
    setSearchInput(event.target.value);
  }

  function searchForUser(event: any): void {
    event.preventDefault();
    setSearchInput("");
    setIsLoading(true);
    retrieveUser(searchInput);
  }
  if (isLoading) {
    return (
      <section className="flex">
        <p>Searching for user</p>
        <Loading />
      </section>
    );
  } else {
    return (
      <section>
        <form onSubmit={searchForUser}>
          <label htmlFor="invite-user" className="label label-text">
            Search by username{" "}
          </label>
          <input
            id="searchUserInput"
            type="text"
            placeholder="Find your plus one"
            onChange={handleSearchUser}
            value={searchInput}
            className="input input-bordered"
          />

          <button disabled={disableSearchBtn} className="btn btn-primary ml-5">
            Search
          </button>
        </form>
        {foundUser.length !== 0 ? (
          <>
            <ul key={foundUser[0].id}>
              <div className="alert alert-success mt-10 justify-between">
                <p>
                  We found {foundUser[0].first_name}.
                </p>
                <button
                  className="btn"
                  onClick={() => {
                    if (user) {
                      postItinerary(
                        foundUser[0],
                        user,
                        friendCoord,
                        userCoord,
                        transportation,
                        chosenMeeting,
                        timeStamp
                      );
                    }

                    setHasClicked(true);
                  }}
                >
                  Invite{" "}
                  <span className="capitalize">{foundUser[0].first_name}</span>{" "}
                  <img src="mmitm-plane.png" className="max-h-8" />
                </button>
              </div>
            </ul>
          </>
        ) : null}
      </section>
    );
  }
};
