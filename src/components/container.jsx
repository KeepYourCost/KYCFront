import React from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: ${Colors.background};
  color: ${Colors.text};
  font-family: Arial, sans-serif;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;