import React, { useState, useContext } from "react";
import { MeetingForm } from "./MeetPage/MeetingForm";
import { MeetingMap } from "./MeetPage/MeetingMap";
import { Suggestions } from "./Suggestions";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { FaInfoCircle } from "react-icons/fa";


export const SetUpMeeting: React.FC = () => {
  const [userCoord, setUserCoord] = useState<string[]>([]);
  const [friendCoord, setFriendCoord] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [transportation, setTransportation] = useState<string>("walking");
  const [timeStamp, setTimeStamp] = useState({ date: "", time: "" });
  

  const [transportation, setTransportation] = useState<string>('walking');
  const [timeStamp, setTimeStamp] = useState({
    date: '', 
    time: '', 
    day: {
      dayName: '',
      dayIndex: ''
    }
  })

  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <p>
        Please{" "}
        <Link className="btn btn-primary mx-5" to={`/log_in`}>
          LogIn
        </Link>{" "}
        to set up a meeting.
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
      <section className="flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold mb-5 text-center">Set up a meeting here!</h3>
       <FaInfoCircle/> <p className='mb-5'>To get started, fill the date, time, your location and a friend's locations, mode of transport and you're all set to find a meeting spot!</p>
        <div className="divider divider-success divider-secondary"></div>
        <div className="flex flex-col w-full lg:flex-row items-center justify-center">
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
