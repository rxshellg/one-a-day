import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";
import "./NumberOfTheDayCard.css";

const NumberOfTheDayCard = () => {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const savedNumber = localStorage.getItem("numberOfTheDay");
    const savedDate = localStorage.getItem("numberDate");
    const today = new Date().toISOString().split("T")[0];

    if (savedNumber && savedDate === today) {
      setNumber(savedNumber);
    } else {
      generateNumber();
    }
  }, []);

  const generateNumber = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setNumber(randomNum);
    localStorage.setItem("numberOfTheDay", randomNum);
    localStorage.setItem("numberDate", new Date().toISOString().split("T")[0]);
  };
    
  const shareNumber = () => {
    if (navigator.share) {
      navigator.share({
        title: "Number of the Day",
        text: `Today's number is ${number}!`,
      }).catch((error) => console.error("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(`Today's number is ${number}!`);
      alert("Number copied to clipboard!");
    }
  };

  return (
    <div className="number-container">
      <h2 className="number-title">Number of the Day</h2>
          <p className="number-text">{number !== null ? number : "Loading..."}</p>
        <ShareButton action={shareNumber}/>
    </div>
  );
}

export default NumberOfTheDayCard;