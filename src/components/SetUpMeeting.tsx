import React, { useState } from "react"
import {MeetingForm} from "./MeetPage/MeetingForm"
import {MeetingMap} from "./MeetPage/MeetingMap"
import { Suggestions } from "./Suggestions"



export const SetUpMeeting : React.FC = () => {
    const [userCoord, setUserCoord] = useState<string[]>([])
    const [friendCoord, setFriendCoord] = useState<string[]>([])
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [transportation, setTransportation] = useState<string>('walking')
    
 
    if(isSubmitted) {
        return <Suggestions userCoord={userCoord} friendCoord={friendCoord} transportation={transportation}/>
    } else {
        return <div>
        <h3>Locations:</h3>
        <MeetingMap userCoord={userCoord} friendCoord={friendCoord} />
        <MeetingForm setUserCoord={setUserCoord} setFriendCoord={setFriendCoord} setIsSubmitted={setIsSubmitted} setTransportation={setTransportation}/>
    </div>
    }
    
}