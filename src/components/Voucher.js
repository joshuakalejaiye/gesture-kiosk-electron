/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
//import styled from 'styled-components';
import KioskContext from "./KioskContext";
import {useContext, useRef, useEffect} from 'react';
import styled from 'styled-components';
import qr_code from '../images/qr.png';

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

const SubmitButton = styled.input.attrs(props => ({
    className: 'interactable'
  }))` 
border: 0;
border-radius: 3px;
width: 32vh;
height: 12vh;
color: white;
font-size: 20px;
font-weight: bold;
justify-content:center;
align-items:center;
text-align: center;
margin-top: 1.5vh;
background-color: #111;
border:none;

${this}:focus { 
    border: none;

}
` 

const content = 'vouchers';
const VoucherComponent = () => {
    const {context, setContext} = useContext(KioskContext);

    useEffect( () => { 
        const newContext = context;
        newContext.content = content;
        setContext(newContext);
    } , [])

    
     return (<>

        <PageLayout id={content}>
            <Title>Claim a Voucher!</Title>
            <Subtitle>Scan your code on the kiosk</Subtitle>
            <br></br>
            <img src={qr_code} css={css` display:'inline-block'; margin-left:auto; margin-right:auto; height: 300px; width: 300px;`}/>
            <br></br>
            <SubmitButton type="submit" css={css` width: 32vh; height: 12vh; margin-left:auto; margin-right:auto; `}></SubmitButton>
                <br></br>
                <br></br>
                <br></br>
        </PageLayout>
       
    </>);
};

export default VoucherComponent;