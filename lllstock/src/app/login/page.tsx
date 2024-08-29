"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { parseJwt } from "@/utils/jwtParser";
import { lllServer } from "@/utils/lllServer";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/authContext";

export default function Login() {
    // User inputs
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setType] = useState('OWNER');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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
                    localStorage.setItem("userId", JSON.stringify(userId));
                    router.push("/");
                    setIsLoggedIn(true);
                }
            })

            router.push("/");
        } catch (error) {
            console.error('Error in login', error);
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };

        const handleForgotPassword = () => {
            router.push("/forgotPassword");
        };

    const handleProfile = () => {
        router.push("/profile");
    };


    return (
        <div className="login-container min-h-screen relative flex">
            <div className="w-1/2 bg-[url('https://drinkmilkinglassbottles.com/wp-content/uploads/2017/01/5-Fun-Facts-About-Cows-Debunking-Common-Myths-768x583.jpg')] bg-cover bg-center"></div>
            
            {/* Right side, the registration form */}
            <div className="min-h-screen w-1/2 flex items-center justify-center p-2 bg-black">
                <Card className="border border-black ">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-black">
                    <CardTitle className="text-white">Log In</CardTitle>
                    <p className="text-gray-400">Log in to your account</p>                    
                    <label htmlFor="email" className="text-gray-300">Email:</label>
                    <input 

                        type="text" 
                        id="email" 
                        name="email" 
                        className="border rounded-md p-2 pr-10" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="example@example.com"
                        required 
                    />

                    <label htmlFor="password">Password:</label>
                    <div className="password-input relative">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id="password" 
                            className="border rounded-md p-2 pr-10" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon> 
                        </button>
                    </div>

                    <Button type="submit" className="bg-blue-700 text-lg p-2" onClick={handleProfile}>Log In</Button>
                    <p className="text-gray-400">Forgot your password?</p>
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
