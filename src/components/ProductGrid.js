/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import { SingleProduct } from './ProductEl';
import {useContext} from 'react';
import KioskContext from "./KioskContext";

const AllProducts = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
grid-row-gap: 1vh;
padding: 15px;
grid-column-gap: 1vh;
overflow-y: auto;
scroll-behavior: smooth;
height: 80vh;
position:relative;
border:none;
box-shadow: none;
`

const content = 'all_products';
const ProductGrid = (props) => {    
    const {context, setContext} = useContext(KioskContext);

    const [products, setProducts] = useState([]);

    useEffect( () => {
        let receivedProducts = true;

        async function fetchData() {
            try {
                const response = await fetch (`http://localhost:5000/products/${props.category}`);
                const jsonData = await response.json();
    
                //console.log(jsonData);
                setProducts(jsonData);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
        console.log(context.sidebar_category);

        //this prevents a memory leak in the event that the user changes categories before all products are received
        return () => (receivedProducts = false)
    },[props])
    
    useEffect ( () => {
    const newContext = context;
    newContext.content = content;
    setContext(newContext);
    }, [])

    return (
      <AllProducts id={content}>
          {products.map(product => (
            <SingleProduct key={product.product_id} product={product}/>
          ))}
      </AllProducts>
      );

};

export default ProductGrid;
