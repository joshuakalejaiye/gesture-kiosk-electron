/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
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

const Background = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 0; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  background-color: #111;
`

const SidebarStyle = styled.div`
   width: 160px; 
  position: fixed; 
  z-index: 1; 
  top: 0;
  left: 0;
  height: auto;
  grid-template-columns: 100%;
  grid-row-gap: 2.2vh;
  display:grid; 

  & > div {
    display:grid;
  }

`

const SidebarButton = styled.button`
margin-top: 0.3rem;
text-align: center;
color: white;
font-weight: lighter;
border:none;
font-size: 2.8vh;
height: 4vh;
background-color: #111;

${this}:hover {
    background-color: grey;
  }

`

const Sidebar = (props) => {

    return (
       <Fragment>
          <SidebarStyle>
          <div css={css` grid-row-start: 1;  grid-row-end:2;  `}>
          <Logo src={logo}></Logo>
          <SidebarButton onClick={(e) => { props.setCategory(''); }}>Home</SidebarButton>
          <SidebarButton>Coupons</SidebarButton>
          </div>
          
          <div css={css` grid-row-start: 2;  grid-row-end:3; `}>
          <SidebarButton onClick={(e) => { props.setCategory('MAIN'); }}>Main</SidebarButton>
          <SidebarButton onClick={(e) => { props.setCategory('SIDE')}}>Sides</SidebarButton>
          <SidebarButton onClick={(e) => { props.setCategory('DRINK'); }}>Drinks</SidebarButton>
          <SidebarButton onClick={(e) => { props.setCategory('DESSERT'); }}>Dessert</SidebarButton>
          </div>

          </SidebarStyle>
          <Background></Background>
       </Fragment>
    );
}

export default Sidebar;