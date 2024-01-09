import { useEffect, useState } from 'react';
import { getPhoto } from '../../utils/api-ak';
import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlineStar } from 'react-icons/hi2';
import { HiOutlineMap } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';

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

  // const photoReference = destination.placeData.photos[0].photo_reference;
  // const [imageUrl, setImageUrl] = useState('');
  // useEffect(() => {
  //   getPhoto(photoReference).then((url) => {
  //     setImageUrl(url);
  //   });
  // }, []);

  const photo = destination.placeData.photos[0].photo_reference;

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  return (
    <>
      <div className="mt-10"></div>
      <div className="card card-compact w-96 bg-base-100 shadow-2xl">
        <figure className="h-48 overflow-hidden">
          {/* {imageUrl && <img src={imageUrl} alt="Image" />} */}
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${apiKey}`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            #{index + 1} {destination.placeData.name}{' '}
            <HiOutlineStar className="inline" />
            {destination.placeData.rating}
          </h2>
          <h3>
            {' '}
            <HiOutlineMapPin className="inline" /> {destination.address}
          </h3>
          <div className="divider">Itinerary</div>
          <p>
            <HiOutlineCalendar className="inline" /> {timeStamp.date}{' '}
            <HiOutlineClock className="inline" /> {timeStamp.time}
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
