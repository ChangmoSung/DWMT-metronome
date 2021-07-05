import React from "react";
import "./index.css";

const Questions = ({ questions, userAnswers, setUserAnswers }) => {
  return (
    <div>
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
              <span key={i} className={i}>
                Q-{i + 1}
                <br />
                <br />
                {q}
                <br />
                <br />
                {typeof userAnswers[i] === "number" &&
                  `Your answer: ${userAnswers[i]}`}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
