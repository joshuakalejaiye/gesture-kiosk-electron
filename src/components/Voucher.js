/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
//import styled from 'styled-components';

const VoucherComponent = () => {
     return (<>
        <div css={css`display: grid; text-align:center; margin-left: auto; margin-right: auto; background-color: #212121; color: white;`}>
            <div>
            <h1 css={css`color: white;`}> Claim a Voucher</h1>
            <h6 css={css`color: white;`}> Enter your code below</h6>
            <br></br>
            <input type="text" id="code" name="code" placeholder="e.g. 208XHS3UJU"></input>
            </div>
            <div>
            <input type="submit"></input>
            </div>
        </div>
    </>);
};

export default VoucherComponent;