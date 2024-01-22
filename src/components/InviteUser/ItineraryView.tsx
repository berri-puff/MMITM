import { HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi';

import {
  HiOutlineStar,
  HiOutlineMap,
  HiOutlineMapPin,
  HiOutlineHome,
} from 'react-icons/hi2';

import { ItineraryViewProps } from '../../types';

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  chosenMeeting,
  transportation,
  timeStamp,
}) => {
  const openingHours =
    chosenMeeting.placeData.current_opening_hours.weekday_text[
      timeStamp.day.weekdayTextIndex
    ];
  let placePhoto;
  if (chosenMeeting.placeData.photos[0]) {
    placePhoto = chosenMeeting.placeData.photos[0].getUrl();
  } else placePhoto = 'mmitm-plane.png';

  return (
    <>
      <div>
        <div className="card card-compact w-full bg-base-200 shadow-2xl mb-10">
          <figure className="h-48 overflow-hidden">
            <img src={`${placePhoto}`} />
          </figure>
          <div className="card-body">
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
              <HiOutlineMapPin className="inline" /> {chosenMeeting.address}
            </p>
            <p>
              <HiOutlineHome className="inline" /> Open {openingHours}
            </p>
            <div className="divider">Meeting</div>
            <p>
              <HiOutlineCalendar className="inline" /> {timeStamp.day.dayName}{' '}
              {timeStamp.date} <HiOutlineClock className="inline" />{' '}
              {timeStamp.time}
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
    </>
  );
};
