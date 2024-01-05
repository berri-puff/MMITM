import React, { useState } from 'react';
import { convertToNumberCoord } from '../../utils/utils';

export const MeetingForm: React.FC = ({
  setUserCoord,
  setFriendCoord,
  setIsSubmitted,
}) => {
  const [userLocation, setUserLocation] = useState<string>('');
  const [friendLocation, setFriendLocation] = useState<string>('');

  function handleUserLocation(event: any): void {
    setUserLocation(event.target.value);
  }

  function handleFriendLocation(event: any): void {
    setFriendLocation(event.target.value);
  }
  function confirmUserPosition(event: any): void {
    event.preventDefault();
    setUserCoord(convertToNumberCoord(userLocation));
  }
  function confirmFriendPosition(event: any): void {
    event.preventDefault();
    setFriendCoord(convertToNumberCoord(friendLocation));
  }
  function handleSubmit(event: any): void {
    event.preventDefault();
    setUserLocation('');
    setFriendLocation('');
    setIsSubmitted(true);
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="grid">
        <div>
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
          <button onClick={confirmUserPosition} className="btn btn-primary">
            Confirm my place
          </button>{' '}
        </div>

        <div>
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

          <button onClick={confirmFriendPosition} className="btn btn-primary">
            Confirm friend's place
          </button>
        </div>
        <p>
          Does the places look correct? If so, click the button to find a
          meeting spot!
        </p>
        <button className="btn btn-secondary">Find Meeting Spot!</button>
      </form>
    </section>
  );
};
