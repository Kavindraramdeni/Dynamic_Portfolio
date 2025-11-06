import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const auth = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await auth?.login(username, password);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="form-input w-full p-3"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="form-input w-full p-3"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center bg-cyan-500 text-white font-bold py-3 px-4 rounded-full uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 disabled:bg-cyan-800 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner />
                                    <span className="ml-2">Logging In...</span>
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
                 <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    Note: To create an admin account, use the `/api/auth/register` endpoint via a tool like Postman. For security, registration is a one-time operation.
                </p>
            </div>
        </div>
    );
};
