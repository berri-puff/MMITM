
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


 console.log(destination.placeData.data.result.current_opening_hours, '.................')
  const openingHours = destination.placeData.data.result.current_opening_hours.weekday_text[timeStamp.day.weekdayTextIndex]
  // console.log(openingHours, 'OPENINGHOURS')
  return (
    <>
      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            
            <h2 className="card-title">
              #{index + 1} {destination.placeData.data.result.name}
            </h2>
            <h3>{timeStamp.day.dayName}</h3>
            <h3>Date: {timeStamp.date}</h3>
            <h3>Time: {timeStamp.time}</h3>
            
            <h3>Café</h3>
            <h3>Rating: {destination.placeData.data.result.rating}</h3>
            <h3>Address: {destination.address}</h3>
            <h3>Opening hours: {openingHours}</h3>
            <div className="travel-detail">
              <p>Creators Journey:</p>
              <p>From: {destination.travelDetails[0].origin}</p>
              {transportation === 'driving' ? (
                <p>Transportation: Driving </p>
              ) : (
                <p>Transportation: Walking</p>
              )}
              <p>Travel Time: {destination.travelDetails[0].travelTime}</p>
              <p>
                Travel Distance: {destination.travelDetails[0].travelDistance}
              </p>
            </div>
            <div className="travel-detail">
              <p>Invitee's Journey:</p>
              <p>From: {destination.travelDetails[1].origin}</p>
              {transportation === 'driving' ? (
                <p>Transportation: Driving </p>
              ) : (
                <p>Transportation: Walking</p>
              )}
              <p>Travel Time: {destination.travelDetails[1].travelTime}</p>
              <p>
                Travel Distance: {destination.travelDetails[1].travelDistance}
              </p>
            </div>
            <button onClick={handleClick} className="btn btn-primary mx-5">
              Confirm Meeting
            </button>
          </div>{' '}
        </div>
      </div>
    </>
  );
};
