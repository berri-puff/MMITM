import { HiMap } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-secondary text-secondary-content mt-20">
      <aside>
        <p className="text-4xl">
          {' '}
          <HiMap />
        </p>
        <p className="font-bold">
          Meet Me In The Middle <br />
        </p>
        <p>© 2024</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaGithub />
          </a>
        </div>
      </nav>
    </footer>
  );
};
