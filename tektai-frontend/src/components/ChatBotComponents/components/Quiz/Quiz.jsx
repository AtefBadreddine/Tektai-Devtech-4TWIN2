import React, { useState } from "react";
import FlashCard from "./FlashCard";

const Quiz = (props) => {
  let [questionIndex, setQuestionIndex] = useState(0);

  const incrementIndex = () => setQuestionIndex((prev) => (prev += 1));

  const currentQuestion = props.questions[questionIndex];

  if (!currentQuestion) {
    return <p>No more questions available.</p>;
  }

  return (
    <FlashCard
      question={currentQuestion.question}
      answerChoices={currentQuestion.answerChoices} // Adjusted prop name
      correctAnswer={currentQuestion.correctAnswer} // Adjusted prop name
      incrementIndex={incrementIndex}
    />
  );
};

export default Quiz;
