import { useContext, useEffect, useState } from "react";
import { InvitationsList } from "./Invitations/InvitationsList";
import { UserContext } from "../contexts/UserContext";
import { getCreatedInvites, getInvites, updateInvite } from "../utils/api-ma";
import { Link } from "react-router-dom";
import { CreatedInvitations } from "./Invitations/CreatedInvitations";

export const Invitations = () => {
  const { user } = useContext(UserContext);
  const [recievedInvites, setRecievedInvites] = useState<Invite[]>([]);
  const [createdInvites, setCreatedInvites] = useState<Invite[]>([]);
  const [hasFetchedInvites, setHasFetchedInvites] = useState(false);
  const [viewInvites, setViewInvites] = useState("recieved");

  const handleInvitesClick = (invitesView) => {
    setViewInvites(invitesView);
  };

  useEffect(() => {
    const fetchInvites = async () => {
      const recievedInvitesData = await getInvites(user);
      const createdInvitesData = await getCreatedInvites(user);
      setRecievedInvites(recievedInvitesData);
      setCreatedInvites(createdInvitesData);
    };
    fetchInvites();
    setHasFetchedInvites(true);
  }, []);

  if (!hasFetchedInvites) {
    return <p>loading....</p>;
  } else if (user === "Nobody" || user === undefined) {
    return (
      <Link to={"/Log_in"}>
        <p>Please log in to see your invites</p>
      </Link>
    );
  } else {
    return (
      <div>
        <label className="swap">
          <input type="checkbox" />
          <div
            className="swap-off"
            onClick={() => {
              handleInvitesClick("recieved");
            }}
          >
            Recieved Invites
          </div>
          <div
            className="swap-on"
            onClick={() => {
              handleInvitesClick("created");
            }}
          >
            Created Invites
          </div>
        </label>
        {viewInvites === "recieved" && (
          <InvitationsList invites={recievedInvites} />
        )}
        {viewInvites === "created" && (
          <CreatedInvitations invites={createdInvites} />
        )}
      </div>
    );
  }
};
