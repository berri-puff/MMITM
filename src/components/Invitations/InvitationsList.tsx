import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../lib/fireBaseConfig";
import { useContext, useEffect, useState } from "react";
import { convertTime } from "../../utils/utils";
import { Invite } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

export const InvitationsList: React.FC = () => {
  const { user } = useContext(UserContext);
  const [invites, setInvites] = useState<Invite[]>([]);
  const getInvites = async () => {
    try {
      const q = query(
        collection(db, "itineraries"),
        where("attendees.invitee_1.username", "==", user)
      );
      const querySnapshot = await getDocs(q);
      const data: Invite[] = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Invite;
      });
      setInvites(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInvites();
  }, []);
  if (user === "Nobody" || user === undefined) {
    return (
      <Link to={"/Log_in"}>
        <p>Please log in to see your invites</p>
      </Link>
    );
  } else {
    return (
      <ul>
        {invites.map((invite) => {
          if (invite.attendees.invitee_1.accepted !== true) {
            return (
              <li key={invite.id} className="meeting-card">
                <div className="collapse bg-base-200 invitation-pending collapse-arrow">
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title text-xl font-medium non-collapsed-content">
                    <p>
                      Invitation from{" "}
                      {invite.attendees.meeting_creator.username}
                    </p>

                    <div className="badge badge-error gap-2">Not Accepted</div>
                  </div>
                  <div className="collapse-content">
                    <p>
                      {invite.attendees.meeting_creator.username} has invited
                      you for a meet up, see below for details.
                    </p>
                    <h3 className="invitation-header">WHO</h3>

                    <p>
                      Transportation:{" "}
                      {invite.attendees.meeting_creator.transportation}
                    </p>
                    <p>
                      {invite.attendees.meeting_creator.username} Travel Time:{" "}
                      {invite.attendees.meeting_creator.travel_time}
                    </p>
                    <p>
                      Your travel time: {invite.attendees.invitee_1.travel_time}
                    </p>
                    <h3>Invitee</h3>
                    <h3 className="invitation-header">WHERE</h3>
                    <p>
                      Venue: {invite.venue.name} ({invite.venue.type})
                    </p>
                    <p>Location: {invite.venue.location}</p>
                    <p>Rating: {invite.venue.rating}</p>
                    <h3 className="invitation-header">WHEN</h3>
                    <p>{convertTime(invite.meeting_time).toString()}</p>
                    <div className="invitation-buttons">
                      <button className="btn btn-success">Accept</button>
                      <button className="btn btn-error">Decline</button>
                    </div>
                  </div>
                </div>
              </li>
            );
          } else {
            return (
              <li key={invite.id} className="meeting-card ">
                <div className="collapse bg-base-200 collapse-arrow invitation-accepted">
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title text-xl font-medium non-collapsed-content">
                    <p>                    Invitation from {invite.attendees.meeting_creator.username}</p>

                    <div className="badge badge-success gap-2">Accepted</div>
                  </div>
                  <div className="collapse-content">
                    <p>
                      {invite.attendees.meeting_creator.username} has invited
                      you for a meet up, see below for details.
                    </p>
                    <h3 className="invitation-header">WHO</h3>
                    <p>
                      Transportation:{" "}
                      {invite.attendees.meeting_creator.transportation}
                    </p>
                    <p>
                      {invite.attendees.meeting_creator.username} Travel Time:{" "}
                      {invite.attendees.meeting_creator.travel_time}
                    </p>
                    <p>
                      Your travel time: {invite.attendees.invitee_1.travel_time}
                    </p>
                    <h3>Invitee</h3>
                    <h3 className="invitation-header">WHERE</h3>
                    <p>
                      Venue: {invite.venue.name} ({invite.venue.type})
                    </p>
                    <p>Location: {invite.venue.location}</p>
                    <p>Rating: {invite.venue.rating}</p>
                    <h3 className="invitation-header">WHEN</h3>
                    <p>{convertTime(invite.meeting_time).toString()}</p>
                  </div>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
};
