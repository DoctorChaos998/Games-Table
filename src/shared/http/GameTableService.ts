import api from ".";
import { IGame } from "../types";

interface IGetGamesList{
    filterByPlatform?: string,
    filterByGenre?: string,
    sortingByDate?: string
}

class GameTableService{
    static getGamesList({filterByPlatform, filterByGenre, sortingByDate}: IGetGamesList){
        return api.get<IGame[]>('/games',{
            params:{
                platform: filterByPlatform,
                category: filterByGenre === 'all'?undefined:filterByGenre,
                'sort-by': sortingByDate
            }
        });
    }
}

export default GameTableService;