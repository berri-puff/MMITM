import { useState } from 'react';
import { addressToCoord } from '../../utils/api-ma';
import { Coordinates } from '../../types';



export const MeetingForm = ({
  setUserCoord,
  setFriendCoord,
  setIsSubmitted,
  setTransportation,
  setTimeStamp,
  timeStamp
}) => {
  const [value, setValue] = useState('Transportation...');
  const [userLocation, setUserLocation] = useState<string[]>('');
  const [friendLocation, setFriendLocation] = useState<string[]>('');
  const [userLocationBtn, setUserLocationBtn] = useState<boolean>(false)
  const [friendLocationBtn, setFriendLocationBtn] = useState<boolean>(false)
  const [timeStampBtn, setTimeStampBtn] = useState<boolean>(false)
  const [alerts, setAlerts] = useState<boolean>(false)
  function handleUserLocation(event: any): void {
    setUserLocation(event.target.value);
  }

  function handleFriendLocation(event: any): void {
    setFriendLocation(event.target.value);
  }
  function confirmUserPosition(event: any): void {
    event.preventDefault();
addressToCoord(userLocation).then((result : Coordinates) =>{
setUserCoord(result)
})
    setUserLocationBtn(true)
  }
  function confirmFriendPosition(event: any): void {
    event.preventDefault();
    addressToCoord(friendLocation).then((result : Coordinates) =>{
     setFriendCoord(result)
    })
    setFriendLocationBtn(true)
  }
  function handleSubmit(event: any): void {
    event.preventDefault();
    setUserLocation('');
    setFriendLocation('');
    setIsSubmitted(true);
  }
  function handleSortChange(event: any) {
    setValue(event.target.value);
    setTransportation(event.target.value);
  }
 
  function handleDate (event: any) {
    event.preventDefault()
    setTimeStamp((currTimeStamp) => {
      currTimeStamp.date = event.target.value
      return currTimeStamp
    })
  
  
    
  }
  function handleTime (event: any) {
    event.preventDefault()
    setTimeStamp((currTimeStamp) => {
      
      currTimeStamp.time = event.target.value
      return currTimeStamp
    })
     
   if(timeStamp.date.length> 0 && timeStamp.time.length > 0){
      setTimeStampBtn(true)
      setAlerts(true)
      setTimeout(() => {
        setAlerts(false)
      }, 3000);
    }
  }

  
  return (
    <>
       {alerts ? <p className="toast toast-top toast-center max-w-fit alert alert-success">
 Time and Date added!
          </p> : null}
    <section>
      <form onSubmit={handleSubmit}>
        <label>Date : </label>
        <input required type="date" onBlur={handleDate} className='mr-3'></input>
      
        <label>Time : </label>
        <input required type="time" onBlur={handleTime} ></input>
        {/* <button onClick={confirmDateAndTime} className="btn btn-primary mx-5">
          Confirm Date and Time
        </button> */}
     
        <label className="label">Your Location: </label>
        <input
          type="text"
          id="host-location"
          placeholder="Manchester"
          onChange={handleUserLocation}
          value={userLocation}
          required
          className="input input-bordered w-full max-w-xs mb-2"
        />

        <button onClick={confirmUserPosition} className="btn btn-primary mx-5">
          Confirm my place 
        </button>
        <label className="label">Friend's Location: </label>
        <input
          type="text"
          id="second-location"
          placeholder="Leeds"
          onChange={handleFriendLocation}
          value={friendLocation}
          required
          className="input input-bordered w-full max-w-xs mb-2"
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
          <div className='ml-10'>
            <select
              id="Transportation"
              name="Transportation"
              value={value}
              onChange={handleSortChange}
            >
              <option value={'walking'}>Walking</option>
              <option value={'driving'}>Driving</option>
            </select>
          </div>
        </label>
        
      </form>
      {(userLocationBtn && friendLocationBtn && timeStampBtn ) && (userLocation.length !== 0 && friendLocation.length !== 0 ) && (timeStamp.date.length > 0 && timeStamp.time.length > 0) ? <>
        <p className="py-5">
         Click the button below to find meeting spots!
        </p>
        <button onClick={handleSubmit} disabled={false} className="btn btn-primary mx-5">Find Meeting Spot!</button> 
       </> : <p className="alert alert-error max-w-fit mt-5 font-bold">Please confirm both locations!</p>} 
    </section>
  </>
  );
};
