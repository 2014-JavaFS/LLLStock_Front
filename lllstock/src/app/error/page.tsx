"use client";
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Define the props type
interface ErrorPageProps {
  statusCode?: number;
  errorMessage?: string;
}

// Use NextPage for the error page component
const ErrorPage: NextPage<ErrorPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const status = searchParams.get('statusCode');
    const message = searchParams.get('errorMessage');
    
    if (status) {
      setStatusCode(parseInt(status, 10));
    }
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-lg mb-4 text-white">We&apos;re sorry, but something went wrong. Please try again later.</p>
        {statusCode !== undefined && <p className="text-sm text-white mb-4">Error Code: {statusCode}</p>}
        {errorMessage && <p className="text-sm text-white mb-4">Error Message: {errorMessage}</p>}
        <button onClick={() => router.push('/')} className="bg-blue-500 text-white p-2 rounded">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
