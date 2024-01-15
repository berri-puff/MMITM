import { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const LinkToTop: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    // Debounce function can be added here
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  return (
    <>
      {showTopBtn && (
        <Link
          to="top"
          onClick={() => scroll.scrollToTop()}
          className="fixed right-5 bottom-5 cursor-pointer"
          aria-label="Back to top"
        >
          <button className="btn">Back to top</button>
        </Link>
      )}
    </>
  );
};

export default LinkToTop;
