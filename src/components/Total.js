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

const content = 'total';
const Total = ({ cartItems }) => { 
    const [total, setTotal] = useState(null);
    let sum = 0;
    
    for (const item of cartItems)
    {
      sum += (Number(item.quantity) * Number(product.price));  
    }

    setTotal(sum);

    return (
      <PageLayout id={content}>
        <Title>{cartItems.map( item => { 
            <>
             <h4 css={css`font-weight: lighter; top:0;`}> {product.name} </h4>
             <h6 css={css`font-weight: lighter; `}> {"£" + product.price} </h6>
             <p  css={css`font-size:1.8vh;`}> {product.description} </p></>
        })}</Title>
      </PageLayout>
      );

};

export default Total;
