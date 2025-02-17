import React from 'react';

const ExecutiveTemplate = ({
                               data = {},
                               fontStyles = {},
                               defaultData = {},
                               isModalView = false,
                           }) => {
    const mergeDataWithDefaults = (data, defaultData) => {
        const mergedData = { ...defaultData };
        for (const key in data) {
            if (Array.isArray(data[key])) {
                const hasNonEmptyValues = data[key].some(item => item !== '' && item !== undefined);
                if (data[key].length > 0 && hasNonEmptyValues) {
                    mergedData[key] = data[key];
                }
            } else if (data[key] !== undefined && data[key] !== '') {
                mergedData[key] = data[key];
            }
        }
        return mergedData;
    };

    const mergedData = mergeDataWithDefaults(data, defaultData);

    const cssVariables = {
        '--primary': data.primary_color || '#2b3a55',
        '--accent': data.accent_color || '#ce5a67',
        '--gold': data.highlight_color || '#c5a572',
        '--light': data.bg_light_color || '#f8f9fa',
        '--dark': data.text_color || '#1a1a1a',
        '--border': data.border_color || '#e5e7eb',
    };

    return (
        <div className="w-full bg-white p-1" style={{
            ...cssVariables,
            fontFamily: data.font_family || "'Playfair Display', Georgia, serif",
            fontWeight: data.is_font_bold ? 'bold' : 'normal',
            fontStyle: data.is_font_italic ? 'italic' : 'normal',
            color: 'var(--dark)',
        }}>
            {/* Header Section */}
            <header className="relative mb-8 pb-5 border-b-2" style={{ borderColor: 'var(--gold)' }}>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-2 tracking-tight" style={{ color: 'var(--primary)' }}>
                        {`${mergedData.first_name || 'John'} ${mergedData.last_name || 'Doe'}`}
                    </h1>
                    <p className="text-2xl italic mb-5" style={{ color: 'var(--accent)' }}>
                        {mergedData.occupation || 'Executive Professional'}
                    </p>
                    <div className="mt-5 table w-full border-separate" style={{ borderSpacing: '15px' }}>
                        <div className="table-row">
              <span className="table-cell text-center p-1 font-sans text-sm">
                {mergedData.email || 'email@example.com'}
              </span>
                            <span className="table-cell text-center p-1 font-sans text-sm">
                {mergedData.phone || '(555) 123-4567'}
              </span>
                            <span className="table-cell text-center p-1 font-sans text-sm">
                {`${mergedData.city || 'City'}${mergedData.country ? ', ' + mergedData.country : ''}`}
              </span>
                        </div>
                    </div>
                </div>
                <div className="absolute top-[-20px] right-[-20px] w-[150px] h-[150px] opacity-10"
                     style={{
                         background: 'var(--primary)',
                         clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                     }} />
            </header>

            {/* Main Content */}
            <div className="table w-full border-separate" style={{ borderSpacing: '30px' }}>
                {/* Left Column */}
                <div className="table-cell w-[65%] align-top">
                    {/* Professional Summary */}
                    {mergedData.professional_description && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Executive Profile
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: mergedData.professional_description }} />
                        </section>
                    )}

                    {/* Experience Section */}
                    {mergedData.job_title?.length > 0 && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Leadership Experience
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            {mergedData.job_title.map((title, index) => (
                                title && (
                                    <div key={index} className="mb-5 pl-6 relative">
                                        <div className="absolute left-0 top-2 w-2 h-2 rounded-full"
                                             style={{ background: 'var(--gold)' }} />
                                        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
                                            {title}
                                        </h3>
                                        <p className="text-lg mb-2" style={{ color: 'var(--accent)' }}>
                                            {mergedData.employer?.[index] || ''}
                                        </p>
                                        <p className="font-sans text-sm mb-4">
                                            {`${mergedData.job_begin?.[index] || ''} - ${mergedData.job_end?.[index] || 'Present'}`}
                                        </p>
                                        {mergedData.job_description?.[index] && (
                                            <div className="p-5 mb-2 border-l-3 shadow-sm bg-white"
                                                 style={{ borderLeftColor: 'var(--gold)' }}>
                                                <div dangerouslySetInnerHTML={{ __html: mergedData.job_description[index] }} />
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </section>
                    )}

                    {/* Internships Section */}
                    {mergedData.internship_title?.length > 0 && mergedData.internship_title[0] && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Internship Experience
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            {mergedData.internship_title.map((title, index) => (
                                title && (
                                    <div key={index} className="mb-5 pl-6 relative">
                                        <div className="absolute left-0 top-2 w-2 h-2 rounded-full"
                                             style={{ background: 'var(--gold)' }} />
                                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                                            {title}
                                        </h3>
                                        {mergedData.internship_summary?.[index] && (
                                            <div className="p-5 mb-2 border-l-3 shadow-sm bg-white"
                                                 style={{ borderLeftColor: 'var(--gold)' }}>
                                                <div dangerouslySetInnerHTML={{ __html: mergedData.internship_summary[index] }} />
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </section>
                    )}

                    {/* Certificates Section */}
                    {mergedData.certificate_title?.length > 0 && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Certifications
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            {mergedData.certificate_title.map((title, index) => (
                                <div key={index} className="mb-5 pl-6 relative">
                                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full"
                                         style={{ background: 'var(--gold)' }} />
                                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                                        {title}
                                    </h3>
                                    {mergedData.certificate_description?.[index] && (
                                        <div className="p-5 mb-2 border-l-3 shadow-sm bg-white"
                                             style={{ borderLeftColor: 'var(--gold)' }}>
                                            <div dangerouslySetInnerHTML={{ __html: mergedData.certificate_description[index] }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="table-cell w-[35%] align-top p-2 border-l-2"
                     style={{ background: 'var(--light)', borderColor: 'var(--gold)' }}>
                    {/* Skills Section */}
                    {mergedData.skill?.length > 0 && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Expertise
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent)' }}>
                                    Professional Skills
                                </h3>
                                {mergedData.skill.map((skill, index) => (
                                    <div key={index} className="mb-2 pl-5 relative font-sans">
                                        <span className="absolute left-0 text-lg" style={{ color: 'var(--gold)' }}>•</span>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages Section */}
                    {mergedData.language?.length > 0 && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Languages
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            <div className="mb-6">
                                {mergedData.language.map((language, index) => (
                                    <div key={index} className="mb-2 pl-5 relative font-sans">
                                        <span className="absolute left-0 text-lg" style={{ color: 'var(--gold)' }}>•</span>
                                        {language}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {mergedData.college?.length > 0 && mergedData.college[0] && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                Education
                                <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                      style={{ background: 'var(--accent)' }} />
                            </h2>
                            {mergedData.college.map((college, index) => (
                                <div key={index} className="mb-5 pl-6 relative">
                                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full"
                                         style={{ background: 'var(--gold)' }} />
                                    <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
                                        {mergedData.degree?.[index] || ''}
                                    </h3>
                                    <p className="text-lg mb-2" style={{ color: 'var(--accent)' }}>{college}</p>
                                    <p className="font-sans text-sm mb-2">
                                        {`${mergedData.college_begin?.[index] || ''} - ${mergedData.college_end?.[index] || ''}`}
                                    </p>
                                    {mergedData.college_description?.[index] && (
                                        <div dangerouslySetInnerHTML={{ __html: mergedData.college_description[index] }} />
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Other Sections */}
                    {mergedData.other_title?.map((title, index) => (
                        title && (
                            <section key={index} className="mb-10 break-inside-avoid">
                                <h2 className="text-3xl mb-4 pb-2 relative" style={{ color: 'var(--primary)' }}>
                                    {title}
                                    <span className="absolute bottom-0 left-0 w-[60px] h-[3px]"
                                          style={{ background: 'var(--accent)' }} />
                                </h2>
                                <div className="mb-6">
                                    {mergedData.other_description?.[index] && (
                                        <div dangerouslySetInnerHTML={{ __html: mergedData.other_description[index] }} />
                                    )}
                                </div>
                            </section>
                        )
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 15mm;
          }
          section {
            break-inside: avoid;
          }
        }
      `}</style>
        </div>
    );
};

export default ExecutiveTemplate;