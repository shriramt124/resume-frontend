// components/templates/OfficialTemplate.js
import React from 'react';
// If you want to use FontAwesome icons like in the Industrial template, uncomment the below:
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const OfficialTemplate = ({ data }) => {
    // Function to render HTML content safely
    const renderHTML = (html) => {
        return { __html: html };
    };

    // Define theme colors from data or use defaults
    const primaryColor = data?.primary_color || '#1e293b';
    const secondaryColor = data?.secondary_color || '#475569';
    const accentColor = data?.accent_color || '#3b82f6';
    const surfaceColor = data?.surface_color || '#f8fafc';

    return (
        <div className="w-full font-sans" style={{
            fontFamily: data?.font_family || 'Arial, sans-serif',
            fontWeight: data?.is_font_bold ? 'bold' : 'normal',
            fontStyle: data?.is_font_italic ? 'italic' : 'normal'
        }}>
            <div className="flex flex-col md:flex-row">
                {/* Left Column */}
                <div className="w-full md:w-[28%] p-8"
                     style={{ backgroundColor: primaryColor, color: 'white' }}>
                    {/* Name and Title */}
                    <h1 className="text-2xl font-bold mb-2 uppercase tracking-wider text-white">
                        {data?.first_name || 'John'} {data?.last_name || 'Doe'}
                    </h1>
                    <p className="text-base mb-8 italic"
                       style={{ color: accentColor }}>
                        {data?.occupation || 'Professional'}
                    </p>

                    {/* Contact Section */}
                    <div className="mb-8">
                        <h2 className="text-lg uppercase text-white mb-4 pb-2 border-b-2"
                            style={{ borderColor: accentColor }}>
                            Contact
                        </h2>
                        <div className="space-y-3">
                            {data?.email && (
                                <div className="p-2 text-sm"
                                     style={{ backgroundColor: `${accentColor}1a` }}>
                                    {data.email}
                                </div>
                            )}
                            {data?.phone && (
                                <div className="p-2 text-sm"
                                     style={{ backgroundColor: `${accentColor}1a` }}>
                                    {data.phone}
                                </div>
                            )}
                            {(data?.city || data?.country) && (
                                <div className="p-2 text-sm"
                                     style={{ backgroundColor: `${accentColor}1a` }}>
                                    {data?.city || ''}
                                    {data?.city && data?.country ? ', ' : ''}
                                    {data?.country || ''}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Expertise Section */}
                    {data?.skill && data.skill.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg uppercase text-white mb-4 pb-2 border-b-2"
                                style={{ borderColor: accentColor }}>
                                Expertise
                            </h2>
                            <div className="space-y-2">
                                {data.skill.map((skill, index) => (
                                    <div
                                        key={`skill-${index}`}
                                        className="p-2 text-sm"
                                        style={{ backgroundColor: `${accentColor}1a` }}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages Section */}
                    {data?.language && data.language.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg uppercase text-white mb-4 pb-2 border-b-2"
                                style={{ borderColor: accentColor }}>
                                Languages
                            </h2>
                            <div className="space-y-2">
                                {data.language.map((language, index) => (
                                    <div
                                        key={`lang-${index}`}
                                        className="p-2 text-sm"
                                        style={{ backgroundColor: `${accentColor}1a` }}
                                    >
                                        {language}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-full md:w-[72%] bg-white p-8">
                    {/* Professional Profile */}
                    {data?.professional_description && (
                        <div className="mb-8">
                            <h2 className="text-xl mb-4 pb-2 border-b-2"
                                style={{ color: primaryColor, borderColor: accentColor }}>
                                Professional Profile
                            </h2>
                            <div
                                className="text-sm mb-4"
                                style={{ color: secondaryColor }}
                                dangerouslySetInnerHTML={renderHTML(data.professional_description)}
                            ></div>
                        </div>
                    )}

                    {/* Professional Experience */}
                    {data?.job_title && data.job_title.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl mb-4 pb-2 border-b-2"
                                style={{ color: primaryColor, borderColor: accentColor }}>
                                Professional Experience
                            </h2>

                            {data.job_title.map((title, index) => (
                                title && (
                                    <div key={`job-${index}`} className="mb-5">
                                        <h3 className="text-lg font-bold mb-1"
                                            style={{ color: primaryColor }}>
                                            {title}
                                        </h3>
                                        <p className="text-base mb-1"
                                           style={{ color: accentColor }}>
                                            {data.employer?.[index] || ''}
                                        </p>
                                        <span className="inline-block py-1 px-3 mb-2 text-sm text-white"
                                              style={{ backgroundColor: primaryColor }}>
                                            {data.job_begin?.[index] || ''} - {data.job_end?.[index] || 'Present'}
                                        </span>
                                        {data.job_description?.[index] && (
                                            <div
                                                className="text-sm"
                                                style={{ color: secondaryColor }}
                                                dangerouslySetInnerHTML={renderHTML(data.job_description[index])}
                                            ></div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    )}

                    {/* Education */}
                    {data?.college && data.college.length > 0 && data.college[0] && (
                        <div className="mb-8">
                            <h2 className="text-xl mb-4 pb-2 border-b-2"
                                style={{ color: primaryColor, borderColor: accentColor }}>
                                Education
                            </h2>

                            {data.college.map((college, index) => (
                                <div key={`edu-${index}`} className="mb-5">
                                    <h3 className="text-lg font-bold mb-1"
                                        style={{ color: primaryColor }}>
                                        {data.degree?.[index] || ''}
                                    </h3>
                                    <p className="text-base mb-1"
                                       style={{ color: accentColor }}>
                                        {college}
                                    </p>
                                    <span className="inline-block py-1 px-3 mb-2 text-sm text-white"
                                          style={{ backgroundColor: primaryColor }}>
                                        {data.college_begin?.[index] || ''} - {data.college_end?.[index] || ''}
                                    </span>
                                    {data.college_description?.[index] && (
                                        <div
                                            className="text-sm"
                                            style={{ color: secondaryColor }}
                                            dangerouslySetInnerHTML={renderHTML(data.college_description[index])}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Additional Sections */}
                    {data?.other_title && data.other_title.length > 0 && data.other_title[0] && (
                        data.other_title.map((title, index) => (
                            title && (
                                <div key={`other-${index}`} className="mb-8">
                                    <h2 className="text-xl mb-4 pb-2 border-b-2"
                                        style={{ color: primaryColor, borderColor: accentColor }}>
                                        {title}
                                    </h2>
                                    {data.other_description?.[index] && (
                                        <div
                                            className="text-sm"
                                            style={{ color: secondaryColor }}
                                            dangerouslySetInnerHTML={renderHTML(data.other_description[index])}
                                        ></div>
                                    )}
                                </div>
                            )
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfficialTemplate;