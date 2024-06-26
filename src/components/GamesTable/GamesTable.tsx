import { useEffect, useMemo, useState } from "react"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { IGame } from "../../shared/types"
import GameTableService from "../../shared/http/GameTableService"
import styled from "styled-components"
import TableHeaderCell from "../TableHeaderCell/TableHeaderCell"
import TableDataCell from "../TableDataCell/TableDataCell"
import TableFooter from "../TableFooter/TableFooter"
import TableHeaderCellWithFilter from "../TableHeaderCellWithFilter/TableHeaderCellWithFilter"
import { genreFilter, platformFilter } from "../../shared/entities"
import caretUp from '../../shared/svg/caret-up.svg'
import caretDown from '../../shared/svg/caret-down.svg'
  

const columnHelper = createColumnHelper<IGame>()

const GamesTable = () => {
    const [data, setData] = useState<IGame[]>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [currentPlatformFilter, setCurrentPlatformFilter] = useState<string>('all');
    const [currentGenreFilter, setCurrentGenreFilter] = useState<string>('all');

    const columns = useMemo(() => [
        columnHelper.accessor('title', {
            header: (info) => <TableHeaderCell key={info.header.id}>Название</TableHeaderCell>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            enableSorting: false
        }),
        columnHelper.accessor('genre', {
            header: (info) => <TableHeaderCellWithFilter currentOption={currentGenreFilter} filerOptions={genreFilter} handleDropDownItemClick={(newGenre: string) => {
                table.setPageIndex(0);
                setCurrentGenreFilter(newGenre);
            }} key={info.header.id}>Жанр</TableHeaderCellWithFilter>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            enableSorting: false
        }),
        columnHelper.accessor('platform', {
            header: (info) => <TableHeaderCellWithFilter currentOption={currentPlatformFilter} filerOptions={platformFilter} handleDropDownItemClick={(newPlatform: string) => {
                table.setPageIndex(0);
                setCurrentPlatformFilter(newPlatform);
            }} key={info.header.id}>Платформа</TableHeaderCellWithFilter>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            enableSorting: false
        }),
        columnHelper.accessor('publisher', {
            header: (info) => <TableHeaderCell key={info.header.id}>Издатель</TableHeaderCell>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            enableSorting: false
        }),
        columnHelper.accessor('developer', {
            header: (info) => <TableHeaderCell key={info.header.id}>Разработчик</TableHeaderCell>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            enableSorting: false
        }),
        columnHelper.accessor('release_date', {
            id: 'release_date',
            header: (info) => <TableHeaderCell onClick={info.header.column.getToggleSortingHandler()}
             key={info.header.id}>
                Дата релиза
                {{
                    desc: <SortingContainer>
                        <img src={caretDown} alt="caretDown"></img>
                    </SortingContainer>,
                    asc: <SortingContainer>
                        <img src={caretUp} alt="CaretUp"></img>
                </SortingContainer>,
                    }[info.header.column.getIsSorted() as string] ?? <SortingContainer>
                    <img src={caretUp} alt="CaretUp"></img>
                    <img src={caretDown} alt="caretDown"></img>
            </SortingContainer>}
             </TableHeaderCell>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            sortingFn: "alphanumeric",
            enableSorting: true
        }),
    ], [currentGenreFilter, currentPlatformFilter]);
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        state: {
            pagination,
            sorting
        },
        onSortingChange: setSorting
    });

    useEffect(() => {
        GameTableService.getGamesList({filterByPlatform: currentPlatformFilter, filterByGenre: currentGenreFilter}).then(data => {
            setData(data.data);
        });
    }, [currentPlatformFilter, currentGenreFilter]);

    return (
        <TableWrapper>
            <TableContainer>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => 
                            header.isPlaceholder
                                ? null
                                : <>
                                    {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                                    
                                </>
                        )}
                    </TableRow>
                    ))}
                </thead>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => 
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                    </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
            <TableFooter canNextPage={table.getCanNextPage()}
            canPreviousPage={table.getCanPreviousPage()}
             setPageIndex={table.setPageIndex}
              currentPageNumber={table.getState().pagination.pageIndex + 1}
               rowCount={table.getRowCount()} pageCount={table.getPageCount()}
                currentPageSize={table.getState().pagination.pageSize}
            setPageSize={table.setPageSize}/>
        </TableWrapper>
    )
}

export default GamesTable

export const TableWrapper = styled.section({
    color: 'white',
    backgroundColor: '#181A20',
    overflow: "hidden",
    borderRadius: '16px',
    width: '1840px',
    marginTop: '75px',
    display: "flex",
    flexDirection: 'column',
    boxSizing: "border-box",
    marginBottom: '100px',
    zIndex: 1
});

export const TableContainer = styled.table({
    width: '100%',
    borderSpacing: '0px',
});

export const TableBody = styled.tbody({
    maxHeight: '540px',
    overflowY: "scroll",
    display: "block",
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px'
    },
    '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px'
      },
    '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent'
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent'
    }
});

export const SortingContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: '16px',
    top: '16px',
    gap: '1px'
});

export const TableRow = styled.tr({
    display: 'table',
    //tableLayout: 'fixed'
});



