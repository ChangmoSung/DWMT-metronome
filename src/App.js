import React, { Fragment, useState, useRef, useEffect } from "react";
import "./App.css";
import Result from "./components/layout/Result";
import Questions from "./components/layout/Questions";
import sound from "./sounds/metronome.m4a";
import { getQuestions, getAnswers, replayGame } from "./lib";

const App = () => {
  const audioEl = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countsToShow, setCounts] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [intervalId, setIntervalId] = useState(false);
  const [timeoutId, setTimeoutId] = useState(false);

  useEffect(() => {
    document?.getElementsByTagName("textarea")[0]?.focus();
  });

  const startGame = () => {
    const questionsToShow = getQuestions();
    const answersToShow = getAnswers(questionsToShow);
    setQuestions(questionsToShow);

    let counts = 0;
    const intervalSpeed = Math.floor(Math.random() * (6 - 4) + 4) * 100;
    const iId = setInterval(() => {
      audioEl.current.play();
      counts = counts + 1;
    }, intervalSpeed);
    setIntervalId(iId);

    const secondsToPlay = questionsToShow.length * 1250;
    const tId = setTimeout(() => {
      clearInterval(iId);
      setCounts(counts);
      setAnswers(answersToShow);
      setGameOver(true);
    }, secondsToPlay);
    setTimeoutId(tId);
  };

  return (
    <Fragment>
      <audio ref={audioEl}>
        <source src={sound}></source>
      </audio>

      <button
        className="startOrReplay"
        onClick={
          questions.length
            ? () =>
                replayGame({
                  setQuestions,
                  setCounts,
                  setAnswers,
                  setGameOver,
                  intervalId,
                  timeoutId,
                })
            : startGame
        }
      >
        {questions.length ? "Replay" : "Start"}
      </button>

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
    </Fragment>
  );
};

export default App;
