"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ButtonWithMail } from "@/components/ui/buttonWIthMail";
import { lllServer } from "@/utils/lllServer";
import { toast } from "sonner";
import { parseJwt } from "@/utils/jwtParser";

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
            await lllServer.post(`/auth/users/login?email=${email}&password=${password}`)
            .then((response: {data:{accessToken: string}}) => {
                console.log(response.data.accessToken)
                localStorage.setItem("jwt", response.data.accessToken)
                const payload = parseJwt(response.data.accessToken)
                console.log(payload)
                if(payload != null) {
                    const userId = payload.userId;
                    localStorage.setItem("userId", userId)
                    localStorage.setItem("userType", userType)
                    router.push("/");
                }
            })

            // Assuming successful login redirects to another page
            router.push("/dashboard"); // Adjust the route as necessary
        } catch (error) {
            console.error('Error in login', error);
            toast.error('Login failed. Please check your credentials and try again.'); // Ensure you have a toast configuration set up
        }
    };

        const handleForgotPassword = () => {
            router.push("/forgotPassword"); // Adjust the route as necessary
        };

    return (
        <div className="login-container min-h-screen relative flex">
            <div className="w-1/2 bg-[url('https://drinkmilkinglassbottles.com/wp-content/uploads/2017/01/5-Fun-Facts-About-Cows-Debunking-Common-Myths-768x583.jpg')] bg-cover bg-center"></div>
            
            {/* Right side, the registration form */}
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

                    <Button type="submit" className="bg-blue-700 text-lg p-2">Log In</Button>
                    <Button type="button" className="bg-blue-700 text-lg p-2" onClick={handleForgotPassword}>
                        Forgot Password
                    </Button> 
                </form>
            </Card>
        </div>
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
    )

}
