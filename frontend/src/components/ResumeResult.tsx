import type { Resume } from '../types/resume';

interface ResumeResultsProps {
  resume: Resume;
}

export default function ResumeResults({ resume }: ResumeResultsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mb-8 border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Resume Analysis</h2>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full">
          Processed successfully
        </span>
      </div>
      
      <div className="space-y-10">
        {/* Skills Section */}
        <section>
          <div className="flex items-center mb-5 flex-wrap">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Skills & Expertise</h3>
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proficiency</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resume.skills.map((skill, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${skill.proficiency === 'Expert' ? 'bg-green-100 text-green-800' :
                            skill.proficiency === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                            skill.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {skill.proficiency}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 break-words">
                        {skill.context || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section>
          <div className="flex items-center mb-5">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Professional Experience</h3>
          </div>
          <div className="space-y-4">
            {resume.workExperience.map((exp, index) => (
              <div key={index} className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                  <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium inline-block">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-md font-medium text-indigo-600 mb-3">{exp.company}</p>
                <p className="text-sm text-gray-600 leading-relaxed break-words">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <div className="flex items-center mb-5">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Education</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.education.map((edu, index) => (
              <div key={index} className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-1 flex-wrap gap-1">
                  <svg className="h-5 w-5 text-indigo-500 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-900 break-words">{edu.institution}</h4>
                </div>
                <p className="text-md font-medium text-indigo-600 mb-2">{edu.degree} in {edu.major}</p>
                <div className="flex items-center">
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                    Graduated: {edu.graduationYear || 'Not specified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}