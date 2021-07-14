export const getQuestions = (level) => {
  const questionsToShow = [];
  const numOfQuestions = Math.floor(Math.random() * (8 - 3) + 3) * 10;
  for (let i = 0; i < numOfQuestions; i++) {
    const num1 = Math.floor(Math.random() * (50 - 1) + 1);
    const num2 = Math.floor(Math.random() * (50 - 1) + 1);
    const biggerNum = Math.max(num1, num2);
    const smallerNum = Math.min(num1, num2);
    const chance = Math.random();
    let question = "";
    if (level === "hard" || level === "defaultHard") {
      if (chance <= 0.33) {
        question = `${num1} + ${num2}`;
      } else if (chance <= 0.66 && chance > 0.33) {
        question = `${biggerNum} - ${smallerNum}`;
      } else if (chance < 1 && chance > 0.66) {
        question = `${num1} * ${num2}`;
      } else {
        question = `${num1} * ${num2}`;
      }
    } else {
      if (chance <= 0.5) {
        question = `${num1} + ${num2}`;
      } else if (chance < 1 && chance > 0.5) {
        question = `${biggerNum} - ${smallerNum}`;
      } else {
        question = `${biggerNum} - ${smallerNum}`;
      }
    }
    questionsToShow.push(question);
  }
  return questionsToShow;
};

export const getAnswers = (questionsToShow) => {
  const answersToShow = questionsToShow.map((q) => {
    if (q.includes("+")) {
      const [num1, num2] = q.split(" + ");
      return parseInt(num1, 10) + parseInt(num2, 10);
    } else if (q.includes("-")) {
      const [num1, num2] = q.split(" - ");
      return parseInt(num1, 10) - parseInt(num2, 10);
    } else if (q.includes("*")) {
      const [num1, num2] = q.split(" * ");
      return parseInt(num1, 10) * parseInt(num2, 10);
    }
  });
  return answersToShow;
};

export const getIntervalSpeed = (level) => {
  const randomChance = Math.random();
  let intervalSpeed = 0;
  if (level === "hard" || level === "defaultHard") {
    if (randomChance <= 0.2) {
      intervalSpeed = 400;
    } else if (randomChance <= 0.4 && randomChance > 0.2) {
      intervalSpeed = 450;
    } else if (randomChance <= 0.6 && randomChance > 0.4) {
      intervalSpeed = 500;
    } else if (randomChance <= 0.8 && randomChance > 0.6) {
      intervalSpeed = 550;
    } else if (randomChance <= 1 && randomChance > 0.8) {
      intervalSpeed = 600;
    } else {
      intervalSpeed = 500;
    }
  } else {
    if (randomChance <= 0.15) {
      intervalSpeed = 250;
    } else if (randomChance <= 0.3 && randomChance > 0.15) {
      intervalSpeed = 300;
    } else if (randomChance <= 0.45 && randomChance > 0.3) {
      intervalSpeed = 350;
    } else if (randomChance <= 0.6 && randomChance > 0.45) {
      intervalSpeed = 400;
    } else if (randomChance <= 0.75 && randomChance > 0.6) {
      intervalSpeed = 450;
    } else if (randomChance <= 0.9 && randomChance > 0.75) {
      intervalSpeed = 500;
    } else if (randomChance <= 1 && randomChance > 0.9) {
      intervalSpeed = 550;
    } else {
      intervalSpeed = 250;
    }
  }
  return intervalSpeed;
};

export const getSecondsToPlay = (level, numOfQuestions) => {
  let time;
  if (level === "hard") {
    time = 2500;
  } else if (level === "normal") {
    time = 1700;
  } else if (level === "easy") {
    time = 2500;
  } else {
    time = 2500;
  }
  const secondsToPlay = numOfQuestions * time;
  return secondsToPlay;
};

export const replayGame = ({
  setQuestions,
  setCounts,
  setAnswers,
  setUserAnswers,
  setGameOver,
  setLevel,
  intervalId,
  timeoutId,
}) => {
  setQuestions([]);
  setCounts(0);
  setAnswers([]);
  setUserAnswers([]);
  setGameOver(false);
  setLevel("defaultHard");
  clearInterval(intervalId);
  clearTimeout(timeoutId);
};
