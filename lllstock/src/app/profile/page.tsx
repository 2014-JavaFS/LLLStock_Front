'use client';
import React from 'react';
import { useRouter } from "next/navigation";



const ProfileCard: React.FC = () => {
    const router = useRouter();

    const handleFarmers= () => {
        router.push("/farmers"); // Adjust the route as necessary
    };

    const handleprofileChange =() => {
        router.push("/edit_profile"); // Adjust the route as necessary
    };
    

    return (
        <div 
            className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
            style={{ backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')" }}
        >
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                {/* Main Col */}
                <div
                    id="profile"
                    className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
                >
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        {/* Image for mobile view */}
                        <div
                            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}
                        ></div>
                        <h1 className="text-3xl font-bold pt-8 lg:pt-0">Welcome!</h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                       
                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                            <svg
                                className="h-4 fill-current text-green-700 pr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                            </svg>
                            Your Location - 25.0000° N, 71.0000° W
                        </p>
                        <p className="pt-8 text-sm">
                            Totally optional short description about yourself, what you do and so on.
                        </p>
                        <div className="pt-12 pb-8">
                            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onClick={handleFarmers}>
                                view Farmers
                            </button>
                            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onClick={handleprofileChange}>
                                Edit Profile
                            </button>
                        </div>
                        <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
                            <a className="link" href="#" data-tippy-content="@facebook_handle">
                                <svg
                                    className="h-6 fill-current text-gray-600 hover:text-green-700"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Facebook</title>
                                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                                </svg>
                            </a>
                            <a className="link" href="#" data-tippy-content="@twitter_handle">
                                <svg
                                    className="h-6 fill-current text-gray-600 hover:text-green-700"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Twitter</title>
                                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                                </svg>
                            </a>
                            <a className="link" href="#" data-tippy-content="@github_handle">
                                <svg
                                    className="h-6 fill-current text-gray-600 hover:text-green-700"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>GitHub</title>
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.026c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.086-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.304-.54-1.527.105-3.176 0 0 1.005-.322 3.3 1.23a11.43 11.43 0 0 1 3-.405c1.02.004 2.045.137 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.649.24 2.872.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222v3.293c0 .317.21.688.825.573C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Image Col */}
                <div className="w-full lg:w-2/5">
                    {/* Big profile image for side bar (desktop) */}
                    <img
                        src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                        className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
