/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { jsx, css } from '@emotion/react'

const Footer = styled.footer`
position: absolute;
background-color: #0e0e0e;
bottom: 0;
width: 100%;
height: 2.6rem;
margin-left: auto; 
margin-right: auto;
flex-direction: row-reverse;
justify-content: flex-start;
align-self: stretch;

& > a { 
   display:block;
   text-align: right;
   color: #ffffff;
}
`

const FooterComponent = ( props ) => {
document.getElementById('cursor')
    return (
        <Footer className="interactable" onClick={() => {console.log(" footer clicked "); console.log(props); }}>
            <h5 css={css`z-index: 3; font-weight: lighter; color: white; margin-top: 8px; padding: 0px 710px; margin-left:auto; top:0;`}>&#129155;</h5>
        </Footer>
    );}

export default FooterComponent;