/** @jsxImportSource @emotion/react */
import styled from 'styled-components';


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
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`

const content = 'thank_you';
const ThankYou = () => { 

    return (
      <PageLayout id={content}>
          <Title>Thank you for your purchase!</Title>

      </PageLayout>
      );

};

export default ThankYou;
