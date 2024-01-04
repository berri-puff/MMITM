import { collection, getDocs } from "firebase/firestore";
import db from "../../lib/fireBaseConfig";
import { useEffect, useState } from "react";
import { convertTime } from "../../utils/utils";
import { Invite } from "../../types";

export const InvitationsList: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const getInvites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "itineraries"));
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

  return (
    <ul>
      {invites.map((invite) => {
        console.log(invite.meeting_time);
        return (
          <li key={invite.id} className="meeting-card">
            <h3>Creator</h3>
            <p>Username: {invite.attendees.meeting_creator.username}</p>
            <p>
              Transportation: {invite.attendees.meeting_creator.transportation}
            </p>
            <p>Travel Time: {invite.attendees.meeting_creator.travel_time}</p>
            <h3>Invitee</h3>
            <p>Username: {invite.attendees.invitee_1.username}</p>
            <p>Transportation: {invite.attendees.invitee_1.transportation}</p>
            <p>Travel Time: {invite.attendees.invitee_1.travel_time}</p>
            <h3>Venue</h3>
            <p>
              Name: {invite.venue.name} ({invite.venue.type})
            </p>
            <p>Location: {invite.venue.location}</p>
            <p>Rating: {invite.venue.rating}</p>
            <h3>When</h3>
            <p>{convertTime(invite.meeting_time).toString()}</p>
            {invite.attendees.invitee_1.accepted !== true && (
              <>
                <button>Accept</button>
                <button>decline</button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
