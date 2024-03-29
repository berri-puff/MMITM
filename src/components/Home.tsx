import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export const Home = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  return (
    <>
      <div className="container mx-auto mt-5">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img src="mmitm-final.png" className="max-w-80" />
            <div>
              <h1 className="text-5xl font-bold">Meet Me in the Middle</h1>
              <p className="py-6 max-w-lg">
                Effortlessly finds a central meeting point between two
                locations, suggesting convenient venues based on travel times
                for hassle-free meetups.
              </p>
              {user ? (
                <Link to={`/setup_meeting`}>
                  <button className="btn btn-primary">Set Up a Meeting</button>
                </Link>
              ) : (
                <Link to={`/log-in`}>
                  <button className="btn btn-primary">Log in</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
