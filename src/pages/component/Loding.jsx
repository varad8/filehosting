import { useState, useEffect } from "react";
export default function Loading() {
  const [loadingText, setLoadingText] = useState("Preparing for launch...");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      document.getElementById("loading").style.display = "none";
      clearInterval(timer);
    }, 3000);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((count) => (count + 1) % 4);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const text = "Preparing for launch";
    const dots = ".".repeat(count);
    setLoadingText(`${text}${dots}`);
  }, [count]);

  return (
    <div className="loading" id="loading">
      <div className="rocketContainer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7202/7202313.png"
          alt="Rocket"
          className="rocket"
        />
      </div>
      <p className="loadingText">{loadingText}</p>
    </div>
  );
}
