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

    return (<div className="register-container">
        <main className="flex min-h-[calc(100vh-4em)] flex-col items-center justify-center p-24">
            <Card>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <CardTitle>Register</CardTitle>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" className="border rounded-md p-2" onChange={(e) => setUsername(e.target.value)} required/>
    
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" className="border rounded-md p-2" onChange={(e) => setEmail(e.target.value)} required/>
    
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" className="border rounded-md p-2" onChange={(e) => setPassword(e.target.value)} required/>
    
                    <Button onClick={handleSubmit} type="submit" className="bg-blue-700 text-lg p-2">
                        Register
                    </Button>
    
                    <div className="container-login text-center">
                        <p>Already have an account?</p>
                        <ButtonWithMail></ButtonWithMail>
                    </div>
                </form>
            </Card>
        </main>
    </div>);
}
