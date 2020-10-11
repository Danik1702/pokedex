import React from "react";
import styled from "styled-components";

export const Button = ({ onClick, text }) => {
  return <ButtonContainer onClick={onClick}>{text}</ButtonContainer>;
};

const ButtonContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid #000000;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  background-color: #668cff;
  transition-duration: 1s;

  &:hover {
    background-color: #002699;
    border-color: #ffffff;
    color: #ffffff;
    box-shadow: 0 0 10px 5px #666666;
  }
`;
