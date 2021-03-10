import styled from 'styled-components';

const Footer = styled.footer`
position: absolute;
background-color: #111;
bottom: 0;
width: 100%;
height: 2.6rem;
margin-left: auto; 
margin-right: auto;

& > a { 
   display:block;
   text-align: right;
   color: #ffffff;
}
`

const FooterComponent = () => {

    return (
        <Footer></Footer>
    );}

export default FooterComponent;