import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";
import './JokeOfTheDayCard.css'

const JokeOfTheDayCard = () => {
    const [joke, setJoke] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      const savedJoke = localStorage.getItem("jokeOfTheDay");
      const savedDate = localStorage.getItem("jokeDate");
      const today = new Date().toISOString().split("T")[0];
    
      if (savedJoke && savedDate === today) {
        setJoke(savedJoke);
      } else {
        fetchJoke();
      }
    }, []);

    const fetchJoke = async () => {
        setLoading(true);
        try {
          const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
          const data = await response.json();
          setJoke(data.joke);
          localStorage.setItem("jokeOfTheDay", data.joke);
          localStorage.setItem("jokeDate", new Date().toISOString().split("T")[0]);
        } catch (error) {
          setJoke("Failed to load joke. Try again!");
        }
        setLoading(false);
      };

    const shareJoke = () => {
        if (navigator.share) {
          navigator.share({
            title: "Joke of the Day",
            text: joke,
          }).catch((error) => console.error("Sharing failed", error));
        } else {
          navigator.clipboard.writeText(joke);
          alert("Joke copied to clipboard!");
        }
    };
  
    return (
        <div className="joke-container">
            <h1 className="joke-title">Joke</h1>
            <p className="joke-text">{loading ? "Loading..." : joke}</p>
            <ShareButton action={shareJoke} />
        </div>
    );
}

export default JokeOfTheDayCard;