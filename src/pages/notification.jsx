import React from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import Header from '../components/header';

const Content = styled.main`
  padding: 2rem 0;
`;

const Title = styled.h2`
  color: ${Colors.text};
  margin-bottom: 1rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
`;

const Tab = styled.span`
  color: ${Colors.secondaryText};
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.active ? Colors.primary : 'transparent'};
  white-space: nowrap;
  &:hover {
    color: ${Colors.text};
  }
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  background-color: ${Colors.secondaryBackground};
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const NotificationTitle = styled.span`
  font-weight: bold;
`;

const NotificationSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${Colors.secondaryText};
`;

const NotificationStatus = styled.span`
  color: ${Colors.primary};
  margin-top: 0.5rem;
`;

const Notifications = () => {
    return (
        <Container>
            <Header />
            <Content>
                <Title>Cluster Notifications</Title>
                <Tabs>
                    <Tab active>All</Tab>
                    <Tab>Spot Instance</Tab>
                    <Tab>Data Lifecycle</Tab>
                    <Tab>Connect Failure</Tab>
                </Tabs>
                <NotificationList>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationTitle>i-1234567890abcdef0</NotificationTitle>
                            <NotificationSubtitle>us-west-2c</NotificationSubtitle>
                        </NotificationText>
                        <NotificationStatus>Spot instance terminated</NotificationStatus>
                    </NotificationItem>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationTitle>Backup Ready</NotificationTitle>
                            <NotificationSubtitle>2023-08-15 00:00:00</NotificationSubtitle>
                        </NotificationText>
                        <NotificationStatus>Backup Started</NotificationStatus>
                    </NotificationItem>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationTitle>Backup Ready</NotificationTitle>
                            <NotificationSubtitle>2023-08-15 00:00:00</NotificationSubtitle>
                        </NotificationText>
                        <NotificationStatus>Backup Completed</NotificationStatus>
                    </NotificationItem>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationTitle>i-1234567890abcdef0</NotificationTitle>
                            <NotificationSubtitle>us-west-2c</NotificationSubtitle>
                        </NotificationText>
                        <NotificationStatus>Spot instance terminated</NotificationStatus>
                    </NotificationItem>
                </NotificationList>
            </Content>
        </Container>
    );
};

export default Notifications;