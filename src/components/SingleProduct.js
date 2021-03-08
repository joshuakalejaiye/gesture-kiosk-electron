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

& > h5, h6, p {
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
background-color: #212121;

//fixes a strange clipping issue with the box shadows
margin-top: 1rem;
margin-left: 0.5rem;

${this}:active {
    outline: 0;
    box-shadow: 0 0 0 2pt gray;
}`

const SingleProduct = ({product}) => {

    const [open, setOpen] = useToggle(false);

    return (
        <ProductElement onClick={() => setOpen(true)}>
        <div>
        <ProductImage src={food_not_found_image} alt=""></ProductImage>
        </div>
            
        <ProductDescription>
        <h5 css={css`font-weight: bold; top:0;`}> {product.name} </h5>
        <h6 css={css`font-style: italic;`}> {"£" + product.price} </h6>
        <p  css={css`font-size:1.7vh;`}> {product.description} </p>
        </ProductDescription>
        {open && (
        <Modal toggle={setOpen} open={open} on={false}>
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
        <div css={  css`border-radius: 15px; background:white; width: 50%; display:block; margin-left: auto; margin-right: auto; margin-bottom:80px; margin-top:80px; text-align: center;`} >
        <ProductImage css={css`border-radius: 15px;`} src={food_not_found_image} alt=""></ProductImage>
        <h5 css={css`font-weight: bold; top:0;`}> {product.name} </h5>
        <span>
            <button onClick={  () => { if (count > 0) setCount( count - 1)}}>remove</button>
            <button onClick={  () => { setCount( count + 1)}}>add</button>
        </span>
        <div>
        <button onClick={() => { setOpen(false);}}>Add To Cart</button>
        </div>
        </div>
        </Fragment>
    );
}

export default SingleProduct;