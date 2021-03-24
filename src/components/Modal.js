/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from "react";
import { useTheme } from '@emotion/react'
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types"; 

const Portal = ({ children }) => {  
 const modalRoot = document.getElementById("modal");
 const el = document.createElement("div");
  
 useEffect(() => {    
  modalRoot.appendChild(el);  
 }, []);   

 useEffect(() => {    
  return () => modalRoot.removeChild(el); 
 });   
 
 return createPortal(children, el);
};


const Modal = ({ children, toggle, open, color }) => (  

 <Portal>    
  {open && (      
   <ModalWrapper>        
    <ModalCard css={css` background: ${color}; min-width:60%;`} onClick={toggle}>          
      {children}
    </ModalCard>
    <Background className="interactable"/>      
   </ModalWrapper >    
  )}  
 </Portal>
); 

export { Modal, Portal}; 

Modal.propTypes = {  
 children: PropTypes.PropTypes.object.isRequired,
 toggle: PropTypes.func.isRequired,
 on: PropTypes.bool.isRequired
}; 

const ModalWrapper = styled.div`
  position: fixed;  top: 50%;
  z-index: 10;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  margin-top: ${props => props.headerHeight};
  position: relative;
  min-width: 320px;
  margin-bottom: 100px;
  z-index: 11;
  background: white;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`; 

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;

