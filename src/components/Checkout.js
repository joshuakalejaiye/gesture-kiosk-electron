/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { jsx, css } from '@emotion/react';
import {useContext, useRef} from 'react';
import { useToggle } from '../hooks/useToggle';
import KioskContext from "./KioskContext";
import CartItem from "./CartItem";
import { Modal } from './Modal';
import { Link } from "react-router-dom";

const PageLayout = styled.div`
display:grid;
grid-template-columns: 1fr;
grid-row-gap: 1vh;
min-width:85vw;
padding: 15px;
grid-column-gap: 1vh;
overflow-y: auto;
margin-top: 2vh;
scroll-behavior: smooth;
min-height: 60vh;
position:relative;
border:none;
box-shadow: none;
`

const Title = styled.h2`
font-weight: lighter;
text-align:center;
color: whitesmoke;
`
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`

const CartGrid = styled.div`
display:grid;
grid-template-columns: 1fr;
grid-row-gap: 0vh;
padding: 15px;
grid-column-gap: 4vh;
height: 550px;
position:relative;
border:none;
box-shadow: none;
`

const Button = styled.button.attrs(props => ({
    className: 'interactable'
  }))` 
border: 0;
border-radius: 3px;
width: 32vh;
height: 9vh;
color: white;
font-size: 40px;
font-weight: bold;
justify-content:center;
align-items:center;
text-align: center;
margin-top: 1.5vh;
z-index: 3;
`

const PurchaseButton = styled(Link)`
border: 0;
border-radius: 3px;
width: 32vh;
height: 9vh;
color: white;
font-size: 40px;
font-weight: bold;
justify-content:center;
align-items:center;
text-align: center;
margin-top: 1.5vh;
z-index: 3;
height: 10vh;
width: 30vh;
background-color: #111;
font-size: 20px;
font-weight: lighter;
margin-left:auto;
margin-right:auto;
z-index: 0;
color: #ffffff;
display: block;
vertical-align: table-cell;
    text-decoration: none;
  
    ${this}:hover {
    color: #ffffff;
    text-decoration: none;
    }
    & > a {
         /*Change to middle*/
}

`

const SidebarLink = styled(Link).attrs(props => ({
    className: 'interactable'
  }))`
    
`

const content = 'checkout';
const ProductGrid = () => {    
    const {context, setContext} = useContext(KioskContext);
    var cartItems = [];
    const [products, setProducts] = useState(cartItems);
    const [fetched, setFetched] = useState(false);
    const cartGridRef = useRef(false);
    const subtitleRef = useRef(false);
    const purchaseLinkRef = useRef(false);
    const cartEmptyMessage = 'Your cart is empty';
    const [subtitleVal, setSubtitleVal] = useState('');


   useEffect(() => {
    const newContext = context;
    newContext.content = content;
    setContext(newContext);

    const createLocalCartItems = async () => 
    {
        for (const cartItem of context.cartItems)
        {
            var productArr = await fetchProduct(cartItem);
            productArr.map( item => {
                item["quantity"] = cartItem.quantity;
                console.log(item);
                cartItems.push(item);
            });
        }

        console.log(cartItems);
        setFetched(true);
        HandleCartSize();
    }

    createLocalCartItems().then(setProducts(cartItems));

    document.addEventListener("click", () => { 
        HandleCartSize();
    } );
    },[])
    

    const HandleCartSize = () => {
        if (cartGridRef.current && purchaseLinkRef.current && 
            cartGridRef.current.getElementsByTagName('div').length < 2)
        {
            setSubtitleVal(cartGridRef.current.getElementsByTagName('div').length < 2 ? cartEmptyMessage : '');
            purchaseLinkRef.current.classList.add("invisible");
            
            subtitleRef.current.style.fontSize= "large";
        }            

    }

    const fetchProduct = async (product) => {
        try 
        {
            const response = await fetch (`http://localhost:5000/product/${product.product_id}`);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.log(error.message);
        }
    }

    // useEffect( HandleCartSize, [cartGridRef.current && cartGridRef.current.getElementsByTagName('div').length]);

    return (
        <>
      <PageLayout id={content}>
          <Title>Checkout</Title>
            <Subtitle ref={subtitleRef}> { subtitleVal }</Subtitle>
            <CartGrid ref={cartGridRef}>
            {products.map(product => (
                    <>
                <CartItem key={product.product_id} id={product.product_id} product={product}>
                </CartItem>  </> 
            ))}
            {/* {open && (  
            <Modal toggle={setOpen} open={open} on={false} color={'#212121'}>
                <Selected product={clickedProduct} setOpen={setOpen}/>
            </Modal>)} */}
            <PurchaseButton ref={purchaseLinkRef} to="/checkout/finish">Purchase Items</PurchaseButton>
            </CartGrid>
         
      </PageLayout>
      </>
      );

};

// const Selected = ({product, setOpen}) => {

//     return (
//         <>
//         <div css={  css`border-radius: 15px; background: #212121; width: 100%; display:grid; margin-left: auto; margin-right: auto; margin-bottom:80px; margin-top:80px; text-align: center;`} >
//         <p>{product.quantity}</p>
//         </div>
//         </>
//     );
// }

export default ProductGrid;
