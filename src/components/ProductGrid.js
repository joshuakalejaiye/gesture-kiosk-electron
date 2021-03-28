/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import { SingleProduct } from './ProductEl';
import {useContext} from 'react';
import KioskContext from "./KioskContext";

const AllProducts = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
grid-row-gap: 4vh;
padding: 15px;
grid-column-gap: 3vh;
overflow-y: auto;
scroll-behavior: smooth;
height: 76vh;
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
                setProducts(sortProducts(jsonData, "category"));
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
        console.log(context.sidebar_category);

        //this prevents a memory leak in the event that the user changes categories before all products are received
        return () => (receivedProducts = false)
    },[props])

    function sortProducts(array, key) {
        return array.sort(function(b, a) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    
    useEffect ( () => {
    const newContext = context;
    newContext.content = content;
    setContext(newContext);
    }, [])

    useEffect( () => {
        //products[0] && console.log(products[0]["category"]);
    }, [products]);

    return (
      <AllProducts id={content}>
          {products.map(product => (
            <SingleProduct key={product.product_id} product={product}/>
          ))}
      </AllProducts>
      );

};

export default ProductGrid;
