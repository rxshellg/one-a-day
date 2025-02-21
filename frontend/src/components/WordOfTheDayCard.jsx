import { useState, useEffect } from "react";
import "./WordOfTheDayCard.css";
import ShareButton from "./ShareButton";

const WordOfTheDayCard = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedWord = localStorage.getItem("wordOfTheDay");
    const savedDefinition = localStorage.getItem("wordDefinition");
    const savedDate = localStorage.getItem("wordDate");
    const today = new Date().toISOString().split("T")[0];

    if (savedWord && savedDefinition && savedDate === today) {
      setWord(savedWord);
      setDefinition(savedDefinition);
    } else {
      fetchWord();
    }
  }, []);

  const fetchWord = async () => {
    try {
      const response = await fetch("https://random-word-api.herokuapp.com/word");
      if (!response.ok) throw new Error("Failed to fetch word");
      const data = await response.json();
      const randomWord = data[0];

      const definitionResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
      );
      if (!definitionResponse.ok) throw new Error("Failed to fetch definition");
      const definitionData = await definitionResponse.json();
      const wordDefinition = definitionData[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";

      setWord(randomWord);
      setDefinition(wordDefinition);
      localStorage.setItem("wordOfTheDay", randomWord);
      localStorage.setItem("wordDefinition", wordDefinition);
      localStorage.setItem("wordDate", new Date().toISOString().split("T")[0]);
      setError(false);
    } catch (error) {
      console.error("Error fetching word:", error);
      setWord("Word not found");
      setDefinition("Try again later.");
      setError(true);
    }
  };

  const shareWord = () => {
    if (navigator.share) {
      navigator.share({
        title: "Word of the Day",
        text: `Today's word: ${word}\nDefinition: ${definition}`,
      }).catch((error) => console.error("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(`Today's word: ${word}\nDefinition: ${definition}`);
      alert("Word copied to clipboard!");
    }
  };

  return (
    <div className="word-container">
      <h2 className="word-title">Word of the Day</h2>
      <p className="word-text"><strong>{word}</strong></p>
      <p className="word-definition">{definition}</p>
      {!error && <ShareButton action={shareWord} />}
    </div>
  );
}

export default WordOfTheDayCard;