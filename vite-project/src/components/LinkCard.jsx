import React, { useState } from 'react';

const BuiltinIcon = ({ type }) => {
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="link-svg-icon" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    );
  }
  return null;
};

const LinkCard = ({ link }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMatch = link.expandedText?.match(/@[\w._-]+/);
  const handleToCopy = handleMatch ? handleMatch[0] : null;

  const handleCopy = async (e) => {
    e.stopPropagation();
    const text = handleToCopy || link.expandedText || '';
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const renderIcon = () => (
    <div className="link-icon-wrap">
      {link.icon ? (
        <img src={link.icon} alt={link.name} className="link-icon" draggable="false" />
      ) : (
        <BuiltinIcon type={link.iconType} />
      )}
    </div>
  );

  // Прямая ссылка (where)
  if (link.type === 'where') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="square-card card-glass link-card"
      >
        <span className="link-card__corner" aria-hidden="true">↗</span>
        {renderIcon()}
        <div className="link-card__meta">
          <h3>{link.name}</h3>
          {link.subtitle && <span>{link.subtitle}</span>}
        </div>
      </a>
    );
  }

  // Раскрывающаяся карточка (here)
  if (link.type === 'here') {
    const toggle = () => setIsExpanded((prev) => !prev);
    return (
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className={`square-card card-glass link-card${isExpanded ? ' expanded' : ''}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <span className="link-card__corner" aria-hidden="true">
          {isExpanded ? '×' : '•••'}
        </span>
        {renderIcon()}
        <div className="link-card__meta">
          <h3>{link.name}</h3>
          {link.subtitle && <span>{link.subtitle}</span>}
        </div>

        <div className="link-expandable-content" aria-hidden={!isExpanded}>
          <p>{link.expandedText}</p>
          {handleToCopy && (
            <button
              type="button"
              className={`copy-btn${copied ? ' is-copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? 'Скопировано ✓' : 'Скопировать'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default LinkCard;
