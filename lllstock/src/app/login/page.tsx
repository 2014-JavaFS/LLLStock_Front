"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
 
const Login : FC = () => {
    //user inputs
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setType] = useState('OWNER'); //FIXME hardcoded
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const userInfo = {
                'password': password,
                'email': email,
                'userType': userType
            }

            console.log(userInfo)
            const response = await lllServer.post("/users/login", userInfo)

            if (isMounted) {
            router.push("/Profile");
            }
        } catch(error) {
            console.error('Error in login', error);
            toast.error('login failed');
        }
    };

    if(!isMounted) {
        return null;
    }

    return (
    <div className="login-container min-h-screen relative flex">
        <div className="flex min-h-[calc(100vh-4em)] flex-col items-center justify-center p-24">
            <Card>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <CardTitle>Login</CardTitle>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        className="border rounded-md p-2" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="example@example.com"
                        required 
                    />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="border rounded-md p-2" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <Button type="submit" className="bg-blue-700 text-lg p-2">
                        Login
                    </Button>

                    <div className="register-container text-center">
                        <p>Need to sign up?</p>
                        <ButtonWithMail></ButtonWithMail>
                    </div>
                </form>
            </Card>
        </div>
    </div>
    );
}
export default Login;