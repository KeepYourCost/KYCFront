import React from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';
import Sidebar from '../components/sidebar';
import Header from "./header";
import {ToastContainer} from "react-toastify";

const ContainerWrapper = styled.div`
  display: flex;
  background-color: ${Colors.background};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  //padding: 20px;
  //overflow-y: auto;
`;

const Main = styled.div`
  padding: 20px;
  overflow-y: auto;
  min-height: 100vh;
`
const Container = ({ children }) => {
    return (
        <ContainerWrapper>
            <Sidebar />
            <div style={{width: '260px'}}></div>
            <ContentWrapper>
                <Header />
                <Main>
                    {children}
                </Main>
            </ContentWrapper>
            <ToastContainer />
        </ContainerWrapper>
    );

};

export default Container;