/** @jsxImportSource @emotion/react */
import React, {Fragment, useState, useEffect} from 'react';
import { css } from '@emotion/react'
import food_not_found_image from '../images/food_not_found.jpg';
import { useToggle } from '../hooks/useToggle';
import styled from 'styled-components';

const ProductDescription = styled.div.attrs(props => ({
    // className: 'interactable'
  }))`
padding: 0.4rem;
vertical-align: top;
margin-top: 30px;
margin-left: auto;
margin-bottom: auto;
margin-right: auto;
& > h1, h2, h3, h4, h5, h6, p {
    color: white;
}
` 
const ProductImage = styled.img.attrs(props => ({
    // className: 'interactable'
  }))`
height: 100%;
width: 100%;
padding: 0.4rem;
border-radius: 2px;
`

const ProductElement = styled.button.attrs(props => ({
    // className: 'interactable'
  }))`
display: grid;
grid-template-columns: 1fr 1fr;
grid-row-gap: 0.1vh;
border: none;
border-radius: 2px;
background-color: #111;
height: 200px;
margin-left: 20vh;
z-index: 2;
margin-right: 20vh;
/* 
${this}:active {
    outline: 0;
    box-shadow: 0 0 0 2pt gray;
}

${this}:hover {
    box-shadow: 0 0 0 1pt #67daff;
} */
`

const ModalButton = styled.button.attrs(props => ({
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

${this}:active {
    background-color: #1111;
}

`
const AddButton = styled(ModalButton)`
    background-color: #00b248;
`

const RemoveButton = styled(ModalButton)`
    background-color: #c4001d;
    margin-right: 5vh;

`   

const AddToCartButton = styled(ModalButton)`
    margin-top: 2vh;
    height: 15vh;
    width: 69vh;
    background-color: #111;
    font-size: 20px;
    font-weight: lighter;
`

const CartItem = ({product}) => {

    return (
        <ProductElement>
            <ProductImage src={food_not_found_image} alt=""></ProductImage>
                
            <ProductDescription >
            <h4 css={css`font-weight: lighter; top:0;`}> {product.name} </h4>
            <h6 css={css`font-weight: lighter; `}> {"£" + product.price} </h6>
            <p  css={css`font-size:2vh;`}> Quantity: {product.quantity} </p>
            </ProductDescription>
            
         </ProductElement>

    );
} 

export default CartItem;