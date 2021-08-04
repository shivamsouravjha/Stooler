import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "About Us",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "How to Join a group?", handler: () => {}, id: 2 },
    { text: "How to Create a group?", handler: () => {}, id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;