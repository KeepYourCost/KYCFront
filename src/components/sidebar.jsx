import React from 'react';
import styled from 'styled-components';
import { Home, Package, ShoppingCart, MessageCircle, HelpCircle, Settings, LogOut } from 'lucide-react';
import { Colors } from '../utils/color';
import {Link, useMatches, useNavigation, useSearchParams} from "react-router-dom";

const SidebarContainer = styled.div`
  width: 260px;
  height: 100vh;
  background-color: #1A1D2B;
  color: ${Colors.text};
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoImage = styled.img`
  //width: 40px;
  height: 50px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  a{
    color: white;
    text-decoration: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${props => props.active && `
    background-color: #3ABFF8;
    color: #1A1D2B;
     a{
        color: #1A1D2B;
        text-decoration: none;
      }
  `}
`;

const NavText = styled.span`
  margin-left: 10px;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Badge = styled.span`
  background-color: #FF4757;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: auto;
`;

const Sidebar = () => {
    const [router] = useMatches();
    return (
        <SidebarContainer>
            <Logo>
                <Link to={'/'}><LogoImage src="/logo.png" alt="Dakota Logo" /></Link>
            </Logo>
            <NavItem active={router.pathname === '/'}>
                <Home size={20} />
                <Link to={'/'}><NavText>Dashbord</NavText></Link>
            </NavItem>
            <NavItem active={router.pathname === '/monitoring'}>
                <Package size={20} />
                <Link to={'/monitoring'}><NavText>Monitoring</NavText></Link>
            </NavItem>

            <NavItem>
                <HelpCircle size={20} />
                <NavText>Help & Guide</NavText>
            </NavItem>
            <Spacer />
            <NavItem>
                <Settings size={20} />
                <Link to={'/setting'}><NavText>Settings</NavText></Link>
            </NavItem>
            <NavItem>
                <LogOut size={20} />
                <Link to={'/login'}><NavText>Logout</NavText></Link>
            </NavItem>
        </SidebarContainer>
    );
};

export default Sidebar;