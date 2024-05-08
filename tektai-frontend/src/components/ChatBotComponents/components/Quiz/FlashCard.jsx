import React, { useState, useEffect } from "react";
import { Button, chakra } from "@chakra-ui/react";

const FlashCard = ({ question, answerChoices, correctAnswer, incrementIndex }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [question]);

  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
    if (choice === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flashcard-container">
      <p>{question}</p>
      {answerChoices.map((choice, index) => (
        <chakra.div
          key={index}
          className={`inline-block m-1`}
        >
          <Button
            size="sm"
            variant="outline"
            colorScheme={selectedAnswer === choice ? (isCorrect ? "green" : "red") : "gray"}
            _hover={{ bg: selectedAnswer === choice ? (isCorrect ? "green.500" : "red.500") : "blue.400", color: "white" }}
            onClick={() => handleAnswerClick(choice)}
          >
            {choice}
          </Button>
        </chakra.div>
      ))}
      {selectedAnswer && (
        <div>
          {isCorrect === true ? (
            <p className="correct-answer">Correct!</p>
          ) : isCorrect === false ? (
            <p className="incorrect-answer">Incorrect. The correct answer is: {correctAnswer}</p>
          ) : null}
          <Button onClick={incrementIndex} className="flashcard-button">
            Next question
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
