import { useEffect, useState } from "react";
import styled from "styled-components";

interface ITableFooterProps {
    currentPageSize: number,
    setPageSize: (pageSize: number) => void,
    pageCount: number,
    rowCount: number,
    currentPageNumber: number,
    setPageIndex: (pageIndex: number) => void,
    canPreviousPage: boolean,
    canNextPage: boolean
}

const TableFooter = ({
    currentPageSize, setPageSize,
     rowCount, pageCount, currentPageNumber,
      setPageIndex, canNextPage, canPreviousPage}: ITableFooterProps) => {
    const [visiblePages, setVisiblePages] = useState<(null|number)[]>([1,2,3,4,5,null, 40]);

    useEffect(() => {
        if(pageCount < 10) {
            const newVisiblePages: number[] = [];
            for(let i = 1; i<pageCount+1; i++){
                newVisiblePages.push(i);
            }
            setVisiblePages(newVisiblePages);
        }
        else{
            if(currentPageNumber > 5 && pageCount > currentPageNumber + 5){
                setVisiblePages([1,null,currentPageNumber-2,currentPageNumber-1,currentPageNumber,currentPageNumber+1,currentPageNumber+2,null,pageCount]);
            }
            else {
                if(currentPageNumber < 6) setVisiblePages([1,2,3,4,5,6,7,null,pageCount]);
                else setVisiblePages([1,null,pageCount - 6,pageCount - 5,pageCount - 4,pageCount - 3,pageCount - 2,pageCount - 1,pageCount]);
            }
        }
    }, [pageCount, currentPageNumber]);

    return <TableFooterWrapper>
        <PaginationContainer>
            <GameCount>
                {`Всего ${rowCount}`} 
            </GameCount>
            <PaginationButton onClick={() => setPageIndex(currentPageNumber-2)} $isDisabled={!canPreviousPage} disabled={!canNextPage}>
                {`<`}
            </PaginationButton>
            <PagesListContainer>
                {visiblePages.map((pageNumber, index) => {
                    return <Page key={index} onClick={() => {
                        if(currentPageNumber !== pageNumber && pageNumber && pageNumber > 0)
                            setPageIndex((pageNumber - 1) ?? 0);
                        const prevPage = visiblePages[index-1];
                        const nextPage = visiblePages[index+1];
                        if(!pageNumber && prevPage && nextPage){
                            setPageIndex(Math.floor((prevPage + nextPage)/2));
                        } 
                    }} $isCurrentPage={pageNumber === currentPageNumber}>
                        {pageNumber ?? '...'}
                    </Page>
                })}
            </PagesListContainer>
            <PaginationButton $isDisabled={!canNextPage} disabled={!canNextPage} onClick={() => setPageIndex(currentPageNumber)}>
                {`>`}
            </PaginationButton>
        </PaginationContainer>
        <SelectContainer>
            <span>выводить по </span>
            <Select
            value={currentPageSize}
            onChange={e => {
                setPageIndex(0);
                setPageSize(Number(e.target.value));
            }}
            >
            {[10, 20, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                {pageSize}
                </option>
            ))}
            </Select>
        </SelectContainer>
    </TableFooterWrapper>
};

export default TableFooter;

const TableFooterWrapper = styled.div({
    display: "flex",
    width: '100%',
    padding: '19px 24px',
    justifyContent: 'end',
    gap: '41px',
    alignItems: "center"
});

const SelectContainer = styled.div({
    display: "flex",
    gap: '8px',
});

const Select = styled.select({
    color: 'white',
    border: '1px solid white',
    backgroundColor: '#181A20',
    padding: '0 4px'
});

const PaginationContainer = styled.div({
    display: "flex",
    alignItems: "center"
});

const GameCount = styled.span({
    paddingRight: '8px'
});

const PaginationButton = styled.button<{$isDisabled: boolean}>(props => ({
    cursor: `${props.$isDisabled?'auto':'pointer'}`,
    height: '24px',
    width: '24px',
    backgroundColor: "transparent",
    border: "1px solid transparent",
    color: `${props.$isDisabled?'rgba(255, 255, 255, 0.3)':'white'}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {
        border: `1px solid ${props.$isDisabled?'transparent':'white'}`
    }
}));

const PagesListContainer = styled.ul({
    display: "flex",
    listStyle: "none",
});

const Page = styled.li<{$isCurrentPage: boolean}>(props => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: `1px solid ${props.$isCurrentPage?'rgba(255, 255, 255, 0.2)':'transparent'}`,
    cursor: "pointer",
    height: '24px',
    width: '24px',
    '&:hover': {
        border: `1px solid white`
    }
}));

