import React from "react";
import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "What is tektai ?",
      handler: props.actionProvider.introduceOverview,
      id: 1,
    },
    { text: "What are our features", handler: props.actionProvider.introduceFeatures, id: 2 },
    {
      text: "How do i partake in a challenge",
      handler: props.actionProvider.buildTournaments,
      id: 3,
    },
    {
      text: "where do i see my teams?",
      handler: props.actionProvider.streamTournaments,
      id: 4,
    },
   
    {
        text: "Fun Fact Quiz",
        handler: props.actionProvider.handleFunFactQuiz,
        id: 6,
      },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;