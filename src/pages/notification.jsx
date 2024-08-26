import React from 'react';
import styled from 'styled-components';
import { Bell } from 'lucide-react';
import {Colors} from "../utils/color";

const MainColor = '#54BFFF';

const Container = styled.div`
  background-color: ${Colors.background};
  color: ${Colors.text};
  font-family: Arial, sans-serif;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${Colors.secondaryBackground};
`;

const Logo = styled.h1`
  color: ${Colors.primary};
  margin: 0;
  img{
    height: 70px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.a`
  color: ${Colors.secondaryText};
  text-decoration: none;
  &:hover {
    color: ${Colors.primary};
  }
`;

const Button = styled.button`
  background-color: ${Colors.primary};
  color: ${Colors.text};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Content = styled.main`
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${Colors.text};
  margin-bottom: 1rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Tab = styled.span`
  color: ${Colors.secondaryText};
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.active ? Colors.primary : 'transparent'};
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
`;

const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
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
`;
const Notifications = () => {
    return (
        <Container>
            <Header>
                <Logo><img src={'/logo.png'}/> </Logo>
    <Nav>
    <NavItem href="#">Clusters</NavItem>
        <NavItem href="#">Topics</NavItem>
        <NavItem href="#">Consumers</NavItem>
        <NavItem href="#">Connect</NavItem>
        <NavItem href="#">ACLs</NavItem>
        <NavItem href="#">Tools</NavItem>
        </Nav>
        <div>
        <Button>New Cluster</Button>
    <Bell color={MainColor} style={{ marginLeft: '1rem' }} />
    </div>
    </Header>
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