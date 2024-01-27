import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export function Login() {
    const { user, setUser } = useContext(UserContext);
    const passwordRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    const login = async (e) => {
        e.preventDefault();
        const response = await axios.post('/login', {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }).catch(e => {
            toast.error(e.response.data.message);
            return e.response;
        })
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
        }
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" >
                                <>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 "
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="name@domain.com"
                                    />
                                </>

                                <>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 "
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        ref={passwordRef}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    />
                                </>


                                <div>
                                    <button
                                        type="submit"
                                        onClick={login}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member? &nbsp;
                                <Link
                                    to="/register"
                                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                >
                                    Create a Free Account
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
