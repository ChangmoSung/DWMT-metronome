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
                  <div
                    key={i}
                    className={`${
                      userAnswers[i] === a ? "correct" : "wrong"
                    } answer`}
                  >
                    <span>Yours: {userAnswers[i]}</span>
                    <span>Answer: {a}</span>
                  </div>
                );
              })}
          </div>
        </Fragment>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const metronomeNumber = inputEl.current.value;
            if (metronomeNumber > 0) {
              setMetronomeNumber(metronomeNumber);
            } else {
              if (metronomeNumber == 0) {
                window.alert("I believe your answer must be bigger than 0 LOL");
              } else {
                window.alert("Enter the number of the metronome");
              }
            }
          }}
        >
          <input
            type="text"
            ref={inputEl}
            className="metronomeNumberInput"
            placeholder="Enter the number of metronome you counted"
          />
        </form>
      )}
    </div>
  );
};

export default Result;
