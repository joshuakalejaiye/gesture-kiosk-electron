// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React, { Fragment, useState } from 'react';
import './App.css';
import BindProducts from './components/BindProducts';
import styled from 'styled-components';
import SidebarStyle from './components/Sidebar';

const NotInSidebar = styled.section`
margin-left: 160px; /* Same as the width of the sidebar */
padding: 0px 10px; /* a little bit away from sidebar */
padding-bottom: 2.5rem;  /* Footer height */
min-height: 100vh; /* as high as 100% of the page */
/* background-color: #424242;
color: #ffffff; */
`
const Title = styled.h2`
text-align:center;
margin-top: 1rem;
`
const Subtitle = styled(Title)`
font-size: 1rem;
`
const Footer = styled.footer`
 position: absolute;
 background-color: #111;
 bottom: 0;
 width: 100%;
 height: 2.5rem;
 margin-left: auto; 
 margin-right: auto;

 & > a { 
    display:block;
    text-align: right;
    color: #ffffff;
 }
`

function App() {
  
  const [category, setCategory] = useState('');

  return (
    <Fragment>
      <section css={css`background-color: coral;`}>
      <SidebarStyle setCategory={setCategory}></SidebarStyle>
      </section>
      
    <NotInSidebar>
      <header>
        <Title>Welcome To Our Restaurant</Title>
        <Subtitle>What would you like to eat?</Subtitle>
        </header>

        <section>
          {/* Add routes */}
          <BindProducts category={category}></BindProducts>
        </section>
    </NotInSidebar>
    
    <Footer>
          <a href="">ADMIN</a>
        </Footer>
    </Fragment>  );
}

export default App;
