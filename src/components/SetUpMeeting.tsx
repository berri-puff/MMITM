import { useState, useContext } from 'react';
import { MeetingForm } from './MeetPage/MeetingForm';
import { MeetingMap } from './MeetPage/MeetingMap';
import { Suggestions } from './Suggestions';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Coord, TimeStamp } from '../types';

export const SetUpMeeting: React.FC = () => {
  const [userCoord, setUserCoord] = useState<Coord>({ lat: 0, lng: 0 });
  const [friendCoord, setFriendCoord] = useState<Coord>({ lat: 0, lng: 0 });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [transportation, setTransportation] = useState<string>('walking');
  const [timeStamp, setTimeStamp] = useState<TimeStamp>({
    date: '',
    time: '',
    day: {
      weekdayTextIndex: 0,
      periodsDayIndex: 0,
      dayName: '',
      dayIndex: 0,
    }
  });

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  if (!user) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <p>
          Please{' '}
          <Link className="btn btn-primary mx-5" to={`/log-in`}>
            Log in
          </Link>{' '}
          to set up a meeting.
        </p>
      </div>
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
            <div className="text-center w-80 md:w-[400px] md:p-5">
              <MeetingMap userCoord={userCoord} friendCoord={friendCoord} />
            </div>
            <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100 p-2 md:p-10">
              <h3 className="text-5xl font-bold">Set up a meeting</h3>
              <p className="py-6">
                Just input the date, time, both locations, and travel mode and
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
      </>
    );
  }
};
