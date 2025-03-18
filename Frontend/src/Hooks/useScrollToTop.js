import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {

    //Getting Location
    const { pathname } = useLocation();

    //UseEffect to Scroll top everytime we click Link tag except in Home Page
    useEffect(() => {
        if (pathname !== "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname]);
};

export default useScrollToTop;
