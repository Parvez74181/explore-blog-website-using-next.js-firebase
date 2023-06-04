import { useEffect, useState } from "react";
import "@/styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar progress={setProgress} />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
