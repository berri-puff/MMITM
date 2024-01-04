import React, { useState } from "react"
import {MeetingForm} from "./MeetPage/MeetingForm"
import {MeetingMap} from "./MeetPage/MeetingMap"
import { Suggestions } from "./Suggestions"



export const SetUpMeeting : React.FC = () => {
    const [userCoord, setUserCoord] = useState<string[]>([])
    const [friendCoord, setFriendCoord] = useState<string[]>([])
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    if(isSubmitted) {
        return <Suggestions/>
    } else {
        return <div>
        <h3>Locations:</h3>
        <MeetingMap userCoord={userCoord} friendCoord={friendCoord} />
        <MeetingForm setUserCoord={setUserCoord} setFriendCoord={setFriendCoord} setIsSubmitted={setIsSubmitted}/>
        
    </div>
    }
    
}