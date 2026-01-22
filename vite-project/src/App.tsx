import { useState } from "react";
import confetti from "canvas-confetti";
import { useRef } from "react";

import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";
import img5 from "./assets/5.png";
import img6 from "./assets/6.png";
import img7 from "./assets/7.png";

function App() {
  const [yesScale, setYesScale] = useState(1);
  const [noClicks, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noGone, setNoGone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const images = [img1, img2, img3, img4, img5, img6, img7];
  const phrases = [
    "No 😢",
    "Are you sure? 🥹",
    "What if I asked really nicely with a flower? ",
    "How bout with a bunch of flowers? 💐",
    "PLEASE MY CUTIE PATOOTIEEE 🙏🙏",
    "I'll top it up with kissiesss 💋😚",
  ];

  const handleRetry = () => {
    setYesScale(1);
    setNoClicks(0);
    setNoPosition({ x: 0, y: 0 });
    setNoGone(false);
  };

  const handleNoClick = () => {
    if (noClicks >= 5) {
      // 7th click → NO runs away forever
      setNoGone(true);
      return;
    }

    setNoClicks((prev) => prev + 1);
    // Grow Yes button safely
    setYesScale((prev) => Math.min(prev + 0.5, 5));

    if (containerRef.current && noButtonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();

      const maxX = containerRect.width - buttonRect.width;
      const maxY = containerRect.height - buttonRect.height;

      setNoPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      });
    }
  };

  const handleYesClick = (): void => {
    setNoClicks(6);
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 },
    });

    // optional: keep it going a bit
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { y: 0.7 },
      });
    }, 300);
  };

  return (
    <div
      data-theme="valentine"
      className="relative h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
      ref={containerRef}
    >
      {noClicks >= 6 && (
        <div>
          <p>
            (I knew you'd say yes! 😊 ) But you can click here to try say no
            hehe
          </p>
          <button onClick={handleRetry} className="btn bg-blue-100">
            Retry
          </button>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">Will you be my Valentine? 💘</h1>

      <img
        src={images[noClicks]}
        alt="Valentine"
        className="h-64 mb-8 transition-all duration-300"
      />

      <div className="relative flex gap-8">
        {/* YES BUTTON */}
        <button
          onClick={handleYesClick}
          className="btn btn-soft btn-secondary transition-transform duration-300"
          style={{
            padding: `${0.75 * yesScale}rem ${1.5 * yesScale}rem`,
            fontSize: `${1 * yesScale}rem`,
          }}
        >
          Yes 💖
        </button>

        {/* NO BUTTON */}
        {noClicks <= 5 && (
          <div>
            <button
              onClick={handleNoClick}
              className={`btn btn-soft btn-accent transition-all duration-300 ${
                noGone ? "pointer-events-none opacity-0" : ""
              }`}
              style={{
                padding: "0.75rem 1.5rem",
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              }}
            >
              {phrases[noClicks]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
