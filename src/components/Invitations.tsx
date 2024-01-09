import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getCreatedInvites, getInvites } from "../utils/api-ma";
import { Link } from "react-router-dom";
import { CreatedInvitations } from "./Invitations/CreatedInvitations";
import { Invite } from "../types";
import { RecievedInvitations } from "./Invitations/RecievedInvitations";

export const Invitations = () => {
  const { user } = useContext(UserContext);
  const [recievedInvites, setRecievedInvites] = useState<Invite[]>([]);
  const [createdInvites, setCreatedInvites] = useState<Invite[]>([]);
  const [hasFetchedInvites, setHasFetchedInvites] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchInvites = async () => {
      const recievedInvitesData = await getInvites(user.username);
      const createdInvitesData = await getCreatedInvites(user.username);
      setRecievedInvites(recievedInvitesData as Invite[]);
      setCreatedInvites(createdInvitesData as Invite[]);
    };
    fetchInvites();
    setHasFetchedInvites(true);
    setSubmitted("");
  }, [submitted]);

  if (!hasFetchedInvites) {
    return <p>loading....</p>;
  } else if (user.username === "Nobody" || user.username === undefined) {
    return (
      <Link to={"/Log_in"}>
        <p>Please log in to see your invites</p>
      </Link>
    );
  } else {
    return (
      <div>
        <div className="invitations-toggle">
          <p>Recieved</p>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700 border-blue-500"
            checked={isChecked}
            onChange={handleToggle}
          />
          <p>Created</p>
        </div>
        {isChecked === false && (
          <RecievedInvitations
            invites={recievedInvites}
            setSubmitted={setSubmitted}
          />
        )}
        {isChecked === true && (
          <CreatedInvitations
            invites={createdInvites}
            setSubmitted={setSubmitted}
          />
        )}
      </div>
    );
  }
};
