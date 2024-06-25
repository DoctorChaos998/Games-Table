import { createGlobalStyle } from "styled-components"
import Header from "./components/Header/Header"
import Wrapper from "./components/Wrapper/Wrapper"

function App() {

  return (
    <>
      <GlobalStyles/>
      <Header/>
      <Wrapper/>
    </>
  )
}

export default App

const GlobalStyles = createGlobalStyle({
  body: {
    backgroundColor: '#FF6501',
    fontFamily: 'Roboto',
    fontStyle: 'normal'
  },
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: "border-box"
  },
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
})


