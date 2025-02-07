import { useState } from "react";
import { FaBold, FaFont, FaItalic } from "react-icons/fa";
import ColorPicker from "@/components/sections/ColorPicker";

// Default data for preview
const defaultData = {
  first_name: "John",
  last_name: "Doe",
  occupation: "Software Engineer",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  city: "New York",
  country: "USA",
  professional_description: "<p>Experienced software engineer with a passion for building scalable and efficient web applications. Proficient in JavaScript, React, and Node.js.</p>",
  job_title: ["Senior Software Engineer", "Software Engineer"],
  employer: ["Tech Corp", "Innovate Inc"],
  job_begin: ["2018", "2015"],
  job_end: ["Present", "2018"],
  job_description: [
    "<p>Led a team of developers to build a scalable e-commerce platform.</p>",
    "<p>Developed and maintained web applications using React and Node.js.</p>"
  ],
  college: ["University of Tech", "State College"],
  degree: ["Bachelor of Science in Computer Science", "Associate Degree in IT"],
  college_begin: ["2011", "2009"],
  college_end: ["2015", "2011"],
  college_description: [
    "<p>Graduated with honors, focusing on software development and algorithms.</p>",
    "<p>Completed foundational courses in programming and systems design.</p>"
  ],
  internship_title: ["Software Development Intern"],
  internship_summary: [
    "<p>Assisted in the development of a mobile application using Flutter.</p>"
  ],
  certificate_title: ["Certified JavaScript Developer"],
  certificate_description: [
    "<p>Completed advanced JavaScript courses and passed the certification exam.</p>"
  ],
  other_title: ["Volunteer Work"],
  other_description: [
    "<p>Volunteered as a mentor for coding bootcamps, helping students learn programming basics.</p>"
  ],
  skill: ["JavaScript", "React", "Node.js", "Python", "SQL"],
  language: ["English", "Spanish"]
};

// Helper function to merge data with defaultData, only using defaults if data is empty or undefined
const mergeDataWithDefaults = (data, defaultData) => {
  const mergedData = { ...defaultData };

  for (const key in data) {
    if (Array.isArray(data[key])) {
      // For arrays, only override if array exists and has non-empty values
      const hasNonEmptyValues = data[key].some(item => item !== '' && item !== undefined);
      if (data[key].length > 0 && hasNonEmptyValues) {
        mergedData[key] = data[key];
      }
    } else if (data[key] !== undefined && data[key] !== '') {
      // For non-arrays, override if value exists and is not empty
      mergedData[key] = data[key];
    }
  }

  return mergedData;
};

const ModernTemplate = ({ data = {}, fontStyles, isModalView }) => {
  // Merge user-provided data with defaultData, ensuring defaults are only used when data is empty
  const mergedData = mergeDataWithDefaults(data, defaultData);

  return (
      <div>
        {/* Main Template */}
        <div
            style={{
              fontFamily: fontStyles.font_family,
              color: fontStyles.font_color,
              fontWeight: fontStyles.is_font_bold ? "bold" : "normal",
              fontStyle: fontStyles.is_font_italic ? "italic" : "normal",
              padding: "10px",
              //width: '210mm',
              minHeight: '250mm',
            }}
        >
          {/* Heading Section */}
          <div className={`border-b-2 border-blue-400 pb-4 mb-4 ${isModalView ? 'text-lg' : 'text-sm'}`}>
            <div>
              <h1 className={`font-bold mb-2 ${isModalView ? 'text-2xl' : 'text-lg'}`}>{`${mergedData.first_name} ${mergedData.last_name}`}</h1>
              <div className={`text-blue-600 font-medium ${isModalView ? 'text-xl' : 'text-lg'}`}>
                {mergedData.occupation}
              </div>
            </div>
            <div className={`text-right text-gray-600 ${isModalView ? 'text-lg' : 'text-sm'}`}>
              <p>{mergedData.email}</p>
              <p>{mergedData.phone}</p>
              <p>{`${mergedData.city}, ${mergedData.country}`}</p>
            </div>
          </div>
          {/* Other sections */}
          <div className="mb-8">
            <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
              Professional Summary
            </h2>
            <div
                dangerouslySetInnerHTML={{__html: mergedData.professional_description}}
                className="prose max-w-none"
            />
          </div>
          <div className="mb-8">
            <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
              Experience
            </h2>
            {mergedData.job_title.map((title, index) => (
                <div key={index} className="mb-4">
                  <div className={`font-semibold ${isModalView ? 'text-xl' : 'text-lg'} mb-1`}>{title}</div>
                  <div className="flex justify-between text-blue-600 mb-2">
                    <span>{mergedData.employer[index]}</span>
                    <span
                        className={`text-gray-500 ${isModalView ? 'text-base' : 'text-sm'}`}>{`${mergedData.job_begin[index]} - ${mergedData.job_end[index]}`}</span>
                  </div>
                  <div
                      dangerouslySetInnerHTML={{__html: mergedData.job_description[index]}}
                      className="prose max-w-none"
                  />
                </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
              Education
            </h2>
            {mergedData.college.map((college, index) => (
                <div key={index} className="mb-4">
                  <div className={`font-semibold ${isModalView ? 'text-xl' : 'text-lg'}`}>{mergedData.degree[index]}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600">{college}</span>
                      <span className={`text-gray-500 ${isModalView ? 'text-base' : 'text-sm'}`}>
                    {`${mergedData.college_begin[index]} - ${mergedData.college_end[index]}`}
                  </span>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{__html: mergedData.college_description[index]}}
                        className="prose max-w-none text-gray-600"
                    />
                  </div>
                </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
              Internships
            </h2>
            {mergedData.internship_title && mergedData.internship_title.map((title, index) => (
                <div key={index} className="mb-4">
                  <div className={`font-semibold ${isModalView ? 'text-xl' : 'text-lg'}`}>{title}</div>
                  <div className="space-y-2">
                    <div
                        dangerouslySetInnerHTML={{__html: mergedData.internship_summary[index]}}
                        className="prose max-w-none text-gray-600"
                    />
                  </div>
                </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
              Certificates
            </h2>
            {mergedData.certificate_title && mergedData.certificate_title.map((title, index) => (
                <div key={index} className="mb-4">
                  <div className={`font-semibold ${isModalView ? 'text-xl' : 'text-lg'}`}>{title}</div>
                  <div className="space-y-2">
                    <div
                        dangerouslySetInnerHTML={{__html: mergedData.certificate_description[index]}}
                        className="prose max-w-none text-gray-600"
                    />
                  </div>
                </div>
            ))}
          </div>
          {mergedData.other_title && mergedData.other_title.map((title, index) => (
              <div className="mb-8">
                <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
                  {title}
                </h2>
                <div key={index} className="mb-4">
                  <div className="space-y-2">
                    <div
                        dangerouslySetInnerHTML={{__html: mergedData.other_description[index]}}
                        className="prose max-w-none text-gray-600"
                    />
                  </div>
                </div>
              </div>
          ))}
          <div className="mb-8">
            <h2 className={`font-semibold border-b pb-2 mb-4 ${isModalView ? 'text-xl' : 'text-lg'}`}>
              Skills & Languages
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  {mergedData.skill.map((skill, index) => (
                      <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded text-sm border"
                      >
                    {skill}
                  </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {mergedData.language.map((lang, index) => (
                      <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded text-sm border"
                      >
                    {lang}
                  </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ModernTemplate;