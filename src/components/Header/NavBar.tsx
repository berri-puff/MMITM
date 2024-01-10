import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const NavBar = () => {
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(undefined);
    navigate('/');
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={`/`} className="btn btn-ghost text-xl">
          MMITM
        </Link>
        <a></a>
      </div>
      {user ? (
        <>
          <h3>{user.username}</h3>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={`${user.username} avatar image`} src={user.imgUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  className="justify-between"
                  to={`/invitations/${user.username}`}
                >
                  Invitations
                </Link>
              </li>
              <li></li>
              <li>
                <a
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {' '}
              <Link to={`/log_in`}>Log in</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
