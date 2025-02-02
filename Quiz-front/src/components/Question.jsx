import React from "react";
import { useAppContext } from "../context/Appcontext";

function Question({ question, currIndex }) {
  const { setChoosedAswers, choosedAswers } = useAppContext();

  // Set selected option
  function setOption(opt) {
    setChoosedAswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currIndex] = opt; // Set selected answer for current question
      return newAnswers;
    });
  }

  return (
    <div className="question-container">
      <h1 className="question">{question?.description}</h1>
      <div className="options">
        {question?.options.map((option) => (
          <button
            key={option?.id}
            className={`option ${
              choosedAswers[currIndex]?.id === option?.id ? "active" : ""
            }`}
            onClick={() => setOption(option)}
          >
            {option?.description}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
