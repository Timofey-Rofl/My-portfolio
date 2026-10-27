import React, { useEffect, useState, useRef } from 'react';

const Lightbox = ({ arts, index, onClose, onChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(null);

  const currentArt = arts[index];

  // Сбрасываем зум при переключении картинки
  useEffect(() => {
    setIsZoomed(false);
  }, [index]);

  // Навигация стрелками на клавиатуре + блокировка фонового скролла
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % arts.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + arts.length) % arts.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [index, arts.length, onClose, onChange]);

  if (!currentArt) return null;

  const goPrev = () => onChange((index - 1 + arts.length) % arts.length);
  const goNext = () => onChange((index + 1) % arts.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={currentArt.title}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Верхняя панель управления */}
      <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-meta">
          <span className="lightbox-counter">
            {index + 1} / {arts.length}
          </span>
          <span className="lightbox-title">{currentArt.title}</span>
        </div>

        <div className="lightbox-actions">
          <button
            type="button"
            className={`lightbox-action-btn${isZoomed ? ' is-active' : ''}`}
            onClick={() => setIsZoomed((z) => !z)}
            title={isZoomed ? 'Уменьшить' : 'Увеличить'}
            aria-label={isZoomed ? 'Уменьшить изображение' : 'Увеличить изображение'}
          >
            {isZoomed ? '1×' : '🔍+'}
          </button>
          <button
            type="button"
            className="lightbox-close"
            onClick={onClose}
            aria-label="Закрыть просмотр"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Стрелки влево / вправо */}
      {arts.length > 1 && (
        <button
          type="button"
          className="lightbox-nav prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Предыдущий арт"
        >
          ‹
        </button>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          key={currentArt.id}
          src={currentArt.src}
          alt={currentArt.title}
          className={`lightbox-image${isZoomed ? ' is-zoomed' : ''}`}
          onDoubleClick={() => setIsZoomed((z) => !z)}
          draggable="false"
        />
      </div>

      {arts.length > 1 && (
        <button
          type="button"
          className="lightbox-nav next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Следующий арт"
        >
          ›
        </button>
      )}

      {/* Полоса миниатюр внизу для быстрого перехода */}
      {arts.length > 1 && (
        <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
          {arts.map((art, i) => (
            <button
              key={art.id}
              type="button"
              className={`lightbox-thumb${i === index ? ' is-active' : ''}`}
              onClick={() => onChange(i)}
              aria-label={`Перейти к ${art.title}`}
            >
              <img src={art.src} alt="" draggable="false" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
