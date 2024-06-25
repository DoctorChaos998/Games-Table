import styled from "styled-components"
import GamesTable from "../GamesTable/GamesTable"

const Wrapper = () => {
    return (
        <GamesTableWrapper>
            <GamesTable/>
        </GamesTableWrapper>
    )
}

export default Wrapper

const GamesTableWrapper = styled.main({
    display: "flex",
    justifyContent:"center",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '22px',
});

