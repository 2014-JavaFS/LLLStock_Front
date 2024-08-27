import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/navigation';

// Define the props type
interface ErrorPageProps {
  statusCode?: number;
}

// Use NextPage for the error page component
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-lg mb-4 text-white">We&apos;re sorry, but something went wrong. Please try again later.</p>
        <p className="text-sm text-white mb-4">Error Code: {statusCode || 'An unexpected error occurred'}</p>
        <button onClick={() => router.push('/')} className="bg-blue-500 text-white p-2 rounded">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

// Define getInitialProps
ErrorPage.getInitialProps = async (context: NextPageContext) => {
  const { res, err } = context;

  // Return the status code if available or fallback to a general error message
  return {
    statusCode: res ? res.statusCode : (err ? err.statusCode : 404),
  };
};

export default ErrorPage;