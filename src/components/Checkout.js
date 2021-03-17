/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from "react";
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import KioskContext from "./KioskContext";

const Grid = styled.div`
display:grid;
grid-template-columns: 1fr;
/* grid-row-gap: 1vh; */
/* padding: 15px; */
color: white;
/* grid-column-gap: 1vh; */
/* overflow-y: scroll; */
scroll-behavior: smooth;
height: 550px;
position:relative;
border:none;
box-shadow: none;
`
const content = 'checkout';
const CheckoutComponent = () => {
    const {context, setContext} = useContext(KioskContext);
    
    useEffect( () => { 
        const newContext = context;
        newContext.content = content;
        setContext(newContext);
    } , [])

    return (
        <>
    <h1 css={css` color: white;`}> This is the checkout page. It's clearly not done yet ^^</h1>
    <Grid id={content}>
        <h2> Come back soon</h2>
    </Grid>
    </>
);};

export default CheckoutComponent;