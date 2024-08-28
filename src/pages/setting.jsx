import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import {CheckCheck, CheckCircle2Icon, CheckIcon, ChevronRight, Circle, CircleAlert, X} from 'lucide-react';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: ${Colors.background};
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
`;

const PopupTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${Colors.secondaryText};
`;

const Input = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${Colors.secondaryText};
  border-radius: 4px;
  background-color: ${Colors.secondaryBackground};
  color: ${Colors.text};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: ${Colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.primaryHover};
  }
`;

const PageWrapper = styled.div`
  background-color: ${Colors.background};
  color: ${Colors.text};
  min-height: 100vh;
`;

const Content = styled.main`
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  color: ${Colors.secondaryText};
  margin-bottom: 1rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${Colors.secondaryBackground};
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.hover};
  }
`;

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingName = styled.span`
  font-weight: bold;
`;

const SettingValue = styled.span`
  color: ${Colors.secondaryText};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const AWSPopup = ({ onClose, onSubmit }) => {
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleSubmit = () => {
        onSubmit(accessKey, secretKey);
    };

    return (
        <PopupOverlay>
            <PopupContent>
                <PopupTitle>
                    AWS Settings
                    <CloseButton onClick={onClose}>
                        <X size={20} />
                    </CloseButton>
                </PopupTitle>
                <Input
                    type="text"
                    placeholder="Access Key"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                />
                <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </PopupContent>
        </PopupOverlay>
    );
};

const SettingsPage = () => {
    const [showAWSPopup, setShowAWSPopup] = useState(false);
    const [aws, setAws] = useState(false);
    const handleAWSSubmit = async (accessKey, secretKey) => {
        try {
            const response = await axios.post('http://3.39.229.45:8080/terraform/initialization', {
                accessKey,
                secretKey,
            });
            console.log('API Response:', response.data);
            toast.success('Success to setting!')
            setShowAWSPopup(false);
            setAws(true);
        } catch (error) {
            toast.error('Something Wrong.. Try later')
            console.error('API Error:', error);
            setAws(true);
        }
    };

    return (
        <PageWrapper>
            <Container>
                <Content>
                    <Title>Settings</Title>

                    <Section>
                        <SectionTitle>Kafka</SectionTitle>
                        <SectionDescription>
                            Kafka is a distributed streaming platform that can be used to build real-time data pipelines and streaming applications.
                        </SectionDescription>
                        <SettingItem>
                            <SettingInfo>
                                <SettingName>us-east-1</SettingName>
                                <SettingValue>Kafka Cluster</SettingValue>
                            </SettingInfo>
                            <ChevronRight size={20} color={Colors.secondaryText} />
                        </SettingItem>
                    </Section>

                    <Section>
                        <SectionTitle>AWS</SectionTitle>
                        <SectionDescription>
                            AWS is a secure cloud services platform, offering computing power, database storage, content delivery, and other functionality to help businesses scale and grow.
                        </SectionDescription>
                        <SettingItem onClick={() => setShowAWSPopup(true)}>
                            <SettingInfo>
                                <SettingName>AWS {aws && <CheckCircle2Icon color={'#54BFFF'} size={'15px'} style={{marginLeft: '.05rem'}}></CheckCircle2Icon>}</SettingName>
                                <SettingValue>{aws ? 'Account ID: 1234-5678-9012' : 'Not Connected'} {!aws && <CircleAlert style={{marginLeft: '3px'}} size={'15px'}></CircleAlert>}</SettingValue>
                            </SettingInfo>
                            <ChevronRight size={20} color={Colors.secondaryText} />
                        </SettingItem>
                    </Section>

                    <Section>
                        <SectionTitle>Google Cloud</SectionTitle>
                        <SectionDescription>
                            Google Cloud Platform is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, file storage, and YouTube.
                        </SectionDescription>
                        <SettingItem>
                            <SettingInfo>
                                <SettingName>Google Cloud</SettingName>
                                <SettingValue>Account ID: 1234-5678-9012</SettingValue>
                            </SettingInfo>
                            <ChevronRight size={20} color={Colors.secondaryText} />
                        </SettingItem>
                    </Section>

                    <Section>
                        <SectionTitle>Notifications</SectionTitle>
                        <SettingItem>
                            <SettingInfo>
                                <SettingName>Failure Notifications</SettingName>
                                <SettingValue>Email</SettingValue>
                            </SettingInfo>
                            <ChevronRight size={20} color={Colors.secondaryText} />
                        </SettingItem>
                        <SettingItem>
                            <SettingInfo>
                                <SettingName>Slack Notifications</SettingName>
                                <SettingValue>Connected</SettingValue>
                            </SettingInfo>
                            <ChevronRight size={20} color={Colors.secondaryText} />
                        </SettingItem>
                    </Section>
                </Content>
            </Container>
            {showAWSPopup && (
                <AWSPopup
                    onClose={() => setShowAWSPopup(false)}
                    onSubmit={handleAWSSubmit}
                />
            )}

        </PageWrapper>
    );
};

export default SettingsPage;