import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import Question from "../components/Question";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const { questions, choosedAswers, setSubmitted, submitted } = useAppContext();
  const [currIndex, setCurrIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Initial time set to 30 seconds for each question
  const navigate = useNavigate();

  // Timer logic: Countdown every second
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(); // Automatically move to next question when timer runs out
    }

    const timerId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount or timer change
  }, [timeLeft]);

  const handleNextQuestion = () => {
    if (currIndex < questions.length - 1) {
      setCurrIndex(currIndex + 1);
      setTimeLeft(30); // Reset timer for the next question
    } else {
      setSubmitted(true);
      navigate("/result"); // Navigate to the results page if it was the last question
    }
  };

  const handlePrevQuestion = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
      setTimeLeft(30); // Reset timer when going to the previous question
    }
  };

  function showResults() {
    setSubmitted(true);
    navigate("/result");
  }

  function goHome() {
    navigate("/"); // Navigate to the home page
  }

  return (
    <div className="quiz">
      {/* Modal for submit confirmation */}
      {showModal && (
        <Modal title="Submit" closeModal={() => setShowModal(false)}>
          <p>Are you sure you want to submit?</p>
          <div className="cont">
            <h5>You answered</h5>
            <h3>
              {choosedAswers.reduce(
                (acc, x) => (x !== -1 ? (acc += 1) : acc),
                0
              )}
              /10
            </h3>
          </div>
          <div className="ques_cta">
            <button className="btn" onClick={showResults}>
              Yes
            </button>
            <button className="btn" onClick={() => setShowModal(false)}>
              No
            </button>
          </div>
        </Modal>
      )}

      {/* Header section with timer and back button */}
      <div className="quiz-header">
        <button onClick={goHome} className="btn btn-home">
          Home
        </button>
        <div className="timer">
          Time left: {timeLeft} seconds
        </div>
      </div>

      {/* Question display */}
      <Question question={questions[currIndex]} currIndex={currIndex} />

      {/* Question navigation buttons */}
      <div className="question-navigation">
        <button
          onClick={handlePrevQuestion}
          className="btn btn-nav"
          disabled={currIndex === 0}
        >
          Prev
        </button>
        <button className="btn btn-submit" onClick={() => setShowModal(true)}>
          Submit
        </button>
        <button
          onClick={handleNextQuestion}
          className="btn btn-nav"
          disabled={currIndex >= questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
