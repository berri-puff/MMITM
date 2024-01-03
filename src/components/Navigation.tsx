import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          {' '}
          <Link to={`/`}>
            <a className="btn btn-ghost text-xl">MMITM</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={`/setup_meeting`}>
                <a>Set Up Meeting</a>
              </Link>
            </li>
            <li>
              <Link to={`/setup_meeting/suggestions`}>
                <a>Suggestions</a>
              </Link>
            </li>
            <li>
              <Link to={`/setup_meeting/invite`}>
                <a>Invite</a>
              </Link>
            </li>
            <li>
              <Link to={`/setup_meeting/user1/invitations`}>
                <a>Invitations</a>
              </Link>
            </li>
            <li>
              <Link to={`/log_in`}>
                <a>Log In</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
