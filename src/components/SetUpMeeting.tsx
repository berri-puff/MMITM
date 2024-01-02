import { useState } from "react"
import MeetingForm from "./MeetPage/MeetingForm"
import MeetingMap from "./MeetPage/MeetingMap"

export const SetUpMeeting = () => {
    const [locations, setLocations] = useState<string[]>([])
console.log(locations)
    return <div>
        <h3>Locations:</h3>
        <MeetingMap locations={locations} />
        <MeetingForm setLocations={setLocations}/>
    </div>
}