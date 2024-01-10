import { Link } from "react-router-dom"
import React, { useState, useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
export const InviteConfirmation = ({chosenMeeting, timeStamp, foundUser, transportation}) => {
    console.log(foundUser, 'FOUND USER')
    const { user } = useContext(UserContext);
    const openingHours = chosenMeeting.placeData.data.result.current_opening_hours.weekday_text[timeStamp.day.weekdayTextIndex]
    const userName = foundUser[0].username

    return <>
    <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">
             Congratualtions
            </h1>
            <h2 className="card-title">
              Your invitation has been sent to {userName}!
            </h2>
            <h3>Your Meeting Itinerary is now available in your 'created' Invitations. </h3>
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
    <Link className="btn btn-primary mx-5" to={`/invitations/${user}`}>Invitations</Link>
    <Link className="btn btn-primary mx-5" to={`/`}>Set Up Another Meeting</Link>
  </>
}