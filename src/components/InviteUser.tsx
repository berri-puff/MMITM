import { InviteConfirmation } from './InviteUser/InviteConfirmation';
import { InviteForm } from './InviteUser/InviteForm';
import { ItineraryView } from './InviteUser/ItineraryView';
import { useState } from 'react';
import { Users, InviteUserProps } from '../types';

export const InviteUser: React.FC<InviteUserProps> = ({
  chosenMeeting,
  transportation,
  userCoord,
  friendCoord,
  timeStamp,
}) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [foundUser, setFoundUser] = useState<Users[] | null>(null);
  if (hasClicked === true) {
    return (
      <InviteConfirmation
        chosenMeeting={chosenMeeting}
        timeStamp={timeStamp}
        foundUser={foundUser}
        transportation={transportation}
      />
    );
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="max-w-1xl p-5">
            <ItineraryView
              chosenMeeting={chosenMeeting}
              transportation={transportation}
              timeStamp={timeStamp}
            />
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100 p-10">
            <h3 className="text-5xl font-bold">Invite your friend</h3>
            <p className="py-6">
              Who's the lucky duck? Find your friend using their name or
              username and extend an invitation in just a few clicks.
            </p>
            <InviteForm
              chosenMeeting={chosenMeeting}
              transportation={transportation}
              userCoord={userCoord}
              friendCoord={friendCoord}
              timeStamp={timeStamp}
              setHasClicked={setHasClicked}
              foundUser={foundUser}
              setFoundUser={setFoundUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};
