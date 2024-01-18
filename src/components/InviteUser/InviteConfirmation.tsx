import { Link } from 'react-router-dom';
import React, {useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiOutlineMap } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { HiOutlineHome } from 'react-icons/hi2';
import { ConfirmedProps } from '../../types';


export const InviteConfirmation: React.FC<ConfirmedProps> = ({ chosenMeeting, timeStamp, foundUser, transportation
}) => {
  const { user } = useContext(UserContext);
  const openingHours =
    chosenMeeting.placeData.current_opening_hours.weekday_text[
      timeStamp.day.weekdayTextIndex
    ];
  const userName = foundUser[0].username;
  const placePhoto = chosenMeeting.placeData.photos[0].getUrl();

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="text-center max-w-1xl p-5">
            <div>
              <div className="card card-compact w-96 bg-base-200 shadow-2xl mb-10">
                <figure className="h-48 overflow-hidden">
                  <img src={`${placePhoto}`} />
                </figure>
                <div className="card-body text-left">
                  <div className="flex justify-between">
                    <h2 className="card-title">
                      Invite to {chosenMeeting.placeData.name}
                    </h2>
                    <h2 className="min-w-10">
                      <HiOutlineStar className="inline" />{' '}
                      {chosenMeeting.placeData.rating}
                    </h2>
                  </div>

                  <p>
                    {' '}
                    <HiOutlineMapPin className="inline" />{' '}
                    {chosenMeeting.address}
                  </p>
                  <p>
                    <HiOutlineHome className="inline" /> Open {openingHours}
                  </p>
                  <div className="divider">Meeting</div>
                  <p>
                    <HiOutlineCalendar className="inline" />{' '}
                    {timeStamp.day.dayName} {timeStamp.date}{' '}
                    <HiOutlineClock className="inline" /> {timeStamp.time}
                  </p>

                  <div className="travel-detail">
                    <div className="divider">Your journey</div>
                    <p>
                      <HiOutlineMap className="inline" />
                      {transportation === 'driving' ? (
                        <span> Driving </span>
                      ) : (
                        <span> Walking </span>
                      )}
                      {chosenMeeting.travelDetails[0].travelDistance} in{' '}
                      {chosenMeeting.travelDetails[0].travelTime} from{' '}
                      {chosenMeeting.travelDetails[0].origin}
                    </p>
                  </div>

                  <div className="travel-detail">
                    <div className="divider">Guest journey</div>
                    <p>
                      <HiOutlineMap className="inline" />
                      {transportation === 'driving' ? (
                        <span> Driving </span>
                      ) : (
                        <span> Walking </span>
                      )}
                      {chosenMeeting.travelDetails[1].travelDistance} in{' '}
                      {chosenMeeting.travelDetails[1].travelTime} from{' '}
                      {chosenMeeting.travelDetails[1].origin}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100 p-10">
            <h3 className="text-5xl font-bold">
              Your invitation has been sent to {userName}
            </h3>
            <p className="py-6">
              Your Meeting Itinerary is now available in your 'created'
              Invitations.
            </p>
            <div>
              <Link
                className="btn btn-primary"
                to={`/invitations/${user.username}`}
              >
                Invitations
              </Link>
              <Link className="btn btn-primary mx-5" to={`/`}>
                Set Up Another Meeting
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* mmm */}
      <div></div>
    </>
  );
};
