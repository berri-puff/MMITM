// import { useState } from "react"
import MeetingForm from "./MeetPage/MeetingForm"
import {MeetingMap} from "./MeetPage/MeetingMap"


const MeetingPage = () =>{
    // const [locations, setLocations] = useState<string>('')

    return (
        <>
        <MeetingForm />
        <MeetingMap />
        </>
    )
}

export default MeetingPage