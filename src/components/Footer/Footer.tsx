import { FaGithub } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-secondary text-secondary-content mt-20">
      <div className="container mx-auto">
        <aside className="flex min-w-full justify-between">
          <p className="font-bold">Meet Me In The Middle © 2024</p>
          <p>
            <a href="https://github.com/berri-puff/MMITM">
              Check out the GitHub <FaGithub className="inline" />
            </a>
          </p>
        </aside>
      </div>
    </footer>
  );
};
