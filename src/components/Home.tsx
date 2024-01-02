import InviteForm from "./InviteUser/InviteUserForm";
import ItineraryView from "./InviteUser/ItineraryView";
import InvitesList from "./Invites/InvitesList";
import Login from "./LoginPage";
import SuggestLists from "./Suggestions/SuggestList";
import SuggestMap from "./Suggestions/SuggestMap";

const Home = () => {
  return (
    <>
     <h2>Home</h2>
     <p>
      suggested places page
       <SuggestLists/>
     <SuggestMap/>
     </p>
    
     <p>
      Inviting 2nd user page with summary
       <ItineraryView/>
     <InviteForm/>
     </p>
    
     <p>
      Sees all invites page
        <InvitesList/>
     </p>
   
     <p>
      user login page 
      <Login/>
     </p>
    </>
  )

};

export default Home;
