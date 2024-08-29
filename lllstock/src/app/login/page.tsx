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
            // router.push("/dashboard"); // Adjust the route as necessary

        } catch (error) {
            console.error('Error in login', error);
            toast.error('Login failed. Please check your credentials and try again.'); // Ensure you have a toast configuration set up
        }
    };

    return (
        <div className="login-container min-h-screen relative flex">
            <div className="w-1/2 bg-[url('https://drinkmilkinglassbottles.com/wp-content/uploads/2017/01/5-Fun-Facts-About-Cows-Debunking-Common-Myths-768x583.jpg')] bg-cover bg-center"></div>
            
            {/* Right side, the registration form */}
            <div className="min-h-[calc(100vh-4em)] w-1/2 items-center justify-center p-2 bg-black">
                <Card className="border border-black">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-black">
                    <CardTitle className="text-white">Log In</CardTitle>
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

                    {/* Dropdown */}
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-solid font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                            type="button">
                            {userType}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-blue-700 rounded-lg shadow w-44" onMouseLeave={() => setDropdownOpen(false)}>
                                <ul className="py-2 text-sm text-white">
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() => setType('OWNER')}
                                            className="block px-4 py-2 hover:bg-blue-900">
                                            Owner
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() => setType('VET')}
                                            className="block px-4 py-2 hover:bg-blue-900 border-t border-blue-600">
                                            Vet
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="bg-blue-700 text-lg p-2">Log In</Button>
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
    );
}
