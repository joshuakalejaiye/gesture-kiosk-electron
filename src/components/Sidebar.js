/** @jsxImportSource @emotion/react */
import { useTheme, css } from '@emotion/react'
import { Fragment } from 'react';
import styled from 'styled-components';
import logo from "../images/Deleted.png"


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
  z-index: 0; 
  top: 0;
  left: 0;
  height: auto;
  grid-template-columns: 100%;
  grid-row-gap: 2.2vh;
  display:grid; 
  background-color: #111;

  & > div {
    display:grid;
  }

  ${this}:mask {
    pointer-events: none;
  }

`

const SidebarButton = styled.button`
margin-top: 0.3rem;
text-align: center;
color: white;
font-weight: lighter;
border:none;
font-size: 2.8vh;
height: 7.65vh;
background-color: #111;

${this}:hover {
    background-color: grey;
  }

`

const Sidebar = (props) => {
    const theme = useTheme();

    return (
       <Fragment>
          <SidebarStyle>
          <div css={css` grid-row-start: 1;  grid-row-end:2;  `}>
          <Logo src={logo}></Logo>
          <SidebarButton onClick={(e) => { props.setCategory(''); }}>Home</SidebarButton>
          <SidebarButton>Vouchers</SidebarButton>
          </div>
          
          <div css={css` grid-row-start: 2;  grid-row-end:3; `}>
          <SidebarButton onClick={(e) => { props.setCategory('MAIN'); }}>Main</SidebarButton>
          <SidebarButton onClick={(e) => { props.setCategory('SIDE')}}>Sides</SidebarButton>
          <SidebarButton onClick={(e) => { props.setCategory('DRINK'); }}>Drinks</SidebarButton>
          <SidebarButton onClick={(e) => { props.setCategory('DESSERT'); }}>Dessert</SidebarButton>
          </div>

          <div css={css` grid-row-start: 4;  grid-row-end:4; `}>
          <SidebarButton>Checkout</SidebarButton>
          <SidebarButton></SidebarButton>
          </div>

          </SidebarStyle>
       </Fragment>
    );
}

export default Sidebar;