import { InviteForm } from "./InviteUser/InviteForm"
import { ItineraryView } from "./InviteUser/ItineraryView"

export const InviteUser = ({chosenMeeting, transportation, userCoord, friendCoord}) => {
    return <div>
        <ItineraryView chosenMeeting={chosenMeeting} transportation={transportation}/>
        <InviteForm chosenMeeting={chosenMeeting} transportation={transportation} userCoord={userCoord} friendCoord={friendCoord}/>
    </div>
}