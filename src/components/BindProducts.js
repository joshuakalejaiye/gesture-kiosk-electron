/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import SingleProduct from './SingleProduct';

const ProductGrid = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
grid-row-gap: 1vh;
grid-column-gap: 1vh;
overflow-y: scroll;
border:none;
box-shadow: none;
`

const BindProducts = (props) => {    
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
      <ProductGrid>
          {products.map(product => (
            <SingleProduct key={product.product_id} product={product}/>
          ))}
      </ProductGrid>
      );

};

export default BindProducts;
