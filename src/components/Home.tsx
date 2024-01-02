import InviteForm from "./InviteUser/InviteUserForm";
import ItineraryView from "./InviteUser/ItineraryView";
import MeetingForm from "./MeetPage/MeetingForm";
import MeetingMap from "./MeetPage/MeetingMap";
import SuggestLists from "./Suggestions/SuggestList";
import SuggestMap from "./Suggestions/SuggestMap";

const Home = () => {
  return (
    <>
     <h2>Home</h2>
     <p>
      meeting form page
     </p>
     <MeetingForm/>
     <MeetingMap/>
     <p>
      suggested places page
     </p>
     <SuggestLists/>
     <SuggestMap/>
     <p>
      Inviting 2nd user page with summary
     </p>
     <ItineraryView/>
     <InviteForm/>
    </>
  )

};

export default Home;
