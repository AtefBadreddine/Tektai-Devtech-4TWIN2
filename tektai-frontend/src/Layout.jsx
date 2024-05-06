// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Chatbotco from './components/ChatBotComponents/chatbot/Chatbot';

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Chatbotco />
    </div>
  );
}

export default Layout;
