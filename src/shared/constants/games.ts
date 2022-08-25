import { GAME } from ".";

export const games: Record<GAME, { title: string }> = {
  [GAME.AUDIO]: {
    title: 'Аудиовызов',
  },
  [GAME.SPRINT]: {
    title: 'Спринт',
  }
}