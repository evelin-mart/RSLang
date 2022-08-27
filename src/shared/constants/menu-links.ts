
export type MenuLink = { title: string, href: string, submenu?: MenuLink[] };

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
      },
      {
        title: 'Спринт',
        href: '/game/sprint',
      },
    ]
  },
]