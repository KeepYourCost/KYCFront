import React, {useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import { CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Lottie from "react-lottie-player";
import animationData from "../lotties/loading.json";

const PageWrapper = styled.div`
  background-color: ${Colors.background};
  min-height: 100vh;
  color: ${Colors.text};
`;

const Content = styled.main`
  margin-top: 40px;
  padding: 2rem 0;
`;

const Breadcrumb = styled.div`
  font-size: 0.9rem;
  color: ${Colors.secondaryText};
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  color: ${Colors.secondaryText};
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? Colors.primary : Colors.secondaryText};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? Colors.primary : 'transparent'};
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${Colors.secondaryText};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background-color: ${Colors.secondaryBackground};
  border: 1px solid ${Colors.secondaryBackground};
  border-radius: 4px;
  color: ${Colors.text};
  font-size: 1rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MetadataItem = styled.div`
  background-color: ${Colors.secondaryBackground};
  padding: 1rem;
  border-radius: 4px;
`;

const MetadataLabel = styled.p`
  color: ${Colors.secondaryText};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MetadataValue = styled.p`
  font-size: 1rem;
`;

const EventLogContainer = styled.div`
  margin-top: 2rem;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${Colors.secondaryBackground};
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const EventIcon = styled.div`
  margin-right: 1rem;
`;

const EventInfo = styled.div`
  flex-grow: 1;
`;

const EventTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
`;

const EventDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${Colors.secondaryText};
`;

const EventTime = styled.span`
  font-size: 0.8rem;
  color: ${Colors.secondaryText};
`;

const DestroyButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 20px;
  background-color: ${Colors.secondaryBackground};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  //justify-content: center;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${Colors.primary};
  animation: ${progressAnimation} 10s linear infinite;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  text-align: center;
`;

const PopupTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PopupText = styled.p`
  margin-bottom: 2rem;
`;

const PopupButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const PopupButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${props => props.danger ? 'red' : 'grey'};
  color: white;
`;

const LoadingText = styled.p`
  color: ${Colors.text};
  font-size: 1rem;
  //margin-bottom: .25rem;
  text-align: center;
  opacity: .8;
  margin-bottom: -1rem;
`;

const LoadingMainText = styled.p`
  color: ${Colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const LottieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InstanceDetail = () => {
    const [activeTab, setActiveTab] = useState('details');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    // 실제 사용 시에는 이 데이터를 props나 API 호출을 통해 가져와야 합니다.
    const instanceData = {
        id: 'i-0a123b4c56def7890',
        region: 'us-west-2',
        instanceType: 'c5.4xlarge',
        zone: 'us-west-2a',
        startTime: 'August 28, 2024, 10:00 AM',
        endTime: 'May 1, 2025, 9:00 AM',
        totalCost: '$24.50',
        pricing: '$0.20/hr',
        metadata: {
            instanceId: 'i-0a123b4c56def7890',
            amiId: 'ami-12345678',
            privateIp: '10.0.0.123',
            publicIp: '203.0.113.123'
        }
    };

    const eventLogData = [
        { id: 1, title: 'us-east-1a', description: 'Spot instance created', status: 'success', time: '15 minutes ago' },
        { id: 2, title: 'us-east-1a', description: 'Spot instance terminated', status: 'error', time: '5 minutes ago' },
    ];

    const [loadingMessage, setLoadingMessage] = useState('');
    const [loadingServerMessage, setLoadingServerMessage] = useState('');
    const [destroySteps, setDestroySteps] = useState([
        'Finding Instance...',
        'Backing up Instance data...',
        'Linking Kafka Stream...',
        'Backup Complete!',
        'Starting Other Spot Instance!',
        'Forced Shutdown Instance...'
    ]);
    const [destroyServerSteps, setDestroyServerSteps] = useState([
        'Initializing shutdown sequence...',
        'Validating instance ID i-0a123b4c56def7890...',
        'Checking dependencies and linked resources...',
        'Preparing for data backup...',
        'Initiating snapshot of EBS volumes...',
        'Snapshot in progress: 10% complete',
        'Snapshot in progress: 25% complete',
        'Snapshot in progress: 50% complete',
        'Snapshot in progress: 75% complete',
        'Snapshot complete. Verifying integrity...',
        'Detaching EBS volumes...',
        'Terminating EC2 instance...',
        'Releasing Elastic IP address 203.0.113.123...',
        'Deleting security group sg-01234567...',
        'Removing instance from target groups...',
        'Updating Auto Scaling group...',
        'Cleaning up network interfaces...',
        'Revoking IAM instance profile...',
        'Deleting CloudWatch alarms...',
        'Removing tags and metadata...',
        'Finalizing shutdown process...',
        'Instance i-0a123b4c56def7890 successfully terminated.',
        'Shutdown complete. Generating final report...'
    ]);


    useEffect(() => {
        if (isLoading) {
            destroySteps.forEach((step, index) => {
                setTimeout(() => {
                    setLoadingMessage(step);
                }, index * 5000); // 각 메시지는 2초 간격으로 표시
            });
            destroyServerSteps.forEach((step, index) => {
                setTimeout(() => {
                    setLoadingServerMessage(step);
                }, index * 500); // 각 메시지는 0.5초 간격으로 표시
            });
        }
    }, [isLoading]);

    const handleForcedDestroy = async () => {
        setShowConfirmPopup(false);
        setIsLoading(true);
        try {
            await axios.post('http://3.39.229.45:8080/terraform/shutdown',{
                "removeIdx": 1
            });
            toast.success("Instance successfully destroyed");
        } catch (error) {
            console.error('Error destroying instance:', error);
            toast.error("Failed to destroy instance");
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setLoadingMessage('');
            }, destroySteps.length * 2000); // 모든 메시지가 표시된 후에 로딩 상태 해제
        }
    };


    return (
        <PageWrapper>
            <Container>
                <Content>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                    }}>
                        <div>
                            <Breadcrumb>Spot Instances / {instanceData.region} / {instanceData.id}</Breadcrumb>
                            <Title>{instanceData.id}</Title>
                            <Subtitle>{instanceData.region}</Subtitle>
                        </div>

                    </div>
                    <TabContainer>
                        <Tab active={activeTab === 'details'} onClick={() => setActiveTab('details')}>Details</Tab>
                        <Tab active={activeTab === 'events'} onClick={() => setActiveTab('events')}>Events</Tab>
                        <Tab active={activeTab === 'metrics'} onClick={() => setActiveTab('metrics')}>Metrics</Tab>
                    </TabContainer>

                    {activeTab === 'details' && (
                        <>
                            <Section>
                                <SectionTitle>General</SectionTitle>
                                <InputGroup>
                                    <Label>Instance Type</Label>
                                    <Input type="text" value={instanceData.instanceType} disabled />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Region</Label>
                                    <Input type="text" value={instanceData.region} disabled />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Zone</Label>
                                    <Input type="text" value={instanceData.zone} disabled />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Start Time</Label>
                                    <Input type="text" value={instanceData.startTime} disabled />
                                </InputGroup>
                                <InputGroup>
                                    <Label>End Time</Label>
                                    <Input type="text" value={instanceData.endTime} disabled />
                                </InputGroup>
                            </Section>

                            <Section>
                                <SectionTitle>Pricing</SectionTitle>
                                <InputGroup>
                                    <Label>Total Cost</Label>
                                    <Input type="text" value={instanceData.totalCost} disabled />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Pricing</Label>
                                    <Input type="text" value={instanceData.pricing} disabled />
                                </InputGroup>
                            </Section>

                            <Section>
                                <SectionTitle>Metadata</SectionTitle>
                                <MetadataGrid>
                                    {Object.entries(instanceData.metadata).map(([key, value]) => (
                                        <MetadataItem key={key}>
                                            <MetadataLabel>{key}</MetadataLabel>
                                            <MetadataValue>{value}</MetadataValue>
                                        </MetadataItem>
                                    ))}
                                </MetadataGrid>
                            </Section>
                        </>
                    )}

                    {activeTab === 'events' && (
                        <EventLogContainer>
                            <SectionTitle>Event Log</SectionTitle>
                            {eventLogData.map(event => (
                                <EventItem key={event.id}>
                                    <EventIcon>
                                        {event.status === 'success' ? (
                                            <CheckCircle color={Colors.success} />
                                        ) : (
                                            <XCircle color={Colors.error} />
                                        )}
                                    </EventIcon>
                                    <EventInfo>
                                        <EventTitle>{event.title}</EventTitle>
                                        <EventDescription>{event.description}</EventDescription>
                                    </EventInfo>
                                    <EventTime>{event.time}</EventTime>
                                </EventItem>
                            ))}
                        </EventLogContainer>
                    )}

                    {activeTab === 'metrics' && (
                        <Section>
                            <SectionTitle>Metrics</SectionTitle>
                            <p>Metrics information will be displayed here.</p>
                        </Section>
                    )}
                    <DestroyButton onClick={() => setShowConfirmPopup(true)}>Forced Shutdown</DestroyButton>
                </Content>
            </Container>
            {showConfirmPopup && (
                <PopupOverlay>
                    <PopupContent>
                        <PopupTitle>Confirm Destruction</PopupTitle>
                        <PopupText>Are you sure you want to destroy this instance? This action cannot be undone.</PopupText>
                        <PopupButtonGroup>
                            <PopupButton onClick={() => setShowConfirmPopup(false)}>Cancel</PopupButton>
                            <PopupButton danger onClick={handleForcedDestroy}>Destroy</PopupButton>
                        </PopupButtonGroup>
                    </PopupContent>
                </PopupOverlay>
            )}

            {isLoading && (
                <LoadingOverlay>
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <LottieContainer>
                            <Lottie
                                loop
                                animationData={animationData}
                                play
                                style={{ width: 150, height: 150 }}
                            />
                        </LottieContainer>
                        <LoadingText>{loadingServerMessage}</LoadingText>
                        <LoadingMainText>{loadingMessage}</LoadingMainText>
                        <ProgressBarContainer>
                            <ProgressBar />
                        </ProgressBarContainer>
                    </div>
                </LoadingOverlay>
            )}

        </PageWrapper>
    );
};

export default InstanceDetail;