import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import {useAuth} from "../../auth/useAuth";

import Cookies from 'js-cookie';
import userService from "../../services/userService";
import SpinnerWithBackground from "../../components/spinner/spinner";


const AuthSuccessRedirect = (props) => {

    const auth = useAuth();
    const searchParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const fetchUser = async () => {
        const token = Cookies.get('token');
        if (token) {
            const user = await userService.getProfile(token);
            auth.login(token, user);
           if (user && user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        const email = searchParams.get('email');
        const username = searchParams.get('username');
        if (email ) {
            navigate(`/signup?username=${username}&email=${email}`)
        }
        else fetchUser();
    }, []);

    return (
       <SpinnerWithBackground/>
    )
}

export default AuthSuccessRedirect