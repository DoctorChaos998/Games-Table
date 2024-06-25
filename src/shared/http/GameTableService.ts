import api from ".";
import { IGame } from "../types";

interface IGetGamesList{
    filterByPlatform?: string,
    filterByGenre?: string
}

class GameTableService{
    static getGamesList({filterByPlatform, filterByGenre}: IGetGamesList){
        return api.get<IGame[]>('/games',{
            params:{
                platform: filterByPlatform,
                category: filterByGenre === 'all'?undefined:filterByGenre
            }
        });
    }
}

export default GameTableService;