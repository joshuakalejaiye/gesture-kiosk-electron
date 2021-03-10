/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import SingleProduct from './ProductEl';

const AllProducts = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
grid-row-gap: 1vh;
padding: 15px;
grid-column-gap: 1vh;
overflow-y: scroll;
height: 550px;
position:relative;
border:none;
box-shadow: none;
`

const ProductGrid = (props) => {    
    //console.log(props);

    const [products, setProducts] = useState([]);

    useEffect( () => {
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

    },[props])
    
    return (
      <AllProducts>
          {products.map(product => (
            <SingleProduct key={product.product_id} product={product}/>
          ))}
      </AllProducts>
      );

};

export default ProductGrid;
