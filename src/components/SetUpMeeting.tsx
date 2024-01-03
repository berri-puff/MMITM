import { useState } from "react"
import {MeetingForm} from "./MeetPage/MeetingForm"
import {MeetingMap} from "./MeetPage/MeetingMap"



export const SetUpMeeting = () => {
    const [userCoord, setUserCoord] = useState<string[]>([])
    const [friendCoord, setFriendCoord] = useState<string[]>([])

    return <div>
        <h3>Locations:</h3>
        <MeetingMap userCoord={userCoord} friendCoord={friendCoord} />
        <MeetingForm setUserCoord={setUserCoord} setFriendCoord={setFriendCoord}/>
    </div>
}