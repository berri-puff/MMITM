import { deleteInvite, updateCreatorInvite } from '../../utils/api-ma';
import { Invite, InvitationsProps } from '../../types';
import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiOutlineMap } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';

export const CreatedInvitations: React.FC<InvitationsProps> = ({
  invites,
  setSubmitted,
}) => {
  const handleDelete = async (id: string) => {
    await deleteInvite(id);
    setSubmitted(`${id}`);
  };

  if (!invites.length) {
    return <p>nothing to see here...</p>;
  } else {
    return (
      <ul>
        {invites.map((invite: Invite) => {
          if (invite.attendees.invitee_1.accepted !== true) {
            return (
              <li key={invite.id} className="meeting-card">
                <div className="collapse bg-base-200 hover:bg-base-300 collapse-arrow mx-auto w-2/3 mb-5">
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title non-collapsed-content flex justify-between items-center">
                    <p>
                      You invited{' '}
                      <span className="text-xl">
                        {invite.attendees.invitee_1.username}
                      </span>{' '}
                      to <span className="text-xl">{invite.venue.name}</span>
                    </p>
                    <div className="badge badge-outline gap-2">
                      Not Accepted
                    </div>
                  </div>
                  <div className="collapse-content">
                    <div className="divider">Meeting</div>
                    <p>
                      <HiOutlineCalendar className="inline" />{' '}
                      {invite.meeting_time.date}{' '}
                      <HiOutlineClock className="inline" />{' '}
                      {invite.meeting_time.time}
                    </p>{' '}
                    <p>
                      <HiOutlineStar className="inline" /> {invite.venue.rating}
                    </p>
                    <p>
                      <HiOutlineMapPin className="inline" />{' '}
                      {invite.venue.location}
                    </p>
                    <p>
                      <HiOutlineMap className="inline" />{' '}
                      <span className="capitalize">
                        {invite.attendees.meeting_creator.transportation}
                      </span>{' '}
                      will take you{' '}
                      {invite.attendees.meeting_creator.travel_time} and{' '}
                      {invite.attendees.invitee_1.username}{' '}
                      {invite.attendees.invitee_1.travel_time}
                    </p>
                    <div className="card-actions justify-end mt-5">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          document.getElementById('my_modal_1').showModal()
                        }
                      >
                        Delete
                      </button>
                    </div>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm</h3>
                        <p className="py-4">
                          Are you sure you want to delete this meeting?
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="btn btn-outline btn-primary mr-5"
                              onClick={() => {
                                handleDelete(invite.id);
                              }}
                            >
                              Confirm
                            </button>
                            <button className="btn btn btn-secondary close-button">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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
                      Transportation:{' '}
                      {invite.attendees.meeting_creator.transportation}
                    </p>
                    <p>
                      Your travel time:{' '}
                      {invite.attendees.meeting_creator.travel_time}
                    </p>
                    <p>
                      {invite.attendees.invitee_1.username} travel time:{' '}
                      {invite.attendees.invitee_1.travel_time}
                    </p>
                    <h3 className="invitation-header">WHERE</h3>
                    <p>
                      Venue: {invite.venue.name} ({invite.venue.type})
                    </p>
                    <p>Location: {invite.venue.location}</p>
                    <p>Rating: {invite.venue.rating}</p>
                    <p>Opening Hours: {invite.venue.opening_hours}</p>
                    <h3 className="invitation-header">WHEN</h3>

                    <p>{invite.meeting_time.date}</p>
                    <p>{invite.meeting_time.time}</p>

                    <div className="invitation-button">
                      <button
                        className="btn btn-error"
                        onClick={() =>
                          document.getElementById('my_modal_1').showModal()
                        }
                      >
                        Delete
                      </button>
                    </div>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm</h3>
                        <p className="py-4">
                          Are you sure you want to delete this meeting?
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="btn btn-outline btn-success"
                              onClick={() => {
                                handleDelete(invite.id);
                              }}
                            >
                              Confirm
                            </button>
                            <button className="btn btn-outline btn-error close-button">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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
