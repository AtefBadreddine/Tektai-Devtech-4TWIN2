import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../auth/useAuth";

import Cookies from "js-cookie";
import userService from "../../services/userService";
import SpinnerWithBackground from "../../components/spinner/spinner";
import mailService from "../../services/MailService";

const MailConfirmation = () => {
    const auth = useAuth();
    const searchParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const confirmMail = async (token) => {
       return mailService.confirmMail(token);
    };

    useEffect(() => {
        const token = searchParams.get("token");
        confirmMail(token)
            .then(response => {
                if (response.message === 'Email confirmed successfully') {
                 navigate(`/?mail-confirmed=true`);
             } else {
                 navigate(`/?mail-confirmed=false`);
             }
            })
            .catch(error => {
                console.error('Error confirming email:', error);
                navigate(`/?mail-confirmed=false`);
            });

    }, []);

    return <SpinnerWithBackground />;
};

export default MailConfirmation;
