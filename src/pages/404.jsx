import Lottie from "lottie-react";
import animationData from "../../public/404.json";
export default function pageNotFound() {
  return (
    <>
      <main className="h-5/6 flex justify-center items-center">
        <Lottie animationData={animationData} />
      </main>
    </>
  );
}
