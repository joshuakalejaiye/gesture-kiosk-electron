/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { jsx, css } from '@emotion/react';
import CartItem from "./CartItem";
import SummaryItem from './SummaryItem';

const PageLayout = styled.div`
display:grid;
grid-template-columns: 1fr;
grid-row-gap: 1vh;
width:1100px;
padding: 15px;
grid-column-gap: 1vh;
margin-top: 2vh;
height: 550px;
position:relative;
border:none;
box-shadow: none;
`

const Title = styled.h3`
font-weight: lighter;
text-align:center;
margin-top: 1rem;
color: whitesmoke;
margin-top: auto;
margin-bottom: auto;
margin-left: auto;
margin-right: auto;
`

const Subtitle = styled(Title)`
font-size: 3rem;
margin-top: 0;
`

const content = 'total';
const Total = ({cartItems}) => { 
    const [total, setTotal] = useState(null);
    let sum = 0;
    
    useEffect(() => { 
      for (const item of cartItems)
      {
        var cost = (Number(item.quantity) * Number(item.price)); 
        sum += cost;  
        item["total"] = cost;
      }

      setTotal(sum);
    }, [cartItems])

    useEffect(() => { 
      setTotal(sum);
      console.log(cartItems);
    }, [])

    return (
      <PageLayout id={content}>
        <Subtitle>Pay £{ total } ? </Subtitle>
        
      </PageLayout>
      );
};

export default Total;
