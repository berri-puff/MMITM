import { InviteForm } from "./InviteUser/InviteForm"
import { ItineraryView } from "./InviteUser/ItineraryView"

export const InviteUser = ({chosenMeeting, transportation, userCoord, friendCoord, timeStamp}) => {
    return <div>
        <ItineraryView chosenMeeting={chosenMeeting} transportation={transportation} timeStamp={timeStamp}/>
        <InviteForm chosenMeeting={chosenMeeting} transportation={transportation} userCoord={userCoord} friendCoord={friendCoord} timeStamp={timeStamp}/>
    </div>
}