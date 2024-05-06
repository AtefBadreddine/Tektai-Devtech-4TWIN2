import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import * as GoogleGenerativeAI from "@google/generative-ai";
import LoadingSpinner from './spinner'; // Import the LoadingSpinner component if needed

const getStoredUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.username : ""; // Return empty string if user is not found
}

const storedUser = getStoredUser();

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.API_KEY = "AIzaSyA9jCrgVSaprlJh491KsjbfXH39_9biJ9A"; // Your GEMINI API key
  }

  greet = () => {
    const message = this.createChatBotMessage(`Hello ${storedUser}.`);
    this.addMessageToState(message);
  };

  handleUserInput = async (inputText) => {
    // Update UI to show loading animation immediately
    this.addMessageToState({
      type: 'loading',
      loading: true
    });

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(this.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = inputText;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Check if the response is not empty
      if (text && text.trim().length > 0) {
        // Create a chatbot message with the response
        const message = this.createChatBotMessage(text);
        // Add the message to state
        this.addMessageToState(message);
      } else {
        this.defaultResponse();
      }
    } catch (error) {
      console.error("Error occurred while generating content:", error);

      // Check if the error is due to RECITATION
      if (error.message.includes("RECITATION")) {
        // Provide a response indicating the issue
        const message = this.createChatBotMessage(
          "I'm sorry, I'm unable to provide a response to that question due to content policies. Can you ask something else?"
        );
        this.addMessageToState(message);
      } else {
        // For other errors, provide a default response
        this.defaultResponse();
      }
    } finally {
      // Always set loading state to false after handling user input
      this.addMessageToState({
        type: 'loading',
        loading: false
      });
    }
  };

  defaultResponse = () => {
    const message = this.createChatBotMessage(
      "I'm sorry, I didn't understand that. Can you please rephrase or ask a different question?"
    );
    this.addMessageToState(message);
  };
  introduceFeatures = () => {
    const message = this.createChatBotMessage(
      <p>Welcome to TEKTAI! Our key features include <a href="/challenges" className="text-blue-600 hover:underline">Challenges</a>, which you can create as a company or partake in as a challenger, <a href="/rankings" className="text-blue-600 hover:underline">Rankings</a>, <a href="/teams" className="text-blue-600 hover:underline">Teams</a>, and more.</p>
    );
    this.addMessageToState(message);
  };
  introduceOverview = () => {
    const linkStyle = {
      color: "blue", // Change color to your desired color
      textDecoration: "underline" // Add underline
    };
  
    const message = this.createChatBotMessage(
      <p> TEKTAI is a platform designed for data science enthusiasts like you. Here, you can explore a variety of <a href="/challenges" style={linkStyle}>Challenges</a>, compete with your peers, and solve real-world problems using data-driven solutions. Dive into our vast collection of datasets to analyze, visualize, and draw insights. Additionally, explore notebooks shared by the community to learn, experiment, and collaborate with fellow data enthusiasts. Join us in the exciting world of data science, where possibilities are endless and discoveries await!</p>
    );
    this.addMessageToState(message);
  };
  handleFunFactQuiz = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your quiz. Good luck!",
      {
        widget: "quiz",
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
