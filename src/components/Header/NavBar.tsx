import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const NavBar = () => {
  const { user }: any = useContext(UserContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
      <Link to={`/`} className="btn btn-ghost text-xl">MMITM</Link>
        <a ></a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            
          </li>
          <li>
            <Link to={`/invitations/user1`}>Invitations</Link>
          </li>
          <li>{/* <Link to={`/playground`}>AK</Link> */}</li>
          <li>
            <Link to={`/log_in`}>{user} is logged in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
