// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { Fragment, useState, useEffect, useRef } from 'react';
import './App.css';
import AllProducts from './components/ProductGrid';
import Sidebar from './components/Sidebar';
import ObjectDetector from './components/ObjectDetector';
import VoucherComponent from './components/Voucher.js';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import CheckoutComponent from './components/Checkout';
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import KioskContext from './components/KioskContext';

const NotInSidebar = styled.section`
margin-left: 160px; /* Same as the width of the sidebar */
padding: 0px 10px; /* a little bit away from sidebar */
padding-bottom: 2.5rem;  /* Footer height */
min-height: 100vh; /* as high as 100% of the page */
/* background-color: #424242;
color: #ffffff; */
`
const Title = styled.h2`
font-weight: lighter;
text-align:center;
margin-top: 1rem;
color: whitesmoke;
`
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`
const Content = styled.section`
margin-top: 40px;
display:flex;
height: 100vh;
background:#1f1f1f;
align-items: center;
`

function App() {
  const [category, setCategory] = useState('');

 const [context, setContext] = useState({
  "content" : "all_products",
  "sidebar_category" : "",
  "admin_user" : false,
  "admin_email" : "",
  "orientation" : "landscape",
  "cartItems" : [
          {
              "product_id" : "2",
              "quantity" : "1"
          },
          {
              "product_id" : "3",
              "quantity" : "1"
  }]  
});

  return (
    <KioskContext.Provider value={{context, setContext}}>
    
      <HeaderComponent></HeaderComponent>
    
      <Sidebar setCategory={setCategory}>
      </Sidebar>

      <Content>
     
      <ObjectDetector></ObjectDetector>

      <NotInSidebar>
        <header>  
         
        </header>
        <section>
         <Route exact path='/'>
            <Title>Welcome To Our Restaurant</Title>
            <Subtitle>What would you like to eat?</Subtitle>
            <AllProducts category={category}></AllProducts>
         </Route>
         <Route path='/vouchers'>
            <VoucherComponent/>
         </Route>
         <Route path='/checkout'>
            <CheckoutComponent/>
         </Route>
        </section>
      </NotInSidebar>
      
      <FooterComponent>
      </FooterComponent>
      </Content>
    </KioskContext.Provider>);
}

export default App;
