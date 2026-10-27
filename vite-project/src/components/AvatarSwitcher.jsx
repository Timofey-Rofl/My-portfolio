import React from 'react';

const AvatarSwitcher = ({ avatars, index, onSelect, intervalMs = 10000 }) => {
  if (!avatars || avatars.length === 0) return null;

  const handleCycle = () => {
    if (onSelect && avatars.length > 1) {
      onSelect((index + 1) % avatars.length);
    }
  };

  const radius = 56;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="avatar-switcher">
      <button
        type="button"
        className="avatar-container"
        onClick={handleCycle}
        title={avatars.length > 1 ? 'Сменить аватарку' : 'Аватар'}
        aria-label="Сменить аватарку"
      >
        {avatars.length > 1 && (
          <svg className="avatar-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="avatar-ring__track" cx="60" cy="60" r={radius} />
            <circle
              key={index}
              className="avatar-ring__progress"
              cx="60"
              cy="60"
              r={radius}
              style={{
                '--ring-circumference': circumference,
                '--ring-duration': `${intervalMs}ms`,
              }}
            />
          </svg>
        )}

        <div className="avatar-stack">
          {avatars.map((avatar, i) => (
            <img
              key={avatar.id ?? i}
              src={avatar.src}
              alt={`Аватар — автор: ${avatar.author}`}
              className={`avatar-image${i === index ? ' is-active' : ''}`}
              draggable="false"
            />
          ))}
        </div>
      </button>

      {avatars.length > 1 && (
        <div className="avatar-dots" role="tablist" aria-label="Выбор аватарки">
          {avatars.map((avatar, i) => (
            <button
              key={avatar.id ?? i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Аватар ${i + 1}: ${avatar.author}`}
              className={`avatar-dot${i === index ? ' is-active' : ''}`}
              onClick={() => onSelect && onSelect(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarSwitcher;
