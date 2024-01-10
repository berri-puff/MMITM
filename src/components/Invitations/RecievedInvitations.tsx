import { updateInviteeInvite } from '../../utils/api-ma';
import { Invite, InvitationsProps } from '../../types';
import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiOutlineMap } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

export const RecievedInvitations: React.FC<InvitationsProps> = ({
  invites,
  setSubmitted,
}) => {
  const handleSubmit = async (id: string, accepted: boolean) => {
    await updateInviteeInvite(id, accepted);
    setSubmitted(`${accepted}`);
  };

  if (!invites.length) {
    return (
      <div className="bg-base-200 mx-auto w-2/3 mb-5 p-20 rounded-xl">
        <p className="text-xl">You haven't received any invites.</p>
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
                  <p className="text-sm">
                    <span className="text-xl">
                      {invite.attendees.meeting_creator.username}
                    </span>{' '}
                    invited you to{' '}
                    <span className="text-xl">{invite.venue.name}</span>
                  </p>
                  <div
                    className={`badge ${
                      invite.attendees.invitee_1.accepted
                        ? 'badge-secondary'
                        : 'badge-outline'
                    }`}
                  >
                    {invite.attendees.invitee_1.accepted
                      ? 'Accepted'
                      : 'Not Accepted'}
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
                    will take you {invite.attendees.invitee_1.travel_time} and{' '}
                    {invite.attendees.meeting_creator.username}{' '}
                    {invite.attendees.meeting_creator.travel_time}
                  </p>
                  <div className="card-actions justify-end mt-5">
                    <button
                      className={`btn ${
                        invite.attendees.invitee_1.accepted
                          ? 'btn-secondary'
                          : 'btn-primary'
                      }`}
                      onClick={() =>
                        handleSubmit(
                          invite.id,
                          !invite.attendees.invitee_1.accepted
                        )
                      }
                    >
                      {invite.attendees.invitee_1.accepted
                        ? 'Cancel'
                        : 'Accept'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
};
