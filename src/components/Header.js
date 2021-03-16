/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { jsx, css } from '@emotion/react'

const Header = styled.header`
display: flex;
height: 40px;
width: 100%;
z-index: 1000;
flex-direction: row-reverse;
justify-content: flex-start;
background: #0e0e0e;
color: black;
position: absolute;
top: 0;
left: 0;  
right: 0;
align-self: stretch;
z-index:3;
-webkit-app-region: drag;
`

const HeaderButton = styled.div`
margin-top: 0;
color: white;  
-webkit-app-region: no-drag;
font-size: 1.4rem;
padding: 0px 20px;
font-weight: lighter;
z-index:2;
cursor:pointer;
`

const CloseButton = styled(HeaderButton)`
${this}:hover {
  background: red;
}
`
const MinimiseButton = styled(HeaderButton)`
margin-top: 0.15vh;
font-size: 10;

${this}:hover {
  background: #4b4b4b;
}`

const HeaderComponent = () => { 

    
    return (

        <>
    <Header>    
        <CloseButton id="close">x</CloseButton>
        <MinimiseButton id="min">-</MinimiseButton>
        <h5 css={css`z-index: 3; font-weight: lighter; color: white; margin-top: 8px; padding: 0px 370px; margin-left:auto; top:0;`}>Gesture Ordering Kiosk</h5>
    </Header>
    </>
);}

export default HeaderComponent;