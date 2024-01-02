import { useState } from "react"
import MeetingForm from "./MeetPage/MeetingForm"
import MeetingMap from "./MeetPage/MeetingMap"


const MeetingPage = () =>{
    const [locations, setLocations] = useState()

    return (
        <>
        <MeetingForm setLocations={setLocations}/>
        <MeetingMap locations={locations} />
        </>
    )
}

export default MeetingPage