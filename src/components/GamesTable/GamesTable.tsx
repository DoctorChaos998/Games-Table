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
            header: (info) => <TableHeaderCellWithFilter filerOptions={genreFilter} handleDropDownItemClick={(newGenre: string) => {
                table.setPageIndex(0);
                setCurrentGenreFilter(newGenre);
            }} key={info.header.id}>Жанр</TableHeaderCellWithFilter>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            enableSorting: false
        }),
        columnHelper.accessor('platform', {
            header: (info) => <TableHeaderCellWithFilter filerOptions={platformFilter} handleDropDownItemClick={(newPlatform: string) => {
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
                    asc: <SortingContainer>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.69214 8.5072L5.7236 3.90543C5.61001 3.77371 5.39128 3.77371 5.27648 3.90543L1.30794 8.5072C1.16051 8.6788 1.29343 8.93015 1.5315 8.93015H9.46858C9.70664 8.93015 9.83957 8.6788 9.69214 8.5072Z" fill="white"/>
                        </svg>
                    </SortingContainer>,
                    desc: <SortingContainer>
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.46858 3.80664H1.5315C1.29343 3.80664 1.16051 4.058 1.30794 4.2296L5.27648 8.83136C5.39007 8.96308 5.6088 8.96308 5.7236 8.83136L9.69214 4.2296C9.83957 4.058 9.70664 3.80664 9.46858 3.80664Z" fill="white"/>
                        </svg>
                </SortingContainer>,
                    }[info.header.column.getIsSorted() as string] ?? <SortingContainer>
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.69214 8.5072L5.7236 3.90543C5.61001 3.77371 5.39128 3.77371 5.27648 3.90543L1.30794 8.5072C1.16051 8.6788 1.29343 8.93015 1.5315 8.93015H9.46858C9.70664 8.93015 9.83957 8.6788 9.69214 8.5072Z" fill="white"/>
                    </svg>
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.46858 3.80664H1.5315C1.29343 3.80664 1.16051 4.058 1.30794 4.2296L5.27648 8.83136C5.39007 8.96308 5.6088 8.96308 5.7236 8.83136L9.69214 4.2296C9.83957 4.058 9.70664 3.80664 9.46858 3.80664Z" fill="white"/>
                    </svg>
            </SortingContainer>}
             </TableHeaderCell>,
            cell: info => <TableDataCell key={info.cell.id}>{info.getValue()}</TableDataCell>,
            sortingFn: "alphanumeric",
            enableSorting: true
        }),
    ], []);

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
            setPageSize={(pageSize: number) =>  table.setPageSize(pageSize)}/>
        </TableWrapper>
    )
}

export default GamesTable

const TableWrapper = styled.section({
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
});

const TableContainer = styled.table({
    width: '100%',
    borderSpacing: '0px',
});

const TableBody = styled.tbody({
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

const SortingContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: '16px',
    top: '16px',
    gap: '1px'
});

const TableRow = styled.tr({
    display: 'table',
    //tableLayout: 'fixed'
});



