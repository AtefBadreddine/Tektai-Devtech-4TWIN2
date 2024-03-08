import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../ContactUs/contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Button, useDisclosure } from "@chakra-ui/react";

const ContactForm = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);

  const toggleAlert = () => {
    // Your toggleAlert logic here
  };

  const onSubmit = async (data) => {
    // Your onSubmit logic here
  };

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Contact Us</DrawerHeader>
        <DrawerBody>
          <div className="bg-info contact4 overflow-hiddedn position-relative">
            <div className="row no-gutters">
              <div className="container">
                <div className="col-lg-6 contact-box mb-4 mb-md-0">
                  <div className="">
                    <h1 className="title font-weight-light text-white mt-2">Contact Us</h1>
                    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mt-2">
                            <input className="form-control text-white" type="text" placeholder="name" {...register("name")} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mt-2">
                            <input className="form-control text-white" type="email" placeholder="email address" {...register("email")} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mt-2">
                            <textarea className="form-control text-white" rows="3" placeholder="message" {...register("message")} />
                          </div>
                        </div>
                        <div className="col-lg-12 d-flex align-items-center mt-2">
                          <button type="submit" className="btn bg-white text-inverse px-3 py-2" disabled={disabled}><span> Submit</span></button>
                          <span className="ml-auto text-white align-self-center">
                            <FontAwesomeIcon icon={faPhone} className="mr-2" />
                            +216 53 222 332
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 right-image p-r-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.097263291829!2d10.151678615210185!3d36.86123887992854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb7454c6ed51%3A0x683b3ab5565cd357!2sESPRIT!5e0!3m2!1sen!2stn!4v1561440545863!5m2!1sen!2stn" width="100%" height="538" frameBorder="0" style={{ border: 0 }} allowFullScreen data-aos="fade-left" data-aos-duration="3000"></iframe>
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const PlacementExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        Contact Us
      </Button>
      <ContactForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PlacementExample;
