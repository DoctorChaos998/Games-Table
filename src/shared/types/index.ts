export interface IGame {
    id: number,
    developer: string,
    genre: string,
    platform: string,
    publisher: string,
    release_date: string,
    title: string
}

export type platformFilterType = 'pc'|'browser'|'all';

export type genreFilterType = 'shooter'|'mmorpg'|'strategy'|'action-rpg'|'battle-royale'|
'fighting'|'moba'|'action'|'sports'|'racing'|'card'|'mmo'|'social'|'fantasy'|'all';