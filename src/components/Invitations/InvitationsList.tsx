import { convertTime } from "../../utils/utils";

export const InvitationsList: React.FC = ({ invites }) => {
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
                    Invitation from {invite.attendees.meeting_creator.username}
                  </p>
                  <div className="badge badge-error gap-2">Not Accepted</div>
                </div>
                <div className="collapse-content">
                  <p>
                    {invite.attendees.meeting_creator.username} has invited you
                    for a meet up, see below for details.
                  </p>
                  <h3 className="invitation-header">WHAT</h3>
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
                  <h3 className="invitation-header">WHERE</h3>
                  <p>
                    Venue: {invite.venue.name} ({invite.venue.type})
                  </p>
                  <p>Location: {invite.venue.location}</p>
                  <p>Rating: {invite.venue.rating}</p>
                  <h3 className="invitation-header">WHEN</h3>
                  <p>{convertTime(invite.meeting_time).toString()}</p>
                  <div className="invitation-button">
                    <button className="btn btn-success">Accept</button>
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
                  <p>
                    {" "}
                    Invitation from {invite.attendees.meeting_creator.username}
                  </p>
                  <div className="badge badge-success gap-2">Accepted</div>
                </div>
                <div className="collapse-content">
                  <p>
                    {invite.attendees.meeting_creator.username} has invited you
                    for a meet up, see below for details.
                  </p>
                  <h3 className="invitation-header">WHAT</h3>
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
                  <h3 className="invitation-header">WHERE</h3>
                  <p>
                    Venue: {invite.venue.name} ({invite.venue.type})
                  </p>
                  <p>Location: {invite.venue.location}</p>
                  <p>Rating: {invite.venue.rating}</p>
                  <h3 className="invitation-header">WHEN</h3>
                  <p>{convertTime(invite.meeting_time).toString()}</p>
                  <div className="invitation-button">
                    <button className="btn btn-error">Cancel</button>
                  </div>
                </div>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};
