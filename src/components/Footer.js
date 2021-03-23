/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { jsx, css } from '@emotion/react'
import {useContext} from 'react';
import KioskContext from './KioskContext';

const Footer = styled.footer`
position: absolute;
background-color: #0e0e0e;
bottom: 0;
width: 100%;
height: 3rem;
text-align: center;

& > a { 
   display:block;
   text-align: right;
   color: #ffffff;
}
`

const SidebarButton = styled.button.attrs(props => ({
    className: 'interactable'
  }))`
  text-align: center;
  display: block;
  position: absolute;
  color: white;
  font-weight: lighter;
  border:none;
  margin-top: 3px;
  font-size: 2.8vh;
  height: 4rem;
  width: 25vh;
  background-color: #0e0e0e;
  margin-bottom: 1rem;
`

const UpArrow = styled(SidebarButton)`
margin-left:25vh;
`

const DownArrow = styled(SidebarButton)`
margin-right:100;
`


// () => {console.log(document.getElementById('all_products')); document.getElementById('all_products').scrollBy(0, 250); 

const FooterComponent = () => {
    const {context, setContext} = useContext(KioskContext);

    return (
        <Footer >
                <span id="footer_content" className="interactable" css={css` display:inline-block; margin-top: 0; margin-bottom: 100px; margin-right:250px;`}>
            <DownArrow 
                className="interactable" 
                onClick={() => { 
                console.log(context); 
                if (document.getElementById(context.content)) 
                    document.getElementById(context.content).scrollBy(0, 250);}}>
                &#129155;
            </DownArrow>
            <UpArrow
                className="interactable"
                onClick={() => { 
                console.log('up arrow');
                if (document.getElementById(context.content)) 
                    document.getElementById(context.content).scrollBy(0, -250);}}>
                &#129153;
            </UpArrow>
            </span>
        </Footer>
    );}

export default FooterComponent;