/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Fragment } from 'react';
import styled from 'styled-components';
import logo from "../images/Deleted.png"
import { Link } from "react-router-dom";
import KioskContext from './KioskContext';
import {useContext, useEffect} from 'react';

const Logo = styled.img`
height: 60px;
margin-left: auto;
margin-right: auto;
margin-bottom: 1vh;
margin-top: 3vh;
`

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
  background-color: #111;

  & > div {
    display:grid;
  }

  ${this}:mask {
    pointer-events: none;
  }

`

const SidebarButton = styled.button.attrs(props => ({
  className: 'interactable'
}))`
margin-top: 0.3rem;
text-align: center;
color: white;
font-weight: lighter;
border:none;
font-size: 2.8vh;
height: 8vh;
left: 0;
right: 0;
width: 22vh;
background-color: #212121;
border-color: #111;
border-style: solid none solid solid;
border-width: thin;

${this}:hover {
  background-color: #0277bd;
}

${this}:focus {
  background-color: #0277bd;
}
`

const SidebarLink = styled(Link).attrs(props => ({
  className: 'interactable'
}))`
  color: #ffffff;
  text-decoration: none;

  ${this}:hover {
  color: #ffffff;
  text-decoration: none;
  }

`

const Background = styled.div`
  position: absolute;
  width: 160px;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
  background: #111;
`;

const SidebarContainer = styled.ul.attrs(props => ({
  className: 'interactable'
}))``

const categories = ['_', 'MAIN', 'SIDE', 'DRINK', 'DESSERT'];

const Sidebar = (props) => {
  const {context, setContext} = useContext(KioskContext);
  
  const handleCategorySwitch = ( category ) => {
    const newContext = context;
    newContext.sidebar_category = category;
    setContext(newContext);
    props.setCategory(category);

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
        <div css={css` grid-row-start: 1;  grid-row-end:2;  `}>
        <Logo src={logo}></Logo>
        <SidebarButton id={categories[0]} onClick={() => { handleCategorySwitch(''); }}><SidebarLink to="/">Home</SidebarLink></SidebarButton>
        <SidebarButton><SidebarLink to="/vouchers">Vouchers</SidebarLink></SidebarButton>
        </div>
        
        <div css={css` grid-row-start: 2;  grid-row-end:3; `}>
          {categories.map(category => (
              category !== categories[0] && <SidebarButton id={category} onClick={() => { handleCategorySwitch(category); }}><SidebarLink to="/">{formatName(category)}</SidebarLink></SidebarButton>
          ))}
        </div>

        <div css={css` grid-row-start: 3;  grid-row-end:4; `}>
        <SidebarButton><SidebarLink to="/checkout">Checkout</SidebarLink></SidebarButton>
        </div>
        </SidebarStyle>
        <Background/>
      </SidebarContainer>
      </Fragment>
    );
}

export default Sidebar;