/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import KioskContext from "./KioskContext";

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

const Title = styled.h2`
font-weight: lighter;
text-align:center;
margin-top: 1rem;
color: whitesmoke;
margin-top: auto;
margin-bottom: auto;
margin-left: auto;
margin-right: auto;
`

const content = 'thank_you';
const Total = () => { 
    const {context, setContext} = useContext(KioskContext);

    return (
      <PageLayout id={content}>
        <Title>Thank you for your purchase!</Title>
      </PageLayout>
      );

};

export default Total;
