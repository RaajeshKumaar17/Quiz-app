import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Navigate to the quiz page when the "Start Quiz" button is clicked
  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Welcome to the Quiz App!</h1>

        <div className="home__description">
          <h2>Test Rules:</h2>
          <ul>
            <li>There are 10 multiple-choice questions.</li>
            <li>You have a time limit of 30 seconds for each question.</li>
            <li>Your score will be calculated at the end.</li>
            <li>Click "Start Quiz" to begin!</li>
          </ul>
        </div>

        {/* Button to start the quiz */}
        <div className="home__cta">
          <button onClick={startQuiz} className="btn btn_start">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
