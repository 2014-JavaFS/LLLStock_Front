import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full h-64 md:w-1/2 md:h-96  bg-[url('https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2021/08/rubber-duck-stock-t.jpg')] bg-cover bg-center" />
            <h1>Welcome to the Home Page</h1>
            <p>This is the content of the home page.</p>
        </div>
    );
};

export default Home;