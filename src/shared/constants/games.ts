import { GAME } from ".";

export const games: Record<GAME, { title: string, description: string }> = {
  [GAME.AUDIO]: {
    title: 'Аудиовызов',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
  [GAME.SPRINT]: {
    title: 'Спринт',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  }
}