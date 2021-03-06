import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  color: #666;
`; 

export const Form = styled.form`
  margin-top: 40px;
  max-width: 700px;
  display: flex;
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;
  }
  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repository = styled.div`
  margin-top: 80px;
  max-width: 700px;

`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Container = styled.div`
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    & + div {
      margin-top: 16px !important;
    }
    &:hover {
      background: ${shade(0.5, '#fff')};
    }

    a{
      width: 50px;
      transition: transform 0.2s;
    }
    a:hover {
      transform: translateX(10px);
    }
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
    }
    button {
      width: 40px;
      border: none;
      background: transparent;
      border-radius: 5px;
    }
    button:hover {
      background: #F9F1F0;
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }svg:hover{
      color: #3d3d4d;
    }
  
`;