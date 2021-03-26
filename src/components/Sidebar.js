/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import KioskContext from './KioskContext';
import {useContext, useEffect, useState} from 'react';

const Logo = styled.img`
height: 60px;
margin-left: auto;
margin-right: auto;
margin-bottom: 1vh;
margin-top: 3vh;
`

var sidebar_width = '180px';
const SidebarStyle = styled.div`
  margin-top: 35px;
  width: 160px; 
  position: fixed; 
  z-index: 2; 
  top: 0;
  left: 0;
  height: auto;
  grid-template-columns: 100%;
  grid-row-gap: 2vh;
  display:grid; 
  background-color: #0e0e0e;

  & > div {
    display:grid;
  }

  ${this}:mask {
    pointer-events: none;
  }

`
const buttonColor = '#111';

const SidebarButton = styled(Link).attrs(props => ({
  className: 'interactable'
}))`
color: white;
font-weight: lighter;
border:none;
font-size: 2.8vh;

margin-top: auto;
margin-bottom: auto;
margin-left: auto;
margin-right: auto;

height: 8vh;
width: ${sidebar_width};
background-color: ${buttonColor};

border-color: ${buttonColor};
border-style: solid none solid solid;
border-width: thin;

text-decoration: none;
text-align: center;

${this}:hover {
  background-color: #0277bd;
  text-decoration: none;
  color: #ffffff;
}

${this}:focus {
  background-color: #0277bd;
  border: none;
  text-decoration: none;
}
`

const Background = styled.div`
  position: absolute;
  width: ${sidebar_width};
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
  background: #0e0e0e;
`;

const SidebarContainer = styled.ul.attrs(props => ({
}))``

const categories = ['_', 'MAIN', 'SIDE', 'DESSERT', 'DRINK'];
const images = require.context('../images', true);

const Sidebar = (props) => {
  const {context, setContext} = useContext(KioskContext);
  const [itemsInCart, setItemsInCart] = useState(0);

  const handleCategorySwitch = ( category ) => {
    const newContext = context;
    newContext.sidebar_category = category;
    setContext(newContext);
    props.setCategory(category);
    sidebar_width = context.sidebar_width;

    if (category === '')
    {
      if (document.getElementById('_')) document.getElementById('_').focus();
    }
    else
    {
      document.getElementById(category).focus();
    }
  }

  useEffect(() => { 
    handleCategorySwitch('');
  }, []);


  const formatName = name => {
    return (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + "s");
  }

  return (
      <Fragment>
      <SidebarContainer>
        <SidebarStyle>
        <div css={css`grid-row-gap: 0.4vh; grid-row-start: 1;  grid-row-end:2;  `}>
        <Logo src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}></Logo>
        <SidebarButton id={categories[0]} onClick={() => { handleCategorySwitch(''); }} to="/" >Home</SidebarButton>
        <SidebarButton to="/vouchers">Vouchers</SidebarButton>
        </div>
        
        <div css={css`   grid-row-gap: 0.5vh; grid-row-start: 2;  grid-row-end:3; `}>
          {categories.map(category => (
              category !== categories[0] && <SidebarButton to="/" key={category} id={category} onClick={() => { handleCategorySwitch(category); }}>{formatName(category)}</SidebarButton>
          ))}
        <SidebarButton className="iteractable" to="/checkout" >Checkout</SidebarButton>
        </div>

        </SidebarStyle>
        <Background/>
      </SidebarContainer>
      </Fragment>
    );
}

export default Sidebar;