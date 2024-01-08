import { Link } from 'react-router-dom';
import imageToAdd from '../assets/MMITM.jpg';
export const Home = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Meet Me in the Middle</h1>
            <img className="headerIMG" src={imageToAdd}></img>
            <p className="py-6">
              Find the best place for you and friend to meet up! 
            </p>
            <Link to={`/setup_meeting`}>
              {' '}
              <button className="btn btn-primary">Set Up a Meeting</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
