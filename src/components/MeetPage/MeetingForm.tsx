import React, { useState } from 'react';
import { convertToNumberCoord } from '../../utils/utils';

export const MeetingForm: React.FC = ({setUserCoord, setFriendCoord, setIsSubmitted, setTransportation})=>{
    const [value, setValue] = useState("Transportation...")
    const [userLocation, setUserLocation] = useState<string>('')
    const [friendLocation, setFriendLocation] = useState<string>('')
  
    function handleUserLocation (event : any) : void{
        setUserLocation(event.target.value)        
    }

    function handleFriendLocation (event : any) : void {
        setFriendLocation(event.target.value)
    }
    function confirmUserPosition (event : any) : void {
        event.preventDefault()
        setUserCoord(convertToNumberCoord(userLocation))
    }
    function confirmFriendPosition (event : any) : void {
        event.preventDefault()
        setFriendCoord(convertToNumberCoord(friendLocation))
    }
  function handleSubmit (event : any) :void {
        event.preventDefault()
        setUserLocation('')
        setFriendLocation('')
        setIsSubmitted(true)

    }
    function handleSortChange (event: any) {
        setValue(event.target.value)
        setTransportation(event.target.value)
    }
return (
    <section>
        <form onSubmit={handleSubmit}>
            <label>Your Location<input type = 'text' id="host-location" placeholder="34.543, -1.354" onChange={handleUserLocation} value={userLocation} required/></label><button onClick={confirmUserPosition}>Confirm my place</button>
            <label>Friend's Location<input type ='text' id='second-location' placeholder='12.534, -3.5344' onChange={handleFriendLocation} value={friendLocation} required/></label><button onClick={confirmFriendPosition}>Confirm friend's place</button>
            <label htmlFor="Transportation">
                <div>
                    <select id="Transportation" name="Transportation" value={value} onChange={handleSortChange}>
                   
                    <option value={'walking'}>Walking</option>
                    <option value={'driving'}>Driving</option>
                    </select>
                </div>
            </label>
            <p>Does the places look correct? If so, click the button to find a meeting spot!</p>
            <button>Find Meeting Spot!</button>
        </form>
    </section>
)
}

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
