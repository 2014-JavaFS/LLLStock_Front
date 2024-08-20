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


export default function Register() {
    //user Inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const userInfo = {
                'username': username,
                'password': password,
                'email': email,
            }

            //change to axios post
            //const response = await fetch("");
            //const response = await server.post("/register", userInfo)

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
                <CardTitle className="text-gray-300">Create an account</CardTitle>
                
                <label htmlFor="username" className="text-gray-300">Username:</label>
                <input 
                type="text" 
                id="username" 
                name="username" 
                className="border rounded-md p-2" 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                />
        
                <label htmlFor="email" className="text-gray-300">Email:</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                className="border rounded-md p-2" 
                onChange={(e) => setEmail(e.target.value)} 
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
        
                <Button type="submit" className="bg-blue-700 text-lg p-2">Register</Button>
        
                <div className="container-login text-center">
                <p className="text-gray-300">Already have an account?</p>
                <ButtonWithMail></ButtonWithMail>
                </div>
            </form>
            </Card>
        </main>
        
        {/*Logo*/}
        <div className="absolute w-[185px] h-20 bg-gray-100 top-[6.5rem] right-[42.5rem] z-10"></div>
        <img 
            src="https://i.im.ge/2024/08/17/fLbaGF.logoLLL.png" 
            className="absolute top-[5rem] right-[43.5rem] z-20 bg-white rounded-lg shadow-lg" 
            alt="Logo" 
            width="150"
        />
    </div>
        );
}