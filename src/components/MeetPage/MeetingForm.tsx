import { useState } from "react"

const MeetingForm = ({setLocations})=>{

    const [userLocation, setUserLocation] = useState<string>('')
    const [friendLocation, setFriendLocation] = useState<string>('')
  
    function handleUserLocation (event : any) : void{
        setUserLocation(event.target.value)
         
    }

    function handleFriendLocation (event : any) : void {
        setFriendLocation(event.target.value)
    }
    
    function handleSubmit (event : any) :void {
        event.preventDefault()
        setLocations(userLocation)
        setUserLocation('')
        setFriendLocation('')
    }
    
return (
    <section>
        <form onSubmit={handleSubmit}>
            <label>Your Location<input type = 'text' id="host-location" placeholder="34.543, -1.354" onChange={handleUserLocation} value={userLocation} required/></label><button>That's my spot!</button>
            <label>Friend's Location<input type ='text' id='second-location' placeholder='12.534, -3.5344' onChange={handleFriendLocation} value={friendLocation} required/></label><button>That's my friend!</button>
            <p>Does the places look correct? If so, click the button to find a meeting spot!</p>
            <button>Find Meeting Spot!</button>
        </form>
    </section>
)
}

export default MeetingForm