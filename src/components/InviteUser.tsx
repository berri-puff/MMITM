import { InviteForm } from './InviteUser/InviteForm';
import { ItineraryView } from './InviteUser/ItineraryView';

export const InviteUser = ({
  chosenMeeting,
  transportation,
  userCoord,
  friendCoord,
  timeStamp,
}) => {
  return (
    <div className="container mx-auto mt-5">
      <div className="mt-5 mb-10 w-2/3 mx-auto bg-base-300">
        <InviteForm
          chosenMeeting={chosenMeeting}
          transportation={transportation}
          userCoord={userCoord}
          friendCoord={friendCoord}
          timeStamp={timeStamp}
        />
        <ItineraryView
          chosenMeeting={chosenMeeting}
          transportation={transportation}
          timeStamp={timeStamp}
        />
      </div>
    </div>
  );
};
