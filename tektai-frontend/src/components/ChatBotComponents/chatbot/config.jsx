import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";
import Quiz from "../components/Quiz/Quiz";
import ActionProvider from "./ActionProvider"; // Import your modified ActionProvider

const getStoredUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.username : ""; // Return empty string if user is not found
}

const storedUser = getStoredUser();

const config = {
  storedUser: storedUser,

  botName: "TEKTAI",
  initialMessages: [
    createChatBotMessage(`Hello ${storedUser}. How can I assist you?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "quiz",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "What is the main programming language used in data science?",
            answerChoices: ["Java", "Python", "C++", "R"],
            correctAnswer: "Python",
            id: 1,
          },
          {
            question: "What does SQL stand for?",
            answerChoices: ["Structured Query Language", "Standard Query Language", "Sequential Query Language", "Simple Query Language"],
            correctAnswer: "Structured Query Language",
            id: 2,
          },
          {
            question: "What does HTML stand for?",
            answerChoices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
            correctAnswer: "Hyper Text Markup Language",
            id: 3,
          },
          {
            question: "What does CSS stand for?",
            answerChoices: ["Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
            correctAnswer: "Cascading Style Sheets",
            id: 4,
          },
          {
            question: "What is the output of the following code: print(3 + 4 * 2)?",
            answerChoices: ["7", "14", "11", "10"],
            correctAnswer: "11",
            id: 5,
          },
        ],
      },
    },
  ],
  actionProvider: new ActionProvider(createChatBotMessage, null), // Pass your ActionProvider instance here
};

export default config;
