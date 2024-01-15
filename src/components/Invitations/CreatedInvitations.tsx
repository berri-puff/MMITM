import { deleteInvite } from "../../utils/api-ma";
import { Invite, InvitationsProps } from "../../types";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi2";
import { HiOutlineMap } from "react-icons/hi2";
import { HiOutlineMapPin } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const CreatedInvitations: React.FC<InvitationsProps> = ({
  invites,
  setSubmitted,
  loading,
}) => {
  const handleDelete = async (id: string) => {
    await deleteInvite(id);
    setSubmitted(`${id}`);
  };

  if (!invites.length) {
    return (
      <div className="bg-base-200 mx-auto w-2/3 mb-5 p-20">
        <p className="text-xl">You haven't set up any meetings.</p>{" "}
        <Link to={`/setup_meeting`}>
          <button className="btn btn-primary my-10">Set up a meeting</button>
        </Link>
      </div>
    );
  } else {
    return (
      <ul>
        {invites.map((invite: Invite) => {
          return (
            <li key={invite.id} className="meeting-card">
              <div className="collapse bg-base-200 hover:bg-base-300 collapse-arrow mx-auto w-2/3 mb-5">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title non-collapsed-content flex justify-between items-center">
                  <p>
                    You invited{" "}
                    <span className="text-xl">
                      {invite.attendees.invitee_1.username}
                    </span>{" "}
                    to <span className="text-xl">{invite.venue.name}</span>
                  </p>
                  <div
                    className={`badge min-w-32 ${
                      invite.attendees.invitee_1.accepted
                        ? "badge-secondary"
                        : "badge-outline"
                    }`}
                  >
                    {invite.attendees.invitee_1.accepted
                      ? "Accepted"
                      : "Not Accepted"}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="divider">Meeting</div>
                  <p>
                    <HiOutlineCalendar className="inline" />{" "}
                    {invite.meeting_time.date}{" "}
                    <HiOutlineClock className="inline" />{" "}
                    {invite.meeting_time.time}
                  </p>{" "}
                  <p>
                    <HiOutlineStar className="inline" /> {invite.venue.rating}
                  </p>
                  <p>
                    <HiOutlineMapPin className="inline" />{" "}
                    {invite.venue.location}
                  </p>
                  <p>
                    <HiOutlineMap className="inline" />{" "}
                    <span className="capitalize">
                      {invite.attendees.meeting_creator.transportation}
                    </span>{" "}
                    will take you {invite.attendees.meeting_creator.travel_time}{" "}
                    and {invite.attendees.invitee_1.username}{" "}
                    {invite.attendees.invitee_1.travel_time}
                  </p>
                  <div className="card-actions justify-end mt-5">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const modal = document.getElementById(
                          "my_modal_1"
                        ) as HTMLDialogElement;
                        if (modal) {
                          modal.showModal();
                        }
                      }}
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
                          <button className="btn btn-secondary close-button">
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
        })}
      </ul>
    );
  }
};
