import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import { Link } from "react-router-dom";

const LoginPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${Colors.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(45deg, #41465B, #1B1925); 
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
`;

const RightSection = styled.div`
  flex: 1;
  //padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.span`
  color: ${Colors.primary};
  font-size: 2.75rem;
  margin-bottom: 2rem;
  font-family: "Josefin Slab", serif;
`;

const Title = styled.h2`
  color: ${Colors.text};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: "Merriweather", serif !important;
`;

const Subtitle = styled.p`
  color: ${Colors.secondaryText};
  font-size: 1rem;
  //margin-bottom: 2rem;
  font-family: "Merriweather", serif !important;
`;

const Form = styled.form`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${Colors.background};
  color: ${Colors.text};
`;

const Button = styled.button`
  background-color: ${Colors.primary};
  color: ${Colors.text};
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
`;

const GoogleButton = styled(Button)`
  background-color: white;
  color: #757575;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.secondaryText};
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${Colors.secondaryText};
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;


const LanguageSelector = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
`;

const LanguageDropdown = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${Colors.background};
  color: ${Colors.text};
  cursor: pointer;
`;

const FlagIcon = styled.img`
  width: 20px;
  height: 15px;
  margin-right: 0.5rem;
  vertical-align: middle;
`;

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [language, setLanguage] = useState('en');

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <LoginPageWrapper>
            <LanguageSelector>
                <LanguageDropdown value={language} onChange={handleLanguageChange}>
                    <option value="en">
                        🇺🇲
                        English
                    </option>
                    <option value="ko">
                        🇰🇷
                        한국어
                    </option>

                </LanguageDropdown>
            </LanguageSelector>
            <LeftSection>
                <img src={'/sub-background.png'} alt="Dashboard preview" />
                <Title>Easy to use, <Logo>keep your cost</Logo></Title>
                <Subtitle>Choose the best of product/services and get a bare metal server at the lowest prices.</Subtitle>
            </LeftSection>
            <RightSection>
                <Form>
                    <h2>{isLogin ? 'Sign In to Your Account' : 'Create Your Account'}</h2>
                    <GoogleButton>
                        <img src="/google-icon.png" alt="Google" width="20" height="20" />
                        {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
                    </GoogleButton>
                    <OrDivider>OR</OrDivider>
                    {!isLogin && <Input type="text" placeholder="Your Name" />}
                    <Input type="email" placeholder="Your Email" />
                    <Input type="password" placeholder="Password" />
                    {!isLogin && (
                        <>
                            <small>Must be 8 characters at least</small>
                            <label>
                                <input type="checkbox" />
                                I agree to the Terms & Conditions
                            </label>
                        </>
                    )}
                    <Link to={'/'} style={{width: '100%'}}><Button type="submit">{isLogin ? 'Sign In' : 'Register'}</Button></Link>
                    <small>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <a href="#" onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Sign In'}</a>
                    </small>
                </Form>
            </RightSection>
        </LoginPageWrapper>
    );
};

export default LoginPage;