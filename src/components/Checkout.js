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
overflow-y: scroll;
margin-top: 2vh;
scroll-behavior: smooth;
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
`
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`

const CartItems = styled.div`
display:grid;
grid-template-columns: 1fr;
grid-row-gap: 0vh;
padding: 15px;
grid-column-gap: 1vh;
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

const PurchaseButton = styled(Button)`
height: 10vh;
width: 30vh;
background-color: #111;
font-size: 20px;
font-weight: lighter;
margin-left:auto;
margin-right:auto;
`

const DeleteButton = styled(Button)`
background-color: #738ADB;
font-weight: lighter;
font-size: 22px;
margin-top: -100px;
margin-right: 220px;
margin-left: auto;
width: 32vh;
height: 6vh;
`

const content = 'all_products';
const ProductGrid = () => {    
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
    }

    createLocalCartItems().then(setProducts(cartItems));
   },[])

    
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

    const changeQuantity = (product, NewQuantity) => {
        
    } 

    return (
      <PageLayout id={content}>
          <Title>Checkout</Title>

       
            <Subtitle> { products && 'You have ' + products.length + ' items in your cart.' }</Subtitle>
            <CartItems css={css``}>
            {products.map(product => (
                    <>
                <CartItem key={product.product_id} product={product} changeQuantity={changeQuantity}>
                </CartItem>
                <DeleteButton onClick={() => { setOpen(true); setClickedProduct(product)}}>Edit Quantity</DeleteButton> </>  
            ))}
            {/* {open && (  
            <Modal toggle={setOpen} open={open} on={false} color={'#212121'}>
                <Selected product={clickedProduct} setOpen={setOpen}/>
            </Modal>)} */}
            </CartItems>
            <PurchaseButton>Purchase Items</PurchaseButton>
      </PageLayout>
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
