import { useState } from 'react';
import { convertToNumberCoord } from '../../utils/utils';

export const MeetingForm = ({
  setUserCoord,
  setFriendCoord,
  setIsSubmitted,
  setTransportation,
}) => {
  const [value, setValue] = useState('Transportation...');
  const [userLocation, setUserLocation] = useState<string>('');
  const [friendLocation, setFriendLocation] = useState<string>('');
  const [userLocationBtn, setUserLocationBtn] = useState<boolean>(false)
  const [friendLocationBtn, setFriendLocationBtn] = useState<boolean>(false)

  function handleUserLocation(event: any): void {
    setUserLocation(event.target.value);
  }

  function handleFriendLocation(event: any): void {
    setFriendLocation(event.target.value);
  }
  function confirmUserPosition(event: any): void {
    event.preventDefault();
    setUserCoord(convertToNumberCoord(userLocation));
    setUserLocationBtn(true)
  }
  function confirmFriendPosition(event: any): void {
    event.preventDefault();
    setFriendCoord(convertToNumberCoord(friendLocation));
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

  
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label className="label">Your Location </label>
        <input
          type="text"
          id="host-location"
          placeholder="34.543, -1.354"
          onChange={handleUserLocation}
          value={userLocation}
          required
          className="input input-bordered w-full max-w-xs"
        />

        <button onClick={confirmUserPosition} className="btn btn-primary mx-5">
          Confirm my place
        </button>
        <label className="label">Friend's Location </label>
        <input
          type="text"
          id="second-location"
          placeholder="12.534, -3.5344"
          onChange={handleFriendLocation}
          value={friendLocation}
          required
          className="input input-bordered w-full max-w-xs"
        />

        <button
          onClick={confirmFriendPosition}
          className="btn btn-primary mx-5"
        >
          Confirm friend's place
        </button>
        <label htmlFor="Transportation" className="label">
          Choose transportation
        </label>

        <label htmlFor="Transportation">
          <div>
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
      {(userLocationBtn && friendLocationBtn) && (userLocation.length !== 0 && friendLocation.length !== 0) ? <>
        <p className="py-5">
          Does the places look correct? If so, click the button to find a
          meeting spot!
        </p>
        <button onClick={handleSubmit} disabled={false} className="btn btn-primary mx-5">Find Meeting Spot!</button> 
       </> : <p>Please confirm both locations!</p>} 
    </section>
  );
};
