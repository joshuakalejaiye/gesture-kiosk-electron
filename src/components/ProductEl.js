/** @jsxImportSource @emotion/react */
import React, {Fragment, useState, useEffect} from 'react';
import { css } from '@emotion/react'
import food_not_found_image from '../images/food_not_found.jpg';
import { Modal } from './Modal';
import { useToggle } from '../hooks/useToggle';
import styled from 'styled-components';

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
width: 100%;
padding: 0.4rem;
border-radius: 2px;
`

const ProductElement = styled.button.attrs(props => ({
    className: 'interactable'
  }))`
display: grid;
border: none;
border-radius: 2px;
background-color: #111;
height: 320px;

//fixes a strange clipping issue with the box shadows
margin-top: 1rem;
margin-left: 0.5rem;

${this}:active {
    outline: 0;
    box-shadow: 0 0 0 2pt gray;
}

${this}:hover {
    box-shadow: 0 0 0 1pt #67daff;
}
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

const SingleProduct = ({product}) => {
    const [open, setOpen] = useToggle(false);

    return (
        <ProductElement onClick={() => setOpen(true)}>
        <div>
        <ProductImage src={food_not_found_image} alt=""></ProductImage>
        </div>
            
        <ProductDescription >
        <h4 css={css`font-weight: lighter; top:0;`}> {product.name} </h4>
        <h6 css={css`font-weight: lighter; `}> {"£" + product.price} </h6>
        <p  css={css`font-size:2vh;`}> {product.description} </p>
        </ProductDescription>
        {open && (  
        <Modal toggle={setOpen} open={open} on={false} color={'#212121'}>
            <Selected product={product} setOpen={setOpen}/>
        </Modal>)}
         </ProductElement>

    );
} 

const Selected = ({product, setOpen}) => {

    const [count, setCount] = useState(0);

    useEffect( () => {
        console.log(count);
    }, [count]);

    return (
        <Fragment>
        <div css={  css`border-radius: 15px; background: #212121; width: 100%; display:grid; margin-left: auto; margin-right: auto; margin-bottom:80px; margin-top:80px; text-align: center;`} >
        <ProductImage css={css`border-radius: 15px; width: 64%; display:block; margin-left: auto; margin-right: auto;`} src={food_not_found_image} alt=""></ProductImage>
        <span>
            <RemoveButton className="interactable" onClick={  () => { if (count > 0) setCount( count - 1)}}>-</RemoveButton>
            <AddButton className="interactable" onClick={  () => { setCount( count + 1)}}>+</AddButton>
        </span>
        <div>
        <AddToCartButton className="interactable" onClick={() => { setOpen(false);}}>Add {product.name} { count ? ("(" + count + ")") : " "} To Cart</AddToCartButton>
        </div>
        </div>
        </Fragment>
    );
}

export {SingleProduct, ProductElement};