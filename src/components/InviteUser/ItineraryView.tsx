export const ItineraryView = ({chosenMeeting, transportation, timeStamp})=>{
  const openingHours = chosenMeeting.placeData.data.result.current_opening_hours.weekday_text[timeStamp.day.weekdayTextIndex]
    return <>
    <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Please Invite a Friend to your Meeting below...
            </h2>
            <h2 className="card-title">{chosenMeeting.placeData.data.result.name}</h2>
            <h3>{timeStamp.day.dayName}</h3>
            <h3>Date: {timeStamp.date}</h3>
            <h3>Time: {timeStamp.time}</h3>
            <h3>Café</h3>
            <h3>Rating: {chosenMeeting.placeData.data.result.rating}</h3>
            <h3>Address: {chosenMeeting.address}</h3>
            <h3>Opening hours: {openingHours}</h3>
            
              <div className="travel-detail">
                  <p>Creators Journey:</p>
                <p>From: {chosenMeeting.travelDetails[0].origin}</p>
                {transportation === 'driving' ? <p>Transportation: Driving </p> : <p>Transportation: Walking</p>}
                <p>Travel Time: {chosenMeeting.travelDetails[0].travelTime}</p>
                <p>Travel Distance: {chosenMeeting.travelDetails[0].travelDistance}</p>
              </div>
              <div className="travel-detail">
              <p>Invitee's Journey:</p>
                <p>From: {chosenMeeting.travelDetails[1].origin}</p>
                {transportation === 'driving' ? <p>Transportation: Driving </p> : <p>Transportation: Walking</p>}
                <p>Travel Time: {chosenMeeting.travelDetails[1].travelTime}</p>
                <p>Travel Distance: {chosenMeeting.travelDetails[1].travelDistance}</p>
              </div>
         
          </div>{' '}
        </div>
    </div>
  </>
    
}
