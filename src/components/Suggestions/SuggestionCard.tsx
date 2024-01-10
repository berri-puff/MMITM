import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiOutlineMap } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { HiOutlineHome } from 'react-icons/hi2';

export const SuggestionCard = ({
  destination,
  index,
  transportation,
  setChosenMeeting,
  timeStamp,
}) => {
  function handleClick(event: any): void {
    event.preventDefault();
    setChosenMeeting(destination);
  }

  const openingHours =
    destination.placeData.data.result.current_opening_hours.weekday_text[
      timeStamp.day.weekdayTextIndex
    ];

  const photo = destination.placeData.data.result.photos[0].photo_reference;

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  return (
    <>
      {/* {console.log(destination.placeData, 'place data')} */}
      <div className="card card-compact w-96 bg-base-200 shadow-2xl hover:bg-base-300 mb-10">
        <figure className="h-48 overflow-hidden">
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${apiKey}`}
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">
              <span className="text-sm font-normal"> #{index + 1}</span>{' '}
              {destination.placeData.data.result.name}{' '}
            </h2>
            <h2 className="min-w-10">
              <HiOutlineStar className="inline" />{' '}
              {destination.placeData.data.result.rating}
            </h2>
          </div>
          <h3>
            {' '}
            <HiOutlineMapPin className="inline" /> {destination.address}
          </h3>
          <p>
            <HiOutlineHome className="inline" /> Open {openingHours}
          </p>
          <div className="divider">Meeting</div>
          <p>
            <HiOutlineCalendar className="inline" /> {timeStamp.day.dayName}{' '}
            {timeStamp.date} <HiOutlineClock className="inline" />{' '}
            {timeStamp.time}
          </p>
          <div className="divider">Your journey</div>
          <div className="travel-detail">
            <p>
              <HiOutlineMap className="inline" />
              {transportation === 'driving' ? (
                <span> Driving </span>
              ) : (
                <span> Walking </span>
              )}
              {destination.travelDetails[0].travelDistance} in{' '}
              {destination.travelDetails[0].travelTime} from{' '}
              {destination.travelDetails[0].origin}
            </p>
          </div>
          <div className="divider">Guest journey</div>
          <div className="travel-detail">
            <p>
              <HiOutlineMap className="inline" />
              {transportation === 'driving' ? (
                <span> Driving </span>
              ) : (
                <span> Walking </span>
              )}
              {destination.travelDetails[1].travelDistance} in{' '}
              {destination.travelDetails[1].travelTime} from{' '}
              {destination.travelDetails[1].origin}
            </p>
          </div>
          <div className="card-actions justify-end mt-5">
            <button onClick={handleClick} className="btn btn-primary mx-5">
              Confirm Meeting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
