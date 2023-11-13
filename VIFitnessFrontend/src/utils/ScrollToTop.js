import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  window.history.scrollRestoration = "manual";
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
};

export default ScrollToTop;
