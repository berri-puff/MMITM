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
        <label>
          Your Location
          <input
            type="text"
            id="host-location"
            placeholder="34.543, -1.354"
            onChange={handleUserLocation}
            value={userLocation}
            required
          />
        </label>
        <button onClick={confirmUserPosition} disabled={userLocationBtn}>Confirm my place</button>
        <label>
          Friend's Location
          <input
            type="text"
            id="second-location"
            placeholder="12.534, -3.5344"
            onChange={handleFriendLocation}
            value={friendLocation}
            required
          />
        </label>
        <button onClick={confirmFriendPosition} disabled={friendLocationBtn}>Confirm friend's place</button>
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
      {(userLocationBtn && friendLocationBtn) && (userLocation.length !== 0 && friendLocation.length !== 0)? <>
        <p>
          Does the places look correct? If so, click the button to find a
          meeting spot!
        </p>
        <button disabled={false}>Find Meeting Spot!</button> 
       </>: <p>Please confirm both locations!</p>} 
    </section>
  );
};
