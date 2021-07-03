import React, { useRef } from "react";

const Metronome = () => {
  const onClick = () => {};

  return (
    <div>
      <audio ref={audioEl}>
        <source src={sound}></source>
      </audio>
    </div>
  );
};

export default Metronome;
