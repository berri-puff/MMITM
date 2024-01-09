import { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const LinkToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showTopBtn && window.pageYOffset > 500) {
        setShowTopBtn(true);
      } else if (showTopBtn && window.pageYOffset <= 500) {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    return () => {
      // Cleanup the listener
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showTopBtn]);

  return (
    <div>
      {/* Your content here */}

      {/* Back to Top Link */}
      {showTopBtn && (
        <Link
          to="top"
          onClick={() => scroll.scrollToTop()}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          className="cursor-pointer"
        >
          <button className="btn">Back to Top</button>
        </Link>
      )}
    </div>
  );
};

export default LinkToTop;
