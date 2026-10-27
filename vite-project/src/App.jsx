import React, { useState, useEffect, useCallback } from 'react';
import changer from './components/changer';
import AvatarSwitcher from './components/AvatarSwitcher';
import LinkCard from './components/LinkCard';
import ProjectFolders from './components/ProjectFolders';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import arts from './components/arts';
import LINKS from './components/links';
import PROJECTS, { PROJECT_FOLDERS } from './components/projects';
import './App.css';
import './index.css';

const AVATAR_INTERVAL_MS = 10000;

const SKILLS = [
  'React',
  'JavaScript',
  'HTML & CSS',
  'GameDev',
  '3D, 2D & Modding',
  '2D Art',
];

function App() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [displayedArt, setDisplayedArt] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Смена аватарки каждые 10 секунд
  useEffect(() => {
    if (changer.length <= 1) return undefined;
    const timer = setTimeout(() => {
      setAvatarIndex((prev) => (prev + 1) % changer.length);
    }, AVATAR_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [avatarIndex]);

  // Удерживаем последний арт во время плавного затухания фона
  const handleArtHover = useCallback((art) => {
    setHoveredArt(art);
    if (art) {
      setDisplayedArt(art);
    }
  }, []);

  const currentAuthor = changer[avatarIndex]?.author ?? '';
  const bgArtStyle = displayedArt
    ? { backgroundImage: `url("${displayedArt.src}")` }
    : undefined;

  return (
    <div className="app-wrapper">
      {/* Фоновые слои */}
      <div className="bg-layer bg-layer--base" />
      <div
        className={`bg-layer bg-layer--hover-ambient${hoveredArt ? ' is-active' : ''}`}
        style={bgArtStyle}
      />
      <div
        className={`bg-layer bg-layer--hover${hoveredArt ? ' is-active' : ''}`}
        style={bgArtStyle}
      />
      <div className="bg-overlay" />

      <header className="site-header">
        <div className="header-inner">
          <a href="https://xn--l1aij1c.xn--p1ai/" className="brand-link">
            Мряу.рф
          </a>
          <div className="header-tag">
            <span className="header-tag__dot" aria-hidden="true" />
            <span>Frontend • GameDev • Art</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="top-row">
          {/* Обо мне */}
          <section className="section-block about-section">
            <div className="section-header-line">
              <h2 className="section-title">Обо мне</h2>
            </div>

            <div className="korobka">
              <AvatarSwitcher
                avatars={changer}
                index={avatarIndex}
                onSelect={setAvatarIndex}
                intervalMs={AVATAR_INTERVAL_MS}
              />

              <div id="content" className="about-content">
                <div className="about-headline">
                  <h1>T1moha_R0fls</h1>
                  <span className="about-aka">Signas / Shigunasu</span>
                </div>

                <p className="about-bio">
                  Я начинающий веб разработчик, хватающийся за всё подряд. Быстро адаптируюсь к новым задачам и
                  постоянно развиваюсь на практике.
                </p>

                <div className="about-skills" aria-label="Стек и навыки">
                  {SKILLS.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Контакты / Где я есть */}
          <section className="section-block links-section">
            <div className="section-header-line">
              <h2 className="section-title">Где я есть</h2>
            </div>

            <div className="links-grid">
              {LINKS.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </section>
        </div>

        {/* Проекты (папки с приоритетом Игры -> Моды) */}
        <section className="section-block projects-section">
          <ProjectFolders folders={PROJECT_FOLDERS} projects={PROJECTS} />
        </section>

        {/* Творчество — Слайдер */}
        <section className="section-block arts-section">
          <div className="section-header-line">
            <h2 className="section-title">Творчество</h2>
            {arts.length > 0 && (
              <span className="section-subtle-note">{arts.length} работ в галерее</span>
            )}
          </div>

          <Gallery
            arts={arts}
            onHover={handleArtHover}
            onOpen={(i) => setLightboxIndex(i)}
          />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>T1moha_R0fls • Портфолио на React</p>
          <p className="footer-author">
            Автор арта на аватарке: <strong key={avatarIndex}>{currentAuthor}</strong>
          </p>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <Lightbox
          arts={arts}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  );
}

export default App;
