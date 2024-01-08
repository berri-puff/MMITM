import React, { useState, useContext } from 'react';
import { MeetingForm } from './MeetPage/MeetingForm';
import { MeetingMap } from './MeetPage/MeetingMap';
import { Suggestions } from './Suggestions';
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const SetUpMeeting: React.FC = () => {
  const [userCoord, setUserCoord] = useState<string[]>([]);
  const [friendCoord, setFriendCoord] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [transportation, setTransportation] = useState<string>('walking');
  const [timeStamp, setTimeStamp] = useState({date: '', time: ''})
  const { user } = useContext(UserContext);
 
  if (user === "Nobody") {
    return (
      <p>
        Please <Link className="btn btn-primary mx-5" to={`/log_in`}>LogIn</Link> to set up a meeting.
      </p>
    );
  } 
  if (isSubmitted) {
    return (
      <Suggestions
        userCoord={userCoord}
        friendCoord={friendCoord}
        transportation={transportation}
        timeStamp={timeStamp}
      />
    );
  } else {
    return (
      <div>
        <h3>Locations:</h3>
        <MeetingMap userCoord={userCoord} friendCoord={friendCoord} />
        <MeetingForm
          setUserCoord={setUserCoord}
          setFriendCoord={setFriendCoord}
          setIsSubmitted={setIsSubmitted}
          setTransportation={setTransportation}
          setTimeStamp={setTimeStamp}
          timeStamp={timeStamp}
        />
      </div>
    );
  }
};
