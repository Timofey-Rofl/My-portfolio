import React, { useState, useRef } from 'react';

// Кратчайшее знаковое расстояние по кругу для бесконечного слайдера
const getCircularOffset = (index, activeIndex, total) => {
  if (total <= 1) return 0;
  let diff = index - activeIndex;
  const half = total / 2;
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
};

const Gallery = ({ arts, onHover, onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  if (!arts || arts.length === 0) {
    return (
      <div className="gallery-slider gallery-slider--empty card-glass">
        <p>В папке assets/arts пока нет изображений</p>
      </div>
    );
  }

  const total = arts.length;
  const safeActive = activeIndex % total;

  const goPrev = () => {
    const nextIdx = (safeActive - 1 + total) % total;
    setActiveIndex(nextIdx);
    if (onHover) onHover(arts[nextIdx]);
  };

  const goNext = () => {
    const nextIdx = (safeActive + 1) % total;
    setActiveIndex(nextIdx);
    if (onHover) onHover(arts[nextIdx]);
  };

  const handleSlideClick = (index, offset) => {
    if (offset === 0) {
      onOpen(index);
    } else {
      setActiveIndex(index);
      if (onHover) onHover(arts[index]);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || total <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  const maxVisibleOffset = total >= 5 ? 2 : total >= 3 ? 1 : 1;

  return (
    <div
      className="gallery-slider card-glass"
      onMouseLeave={() => onHover && onHover(null)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {total > 1 && (
        <button
          type="button"
          className="slider-nav-btn slider-nav-btn--prev"
          onClick={goPrev}
          aria-label="Предыдущая работа"
        >
          ‹
        </button>
      )}

      <div className="slider-stage">
        {arts.map((art, index) => {
          const offset = getCircularOffset(index, safeActive, total);
          // Для чётного количества элементов (например 2 или 4) показываем симметричный дубль только с одной стороны
          const isVisible =
            total === 2
              ? index === safeActive || offset === 1 || offset === -1
              : Math.abs(offset) <= maxVisibleOffset;

          const clampedDir = offset > 0 ? 1 : offset < 0 ? -1 : 0;
          const visualSlot = isVisible ? offset : clampedDir * 3;

          let slideClass = 'slider-slide';
          if (offset === 0) slideClass += ' is-center';
          else if (Math.abs(offset) === 1 && isVisible) slideClass += ' is-near';
          else if (Math.abs(offset) === 2 && isVisible) slideClass += ' is-far';
          else slideClass += ' is-hidden';

          return (
            <div
              key={art.id}
              role="button"
              tabIndex={offset === 0 ? 0 : -1}
              aria-label={
                offset === 0
                  ? `Увеличить ${art.title}`
                  : `Переключить на ${art.title}`
              }
              className={slideClass}
              style={{ '--slot': visualSlot }}
              onMouseEnter={() => isVisible && onHover && onHover(art)}
              onClick={() => isVisible && handleSlideClick(index, offset)}
              onKeyDown={(e) => {
                if (offset === 0 && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onOpen(index);
                }
              }}
            >
              <img src={art.src} alt={art.title} draggable="false" />
              <div className="slider-slide__caption">
                <span>{art.title}</span>
                {offset === 0 && <span className="slider-slide__expand">⤢</span>}
              </div>
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <button
          type="button"
          className="slider-nav-btn slider-nav-btn--next"
          onClick={goNext}
          aria-label="Следующая работа"
        >
          ›
        </button>
      )}

      <div className="slider-footer-bar">
        <span className="slider-counter">
          {String(safeActive + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        {total > 1 && total <= 16 && (
          <div className="slider-dots" role="tablist" aria-label="Слайды галереи">
            {arts.map((art, i) => (
              <button
                key={art.id}
                type="button"
                role="tab"
                aria-selected={i === safeActive}
                aria-label={art.title}
                className={`slider-dot${i === safeActive ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveIndex(i);
                  if (onHover) onHover(arts[i]);
                }}
              />
            ))}
          </div>
        )}

        <span className="slider-hint">Клик по главному арту — полный размер</span>
      </div>
    </div>
  );
};

export default Gallery;
