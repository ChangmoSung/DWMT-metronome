import React, { useState, useRef } from "react";
import "./App.css";
import sound from "./sounds/metronome.m4a";

const App = () => {
  const audioEl = useRef(null);
  const textareaEl = useRef(null);
  const inputEl = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countsToShow, setCounts] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [metronomeNumber, setMetronomeNumber] = useState(0);

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
        .map((a) => parseInt(a.replace(/\D/g, "")))
        .filter((a) => !isNaN(a));
      setUserAnswers(answersFromUser);
      setCounts(counts);
    }, secondsToPlay);
  };

  return (
    <div>
      <button className="startButton" onClick={onClick}>
        Start
      </button>

      <audio ref={audioEl}>
        <source src={sound}></source>
      </audio>

      {userAnswers.length > 0 ? (
        <div>
          {metronomeNumber > 0 ? (
            <div className="answersBoard">
              <span>
                Counts: {countsToShow}
                <br />
                <br />
                Metronome number: {metronomeNumber}
                <br />
                <br />
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
            </div>
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
      ) : (
        <div>
          {questions.length > 0 && (
            <textarea
              ref={textareaEl}
              onChange={(e) => {
                const answers = e.target.value
                  .split(" ")
                  .map((a) => parseInt(a.replace(/\D/g, "")))
                  .filter((a) => !isNaN(a));

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
