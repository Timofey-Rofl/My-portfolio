import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const FolderIcon = ({ type }) => {
  if (type === 'gamepad') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <line x1="8.5" y1="13" x2="11.5" y2="13" />
        <line x1="10" y1="11.5" x2="10" y2="14.5" />
        <circle cx="15" cy="12.5" r="0.8" fill="currentColor" />
        <circle cx="16.8" cy="14" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <polyline points="10 11.5 8 13.5 10 15.5" />
      <polyline points="14 11.5 16 13.5 14 15.5" />
    </svg>
  );
};

const formatCount = (n) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} проект`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} проекта`;
  return `${n} проектов`;
};

const ProjectFolders = ({ folders, projects }) => {
  const [openFolderId, setOpenFolderId] = useState(null);

  const activeFolder = folders.find((f) => f.id === openFolderId) || null;
  const activeProjects = openFolderId
    ? projects
        .filter((p) => p.folderId === openFolderId)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    : [];

  return (
    <div className="projects-block">
      <div className="section-header-line">
        <div className="section-breadcrumb">
          <h2 className="section-title">Проекты</h2>
          {activeFolder && (
            <>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{activeFolder.title}</span>
            </>
          )}
        </div>

        {openFolderId ? (
          <div className="folder-inline-controls">
            <button
              type="button"
              className="folder-back-pill"
              onClick={() => setOpenFolderId(null)}
            >
              ← К папкам
            </button>

            <div className="folder-switch-pills">
              {folders.map((f) => {
                const count = projects.filter((p) => p.folderId === f.id).length;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`folder-switch-pill${f.id === openFolderId ? ' is-active' : ''}`}
                    onClick={() => setOpenFolderId(f.id)}
                  >
                    {f.title} <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <span className="section-subtle-note">Выберите папку направления</span>
        )}
      </div>

      {!openFolderId ? (
        <div className="folders-row">
          {folders.map((folder) => {
            const items = projects
              .filter((p) => p.folderId === folder.id)
              .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));

            return (
              <button
                key={folder.id}
                type="button"
                className="card-glass folder-item"
                onClick={() => setOpenFolderId(folder.id)}
              >
                <span className="folder-item__tab" aria-hidden="true" />

                <div className="folder-item__main">
                  <div className="folder-item__icon">
                    <FolderIcon type={folder.iconType} />
                  </div>

                  <div className="folder-item__info">
                    <div className="folder-item__title-line">
                      <h3>{folder.title}</h3>
                      <span className="folder-item__count">{formatCount(items.length)}</span>
                    </div>
                    <p>{folder.subtitle}</p>
                    <div className="folder-item__tags">
                      {folder.tags.map((tag) => (
                        <span key={tag} className="folder-mini-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="folder-item__right">
                  <div className="folder-preview-stack" aria-hidden="true">
                    {items.slice(0, 3).map((it) => (
                      <span key={it.id} className="folder-preview-avatar">
                        {it.image ? (
                          <img src={it.image} alt="" draggable="false" />
                        ) : (
                          <span>⚛</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="folder-item__open">Открыть →</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="projects-row" key={openFolderId}>
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectFolders;
