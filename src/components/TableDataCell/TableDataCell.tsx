import styled from "styled-components";

interface ITableDataCellProps {
    children: React.ReactNode
}

const TableDataCell = ({children}: ITableDataCellProps) => {
    return (
        <TableDataCellContainer>
            {children}
        </TableDataCellContainer>
    )
};

export default TableDataCell;

const TableDataCellContainer = styled.td({
    padding: '16px',
    textAlign: "left",
    backgroundColor: "#FF6501",
    border: "none",
    borderBottom: "2px solid #181A20",
    width: '325px',
});