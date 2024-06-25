import { ThHTMLAttributes } from "react"
import styled from "styled-components"

interface ITableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode
}

const TableHeaderCell = ({children, ...props}: ITableHeaderCellProps) => {
    return (
        <TableHeaderCellContainer {...props}>
            {children}
        </TableHeaderCellContainer>
    )
}

export default TableHeaderCell


const TableHeaderCellContainer = styled.th({
    padding: '16px',
    textAlign: "left",
    position: "relative",
    width: '325px',
    "&::before": {
        content: '""',
        position: "absolute",
        backgroundColor: "white",
        left: '-2px',
        height: '22px',
        width: '1px'
    }
});