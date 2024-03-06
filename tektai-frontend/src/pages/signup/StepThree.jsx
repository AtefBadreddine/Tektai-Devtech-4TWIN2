import {useAuth} from "../../auth/useAuth";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../services/userService";
import userService from "../../services/userService";

export default function  StepThree  ( { formData, handleInput, handleNext, handlePrevious } )  {
    console.log("step 3" ,formData)
    const auth = useAuth();
    const navigate = useNavigate();
    const [submitted,setSubmitted] = useState(false);

    useEffect(() => {
        if (formData.role === 'challenger') {
            setTimeout(async () => {
                await submit()
            }, 4000)
        }



    }, [])

    const submit = async () => {
        setSubmitted(true);
        const response = await UserService.signup(formData);
        console.log('res:',response)
        if (response.statusCode === 201) {
            const data = await userService.getJWT(formData.username, formData.password);
            console.log('data:',data)
            if (data && data.access_token) {
                const {access_token} = data;

                const user = await userService.getUser(access_token, formData.username)
                console.log('user:',user)
                auth.login(access_token, user);
                if (user && user.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            }

        }
        else {
            return  <div className="">
                <h1 className="h2 text-red-600 pb-4">An Error Ocuured ! </h1>
                <div className="inline-flex gap-x-2">You will be redirected to home page in few seconds
                </div>
            </div>
        }
    }
    if (formData.role === 'challenger' || submitted === true) {
        return (
            <div className="">
                <h1 className="h2 text-blue-600 pb-4">You are all set ! </h1>
                <div className="inline-flex gap-x-2">You will be redirected to challenges page in few seconds

                    <div role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="h2 text-blue-600 pb-8">You are almost done ! </h1>
                <form onSubmit={submit}>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="companyName">Company
                                name <span className="text-red-600">*</span></label>
                            <input id="companyName" type="text" name="companyName" onChange={handleInput}
                                   className="form-input w-full text-gray-800" placeholder="Enter your company name"
                                   required/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="adresse">Legal
                                Address <span className="text-red-600">*</span></label>
                            <input id="adresse" type="text" name="adresse" onChange={handleInput}
                                   className="form-input w-full text-gray-800" placeholder="Enter your email address"
                                   required/>
                        </div>
                    </div>


                    <div className="flex flex-wrap mx-auto max-w-xs mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                                    type="submit">Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}