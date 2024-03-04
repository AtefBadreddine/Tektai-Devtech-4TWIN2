import React from 'react';
import Header from '../../layout/Header';

export default function NotAdmin() {
  return (
    <div>    <Header/>
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">You are not an admin</h1>
        <p className="text-lg text-gray-700 text-center">Please contact the administrator for access.</p>
      </div>
    </div> </div>
  );
}
