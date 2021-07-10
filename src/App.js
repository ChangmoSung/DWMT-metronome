import React, { Fragment, useState, useRef } from "react";
import "./App.css";
import Result from "./components/layout/Result";
import Questions from "./components/layout/Questions";
import sound from "./sounds/metronome.m4a";
import {
  getQuestions,
  getAnswers,
  getSecondsToPlay,
  getIntervalSpeed,
  replayGame,
} from "./lib";

const App = () => {
  const audioEl = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [countsToShow, setCounts] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState("hard");
  const [intervalId, setIntervalId] = useState(false);
  const [timeoutId, setTimeoutId] = useState(false);

  const startGame = () => {
    const questionsToShow = getQuestions(level);
    const answersToShow = getAnswers(questionsToShow);
    setQuestions(questionsToShow);

    let counts = 0;
    const intervalSpeed = getIntervalSpeed(level);
    const iId = setInterval(() => {
      audioEl.current.play();
      counts = counts + 1;
    }, intervalSpeed);
    setIntervalId(iId);

    const secondsToPlay = getSecondsToPlay(level, questionsToShow.length);
    const tId = setTimeout(() => {
      clearInterval(iId);

      setTimeout(() => {
        setCounts(counts);
        setAnswers(answersToShow);
        setGameOver(true);
      }, 1000);
    }, secondsToPlay);
    setTimeoutId(tId);
  };

  return (
    <Fragment>
      <audio ref={audioEl}>
        <source src={sound}></source>
      </audio>

      {questions.length <= 0 && !gameOver && (
        <p className="announcement">
          There're multiplication and division questions on the{" "}
          <strong>hard</strong> level :)
        </p>
      )}

      <p className="announcement">
        * For division questions, Round your answer to the nearest integer *
      </p>

      {questions.length <= 0 && !gameOver && (
        <select onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select a level</option>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      )}

      <button
        className="startOrReplayButton"
        onClick={
          questions.length
            ? () =>
                replayGame({
                  setQuestions,
                  setCounts,
                  setAnswers,
                  setUserAnswers,
                  setGameOver,
                  setLevel,
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
