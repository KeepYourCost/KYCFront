import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Bell } from 'lucide-react';
import { Colors } from '../utils/color';
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${Colors.secondaryBackground};
  position: fixed;
  width: calc(100% - 320px);
  z-index: 100;
  top: 0;
  left: 260px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.h1`
  color: ${Colors.primary};
  margin: 0;
  img {
    height: 70px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    flex-wrap: wrap;
  }
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

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const BellContainer = styled.div`
  cursor: pointer;
  margin-left: 1rem;
  padding-top: .5rem;
`;

const NotificationPopup = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: ${Colors.background};
  border: 1px solid ${Colors.secondaryText};
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 101;
`;

const NotificationItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${Colors.secondaryText};
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.h4`
  margin: 0;
  color: ${Colors.text};
`;

const NotificationMessage = styled.p`
  margin: 0.5rem 0 0;
  color: ${Colors.secondaryText};
  font-size: 0.9rem;
`;

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const notifications = [
        { id: 1, title: 'New Instance Created', message: 'Your new instance "i-1234abcd" has been successfully created.' },
        { id: 2, title: 'Instance Terminated', message: 'Instance "i-5678efgh" has been terminated due to spot price increase.' },
        { id: 3, title: 'Pricing Alert', message: 'Spot price for c5.xlarge in us-west-2 has dropped below your threshold.' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <HeaderContainer>
            <Nav></Nav>
            <ActionContainer>
                <Link to={'/create-instance'}><Button>New Cluster</Button></Link>
                <BellContainer onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell color={Colors.primary} />
                </BellContainer>
                {showNotifications && (
                    <NotificationPopup ref={notificationRef}>
                        {notifications.map(notification => (
                            <NotificationItem key={notification.id}>
                                <NotificationTitle>{notification.title}</NotificationTitle>
                                <NotificationMessage>{notification.message}</NotificationMessage>
                            </NotificationItem>
                        ))}
                    </NotificationPopup>
                )}
            </ActionContainer>
        </HeaderContainer>
    );
};

export default Header;