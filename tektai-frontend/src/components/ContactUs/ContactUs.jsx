import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data) => {
    // Your onSubmit logic here
    console.log(data);
  };

  return (
    <div className="bg-white py-12 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="contact-box mb-4 mb-md-0 bg-white shadow-md rounded-md p-6">
            <h1 className="title font-semibold text-gray-800 text-center md:text-left mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="right-image p-0 md:p-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.097263291829!2d10.151678615210185!3d36.86123887992854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb7454c6ed51%3A0x683b3ab5565cd357!2sESPRIT!5e0!3m2!1sen!2stn!4v1561440545863!5m2!1sen!2stn" width="100%" height="538" frameBorder="0" style={{ border: 0 }} allowFullScreen data-aos="fade-left" data-aos-duration="3000"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
