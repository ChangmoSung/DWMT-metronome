import React, { Fragment, useRef, useEffect } from "react";
import "./index.css";

const Questions = ({ questions, userAnswers, setUserAnswers }) => {
  const userAnswerEl = useRef(null);

  useEffect(() => {
    userAnswerEl?.current?.focus();
  });

  return (
    <Fragment>
      {questions.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const userAnswer = userAnswerEl.current.value;

            setUserAnswers([
              ...userAnswers,
              parseInt(userAnswer.replace(/\D/g, "")),
            ]);

            for (let i = 0; i < questions.length; i++) {
              const el = document.getElementsByClassName(i);
              if (userAnswers.length >= i) {
                el[0]?.classList.add("answered");
              } else {
                el[0]?.classList.remove("answered");
              }
            }

            userAnswerEl.current.value = "";
          }}
        >
          <input
            ref={userAnswerEl}
            type="text"
            className="userAnswer"
            placeholder="Enter answer"
            onKeyDown={(e) => {
              const key = e.key;
              const value = e.target.value;
              if (key === "Backspace" && !value) {
                const slicedAnswers = userAnswers.slice(
                  0,
                  userAnswers.length - 1
                );
                setUserAnswers(slicedAnswers);

                for (let i = 0; i < questions.length; i++) {
                  const el = document.getElementsByClassName(i);
                  if (slicedAnswers.length > i) {
                    el[0]?.classList.add("answered");
                  } else {
                    el[0]?.classList.remove("answered");
                  }
                }
              }
            }}
          />
        </form>
      )}
      <div className="questions">
        {questions.length > 0 &&
          questions.map((q, i) => {
            return (
              <div className={`${i} question`} key={i}>
                <span>Q-{i + 1}</span>
                <span>{q}</span>
                <span>
                  {typeof userAnswers[i] === "number" && `*${userAnswers[i]}`}
                </span>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default Questions;
