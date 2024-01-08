import { convertTime } from "../../utils/utils";
import { updateCreatorInvite } from "../../utils/api-ma";
import { Invite, InvitationsProps } from "../../types";

export const CreatedInvitations: React.FC<InvitationsProps> = ({ invites, setSubmitted }) => {
  const handleSubmit = async (id: string, accepted: boolean) => {
    await updateCreatorInvite(id, accepted);
    setSubmitted(`${accepted}`);
  };

  if (!invites.length) {
    return <p>nothing to see here...</p>;
  } else {
    return (
      <ul>
        {invites.map((invite: Invite) => {
          if (invite.attendees.meeting_creator.accepted !== true) {
            return (
              <li key={invite.id} className="meeting-card">
                <div className="collapse bg-base-200 invitation-pending collapse-arrow">
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title text-xl font-medium non-collapsed-content">
                    <p>Invitation created by you</p>
                    <div className="badge badge-error gap-2">Not Accepted</div>
                  </div>
                  <div className="collapse-content">
                    <p>
                      You have invited {invite.attendees.invitee_1.username} for
                      a meet up, see below for details.
                    </p>
                    <h3 className="invitation-header">WHAT</h3>
                    <p>
                      Transportation:{" "}
                      {invite.attendees.meeting_creator.transportation}
                    </p>
                    <p>
                      Your travel time:{" "}
                      {invite.attendees.meeting_creator.travel_time}
                    </p>
                    <p>
                      {invite.attendees.invitee_1.username} travel time:{" "}
                      {invite.attendees.invitee_1.travel_time}
                    </p>
                    <h3 className="invitation-header">WHERE</h3>
                    <p>
                      Venue: {invite.venue.name} ({invite.venue.type})
                    </p>
                    <p>Location: {invite.venue.location}</p>
                    <p>Rating: {invite.venue.rating}</p>
                    <h3 className="invitation-header">WHEN</h3>
                    <p>{invite.meeting_time.date}</p>
                    <p>{invite.meeting_time.time}</p>
                    <div className="invitation-button">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          handleSubmit(invite.id, true);
                        }}
                      >
                        Accept
                      </button>
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
                    <p>Invitation created by you</p>
                    <div className="badge badge-success gap-2">Accepted</div>
                  </div>
                  <div className="collapse-content">
                    <p>
                      You have invited {invite.attendees.invitee_1.username}
                      for a meet up, see below for details.
                    </p>
                    <h3 className="invitation-header">WHAT</h3>
                    <p>
                      Transportation:{" "}
                      {invite.attendees.meeting_creator.transportation}
                    </p>
                    <p>
                      Your travel time:{" "}
                      {invite.attendees.meeting_creator.travel_time}
                    </p>
                    <p>
                      {invite.attendees.invitee_1.username} travel time:{" "}
                      {invite.attendees.invitee_1.travel_time}
                    </p>
                    <h3 className="invitation-header">WHERE</h3>
                    <p>
                      Venue: {invite.venue.name} ({invite.venue.type})
                    </p>
                    <p>Location: {invite.venue.location}</p>
                    <p>Rating: {invite.venue.rating}</p>
                    <h3 className="invitation-header">WHEN</h3>
                    <p>{invite.meeting_time.date}</p>
                    <p>{invite.meeting_time.time}</p>
                    <div className="invitation-button">
                      <button
                        className="btn btn-error"
                        onClick={() => {
                          handleSubmit(invite.id, false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
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
