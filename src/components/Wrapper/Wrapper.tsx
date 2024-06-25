import styled from "styled-components"
import GamesTable from "../GamesTable/GamesTable"
import SecondGamesTable from "../SecondGamesTable/SecondGamesTable"

const Wrapper = () => {
    return (
        <GamesTableWrapper>
            <GamesTable/>
            <SecondGamesTable/>
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
    flexDirection: "column",
    alignItems: 'center'
});

