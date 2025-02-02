import React from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { questions, choosedAswers, setChoosedAswers, setSubmitted } =
    useAppContext();
  const navigate = useNavigate();

  function handleReset() {
    setChoosedAswers(Array(10).fill(-1));
    setSubmitted(false);
    navigate("/"); // Reset and go back to the home page
  }

  // Calculate score, giving 4 marks for correct answers
  const score = choosedAswers?.reduce(
    (acc, x) =>
      x !== -1 ? (x.is_correct ? (acc += 4) : (acc -= 1)) : acc,
    0
  );

  return (
    <div className="resluts">
      <div className="results_head">
        <h1>Results</h1>
        <button className="btn" onClick={handleReset}>
          Home
        </button>
      </div>
      <div className="score">
        <h3>
          You scored{" "}
          <span className="highlight">
            {score} / 40
          </span>
        </h3>
      </div>

      {questions.map((ques, idx) => (
        <div
          key={idx}
          className={`result ${
            choosedAswers[idx] === -1
              ? "not_attempted"
              : choosedAswers[idx]?.is_correct
              ? "correct"
              : "incorrect"
          }`}
        >
          <span
            className="score_pill"
            style={{
              backgroundColor:
                choosedAswers[idx] !== -1
                  ? choosedAswers[idx]?.is_correct
                    ? "#55AD9B"
                    : "#c63c51"
                  : "#FFD152",
            }}
          >
            {choosedAswers[idx] !== -1
              ? choosedAswers[idx]?.is_correct
                ? "+4"
                : "-1"
              : "0"}
          </span>
          <div className="result_ques">{ques.description}</div>
          <div className="result_ans">
            {ques?.options.map((opt, ind) => (
              <div
                key={ind}
                className={`result_opt ${
                  !choosedAswers[idx]?.is_correct &&
                  choosedAswers[idx]?.id === opt.id
                    ? "worng_opt"
                    : ""
                }`}
                style={{
                  backgroundColor: opt?.is_correct ? "#55AD9B" : "",
                  color: opt?.is_correct ? "white" : "",
                }}
              >
                {opt.description}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
