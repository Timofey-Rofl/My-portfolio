import discordIcon from '../assets/icons/Discord_logo.svg';
import youtubeIcon from '../assets/icons/Youtube_logo.svg';

const LINKS = [
  {
    id: 'discord',
    name: 'Discord',
    subtitle: '@t1moha_r0fl',
    type: 'here', // Раскрывающаяся карточка
    icon: discordIcon,
    expandedText: 'Ник в Discord:\n@t1moha_r0fl',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    subtitle: 'Видео и архив',
    type: 'where', // Прямая ссылка
    icon: youtubeIcon,
    url: 'https://youtube.com', // ← Вставь ссылку на свой канал
  },
  {
    id: 'github',
    name: 'GitHub',
    subtitle: 'Исходный код',
    type: 'where',
    iconType: 'github', // Встроенная векторная иконка
    url: 'https://github.com/Timofey-Rofl/My-portfolio.git', // ← Вставь ссылку на свой GitHub
  },
];

export default LINKS;
