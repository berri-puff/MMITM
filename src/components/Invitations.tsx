import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getCreatedInvites, getInvites } from "../utils/api-ma";
import { Link } from "react-router-dom";
import { CreatedInvitations } from "./Invitations/CreatedInvitations";
import { Invite } from "../types";
import { RecievedInvitations } from "./Invitations/RecievedInvitations";
import { Loading } from "./Loading";

export const Invitations = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const [recievedInvites, setRecievedInvites] = useState<Invite[]>([]);
  const [createdInvites, setCreatedInvites] = useState<Invite[]>([]);
  const [hasFetchedInvites, setHasFetchedInvites] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchInvites = async () => {
      if (user && user.username) {
        const recievedInvitesData = await getInvites(user.username);
        const createdInvitesData = await getCreatedInvites(user.username);
        setRecievedInvites(recievedInvitesData as Invite[]);
        setCreatedInvites(createdInvitesData as Invite[]);
        setLoading(false);
      }
    };
    fetchInvites();
    setHasFetchedInvites(true);
    setSubmitted("");
  }, [submitted]);

  if (!hasFetchedInvites) {
    return <Loading />;
  } else if (!user || !user.username || user.username === "Nobody") {
    return (
      <Link to={"/Log_in"}>
        <p>Please log in to see your invites</p>
      </Link>
    );
  } else {
    return (
      <div className="container mx-auto mt-5">
        <div className="flex mt-5 mb-10 w-2/3 mx-auto justify-end">
          <p className="pr-3">Recieved</p>
          <input
            type="checkbox"
            className="toggle bg-accent hover:bg-secondary border-accent"
            checked={isChecked}
            onChange={handleToggle}
          />
          <p className="pl-3">Created</p>
        </div>
        {isChecked === false && (
          <RecievedInvitations
            invites={recievedInvites}
            setSubmitted={setSubmitted}
            loading={loading}
          />
        )}
        {isChecked === true && (
          <CreatedInvitations
            invites={createdInvites}
            setSubmitted={setSubmitted}
            loading={loading}
          />
        )}
      </div>
    );
  }
};
