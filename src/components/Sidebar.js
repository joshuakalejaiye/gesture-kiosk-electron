/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Fragment } from 'react';
import styled from 'styled-components';
import logo from "../images/Deleted.png"
import history from './history';


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
  grid-row-gap: 3vh;
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
height: 6vh;
background-color: #111;

${this}:hover {
    background-color: #0081cb;
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

const handleAdmin = () => history.push('/admin/login');
const routeToHome = () =>{
  if( history.location.pathname !== '/' ) history.push('/');
} 
const routeToVoucher = () =>{
  history.push('/voucher');
} 

const Sidebar = (props) => {

    return (
       <Fragment>
          <SidebarStyle>
          <div css={css` grid-row-start: 1;  grid-row-end:2;  `}>
          <Logo src={logo} onClick={handleAdmin}></Logo>
          <SidebarButton onClick={() => { props.setCategory(''); routeToHome(); }}>Home</SidebarButton>
          <SidebarButton onClick={() => { routeToVoucher(); }}>Vouchers</SidebarButton>
          </div>
          
          <div css={css` grid-row-start: 2;  grid-row-end:3; `}>
          <SidebarButton onClick={() => { props.setCategory('MAIN'); routeToHome(); }}>Main</SidebarButton>
          <SidebarButton onClick={() => { props.setCategory('SIDE'); routeToHome(); }}>Sides</SidebarButton>
          <SidebarButton onClick={() => { props.setCategory('DRINK'); routeToHome(); }}>Drinks</SidebarButton>
          <SidebarButton onClick={() => { props.setCategory('DESSERT'); routeToHome(); }}>Dessert</SidebarButton>
          </div>

          <div css={css` grid-row-start: 3;  grid-row-end:4; `}>
          <SidebarButton>Checkout</SidebarButton>
          </div>
          </SidebarStyle>
          <Background/>

       </Fragment>
    );
}

export default Sidebar;