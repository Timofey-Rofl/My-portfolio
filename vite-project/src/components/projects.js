import gjIcon from '../assets/icons/GameJolt_logo.png';
import TSIcon from '../assets/icons/Tstore.png';

export const PROJECT_FOLDERS = [
  {
    id: 'gamedev',
    title: 'GameDev & Modding',
    subtitle: 'Собственные инди-игры и 3D-модификации (Игры → Моды)',
    tags: ['Indie Games', 'GameJolt', '3D Modding', 'Thunderstore'],
    iconType: 'gamepad',
  },
  {
    id: 'web',
    title: 'Web & Frontend',
    subtitle: 'Веб-разработка',
    tags: ['React', 'JavaScript', 'CSS3', 'Vite'],
    iconType: 'code',
  },
];

// Приоритет внутри папки задаётся полем priority (1 — Игры, 2 — Моды)
const PROJECTS = [
  {
    id: 1,
    folderId: 'gamedev',
    priority: 1,
    kind: 'Игра',
    isPrimary: true,
    title: 'Авторские игры на GameJolt',
    platform: 'GameJolt',
    description: 'Мои собственные игры: от концепта и механик до готовых играбельных сборок.',
    url: 'https://gamejolt.com',
    image: gjIcon,
  },
  {
    id: 2,
    folderId: 'gamedev',
    priority: 2,
    kind: 'Мод',
    title: 'Bass Suit — Lethal Company',
    platform: 'Thunderstore',
    description: 'Мод, добавляющий костюм Bass из классической серии Mega Man в Lethal Company.',
    url: 'https://old.thunderstore.io/c/lethal-company/p/JALCoS_DevTeam/Mega_man_and_Bass/',
    image: TSIcon,
  },
  {
    id: 3,
    folderId: 'gamedev',
    priority: 2,
    kind: 'Мод',
    title: 'Khan Suit — Lethal Company',
    platform: 'Thunderstore',
    description: 'Мод с 3D-костюмом Khan Doorman из сериала Murder Drones для Lethal Company.',
    url: 'https://old.thunderstore.io/c/lethal-company/p/JALCoS_DevTeam/KhanDoormansuit/',
    image: TSIcon,
  },
  {
    id: 4,
    folderId: 'gamedev',
    priority: 2,
    kind: 'Мод',
    title: 'Thad Suit — Lethal Company',
    platform: 'Thunderstore',
    description: 'Мод с 3D-костюмом персонажа Thad из Murder Drones с адаптацией анимаций.',
    url: 'https://old.thunderstore.io/c/lethal-company/p/JALCoS_DevTeam/Thad/',
    image: TSIcon,
  },
  {
    id: 5,
    folderId: 'web',
    priority: 1,
    kind: 'Веб-сайт',
    isPrimary: true,
    title: 'Исходный код',
    platform: 'React + Vite',
    description: 'Исходный код этого одностраничного сайта-визитки.',
    url: 'https://github.com/Timofey-Rofl/My-portfolio.git',
    iconType: 'react',
  },
];

export default PROJECTS;
