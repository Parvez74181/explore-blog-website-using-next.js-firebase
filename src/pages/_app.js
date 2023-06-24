import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingBar from "react-top-loading-bar";
import Loader from "../../components/Loader";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    AOS.init(); // initialize the AOS Library

    // Listen to route changes
    const handleRouteChangeStart = () => {
      setProgress(50); // Set progress 50 when the route changes to show loading is started
      setLoading(true); // Set loading to true when the route changes
    };

    const handleRouteChangeComplete = () => {
      setProgress(100); // Set progress 10 when the route changes to show loading is completed
      setLoading(false); // Set loading to false when the route changes complete
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's set localStorage
      if (permission === "granted")
        localStorage.setItem("permission", "granted");
    });

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Navbar progress={setProgress} />
      {loading && ( // Render loading animation if loading is true
        <Loader />
      )}
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {!loading && (
        <>
          <Component {...pageProps} />
          <Analytics />
        </>
      )}
      {!loading && <Footer />}
    </>
  );
}
