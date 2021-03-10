/** @jsxImportSource @emotion/react */
import React, {Fragment, useState, useEffect} from 'react';
import { jsx, css } from '@emotion/react'
import food_not_found_image from '../images/food_not_found.jpg';
import styled from '@emotion/styled'
import Modal from './Modal';
import { useToggle } from '../hooks/useToggle';

const ProductDescription = styled.div`
padding: 0.4rem;
vertical-align: top;

& > h4, h5, h6, p {
    color: white;
}
` 
const ProductImage = styled.img`
width: 100%;
padding: 0.4rem;
border-radius: 10px;
`

const ProductElement = styled.button`
display: grid;
border: none;
border-radius: 10px;
background-color: #111;
height: 50vh;

//fixes a strange clipping issue with the box shadows
margin-top: 1rem;
margin-left: 0.5rem;

${this}:active {
    outline: 0;
    box-shadow: 0 0 0 2pt gray;
}`

const ModalButton = styled.button` 
border: 0;
border-radius: 3px;
width: 9vh;
height: 9vh;
color: white;
margin-right: 3px;
font-size: 40px;
font-weight: bold;
justify-content:center;
align-items:center;
text-align: center;

${this}:active {
    background-color: #1111;
}

`
const AddButton = styled(ModalButton)`
    background-color: #7289DA;
`

const RemoveButton = styled(ModalButton)`
    background-color: #225;
`   

const AddToCartButton = styled(ModalButton)`
    margin-top: 10px;
    height: 10vh;
    width: 30vh;
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
            
        <ProductDescription>
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
        <div css={  css`border-radius: 15px; background: #212121; width: 50%; display:block; margin-left: auto; margin-right: auto; margin-bottom:80px; margin-top:80px; text-align: center;`} >
        <ProductImage css={css`border-radius: 15px;`} src={food_not_found_image} alt=""></ProductImage>
        <h5 css={css`font-weight: bold; color: white; top:0;`}> {product.name} </h5>
        <span>
            <RemoveButton onClick={  () => { if (count > 0) setCount( count - 1)}}>-</RemoveButton>
            <AddButton onClick={  () => { setCount( count + 1)}}>+</AddButton>
        </span>
        <div>
        <AddToCartButton onClick={() => { setOpen(false);}}>Add To Cart</AddToCartButton>
        </div>
        </div>
        </Fragment>
    );
}

export default SingleProduct;