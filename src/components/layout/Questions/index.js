import React, { Fragment } from "react";
import "./index.css";

const Questions = ({ questions, userAnswers, setUserAnswers }) => {
  return (
    <Fragment>
      {questions.length > 0 && (
        <textarea
          onChange={(e) => {
            const answers = e.target.value
              .split(" ")
              .map((a) => parseInt(a.replace(/\D/g, "")))
              .filter((a) => !isNaN(a));

            setUserAnswers(answers);

            for (let i = 0; i < questions.length; i++) {
              const el = document.getElementsByClassName(i);
              if (answers.length > i) {
                el[0]?.classList.add("answered");
              } else {
                el[0]?.classList.remove("answered");
              }
            }
          }}
        />
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
