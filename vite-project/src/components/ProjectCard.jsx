import React from 'react';

const BuiltinProjectIcon = ({ type }) => {
  if (type === 'react') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="project-svg-icon" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#e5c07b" />
        <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="#e5c07b" strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="4"
          stroke="#e5c07b"
          strokeWidth="1.5"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="4"
          stroke="#e5c07b"
          strokeWidth="1.5"
          transform="rotate(120 12 12)"
        />
      </svg>
    );
  }
  return null;
};

const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card-glass project-card${project.isPrimary ? ' project-card--primary' : ''}`}
    >
      <div className="project-card__head">
        <div className="project-icon-box">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="project-icon"
              draggable="false"
            />
          ) : (
            <BuiltinProjectIcon type={project.iconType} />
          )}
        </div>

        <div className="project-badges">
          {project.kind && (
            <span className={`project-kind-badge${project.isPrimary ? ' is-primary' : ''}`}>
              {project.kind}
            </span>
          )}
          {project.platform && (
            <span className="project-platform-label">{project.platform}</span>
          )}
        </div>
      </div>

      <div className="project-card__title-row">
        <h3>{project.title}</h3>
        <span className="project-arrow" aria-hidden="true">↗</span>
      </div>

      <div className="project-info">
        <div className="project-info__top">
          <h3>{project.title}</h3>
          <span>↗</span>
        </div>
        <p>{project.description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;
