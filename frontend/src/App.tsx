import { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ErrorDisplay from './components/ErrorDisplay';
import ResumeResults from './components/ResumeResult';
import type { Resume } from './types/resume';

export default function App() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    setError('');
    setResume(null);
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResume(data);
      }
    } catch (err) {
      setError('Failed to parse resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 w-full overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center py-8">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center">
              <div className="bg-indigo-600 text-white rounded-lg p-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">ResumeAI</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Intelligent Resume Parser</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Automatically extract skills, experience, and education from your resume with our advanced AI technology.
          </p>
        </header>
        
        <div className="max-w-7xl mx-auto">
          <ResumeForm onSubmit={handleSubmit} />
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center my-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-red-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}
          
          {resume && (
            <>
              <ResumeResults resume={resume} />
              <ErrorDisplay errors={resume.errors} />
            </>
          )}
        </div>
        
        <footer className="mt-16 text-center border-t border-gray-200 pt-8 pb-12 w-full">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <span className="sr-only">Documentation</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-2">Powered by advanced natural language processing</p>
        </footer>
      </div>
    </div>
  );
}