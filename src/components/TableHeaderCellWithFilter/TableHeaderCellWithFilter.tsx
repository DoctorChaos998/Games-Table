import { useEffect, useState } from "react";
import TableHeaderCell from "../TableHeaderCell/TableHeaderCell";
import styled from "styled-components";

interface ITableHeaderCellWithFilterProps {
    children: React.ReactNode,
    filerOptions: Record<string, string>,
    handleDropDownItemClick: (newFilter: string) => void
}

const TableHeaderCellWithFilter = ({children, handleDropDownItemClick, filerOptions}: ITableHeaderCellWithFilterProps) => {
    const [dropDownIsVisible, setDropDownIsVisible] = useState(false);

    useEffect(() => {
        const handleWindowClick = () => {
            setDropDownIsVisible(false);
        }
        if(dropDownIsVisible) window.addEventListener('click', handleWindowClick);

        return () => window.removeEventListener('click', handleWindowClick);
    }, [dropDownIsVisible])

    return(
        <TableHeaderCell>
            {children}
            <DropDownButton onClick={(event) => {
                event.stopPropagation();
                setDropDownIsVisible(!dropDownIsVisible);
            }}>
                <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.08977 15.884C8.08977 16.0915 8.25617 16.259 8.46242 16.259H11.5374C11.7437 16.259 11.9101 16.0915 11.9101 15.884V13.5872H8.08977V15.884ZM14.3136 7.86841H5.68625C5.39914 7.86841 5.21985 8.1813 5.36399 8.43091L7.95735 12.8372H12.0448L14.6382 8.43091C14.78 8.1813 14.6007 7.86841 14.3136 7.86841Z" fill="white"/>
                </svg>
                {dropDownIsVisible&&
                    <DropDownContainer>
                        {Object.entries(filerOptions).map(option => <DropDownItem key={option[0]} onClick={(event) => {
                            event.stopPropagation();
                            handleDropDownItemClick(option[0]);
                        }}> 
                            {option[1]}
                        </DropDownItem>)}
                    </DropDownContainer>}
            </DropDownButton>
        </TableHeaderCell>
    )
};

export default TableHeaderCellWithFilter;

const DropDownButton = styled.button({
    position: "absolute",
    border: "none",
    right: '16px',
    backgroundColor: "transparent",
    cursor: "pointer"
});

const DropDownContainer = styled.ul({
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    listStyle:"none",
    right: 0,
    borderRadius: '10px',
    //overflow: "hidden",
    backdropFilter: 'blur(10px)',
    maxHeight: '200px',
    display: "block",
    overflowY: "scroll"
});

const DropDownItem = styled.li({
    padding: '10px',
    fontSize: '16px',
    borderBottom: '2px solid #FF6501',
    cursor: "pointer",
    transition: 'background-color 0.3s easy',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
});

