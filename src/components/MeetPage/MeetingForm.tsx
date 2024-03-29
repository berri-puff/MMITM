import { useState } from 'react';
import { convertDateToDay } from '../../utils/utils';
import { addressToCoord } from '../../utils/api-ma';
import { Coordinates, MeetingFormProps } from '../../types';

export const MeetingForm = ({
  setUserCoord,
  setFriendCoord,
  setIsSubmitted,
  setTransportation,
  setTimeStamp,
  timeStamp,
}: MeetingFormProps) => {
  const [value, setValue] = useState<string>('Transportation...');
  const [userLocation, setUserLocation] = useState<string>('');
  const [friendLocation, setFriendLocation] = useState<string>('');
  const [userLocationBtn, setUserLocationBtn] = useState<boolean>(false);
  const [friendLocationBtn, setFriendLocationBtn] = useState<boolean>(false);
  const [timeStampBtn, setTimeStampBtn] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [errStatus, setErrStatus] = useState<boolean>(false);

  function handleUserLocation(event: React.FormEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setUserLocation(newValue);
  }

  function handleFriendLocation(event: React.FormEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setFriendLocation(newValue);
  }
  function confirmUserPosition(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    addressToCoord(userLocation)
      .then((result: Coordinates) => {
        setUserCoord(result);
        setUserLocationBtn(true);
      })
      .catch((err) => {
        if (err && err.response) {
          setErrStatus(true);
          setFeedbackMsg(`Error : ${err.response.status} Bad Request`);
          setTimeout(() => {
            setErrStatus(false);
          }, 3000);
        } else if (err) {
          setErrStatus(true);
          setFeedbackMsg('Not a valid address');
          setTimeout(() => {
            setErrStatus(false);
          }, 3000);
        }
      });
  }

  function confirmFriendPosition(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    addressToCoord(friendLocation)
      .then((result: Coordinates) => {
        setFriendCoord(result);
      })
      .catch((err) => {
        if (err && err.response) {
          setErrStatus(true);
          setFeedbackMsg(`Error : ${err.response.status} Bad Request`);
          setTimeout(() => {
            setErrStatus(false);
          }, 3000);
        } else if (err) {
          setErrStatus(true);
          setFeedbackMsg('Not a valid address');
          setTimeout(() => {
            setErrStatus(false);
          }, 3000);
        }
      });
    setFriendLocationBtn(true);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserLocation('');
    setFriendLocation('');
    setIsSubmitted(true);
  }
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
    setTransportation(event.target.value);
  }

  function handleDate(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const newValue = event.currentTarget.value
    setTimeStamp((currTimeStamp) => {
      currTimeStamp.date = newValue;
      return currTimeStamp;
    });
  }
  function handleTime(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const newValue = event.currentTarget.value
    setTimeStamp((currTimeStamp) => {
      currTimeStamp.time = newValue;
      return currTimeStamp;
    });
  }
  function confirmDateAndTime(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (timeStamp.date.length > 0 && timeStamp.time.length > 0) {
      const dayObj = convertDateToDay(timeStamp.date);
      setTimeStamp((currTimeStamp) => {
        currTimeStamp.day = dayObj;
        return currTimeStamp;
      });
      setTimeStampBtn(true);
      setFeedbackMsg('Time and date added');
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    } else if (timeStamp.date === '' && timeStamp.time === '') {
      setAlerts(true);
      setFeedbackMsg('Please insert date and time!');
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    } else if (timeStamp.date === '') {
      setAlerts(true);
      setFeedbackMsg('Please add date!');
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    } else if (timeStamp.time === '') {
      setAlerts(true);
      setFeedbackMsg('Please add time!');
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    }
  }

  return (
    <>
      {alerts ? (
        <p className="toast toast-end toast-middle max-w-fit alert alert-info">
          {feedbackMsg}
        </p>
      ) : null}
      {errStatus ? (
        <p className="toast toast-end toast-middle max-w-fit alert alert-error">
          {feedbackMsg}
        </p>
      ) : null}
      <section>
        <form onSubmit={handleSubmit}>
          <label className="label label-text">Meeting date and time</label>
          <input
            required
            type="date"
            onChange={handleDate}
            className="input input-bordered w-52 mb-5"
          ></input>

          <label className="label-text"> </label>
          <input
            required
            type="time"
            onChange={handleTime}
            className="input input-bordered"
          ></input>
          <button onClick={confirmDateAndTime} className="btn btn-primary mx-5">
            Confirm
          </button>

          <label className="label label-text">Your starting point </label>
          <input
            type="text"
            id="host-location"
            placeholder="Your address"
            onChange={handleUserLocation}
            value={userLocation}
            required
            className="input input-bordered w-full max-w-xs mb-5"
          />

          <button
            onClick={confirmUserPosition}
            className="btn btn-primary mx-5 input-primary"
          >
            Confirm
          </button>
          <label className="label label-text">Guest starting point</label>
          <input
            type="text"
            id="second-location"
            placeholder="Friend's address"
            onChange={handleFriendLocation}
            value={friendLocation}
            required
            className="input input-bordered w-full max-w-xs mb-5"
          />

          <button
            onClick={confirmFriendPosition}
            className="btn btn-primary mx-5"
          >
            Confirm
          </button>
          <label htmlFor="Transportation" className="label label-text">
            Transport type
          </label>

          <label htmlFor="Transportation">
            <select
              id="Transportation"
              name="Transportation"
              value={value}
              onChange={handleSortChange}
              className="select select-bordered w-full max-w-xs mb-5"
            >
              <option value={'walking'}>Walking</option>
              <option value={'driving'}>Driving</option>
            </select>
          </label>
        
        {userLocationBtn &&
        friendLocationBtn &&
        timeStampBtn &&
        userLocation.length !== 0 &&
        friendLocation.length !== 0 &&
        timeStamp.date.length > 0 &&
        timeStamp.time.length > 0 ? (
          <>
            <button
              type="submit"
              disabled={false}
              className="btn btn-primary mt-5"
            >
              Find the middle
            </button>
          </>
        ) : (
          <>
          <button
            className="btn btn-disabled"
            role="button"
            aria-disabled="true"
          >
            Confirm starting points
          </button>
          </>
        )}
        </form>
      </section>
    </>
  );
};
