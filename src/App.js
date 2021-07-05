import React, { useState, useRef } from "react";
import "./App.css";
import Result from "./components/layout/Result";
import Questions from "./components/layout/Questions";
import sound from "./sounds/metronome.m4a";
import { getQuestions, getAnswers } from "./lib";

const App = () => {
  const audioEl = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countsToShow, setCounts] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const onClick = () => {
    const questionsToShow = getQuestions();
    const answersToShow = getAnswers(questionsToShow);
    setQuestions(questionsToShow);

    let counts = 0;
    const intervalSpeed = Math.floor(Math.random() * (6 - 4) + 4) * 100;
    const intervalId = setInterval(() => {
      audioEl.current.play();
      counts = counts + 1;
    }, intervalSpeed);

    const secondsToPlay = questionsToShow.length * 1250;
    setTimeout(() => {
      clearInterval(intervalId);
      setCounts(counts);
      setAnswers(answersToShow);
      setGameOver(true);
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

      {gameOver ? (
        <Result
          countsToShow={countsToShow}
          answers={answers}
          userAnswers={userAnswers}
        />
      ) : (
        <Questions
          questions={questions}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
      )}
    </div>
  );
};

export default App;
