const ProfessionalTemplate = ({ data }) => {
  // Calculate total years of experience
  const totalExperience = data.job_title.length;

  // Dynamically adjust font sizes and spacing based on content length
  const getFontSize = () => {
    if (totalExperience > 7) return "text-sm";
    if (totalExperience > 5) return "text-base";
    return "text-lg";
  };

  const getSpacing = () => {
    if (totalExperience > 7) return "mb-2";
    if (totalExperience > 5) return "mb-3";
    return "mb-4";
  };

  return (
    <div className="container print:w-full print:max-w-none">
      {/* Header Section */}
      <div className={`header ${getSpacing()}`}>
        <div className="header-content">
          <h1 className={`name ${getFontSize()}`}>
            {`${data.first_name} ${data.last_name}`}
          </h1>
          <p className="title">{data.occupation}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-item">📧 {data.email}</div>
          <div className="contact-item">📱 {data.phone}</div>
          <div className="contact-item">
            📍 {`${data.city}, ${data.country}`}
          </div>
        </div>
      </div>

      {/* Summary Section - Only show if content exists */}
      {data.professional_description && (
        <div className={`section ${getSpacing()}`}>
          <h2 className="section-title">Professional Summary</h2>
          <p className={`summary ${getFontSize()}`}>
            {data.professional_description}
          </p>
        </div>
      )}

      {/* Experience Section */}
      <div className={`section ${getSpacing()}`}>
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-grid">
          {data.job_title.map((title, index) => (
            <div key={index} className={`experience-item ${getSpacing()}`}>
              <div className="experience-header">
                <h3 className={getFontSize()}>{title}</h3>
                <span className="date">
                  {data.job_begin[index]} - {data.job_end[index]}
                </span>
              </div>
              <div className="company">{data.employer[index]}</div>
              <p className={`description ${getFontSize()}`}>
                {data.job_description[index]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className={`section ${getSpacing()}`}>
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {data.college.map((college, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h3 className={getFontSize()}>{data.degree[index]}</h3>
                <span className="date">
                  {data.college_begin[index]} - {data.college_end[index]}
                </span>
              </div>
              <div className="institution">{college}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Languages Section */}
      <div className="section-grid">
        <div className="section">
          <h2 className="section-title">Skills</h2>
          <div className="tags-container">
            {data.skill.map((skill, index) => (
              <span key={index} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="section">
          <h2 className="section-title">Languages</h2>
          <div className="tags-container">
            {data.language.map((lang, index) => (
              <span key={index} className="tag">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
          font-family: "Arial", sans-serif;
          background: white;
        }

        .header {
          border-bottom: 2px solid #2b6cb0;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .name {
          font-size: ${totalExperience > 7 ? "24px" : "32px"};
          font-weight: bold;
          color: #2d3748;
          margin: 0;
        }

        .title {
          font-size: ${totalExperience > 7 ? "16px" : "20px"};
          color: #4299e1;
          margin-top: 4px;
        }

        .contact-grid {
          display: grid;
          gap: 8px;
          font-size: ${totalExperience > 7 ? "12px" : "14px"};
        }

        .section {
          margin-bottom: ${totalExperience > 7 ? "15px" : "25px"};
        }

        .section-title {
          font-size: ${totalExperience > 7 ? "18px" : "22px"};
          color: #2d3748;
          font-weight: bold;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e2e8f0;
        }

        .experience-grid,
        .education-grid {
          display: grid;
          gap: ${totalExperience > 7 ? "10px" : "15px"};
        }

        .experience-header,
        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .company,
        .institution {
          color: #4299e1;
          font-weight: 500;
          font-size: ${totalExperience > 7 ? "13px" : "15px"};
        }

        .date {
          color: #718096;
          font-size: ${totalExperience > 7 ? "11px" : "13px"};
        }

        .description {
          margin-top: 4px;
          color: #4a5568;
          font-size: ${totalExperience > 7 ? "12px" : "14px"};
          line-height: 1.4;
        }

        .section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          background: #edf2f7;
          color: #2d3748;
          padding: ${totalExperience > 7 ? "4px 8px" : "6px 12px"};
          border-radius: 4px;
          font-size: ${totalExperience > 7 ? "11px" : "13px"};
        }

        @media print {
          .container {
            padding: 20px;
          }

          @page {
            margin: 0.5cm;
          }
        }

        @media (max-width: 768px) {
          .section-grid {
            grid-template-columns: 1fr;
          }

          .header {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalTemplate;
