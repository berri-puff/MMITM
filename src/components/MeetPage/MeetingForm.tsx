import { useState } from "react";
import { convertDateToDay } from "../../utils/utils";
import { addressToCoord } from "../../utils/api-ma";
import { Coordinates } from "../../types";
import { MdErrorOutline } from "react-icons/md";
import { Error } from "../Error";

export const MeetingForm = ({
  setUserCoord,
  setFriendCoord,
  setIsSubmitted,
  setTransportation,
  setTimeStamp,
  timeStamp,
}) => {
  const [value, setValue] = useState("Transportation...");
  const [userLocation, setUserLocation] = useState<string[]>("");
  const [friendLocation, setFriendLocation] = useState<string[]>("");
  const [userLocationBtn, setUserLocationBtn] = useState<boolean>(false);
  const [friendLocationBtn, setFriendLocationBtn] = useState<boolean>(false);
  const [timeStampBtn, setTimeStampBtn] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");
  const [errStatus, setErrStatus] = useState<boolean>(false);
 

  function handleUserLocation(event: any): void {
    setUserLocation(event.target.value);
  }

  function handleFriendLocation(event: any): void {
    setFriendLocation(event.target.value);
  }
  function confirmUserPosition(event: any): void {
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
        }
        else if (err){
          setErrStatus(true)
          setFeedbackMsg('Not a valid address')
          setTimeout(() => {
            setErrStatus(false);
          }, 3000);
        }
         
      });
   
  }

  function confirmFriendPosition(event: any): void {
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
       }
       else if (err){
         setErrStatus(true)
         setFeedbackMsg('Not a valid address')
         setTimeout(() => {
           setErrStatus(false);
         }, 3000);
       }
      });
    setFriendLocationBtn(true);
  }
  function handleSubmit(event: any): void {
    event.preventDefault();
    setUserLocation("");
    setFriendLocation("");
    setIsSubmitted(true);
  }
  function handleSortChange(event: any) {
    setValue(event.target.value);
    setTransportation(event.target.value);
  }

  function handleDate(event: any) {
    event.preventDefault();
    setTimeStamp((currTimeStamp) => {
      currTimeStamp.date = event.target.value;
      return currTimeStamp;
    });
  }
  function handleTime(event: any) {
    event.preventDefault();
    setTimeStamp((currTimeStamp) => {
      currTimeStamp.time = event.target.value;
      return currTimeStamp;
    });
  }
  function confirmDateAndTime(event: any) {
    event.preventDefault();
    if (timeStamp.date.length > 0 && timeStamp.time.length > 0) {
      const dayObj = convertDateToDay(timeStamp.date);
      setTimeStamp((currTimeStamp) => {
        currTimeStamp.day = dayObj;
        return currTimeStamp;
      });
      setTimeStampBtn(true);
      setFeedbackMsg("Time and Date added!");
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    } else if (timeStamp.date === "" && timeStamp.time === "") {
      setAlerts(true);
      setFeedbackMsg("Please insert date and time!");
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    } else if (timeStamp.date === "") {
      setAlerts(true);
      setFeedbackMsg("Please add date!");
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    } else if (timeStamp.time === "") {
      setAlerts(true);
      setFeedbackMsg("Please add time!");
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 3000);
    }
  }

  return (
    <>
      {alerts ? (
        <p className="toast toast-top toast-center max-w-fit alert alert-info">
          {feedbackMsg}
        </p>
      ) : null}
      {errStatus ? (
        <p className="toast toast-top toast-center max-w-fit alert alert-error">
          {feedbackMsg}
        </p>
      ) : null}
      <section>
        <form onSubmit={handleSubmit}>
          <label>Date : </label>
          <input
            required
            type="date"
            onChange={handleDate}
            className="mr-3"
          ></input>

          <label>Time : </label>
          <input required type="time" onChange={handleTime}></input>
          <button onClick={confirmDateAndTime} className="btn btn-primary mx-5">
            Confirm Date and Time
          </button>

          <label className="label">Insert your location: </label>
          <input
            type="text"
            id="host-location"
            placeholder="Your address"
            onChange={handleUserLocation}
            value={userLocation}
            required
            className="input input-bordered w-full max-w-xs mb-2 focus:input-primary"
          />

          <button
            onClick={confirmUserPosition}
            className="btn btn-primary mx-5 input-primary"
          >
            Confirm my place
          </button>
          <label className="label">Insert friend's location: </label>
          <input
            type="text"
            id="second-location"
            placeholder="Friend's address"
            onChange={handleFriendLocation}
            value={friendLocation}
            required
            className="input input-bordered w-full max-w-xs mb-2 focus:input-primary"
          />

          <button
            onClick={confirmFriendPosition}
            className="btn btn-primary mx-5"
          >
            Confirm friend's place
          </button>
          <label htmlFor="Transportation" className="label">
            Choose transportation:
          </label>

          <label htmlFor="Transportation">
            <div className="ml-10">
              <select
                id="Transportation"
                name="Transportation"
                value={value}
                onChange={handleSortChange}
              >
                <option value={"walking"}>Walking</option>
                <option value={"driving"}>Driving</option>
              </select>
            </div>
          </label>
        </form>
        {userLocationBtn &&
        friendLocationBtn &&
        timeStampBtn &&
        userLocation.length !== 0 &&
        friendLocation.length !== 0 &&
        timeStamp.date.length > 0 &&
        timeStamp.time.length > 0 ? (
          <>
            <p className="py-5">
              Click the button below to find meeting spots!
            </p>
            <button
              onClick={handleSubmit}
              disabled={false}
              className="btn btn-primary mx-5"
            >
              Find Meeting Spot!
            </button>
          </>
        ) : (
          <p className="alert alert-error max-w-fit mt-5 font-bold">
            Please confirm both locations!
          </p>
        )}
      </section>
    </>
  );
};
