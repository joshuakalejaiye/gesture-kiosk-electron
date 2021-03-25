/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
//import styled from 'styled-components';
import KioskContext from "./KioskContext";
import {useContext, useRef, useEffect} from 'react';
import styled from 'styled-components';

const PageLayout = styled.div`
display:grid;
grid-template-columns: 1fr;
grid-row-gap: 0vh;
width:1100px;
padding: 15px;
grid-column-gap: 1vh;
margin-top: 2vh;
height: 550px;
position:relative;
border:none;
box-shadow: none;
`

const Title = styled.h2`
font-weight: lighter;
text-align:center;
margin-top: 1rem;
margin-bottom: 0;
color: whitesmoke;
`
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`

const content = 'vouchers';
const VoucherComponent = () => {
    const {context, setContext} = useContext(KioskContext);
    const voucherCodeRef = useRef(null);

    useEffect( () => { 
        const newContext = context;
        newContext.content = content;
        setContext(newContext);
    } , [])

    
     return (<>

        <PageLayout id={content}>
            <Title>Claim a Voucher!</Title>
            <Subtitle>Enter your code below</Subtitle>
            <input style={{ display:'block', width:'40%', height:'50%', marginTop:'0', marginBottom:'0', marginRight:'auto', marginLeft:'auto'}} type="text" ref={voucherCodeRef} name="code" placeholder="e.g. 208XHS3UJU"></input>
                <input onClick={() => { voucherCodeRef.current.value = ""; console.log(voucherCodeRef.current);}} style={{ display:'block', width:'40%', height:'40%', marginTop:'0', marginBottom:'0', marginRight:'auto', marginLeft:'auto'}} type="submit"></input>
                <br></br>
                <br></br>
                <br></br>
        </PageLayout>
       
    </>);
};

export default VoucherComponent;