// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { jsx, css, useTheme } from '@emotion/react'
import styled from 'styled-components';
import React, { Fragment, useState } from 'react';
import './App.css';
import AllProducts from './components/ProductGrid';
import Sidebar from './components/Sidebar';
import ObjectDetector from './components/ObjectDetector';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import { Router, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";

// const Routes = () => {
//   return (
//     <Router history={history}>
//       <div className="navbar">
//         <h6 style={{ display: "inline" }}>Nav Bar</h6>
//       </div>
//       <Switch>
//         <Route path="/admin/login" component={LoginHandler} />
//         <Route path="/admin/logout" component={LogoutHandler} />
//         <Route path="*" component={ProtectedHandler} />
//       </Switch>
//     </Router>
//   );
// };

// const LoginHandler = () => {
//   return (
//     <div style={{ marginTop: "1rem" }}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter email address"
//         />
//         <input type="submit" value="Login" />
//       </form>
//     </div>
//   );
// };

// const LogoutHandler = () => {
//   return <div>Logging out!</div>;
// };

// const ProtectedHandler = () => {
//   return (
//     <div>
//       <Link to="/logout">Logout here</Link>
//     </div>
//   );
// };


const NotInSidebar = styled.section`
margin-left: 160px; /* Same as the width of the sidebar */
padding: 0px 10px; /* a little bit away from sidebar */
padding-bottom: 2.5rem;  /* Footer height */
min-height: 100vh; /* as high as 100% of the page */
/* background-color: #424242;
color: #ffffff; */
`
const Title = styled.h2`
font-weight: lighter;
text-align:center;
margin-top: 1rem;
color: whitesmoke;
`
const Subtitle = styled(Title)`
font-size: 1rem;
margin-top: 0;
`
const Content = styled.section`
margin-top: 40px;
display:flex;
height: 100vh;
background:#212121;
align-items: center;
`

function App() {
  
  const [category, setCategory] = useState('');

  return (
    <Fragment>
    
      <HeaderComponent></HeaderComponent>
    
      <Sidebar setCategory={setCategory}>
      </Sidebar>

      <Content>
     
      <ObjectDetector></ObjectDetector>

      <NotInSidebar>
        <header>  
          <Title>Welcome To Our Restaurant</Title>
          <Subtitle>What would you like to eat?</Subtitle>
        </header>
        <section>
          {/* Add routes */}
          <AllProducts category={category}></AllProducts>
        </section>
      </NotInSidebar>
      
      <FooterComponent></FooterComponent>
      </Content>
    </Fragment>);
}

export default App;
