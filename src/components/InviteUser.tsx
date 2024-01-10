import { InviteConfirmation } from "./InviteUser/InviteConfirmation"
import { InviteForm } from "./InviteUser/InviteForm"
import { ItineraryView } from "./InviteUser/ItineraryView"
import { useContext, useState } from "react";

export const InviteUser = ({chosenMeeting, transportation, userCoord, friendCoord, timeStamp}) => {
    const [hasClicked, setHasClicked] = useState(false)
    const [foundUser, setFoundUser] = useState<Users[]>([]);
    if (hasClicked === true){
        return <InviteConfirmation chosenMeeting={chosenMeeting} timeStamp={timeStamp} foundUser={foundUser} transportation={transportation}/>
      }
    return <div>
        <ItineraryView chosenMeeting={chosenMeeting} transportation={transportation} timeStamp={timeStamp}/>
        <InviteForm chosenMeeting={chosenMeeting} transportation={transportation} userCoord={userCoord} friendCoord={friendCoord} timeStamp={timeStamp} setHasClicked={setHasClicked} foundUser={foundUser} setFoundUser={setFoundUser}/>
    </div>
}