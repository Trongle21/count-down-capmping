import { useState } from "react";
import { Heart } from "./components/Heart.jsx";
import CountdownLanding from "./pages/CountdownLanding.jsx";

export default function App() {
  const [showHeart, setShowHeart] = useState(false);

  return (
    <>
      {showHeart ? (
        <Heart />
      ) : (
        <CountdownLanding onComplete={() => setShowHeart(true)} />
      )}
    </>
  );
}
