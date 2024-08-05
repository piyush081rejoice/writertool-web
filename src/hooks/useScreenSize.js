import { useState, useEffect } from "react";

// Custom Hook
const useUserAndDeviceInfo = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== "undefined" ? window.innerWidth < 575 : false);

  useEffect(() => {
    // Update screen size on resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 575);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallScreen;
};

export default useUserAndDeviceInfo;
