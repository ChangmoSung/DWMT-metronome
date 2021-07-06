export const getQuestions = () => {
  const questionsToShow = [];
  const numOfQuestions = Math.floor(Math.random() * (6 - 3) + 3) * 10;
  for (let i = 0; i < numOfQuestions; i++) {
    const num1 = Math.floor(Math.random() * (20 - 1) + 1);
    const num2 = Math.floor(Math.random() * (20 - 1) + 1);
    const halfChance = Math.floor(Math.random() * (10 - 0) + 0);
    const question =
      halfChance < 5
        ? `${num1} + ${num2}`
        : `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
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
    }
  });
  return answersToShow;
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
  setLevel("");
  clearInterval(intervalId);
  clearTimeout(timeoutId);
};
