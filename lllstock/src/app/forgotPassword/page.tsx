"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
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

export default function forgotPassword() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const userInfo = {
                'email': email,
                'password': password,      
            }

            console.log(userInfo)
            const response = await lllServer.patch("/users/forgotPassword", userInfo);

            toast.success("Password reset successfully. You can now log in with your new password.");
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                router.push("/login");
            }, 2000); // Adjust the delay as necessary
        } catch (error) {
            console.error('Error updating password', error);
            toast.error("Failed to reset password. Please try again.");
        }
    };

    return (
    <div className="register-container min-h-screen flex">
            <div className="w-1/2 bg-[url('https://drinkmilkinglassbottles.com/wp-content/uploads/2017/01/5-Fun-Facts-About-Cows-Debunking-Common-Myths-768x583.jpg')] bg-cover bg-center"></div>
            
            {/* Right side, the forgot Password form */}
            <div className="min-h-screen w-1/2 flex items-center justify-center p-2 bg-black">
                <Card className="border border-black ">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-black">
                    <CardTitle className="text-white">Reset Password</CardTitle>
                    <p className="text-gray-400">Enter your email below to reset your password</p>

                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="border rounded-md p-2 placeholder-gray-500" 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="example@example.com"
                    required />
            
                    <label htmlFor="password" className="text-gray-300">Password:</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="border rounded-md p-2" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required />

                    <Button type="submit" className="bg-blue-700 text-lg p-2">Change Password</Button>

                    <p className="text-gray-400">
                        By clicking continue, you agree to our <br />
                        <a href="/terms" className="text-gray-400 underline hover:text-gray-400">Terms of Service</a> 
                        &nbsp;and&nbsp;
                        <a href="/privacy" className="text-gray-400 underline hover:text-gray-400">Privacy Policy</a>.
                    </p>
                </form>
                </Card>

            </div>
            {/*Rectangle behind logo*/}
        <div 
            className="absolute bg-gray-100 top-[16.5%] right-[35%] z-10"
            style={{ width: '12vw', height: '12vw', maxWidth: '200px', maxHeight: '100px', minWidth: '80px', minHeight: '80px' }}>
        </div>
        {/* Logo */}
        <img 
            src="https://i.im.ge/2024/08/17/fLbaGF.logoLLL.png" 
            className="absolute top-[15%] right-[36%] z-20 bg-white rounded-lg shadow-lg" 
            alt="Logo" 
            style={{ width: '12vw', maxWidth: '150px', minWidth: '80px', height: 'auto' }} 
        />
    </div>
        );
}
