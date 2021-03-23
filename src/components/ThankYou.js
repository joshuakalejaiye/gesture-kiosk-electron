/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { jsx, css } from '@emotion/react';
import {useContext} from 'react';
import { useToggle } from '../hooks/useToggle';
import KioskContext from "./KioskContext";
import CartItem from "./CartItem";
import { Modal } from './Modal';

const PageLayout = styled.div`
display:grid;
grid-template-columns: 1fr;
grid-row-gap: 1vh;
width:1100px;
padding: 15px;
grid-column-gap: 1vh;
margin-top: 2vh;
height: 550px;
position:relative;
border:none;
box-shadow: none;
`

const Title = styled.h2`
font-weight: lighter;
text-align:center;
margin-top: 1rem;
color: whitesmoke;
margin-top: auto;
margin-bottom: auto;
margin-left: auto;
margin-right: auto;

`
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`

const content = 'all_products';
const ThankYou = () => {    
    const {context, setContext} = useContext(KioskContext);
    var cartItems = [];
    const [products, setProducts] = useState(cartItems);
    const [fetched, setFetched] = useState(false);
    const [open, setOpen] = useToggle(false);
    const [clickedProduct, setClickedProduct] = useState(null);

   useEffect(() => {
    const newContext = context;
    newContext.content = content;
    setContext(newContext);
   },[])


    return (
      <PageLayout id={content}>
          <Title>Thank you for your purchase!</Title>

      </PageLayout>
      );

};

export default ThankYou;
