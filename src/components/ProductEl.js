/** @jsxImportSource @emotion/react */
import React, {Fragment, useRef, useState, useEffect} from 'react';
import { css } from '@emotion/react'
// import blueCheeseDip from '../images/Blue Cheese Dip.jpg';
import { Modal } from './Modal';
import { useToggle } from '../hooks/useToggle';
import styled from 'styled-components';
import {useContext} from 'react';
import KioskContext from "./KioskContext";
import images from '../images';
  
const ProductDescription = styled.div.attrs(props => ({
    className: 'interactable'
  }))`
padding: 0.4rem;
vertical-align: top;

& > h1, h2, h3, h4, h5, h6, p {
    color: white;
}
` 
const ProductImage = styled.img.attrs(props => ({
    className: 'interactable'
  }))`
padding: 0.4rem;
border-radius: 2px;
overflow: hidden;
object-fit: cover;
width:100%;
height:200px;
`

const ProductElement = styled.button.attrs(props => ({
    className: 'interactable'
  }))`
display: grid;
border: none;
border-radius: 2px;
background-color: #111;
min-height: 340px;
max-height: 400px;

//fixes a strange clipping issue with the box shadows
margin-top: 1rem;
margin-left: 0.5rem;

${this}:active {
    outline: 0;
    box-shadow: 0 0 0 2pt gray;
}

${this}:hover {
    box-shadow: 0 0 0 1pt #ffffff;
}
`

const ModalButton = styled.button.attrs(props => ({
    className: 'interactable'
  }))` 
border: 0;
border-radius: 3px;
width: 32vh;
height: 12vh;
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

const NumberInCart = styled.p`
    margin-top: 1vh;
    font-size: 10px;
    color: white;
    font-size: 20px;
    font-weight: lighter;
`

const SingleProduct = ({product}) => {
    const [open, setOpen] = useToggle(false);

    useEffect(() => {       
        // const srcImg = '../images/Blue Cheese Dip.jpg';
        //document.getElementById(product.name).innerHTML = '<img src="' + srcImg +'" id="' + product.name +'"/>';
        console.log();
    },[]);


    return (
        <ProductElement onClick={() => {setOpen(true);}}>

            <div>
            <ProductImage 
            id={product.name} 
            src={images[product.name]}
            alt="Image not found"></ProductImage>
            </div>
                
            <ProductDescription >
            <h4 css={css`font-weight: lighter; top:0;`}> {product.name} </h4>
            <h6 css={css`font-weight: lighter; `}> {"£" + product.price} </h6>
            <p  css={css`font-size:1.8vh;`}> {product.description} </p>
            </ProductDescription>

            {open && (  
            <Modal toggle={setOpen} open={open} on={false} color={'#212121'}>
                <Selected product={product} setOpen={setOpen}/>
            </Modal>)}

        </ProductElement>

    );
} 


const Selected = ({product, setOpen}) => {
    const {context, setContext} = useContext(KioskContext);
    const isInCart = useRef(false);
    const positionInCart = useRef(0);
    const quantityInCart = useRef(0);
    
    for (var i = 0; i < context.cartItems.length; i++) {
        if (String(context.cartItems[i].product_id) === String(product.product_id)) isInCart.current = true;
        
        if (isInCart.current) 
        {
            positionInCart.current = i;
            quantityInCart.current = context.cartItems[i].quantity;
            break;
        }
    }
     

    const AddToCart = (product_id, amount_to_add) => {
        const newContext = context;

        if (isInCart.current)
        {
            console.log("old quantity: " + newContext.cartItems[positionInCart.current].quantity);
            newContext.cartItems[positionInCart.current].quantity = String(Number(newContext.cartItems[positionInCart.current].quantity) + Number(amount_to_add));
            console.log("new quantity: " + newContext.cartItems[positionInCart.current].quantity);
        }
        else
        {
            newContext.cartItems.push({
                "product_id" : String(product_id),
                "quantity" : String(amount_to_add)
            })

            console.log(newContext.cartItems);
        }
        
        setContext(newContext);
        console.log(context);
    }
    
    const [count, setCount] = useState(1);

    useEffect( () => {
        console.log(count);
    }, [count]);

    const currentQuantity = () => {
        return isInCart.current ? context.cartItems[positionInCart.current].quantity : 0;
    }

    return (
        <Fragment>
        <div css={  css`border-radius: 15px; background: #212121; width: 90%; display:grid; margin-left: auto; margin-right: auto; margin-bottom:80px; margin-top:80px; text-align: center;`} >
        <ProductImage css={css`border-radius: 15px; height:400px;  display:block; margin-left: auto; margin-right: auto;`} src={images[product.name]} alt="Image was missing"></ProductImage>
        <span>
            <RemoveButton className="interactable" onClick={  () => { if (count > 1) setCount( count - 1)}}>-</RemoveButton>
            <AddButton className="interactable" onClick={  () => { setCount( count + 1)}}>+</AddButton>
        </span>
        <div>
        <AddToCartButton className="interactable" onClick={() => {  AddToCart(product.product_id, count); setOpen(false);}}>Add {product.name} { count ? ("(" + count + ")") : " "} To Cart</AddToCartButton>
        <NumberInCart className="interactable"> Number in Cart: {currentQuantity()} </NumberInCart>
        </div>
        </div>
        </Fragment>
    );
}

export {SingleProduct, ProductElement};