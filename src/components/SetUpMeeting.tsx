import React, { useState, useContext } from 'react';
import { MeetingForm } from './MeetPage/MeetingForm';
// import { MeetingMap } from './MeetPage/MeetingMap';
import { Suggestions } from './Suggestions';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const SetUpMeeting: React.FC = () => {
  const [userCoord, setUserCoord] = useState<string[]>([]);
  const [friendCoord, setFriendCoord] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [transportation, setTransportation] = useState<string>('walking');
  const [timeStamp, setTimeStamp] = useState({
    date: '',
    time: '',
    day: {
      dayName: '',
      dayIndex: '',
    },
  });

  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <p>
        Please{' '}
        <Link className="btn btn-primary mx-5" to={`/log_in`}>
          Log in
        </Link>{' '}
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
      <>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col-reverse lg:flex-row-reverse">
            <div className="text-center max-w-1xl p-5">
              {/* <MeetingMap userCoord={userCoord} friendCoord={friendCoord} /> */}
            </div>
            <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100 p-10">
              <h3 className="text-5xl font-bold">Set up a meeting</h3>
              <p className="py-6">
                Just input the date, time, both locations, and travel modes and
                we'll find the ideal meeting spot for you.
              </p>
              <MeetingForm
                setUserCoord={setUserCoord}
                setFriendCoord={setFriendCoord}
                setIsSubmitted={setIsSubmitted}
                setTransportation={setTransportation}
                setTimeStamp={setTimeStamp}
                timeStamp={timeStamp}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:flex-row items-center justify-center"></div>
      </>
    );
  }
};
