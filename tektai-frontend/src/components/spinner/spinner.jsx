import React from 'react';
import ReactDOM from 'react-dom';
import './pre.css'
function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="preloader">
      <div class="preloader-container">
	<div class="📦"></div>
	<div class="📦"></div>
	<div class="📦"></div>
	<div class="📦"></div>
	<div class="📦"></div>
</div>
      </div>
    </div>
  );
}

function SpinnerWithBackground() {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="absolute top-0 left-0 w-full h-full  bg-opacity-40 backdrop-blur-md transition-opacity duration-500"></div>
        <Spinner className="z-50" />
      </div>
    );
  }

export default SpinnerWithBackground;

// Render the SpinnerWithBackground component where you want to display the spinner
ReactDOM.render(<SpinnerWithBackground />, document.getElementById('root'));
