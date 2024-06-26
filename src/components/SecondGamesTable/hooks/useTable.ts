import { useCallback, useEffect, useMemo, useState } from "react"
import { IGame, sortingByDateType } from "../../../shared/types"
import GameTableService from "../../../shared/http/GameTableService";



export const useTable = () => {
    const [originalTableData, setOriginalTableData] = useState<IGame[]>([]);
    const [pagination, setPagination] = useState<{pageIndex: number, pageSize: number}>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [pageCount, setPageCount] = useState(0);
    const [currentPlatformFilter, setCurrentPlatformFilter] = useState<string>('all');
    const [currentGenreFilter, setCurrentGenreFilter] = useState<string>('all');
    const [sortingByDate, setSortingByDate] = useState<sortingByDateType>('none');
    
    useEffect(() => {
        if(sortingByDate === 'none'){
            GameTableService.getGamesList({filterByPlatform: currentPlatformFilter, filterByGenre: currentGenreFilter}).then(response => {
                setOriginalTableData(response.data);
            });
        }
        else{
            GameTableService.getGamesList({filterByPlatform: currentPlatformFilter, filterByGenre: currentGenreFilter, sortingByDate:'release-date'}).then(response => {
                if(sortingByDate === 'asc'){
                    setOriginalTableData(response.data);
                }
                else{
                    const reversedData = response.data.reverse();
                    setOriginalTableData(reversedData);
                }
                
            });
        }
        
    }, [currentPlatformFilter, currentGenreFilter, sortingByDate]);

    useEffect(() => {
        setPageCount(Math.round(originalTableData.length/pagination.pageSize));
    }, [pagination.pageSize, originalTableData.length]);

    const paginetedRows = useMemo(() => {
        const resultData = [];
        for(let i = pagination.pageIndex * pagination.pageSize; (i < (pagination.pageIndex + 1) * pagination.pageSize) && (i < originalTableData.length);i++){
            resultData.push(originalTableData[i]);
        }
        return resultData;
    }, [pagination.pageSize, pagination.pageIndex, originalTableData]);

    const getCanNextPage = useCallback(() => {
        return pagination.pageSize * (pagination.pageIndex + 2) < originalTableData.length;
    }, [pagination, originalTableData.length]);

    const getCanPreviousPage = useCallback(() => {
        return pagination.pageIndex > 0;
    }, [pagination]);

    const getRowCount = useCallback(() => {
        return originalTableData.length;
    }, [originalTableData]);

    const setPageIndex = useCallback((pageIndex: number) => {
        if(pageIndex >= 0 && pageIndex < pageCount){
            setPagination({...pagination, pageIndex});
        }
    }, [pagination, pageCount]);

    const setPageSize = useCallback((pageSize: number) => {
        if(pageSize > 0){
            setPagination({...pagination, pageSize, pageIndex: 0});
        }
    }, [pagination]);

    const toggleSorting = useCallback(() => {
        switch (sortingByDate) {
            case 'none':
                setSortingByDate('asc');
                break;
            case 'asc':
                setSortingByDate('desc');
                break;
            case 'desc':
                setSortingByDate('none');
                break;    
            default:
                break;
        }
        setPageIndex(0);
    }, [sortingByDate, setPageIndex]);

    return {
        pagination, setPagination,
        paginetedRows, getCanNextPage,
        getCanPreviousPage, toggleSorting,
        setCurrentGenreFilter, setCurrentPlatformFilter,
        getRowCount, setPageIndex, pageCount,
        sortingByDate, setSortingByDate, setPageSize,
         currentPlatformFilter, currentGenreFilter
    };
}