import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data) => {

    setDisabled(true);
    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error sending contact form:', error);
    }
    setDisabled(false);
  };



  return (
    <div className="bg-white py-8 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto">
            <h2 className="text-4xl title  font-bold text-gray-800 text-center md:text-left mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Contact Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input className="form-input w-full border-gray-300 rounded-md focus:border-blue-500" type="text" placeholder="Name" {...register("name")} />
                </div>
                <div>
                  <input className="form-input w-full border-gray-300 rounded-md focus:border-blue-500" type="email" placeholder="Email Address" {...register("email")} />
                </div>
              </div>
              <div>
                <textarea className="form-textarea mt-4 block w-full border-gray-300 rounded-md focus:border-blue-500" rows="3" placeholder="Message" {...register("message")} />
              </div>
              <div className="flex items-center mt-4">
                <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded-md" disabled={disabled}><span>Submit</span></button>
                <span className="ml-auto text-gray-600 align-self-center hidden md:block">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  +216 53 222 332
                </span>
              </div>
            </form>
          </div>
          <div className="md:w-1/2">
            <div className="right-image">
            
              <iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyACvnBjxSpzHjh_Qxv1ZsMwvlZVSfun-G0
    &q=Space+Needle,Seattle+WA">
</iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
