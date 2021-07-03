import React, { useRef } from "react";
import "./index.css";

const Questions = ({ questions }) => {
  const textareaEl = useRef(null);

  return (
    <div className="questions">
      {questions.length &&
        questions.map((q, i) => {
          return <span key={i}>{q}</span>;
        })}

      <textarea ref={textareaEl} />
    </div>
  );
};

export default Questions;
