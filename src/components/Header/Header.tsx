import styled from "styled-components";
import logo from '../../shared/svg/Logo.svg'

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <img src={logo} alt="logo"></img>
            </HeaderContainer>
        </HeaderWrapper>
    )
};

export default Header;

const HeaderWrapper = styled.header({
    marginTop: '72px',
    width: '100%',
    color: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const HeaderContainer = styled.div({
    width: '1840px'
});