"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { ButtonWithMail } from "@/components/ui/buttonWIthMail";
import { lllServer } from "@/utils/lllServer";
import axios from 'axios';

export default function Register() {
    //user Inputs
    //const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setType] = useState('OWNER');
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const userInfo = {
                //'username': username,
                'email': email,
                'password': password,
                'userType': userType            
            }

            console.log(userInfo)
            const response = await lllServer.post("/users/register", userInfo)

            console.log(userInfo)
        }
        catch(error){
            console.error('Error on register', error);
        }
    };

    return (
    <div className="register-container min-h-screen relative flex">
            <div className="w-1/2 bg-[url('https://drinkmilkinglassbottles.com/wp-content/uploads/2017/01/5-Fun-Facts-About-Cows-Debunking-Common-Myths-768x583.jpg')] bg-cover bg-center"></div>
            
            {/* Right side, the registration form */}
            <main className="flex min-h-[calc(100vh-4em)] w-1/2 flex items-center justify-center p-2 bg-black">
                <Card className="border border-black">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-black">
                    <CardTitle className="text-white">Create an account</CardTitle>
                    <p className="text-gray-400">Enter your email below to create your account</p>
                    {/*
                    <label htmlFor="username" className="text-gray-300">Username:</label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className="border rounded-md p-2" 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    />
                    */}

                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="border rounded-md p-2 placeholder-gray-500" 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="example@example.com"
                    required 
                    />
            
                    <label htmlFor="password" className="text-gray-300">Password:</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="border rounded-md p-2" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    />

                    {/* Dropdown */}
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-solid font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                            type="button"
                        >
                            {userType}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-blue-700 rounded-lg shadow w-44" onMouseLeave={() => setDropdownOpen(false)}>
                                <ul className="py-2 text-sm text-white">
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() => setType('OWNER')}
                                            className="block px-4 py-2 hover:bg-blue-900"
                                        >
                                            Owner
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() => setType('VET')}
                                            className="block px-4 py-2 hover:bg-blue-900 border-t border-blue-600"
                                        >
                                            Vet
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="bg-blue-700 text-lg p-2">Create a account</Button>

                    <p className="text-gray-400">
                        By clicking continue, you agree to our <br />
                        <a href="/terms" className="text-gray-400 underline hover:text-gray-400">Terms of Service</a> 
                        &nbsp;and&nbsp;
                        <a href="/privacy" className="text-gray-400 underline hover:text-gray-400">Privacy Policy</a>.
                    </p>
                </form>
                </Card>

                <div className="absolute top-[6%] right-[3%]">
                    <ButtonWithMail></ButtonWithMail>
                </div>
            </main>
            {/*Rectangle behind logo*/}
        <div 
            className="absolute bg-gray-100 top-[8.5%] right-[35%] z-10"
            style={{ width: '12vw', height: '12vw', maxWidth: '200px', maxHeight: '100px', minWidth: '80px', minHeight: '80px' }}>
        </div>
        {/* Logo */}
        <img 
            src="https://i.im.ge/2024/08/17/fLbaGF.logoLLL.png" 
            className="absolute top-[7%] right-[36%] z-20 bg-white rounded-lg shadow-lg" 
            alt="Logo" 
            style={{ width: '12vw', maxWidth: '150px', minWidth: '80px', height: 'auto' }} 
        />
    </div>
        );
}