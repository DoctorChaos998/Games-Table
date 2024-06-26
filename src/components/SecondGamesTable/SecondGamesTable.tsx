import { ReactNode, useMemo } from "react";
import { IGame } from "../../shared/types";
import TableDataCell from "../TableDataCell/TableDataCell";
import TableHeaderCell from "../TableHeaderCell/TableHeaderCell";
import { genreFilter, platformFilter } from "../../shared/entities";
import TableHeaderCellWithFilter from "../TableHeaderCellWithFilter/TableHeaderCellWithFilter";
import { useTable } from "./hooks/useTable";
import { SortingContainer, TableBody, TableContainer, TableRow, TableWrapper } from "../GamesTable/GamesTable";
import TableFooter from "../TableFooter/TableFooter";
import caretUp from '../../shared/svg/caret-up.svg'
import caretDown from '../../shared/svg/caret-down.svg'

interface IColumn {
    id: Omit<keyof IGame, 'id'>,
    header: () => ReactNode,
    cell: (row: IGame) => ReactNode 
}


const SecondGamesTable = () => {
    const {pagination, setCurrentGenreFilter,
         setPageIndex, setCurrentPlatformFilter,
     paginetedRows,getCanNextPage, getCanPreviousPage, setPageSize,
    getRowCount, pageCount, toggleSorting, sortingByDate, currentGenreFilter, currentPlatformFilter} = useTable();

    const columns: IColumn[] = useMemo(() => {
        return [
            {
                id: 'title',
                header: () => <TableHeaderCell key={'title'}>Название</TableHeaderCell>,
                cell: info => <TableDataCell key={'title'}>{info.title}</TableDataCell>,
            },
            {
                id: 'genre',
                header: () => <TableHeaderCellWithFilter currentOption={currentGenreFilter} filerOptions={genreFilter} handleDropDownItemClick={(newGenre: string) => {
                            setPageIndex(0);
                            setCurrentGenreFilter(newGenre);
                        }} key={'genre'}>Жанр</TableHeaderCellWithFilter>,
                cell: info => <TableDataCell key={'genre'}>{info.genre}</TableDataCell>,
            },
            {
                id: 'platform',
                header: () => <TableHeaderCellWithFilter currentOption={currentPlatformFilter} filerOptions={platformFilter} handleDropDownItemClick={(newPlatform: string) => {
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
                            <img src={caretDown} alt="caretDown"></img>
                        </SortingContainer>,
                        'desc': <SortingContainer>
                            <img src={caretUp} alt="CaretUp"></img>
                        </SortingContainer>,
                        'none': <SortingContainer>
                            <img src={caretUp} alt="CaretUp"></img>
                            <img src={caretDown} alt="caretDown"></img>
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