import { useState } from 'react';

interface ResumeFormProps {
  onSubmit: (text: string) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const [resumeText, setResumeText] = useState('');
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resumeText);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-100 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Upload Resume</h2>
          <p className="text-sm text-gray-500 mt-1">Paste your resume text below for analysis</p>
        </div>
        <button 
          type="button" 
          onClick={() => setShowTips(!showTips)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors self-end sm:self-auto"
          aria-expanded={showTips}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {showTips ? 'Hide Tips' : 'Show Tips'}
        </button>
      </div>
      
      {showTips && (
        <div className="bg-blue-50 p-4 sm:p-5 rounded-lg mb-5 text-sm border border-blue-100 shadow-inner">
          <h3 className="font-medium text-blue-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Tips for better results:
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-blue-700 my-3">
            <li>Include <strong className="font-semibold">graduation years</strong> for all educational institutions</li>
            <li>Clearly state your <strong className="font-semibold">proficiency level</strong> for skills (Beginner, Intermediate, Advanced, Expert)</li>
            <li>Format work experience with clear start and end dates</li>
            <li>Include full institution names and degree details</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                <path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
              </svg>
              Example format:
            </h4>
            <div className="bg-white rounded p-3 border border-blue-100 text-blue-700 italic">
              "Bachelor of Science in Computer Science from MIT, graduated 2019"
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full">
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-inner 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition duration-200 ease-in-out text-gray-700"
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          {resumeText.length > 0 && (
            <button 
              type="button" 
              onClick={() => setResumeText('')}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"
              aria-label="Clear text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-2">
          <div className="text-sm text-gray-500">
            {resumeText.length > 0 ? `${resumeText.length} characters` : 'No text entered'}
          </div>
          <button
            type="submit"
            disabled={!resumeText.trim()}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 
                     transition-all duration-200 shadow-md hover:shadow-lg
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="flex items-center space-x-2">
              <span>Parse Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}