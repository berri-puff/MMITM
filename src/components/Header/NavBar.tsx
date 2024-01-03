import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";

export const NavBar =()=>{
    const { user }:any = useContext(UserContext)
return <div>
    
    <nav>
        <ul>
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`/log_in`}>Log In</Link></li>
            <li><Link to={`/setup_meeting`}>Set Up Meeting</Link></li>
            <li><Link to={`/setup_meeting/suggestions`}>Suggestions</Link></li>
            <li><Link to={`/setup_meeting/invite`}>Invite user</Link></li>
            <li><Link to={`/invitations/user1`}>Invitations</Link></li>
        </ul>
    </nav>
    <p>{user} is logged in</p>
</div>
    
}

