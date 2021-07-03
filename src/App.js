import React, { useState, useRef } from "react";
import "./App.css";
import sound from "./sounds/metronome.m4a";

const App = () => {
  const audioEl = useRef(null);
  const textareaEl = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countsToShow, setCounts] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const getQuestionsAndAnswers = () => {
    const questionsToShow = [];
    const numOfQuestions = Math.floor(Math.random() * (6 - 3) + 3) * 10;
    for (let i = 0; i < numOfQuestions; i++) {
      const num1 = Math.floor(Math.random() * (20 - 1) + 1);
      const num2 = Math.floor(Math.random() * (20 - 1) + 1);
      const question = `${num1} + ${num2}`;
      questionsToShow.push(question);
    }
    const answersToShow = questionsToShow.map((q) => {
      const [num1, num2] = q.split(" + ");
      return parseInt(num1, 10) + parseInt(num2, 10);
    });

    return { questionsToShow, answersToShow };
  };

  const onClick = () => {
    const { questionsToShow, answersToShow } = getQuestionsAndAnswers();
    setQuestions(questionsToShow);
    setAnswers(answersToShow);

    let counts = 0;
    const intervalSpeed = Math.floor(Math.random() * (6 - 4) + 4) * 100;
    const intervalId = setInterval(() => {
      audioEl.current.play();
      counts = counts + 1;
    }, intervalSpeed);

    const secondsToPlay = questionsToShow.length * 1250;
    setTimeout(() => {
      clearInterval(intervalId);

      const answersFromUser = textareaEl.current.value
        .split(" ")
        .filter((a) => a)
        .map((a) => parseInt(a));
      setUserAnswers(answersFromUser);
      setCounts(counts);
    }, secondsToPlay);
  };

  return (
    <div>
      <button onClick={onClick}>Start</button>

      <audio ref={audioEl}>
        <source src={sound}></source>
      </audio>

      {userAnswers.length > 0 ? (
        <div>
          <span>Counts: {countsToShow}</span>
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
        </div>
      ) : (
        <div>
          {questions.length > 0 && <textarea ref={textareaEl} />}
          <div className="questions">
            {questions.length > 0 &&
              questions.map((q, i) => {
                return (
                  <span key={i}>
                    Q-{i + 1}
                    <br />
                    <br />
                    {q}
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;