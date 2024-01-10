import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiOutlineMap } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { HiOutlineHome } from 'react-icons/hi2';

export const ItineraryView = ({ chosenMeeting, transportation, timeStamp }) => {
  const openingHours =
    chosenMeeting.placeData.data.result.current_opening_hours.weekday_text[
      timeStamp.day.weekdayTextIndex
    ];
  const photo = chosenMeeting.placeData.data.result.photos[0].photo_reference;

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  return (
    <>
      <div>
        <div className="card card-compact w-96 bg-base-200 shadow-2xl mb-10">
          <figure className="h-48 overflow-hidden">
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${apiKey}`}
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title">
                Invite to {chosenMeeting.placeData.data.result.name}
              </h2>
              <h2>
                <HiOutlineStar className="inline" />{' '}
                {chosenMeeting.placeData.data.result.rating}
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
