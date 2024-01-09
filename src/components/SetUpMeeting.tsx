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
      <section>
        <h3 className="text-2xl font-bold justify-content-center mb-5">Set up a meeting here!</h3>
        <p className='mb-2' >To get started, fill the date, time, your's and your friend's locations and mode of transport and you're all set to find a meeting spot!</p>
        <div className="flex flex-col w-full lg:flex-row">
        <MeetingMap className="grid flex-grow h-32 card bg-base-300 rounded-box" userCoord={userCoord} friendCoord={friendCoord} />
        <div className="divider lg:divider-horizontal divider-primary" ></div> 
        <MeetingForm  className="grid flex-grow h-32 card bg-base-300 rounded-box"
          setUserCoord={setUserCoord}
          setFriendCoord={setFriendCoord}
          setIsSubmitted={setIsSubmitted}
          setTransportation={setTransportation}
          setTimeStamp={setTimeStamp}
          timeStamp={timeStamp}
        />
        </div>
      </section>
    );
  }
};
