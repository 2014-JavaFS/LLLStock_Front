"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ButtonWithMail } from "@/components/ui/buttonWIthMail";
import { lllServer } from "@/utils/lllServer";
import { toast } from "sonner";

export default function Login() {
    // User inputs
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setType] = useState('OWNER'); // FIXME hardcoded
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const userInfo = {
                password,
                email,
                userType
            };

            console.log(userInfo);
            const response = await lllServer.post("/users/login", userInfo);

            // Assuming successful login redirects to another page
            router.push("/dashboard"); // Adjust the route as necessary
        } catch (error) {
            console.error('Error in login', error);
            toast.error('Login failed. Please check your credentials and try again.'); // Ensure you have a toast configuration set up
        }
    };

    return (
    <div className="login-container min-h-screen flex">
            <div className="w-1/2 bg-[url('https://drinkmilkinglassbottles.com/wp-content/uploads/2017/01/5-Fun-Facts-About-Cows-Debunking-Common-Myths-768x583.jpg')] bg-cover bg-center"></div>
            
            {/* Right side, the registration form */}
            <div className="min-h-screen w-1/2 flex items-center justify-center p-2 bg-black">
                <Card className="border border-black ">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-black">
                    <CardTitle className="text-white">Log In</CardTitle>
                    <p className="text-gray-400">Log Into Your Account</p>

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

                    <Button type="submit" className="bg-blue-700 text-lg p-2">Log In</Button>
                    <a href="/forgot-password" className="text-blue-700 hover:underline text-sm mt-2">Forgot your password?</a>
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
