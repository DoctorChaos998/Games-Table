import { ReactNode, useMemo } from "react";
import { IGame } from "../../shared/types";
import TableDataCell from "../TableDataCell/TableDataCell";
import TableHeaderCell from "../TableHeaderCell/TableHeaderCell";
import { genreFilter, platformFilter } from "../../shared/entities";
import TableHeaderCellWithFilter from "../TableHeaderCellWithFilter/TableHeaderCellWithFilter";
import { useTable } from "./hooks/useTable";
import { SortingContainer, TableBody, TableContainer, TableRow, TableWrapper } from "../GamesTable/GamesTable";
import TableFooter from "../TableFooter/TableFooter";

interface IColumn {
    id: Omit<keyof IGame, 'id'>,
    header: () => ReactNode,
    cell: (row: IGame) => ReactNode 
}


const SecondGamesTable = () => {
    const {pagination, setCurrentGenreFilter,
         setPageIndex, setCurrentPlatformFilter,
     paginetedRows,getCanNextPage, getCanPreviousPage, setPageSize,
    getRowCount, pageCount, toggleSorting, sortingByDate} = useTable();

    const columns: IColumn[] = useMemo(() => {
        return [
            {
                id: 'title',
                header: () => <TableHeaderCell key={'title'}>Название</TableHeaderCell>,
                cell: info => <TableDataCell key={'title'}>{info.title}</TableDataCell>,
            },
            {
                id: 'genre',
                header: () => <TableHeaderCellWithFilter filerOptions={genreFilter} handleDropDownItemClick={(newGenre: string) => {
                            setPageIndex(0);
                            setCurrentGenreFilter(newGenre);
                        }} key={'genre'}>Жанр</TableHeaderCellWithFilter>,
                cell: info => <TableDataCell key={'genre'}>{info.genre}</TableDataCell>,
            },
            {
                id: 'platform',
                header: () => <TableHeaderCellWithFilter filerOptions={platformFilter} handleDropDownItemClick={(newPlatform: string) => {
                    setPageIndex(0);
                    setCurrentPlatformFilter(newPlatform);
                }} key={'platform'}>Платформа</TableHeaderCellWithFilter>,
                cell: info => <TableDataCell key={'platform'}>{info.platform}</TableDataCell>,
                enableSorting: false
            },
            {
                id: 'publisher',
                header: () => <TableHeaderCell key={'publisher'}>Издатель</TableHeaderCell>,
                cell: info => <TableDataCell key={'publisher'}>{info.publisher}</TableDataCell>,
            },
            {
                id: 'developer',
                header: () => <TableHeaderCell key={'developer'}>Разработчик</TableHeaderCell>,
                cell: info => <TableDataCell key={'developer'}>{info.developer}</TableDataCell>,
            },
            {
                id: 'release_date',
                header: () => <TableHeaderCell onClick={() => toggleSorting()}
                key={'release_date'}>
                    Дата релиза
                    {{
                        'asc': <SortingContainer>
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.69214 8.5072L5.7236 3.90543C5.61001 3.77371 5.39128 3.77371 5.27648 3.90543L1.30794 8.5072C1.16051 8.6788 1.29343 8.93015 1.5315 8.93015H9.46858C9.70664 8.93015 9.83957 8.6788 9.69214 8.5072Z" fill="white"/>
                            </svg>
                        </SortingContainer>,
                        'desc': <SortingContainer>
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.46858 3.80664H1.5315C1.29343 3.80664 1.16051 4.058 1.30794 4.2296L5.27648 8.83136C5.39007 8.96308 5.6088 8.96308 5.7236 8.83136L9.69214 4.2296C9.83957 4.058 9.70664 3.80664 9.46858 3.80664Z" fill="white"/>
                            </svg>
                        </SortingContainer>,
                        'none': <SortingContainer>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.69214 8.5072L5.7236 3.90543C5.61001 3.77371 5.39128 3.77371 5.27648 3.90543L1.30794 8.5072C1.16051 8.6788 1.29343 8.93015 1.5315 8.93015H9.46858C9.70664 8.93015 9.83957 8.6788 9.69214 8.5072Z" fill="white"/>
                        </svg>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.46858 3.80664H1.5315C1.29343 3.80664 1.16051 4.058 1.30794 4.2296L5.27648 8.83136C5.39007 8.96308 5.6088 8.96308 5.7236 8.83136L9.69214 4.2296C9.83957 4.058 9.70664 3.80664 9.46858 3.80664Z" fill="white"/>
                        </svg>
                        </SortingContainer>
                        }[sortingByDate]}
                </TableHeaderCell>,
                cell: info => <TableDataCell key={'release_date'}>{info.release_date}</TableDataCell>,
            }
        ]
    }, [sortingByDate, toggleSorting]);
    return(
        <TableWrapper>
            <TableContainer>
                <thead>
                    <TableRow key={'1'}>
                        {columns.map(row => 
                            row.header()
                        )}
                    </TableRow>
                </thead>
                <TableBody>
                    {paginetedRows.map(row => (
                    <TableRow key={row.id}>
                        {columns.map(info => info.cell(row))}
                    </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
            <TableFooter canNextPage={getCanNextPage()}
            canPreviousPage={getCanPreviousPage()}
             setPageIndex={setPageIndex}
              currentPageNumber={pagination.pageIndex + 1}
               rowCount={getRowCount()} pageCount={pageCount}
                currentPageSize={pagination.pageSize}
            setPageSize={setPageSize}/>
        </TableWrapper>
    )
};

export default SecondGamesTable;