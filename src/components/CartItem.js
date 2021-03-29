/** @jsxImportSource @emotion/react */
import React, {Fragment, useState, useEffect} from 'react';
import { css } from '@emotion/react';
import {useRef, useContext} from 'react';
import styled from 'styled-components';
import KioskContext from "./KioskContext";
import images from '../images';

const ProductElement = styled.div.attrs(props => ({
    // className: 'interactable'
  }))`
display: grid;
grid-template-columns: 1fr 1fr;
grid-row-gap: 0.1vh;
border: none;
margin-bottom: 30px;
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

const ProductDescription = styled.div.attrs(props => ({
    // className: 'interactable'
  }))`
padding: 0.4rem;
vertical-align: top;
margin-top: 10px;
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
overflow: hidden;
object-fit: cover;
width:100%;
height:200px;
`

const ModalButton = styled.button.attrs(props => ({
    className: 'interactable'
  }))` 
border: 0;
border-radius: 3px;
width: 16vh;
height: 9vh;
color: white;
font-size: 40px;
font-weight: bold;
justify-content:center;
align-items:center;
text-align: center;
z-index: 3;
margin-top: -0.3vh;

${this}:active {
    background-color: #1111;
}
`
const AddButton = styled(ModalButton)`
    background-color: #00b248;
`

const RemoveButton = styled(ModalButton)`
    background-color: #c4001d;
    margin-right: 4vh;
`   


const CartItem = ({product}) => {
    const {context, setContext} = useContext(KioskContext);
    const [quantity, setQuantity] = useState(product.quantity);
    const thisProductRef = useRef(null);

    useEffect( () => {
        setQuantity(product.quantity);
    }, [context])

    const ChangeQuantity = (amount_to_change_by) => { 

        var positionInCart = 0;
        var isInCart = false;

        //find this product in the context cart
        for (var i = 0; i < context.cartItems.length; i++) {
            if (String(context.cartItems[i].product_id) === String(product.product_id))
            {   
                isInCart = true;
                positionInCart = i;
                break;
            }
        }

        //make an exact copy
        const newContext = context;

        // if the requested change would reduce the quantity of an item in the cart below 1
        if ( (Number(context.cartItems[i].quantity) + Number(amount_to_change_by)) < 1 )
        {
            //remove it from the context cart 
            newContext.cartItems.splice(positionInCart, 1);

            //delete the element from the dom 
            console.log(thisProductRef.current);
            thisProductRef.current.remove();

            //update the value 
            product.quantity = String(Number(product.quantity) - 1);
            setQuantity(product.quantity);
        }
        else
        {
            //effect the change
            newContext.cartItems[positionInCart].quantity = String(Number(newContext.cartItems[positionInCart].quantity) + (amount_to_change_by))
            setQuantity(newContext.cartItems[positionInCart].quantity);
        }
        
        //change to original to the copy
        setContext(newContext);
        console.log(context);

    }

    return (
        <>
        <ProductElement ref={thisProductRef}> 
            <ProductImage src={images[product.name]} alt="Image was missing"></ProductImage>
                
            <ProductDescription >
            <h4 css={css`font-weight: lighter; top: 0;`}> {product.name} </h4>
            <h6 css={css`font-weight: lighter; `}> {"£" + product.price} </h6>
            <p  css={css`font-size:2vh;`}> Quantity: {quantity} </p>
            <RemoveButton onClick={() => { ChangeQuantity(-1); }}>-</RemoveButton> 
            <AddButton onClick={() => { ChangeQuantity(1); }}>+</AddButton>
            </ProductDescription>

               
         </ProductElement>
         </>
    );
} 

export default CartItem;