import type { ParsingError } from '../types/resume';

interface ErrorDisplayProps {
  errors: ParsingError[];
}

export default function ErrorDisplay({ errors }: ErrorDisplayProps) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mb-8 border border-red-100 w-full">
      <div className="flex items-center flex-wrap gap-2 mb-6 pb-4 border-b border-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-800">Parsing Issues</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-auto">
          {errors.length} {errors.length === 1 ? 'issue' : 'issues'} detected
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {errors.map((error, index) => (
          <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-start flex-wrap">
            <div className="text-red-500 mr-3 flex-shrink-0 mt-0.5 bg-red-100 rounded-full p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-red-800 break-words">{error.field}</div>
              <div className="text-sm text-red-700 mt-1 break-words">{error.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-blue-800">How to improve results</span>
        </div>
        <p className="text-sm text-blue-700 mb-2">
          These issues may affect the accuracy of the parsed resume. Please consider the following:
        </p>
        <ul className="list-disc ml-5 text-sm text-blue-700 space-y-1">
          <li>Include graduation years for all educational institutions</li>
          <li>Specify proficiency levels for skills (Beginner, Intermediate, Advanced, Expert)</li>
          <li>Make sure all dates are in a consistent format</li>
        </ul>
      </div>
    </div>
  );
}