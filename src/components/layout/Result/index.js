import React, { useState, useRef, Fragment } from "react";
import "./index.css";

const Result = ({ countsToShow, answers, userAnswers }) => {
  const inputEl = useRef(null);
  const [metronomeNumber, setMetronomeNumber] = useState(0);

  return (
    <div className="answersBoard">
      {metronomeNumber > 0 ? (
        <Fragment>
          <span>
            Counts: {countsToShow}
            <br />
            <br />
            Metronome number: {metronomeNumber}
            <br />
            <br />
            {countsToShow == metronomeNumber ? `You're a genius!` : `Not bad`}
          </span>
          <div className="answers">
            {answers.length > 0 &&
              answers.map((a, i) => {
                return (
                  <span
                    key={i}
                    className={userAnswers[i] === a ? "correct" : "wrong"}
                  >
                    Your answer: {userAnswers[i]} <br />
                    <br /> The answer: {a}
                  </span>
                );
              })}
          </div>
        </Fragment>
      ) : (
        <form
          onSubmit={() => {
            setMetronomeNumber(inputEl.current.value);
          }}
        >
          <input
            type="text"
            ref={inputEl}
            placeholder="Enter the number of metronome you counted"
          />
        </form>
      )}
    </div>
  );
};

export default Result;
