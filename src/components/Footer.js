/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { jsx, css } from '@emotion/react'
import {useContext} from 'react';
import KioskContext from './KioskContext';

const footerWidth = '6rem';

const Footer = styled.footer.attrs(props => ({
    className: 'interactable'
  }))` 
min-height:100%;
width: ${footerWidth};
position: absolute;
z-index: 1;
top:0;
right:0;
background-color: #0e0e0e;
overflow-x:hidden;
padding-top:20px;
bottom: 0;
margin-left: auto;
margin-right: auto;
box-sizing: border-box;

& > * { 
    box-sizing: border-box
}

& > a { 
   display:block;
   text-align: right;
   color: #ffffff;
}
`

const FooterButton = styled.button.attrs(props => ({
    className: 'interactable'
  }))`
  color: white;
  font-weight: lighter;
  border-color: #111;
  font-size: 2.8vh;
  background-color: #0e0e0e;
  height: 50%;
  width: ${footerWidth};
`


// () => {console.log(document.getElementById('all_products')); document.getElementById('all_products').scrollBy(0, 250); 

const FooterComponent = () => {
    const {context, setContext} = useContext(KioskContext);

    return (
        <Footer >
            {/* <DownArrow 
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
            </UpArrow> */}

        <FooterButton className="interactable" onClick={() => { 
                if (document.getElementById(context.content)) 
                    document.getElementById(context.content).scrollBy(0, -345);}}>
            &#129153;
        </FooterButton>
        <FooterButton className="interactable" 
        onClick={() => { 
            if (document.getElementById(context.content)) 
                document.getElementById(context.content).scrollBy(0, 345);}}>
            &#129155;
        </FooterButton>
        </Footer>
    );}

export default FooterComponent;