import HeadphonesIcon from '@mui/icons-material/Headphones';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export type MenuLink = {
  title: string,
  href: string,
  submenu?: MenuLink[],
  icon?: JSX.Element,
};

export const links: MenuLink[] = [
  {
    title: 'О проекте',
    href: '/',
  },
  {
    title: 'Учебник',
    href: '/textbook',
  },
  {
    title: 'Мини-игры',
    href: '/game',
    submenu: [
      {
        title: 'Аудиовызов',
        href: '/game/audio',
        icon: <HeadphonesIcon />,
      },
      {
        title: 'Спринт',
        href: '/game/sprint',
        icon: <DirectionsRunIcon />,
      },
    ]
  },
]