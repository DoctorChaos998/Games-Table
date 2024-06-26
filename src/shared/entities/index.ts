import { genreFilterType, platformFilterType } from "../types";

export const platformFilter: Record<platformFilterType, string> = {
        pc: 'PC',
        browser: 'Browser',
        all: 'All',
};

export const genreFilter: Record<genreFilterType, string> = {
    shooter: 'Shooter',
    social: 'Social',
    action: 'Action',
    sports: 'Sports',
    strategy: 'Strategy',
    "action-rpg": 'Action RPG',
    fantasy: 'Fantasy',
    fighting: 'Fighting',
    "battle-royale": "Battle-royale",
    mmo: 'MMO',
    mmorpg: 'MMORPG',
    moba: 'Moba',
    racing: 'Racing',
    card: 'Card',
    all: 'All'
}
