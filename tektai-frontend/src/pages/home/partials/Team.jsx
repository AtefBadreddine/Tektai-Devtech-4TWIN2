import React, { useState, useEffect } from 'react';
import "./testimonial.css"
import TestimonialImage from '../../../images/testimonial.jpg';
import $ from 'jquery'; // Import jQuery

function Team() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle previous slide action
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 3 : prevSlide - 1));
  };

  // Function to handle next slide action
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    // jQuery code runs when component mounts
    $("#checkbox").change(function () {
      setInterval(function () {
        moveRight();
      }, 3000);
    });

    var slideCount = $("#slider ul li").length;
    var slideWidth = $("#slider ul li").width();
    var slideHeight = $("#slider ul li").height();
    var sliderUlWidth = slideCount * slideWidth;

    $("#slider").css({ width: slideWidth, height: slideHeight });

    $("#slider ul").css({ width: sliderUlWidth, marginLeft: -slideWidth });

    $("#slider ul li:last-child").prependTo("#slider ul");

    function moveLeft() {
      $("#slider ul").animate(
        {
          left: +slideWidth
        },
        200,
        function () {
          $("#slider ul li:last-child").prependTo("#slider ul");
          $("#slider ul").css("left", "");
        }
      );
    }

    function moveRight() {
      $("#slider ul").animate(
        {
          left: -slideWidth
        },
        200,
        function () {
          $("#slider ul li:first-child").appendTo("#slider ul");
          $("#slider ul").css("left", "");
        }
      );
    }

    $("a.control_prev").click(function () {
      moveLeft();
    });

    $("a.control_next").click(function () {
      moveRight();
    });
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  return (
    <div>
      <h1>Incredibly Basic Slider</h1>
      <div id="slider">
        <a href="#" className="control_prev" onClick={prevSlide}>&lt;</a>
        <a href="#" className="control_next" onClick={nextSlide}>&gt;</a>
        <ul>
          <li >
            
            
            
            
    
            
            
           
          {/* Testimonial1 */}
          <div className="max-w-3xl mx-auto mt-20" data-aos="zoom-y-out">
            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">

              <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                  <svg className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-500" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                  </svg>
                  <img className="relative rounded-full" src={TestimonialImage} width="96" height="96" alt="Testimonial 01" />
                </div>
                <blockquote className="text-xl font-medium mb-4">
                  “ I love this product and would recommend it to anyone. Could be not easier to use, and our multiple websites are wonderful. We get nice comments all the time. “
                </blockquote>
                <cite className="block font-bold text-lg not-italic mb-1">Darya Finger</cite>
                <div className="text-gray-600">
                  <span>CEO & Co-Founder</span> <a className="text-blue-600 hover:underline" href="#0">@Dropbox</a>
                </div>
              </div>

            </div>
          </div>
            
            
            
            
            
            
            </li>
          <li style={{ background: currentSlide === 1 || currentSlide === 3 ? "#aaa" : "" }}>SLIDE 2</li>
          <li style={{ background: currentSlide === 2 ? "#aaa" : "" }}>SLIDE 3</li>
          <li style={{ background: currentSlide === 3 ? "#aaa" : "" }}>SLIDE 4</li>
        </ul>
      </div>

      <div className="slider_option">
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox">Autoplay Slider</label>
      </div>
    </div>
  );
}

export default Team;
