import { useEffect, useState } from "react";
import TableHeaderCell from "../TableHeaderCell/TableHeaderCell";
import styled from "styled-components";
import filter from '../../shared/svg/filter.svg'

interface ITableHeaderCellWithFilterProps {
    children: React.ReactNode,
    filerOptions: Record<string, string>,
    handleDropDownItemClick: (newFilter: string) => void,
    currentOption: string
}

const TableHeaderCellWithFilter = ({children, handleDropDownItemClick, filerOptions, currentOption}: ITableHeaderCellWithFilterProps) => {
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
                <CurrentFilterOption>
                        {filerOptions[currentOption]}
                </CurrentFilterOption>
                <img src={filter} alt="filter">                 
                </img>
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

const CurrentFilterOption = styled.span({
    position: "absolute",
    color: 'rgba(255, 255, 255, 0.3)',
    right: '30px',
    top: '5px'
})

