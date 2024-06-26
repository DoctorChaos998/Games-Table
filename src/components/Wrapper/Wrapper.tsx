import styled from "styled-components"
import GamesTable from "../GamesTable/GamesTable"
import SecondGamesTable from "../SecondGamesTable/SecondGamesTable"
import gamepad from '../../shared/svg/gamepad.svg'
import crestik from '../../shared/svg/Vector (2).svg'
import triangle from '../../shared/svg/Union.svg'

const Wrapper = () => {
    return (
        <GamesTableWrapper>
            <ImageContainer src={gamepad} alt="gamepad" $positionX={1300} $positionY={0} $rotate={0}/>
            <ImageContainer src={crestik} alt="gamepad" $positionX={800} $positionY={20} $rotate={0}/>
            <ImageContainer src={triangle} alt="gamepad" $positionX={0} $positionY={500} $rotate={0}/>
            <GamesTable/>
            <ImageContainer src={gamepad} alt="gamepad" $positionX={400} $positionY={830} $rotate={-25}/>
            <ImageContainer src={crestik} alt="gamepad" $positionX={1400} $positionY={930} $rotate={0}/>
            <ImageContainer src={triangle} alt="gamepad" $positionX={1000} $positionY={1750} $rotate={0}/>
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

const ImageContainer = styled.img<{$positionX: number, $positionY: number, $rotate: number}>(props => ({
    position: "absolute",
    left: props.$positionX,
    top: props.$positionY,
    rotate: `${props.$rotate}deg`
}));

