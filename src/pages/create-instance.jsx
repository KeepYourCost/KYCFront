import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Lottie from "react-lottie-player";
import animationData from '../lotties/loading.json'; // Lottie JSON 파일 경로



const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${Colors.secondaryBackground};
  position: relative;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${Colors.primary};
  position: absolute;
  left: 0;
  top: 0;
  animation: ${progressAnimation} 10s linear infinite;
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

const LoadingText = styled.p`
  color: ${Colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;


const PageWrapper = styled.div`
  background-color: ${Colors.background};
  color: ${Colors.text};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-top: 50px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.section`
  background-color: ${Colors.secondaryBackground};
  padding: 1.5rem;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${Colors.background};
  color: ${Colors.text};
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${Colors.background};
  color: ${Colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.primary ? Colors.primary : Colors.secondaryBackground};
  color: ${Colors.text};
  cursor: pointer;
`;

const RegionOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RegionOption = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${props => props.selected ? Colors.primary : Colors.background};
  color: ${Colors.text};
  cursor: pointer;
`;

const InstanceTypeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InstanceTypeOption = styled.button`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${props => props.selected ? Colors.primary : Colors.background};
  color: ${Colors.text};
  cursor: pointer;
`;

const KeyValuePair = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: ${Colors.secondaryBackground};
`;

const TableRow = styled.tr`
  background-color: ${Colors.secondaryBackground};
`;

const TableCell = styled.td`
  padding: 0.5rem;
`;

const LottieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CreateSpotInstancePage = () => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedInstanceType, setSelectedInstanceType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLaunchInstance = async () => {
        const rootURL = 'http://3.39.229.45:8080';
        setIsLoading(true);
        try {
            await axios.post(`${rootURL}/terraform/`, {
                backupDir: "/etc/all",
                cnt: "2"
            });
            toast.success("Success to create instance");
            setTimeout(() => {
                navigate('/'); // Navigate to the root page
            }, 1000)
        } catch (error) {
            console.error('Error launching instance:', error);
            toast.error("Failed to create instance");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <Container>
                <Title>Create a Spot Instance</Title>
                <Form>
                    <Section>
                        <SectionTitle>Select a Region</SectionTitle>
                        <RegionOptions>
                            <RegionOption selected={selectedRegion === 'us-east-1'} onClick={() => setSelectedRegion('us-east-1')}>US East (N. Virginia)</RegionOption>
                            <RegionOption selected={selectedRegion === 'us-west-2'} onClick={() => setSelectedRegion('us-west-2')}>US West (Oregon)</RegionOption>
                            <RegionOption selected={selectedRegion === 'eu-west-1'} onClick={() => setSelectedRegion('eu-west-1')}>Europe (Ireland)</RegionOption>
                            <RegionOption selected={selectedRegion === 'ap-northeast-1'} onClick={() => setSelectedRegion('ap-northeast-1')}>Asia Pacific (Tokyo)</RegionOption>
                        </RegionOptions>
                    </Section>

                    <Section>
                        <SectionTitle>Instance Type</SectionTitle>
                        <InstanceTypeOptions>
                            <InstanceTypeOption selected={selectedInstanceType === 'm5.large'} onClick={() => setSelectedInstanceType('m5.large')}>m5.large</InstanceTypeOption>
                            <InstanceTypeOption selected={selectedInstanceType === 'c5.xlarge'} onClick={() => setSelectedInstanceType('c5.xlarge')}>c5.xlarge</InstanceTypeOption>
                            <InstanceTypeOption selected={selectedInstanceType === 'r5.2xlarge'} onClick={() => setSelectedInstanceType('r5.2xlarge')}>r5.2xlarge</InstanceTypeOption>
                            <InstanceTypeOption selected={selectedInstanceType === 't3.medium'} onClick={() => setSelectedInstanceType('t3.medium')}>t3.medium</InstanceTypeOption>
                            <InstanceTypeOption selected={selectedInstanceType === 'i3.large'} onClick={() => setSelectedInstanceType('i3.large')}>i3.large</InstanceTypeOption>
                            <InstanceTypeOption selected={selectedInstanceType === 'g4dn.xlarge'} onClick={() => setSelectedInstanceType('g4dn.xlarge')}>g4dn.xlarge</InstanceTypeOption>
                        </InstanceTypeOptions>
                    </Section>

                    <Section>
                        <SectionTitle>Instance Details</SectionTitle>
                        <InputGroup>
                            <Label>Name</Label>
                            <Input type="text" placeholder="Enter instance name" defaultValue="my-spot-instance" />
                        </InputGroup>
                        <InputGroup>
                            <Label>Description</Label>
                            <Input type="text" placeholder="Enter instance description" defaultValue="Spot instance for data processing" />
                        </InputGroup>
                        <InputGroup>
                            <Label>Security Group</Label>
                            <Select defaultValue="sg-0123456789abcdef0">
                                <option value="sg-0123456789abcdef0">Default (sg-0123456789abcdef0)</option>
                                <option value="sg-0123456789abcdef1">Web Servers (sg-0123456789abcdef1)</option>
                                <option value="sg-0123456789abcdef2">Database (sg-0123456789abcdef2)</option>
                            </Select>
                        </InputGroup>
                        <InputGroup>
                            <Label>Subnet</Label>
                            <Select defaultValue="subnet-0123456789abcdef0">
                                <option value="subnet-0123456789abcdef0">Default in us-east-1a (subnet-0123456789abcdef0)</option>
                                <option value="subnet-0123456789abcdef1">Private in us-east-1b (subnet-0123456789abcdef1)</option>
                                <option value="subnet-0123456789abcdef2">Public in us-east-1c (subnet-0123456789abcdef2)</option>
                            </Select>
                        </InputGroup>
                        <KeyValuePair>
                            <Input type="text" placeholder="Key" defaultValue="Environment" />
                            <Input type="text" placeholder="Value" defaultValue="Production" />
                        </KeyValuePair>
                        <InputGroup>
                            <Label>IAM Role</Label>
                            <Select defaultValue="EC2SpotInstanceRole">
                                <option value="EC2SpotInstanceRole">EC2SpotInstanceRole</option>
                                <option value="S3FullAccess">S3FullAccess</option>
                                <option value="RDSReadOnly">RDSReadOnly</option>
                            </Select>
                        </InputGroup>
                    </Section>

                    <Section>
                        <SectionTitle>Advanced Options</SectionTitle>
                        <InputGroup>
                            <Label>Availability Zone</Label>
                            <Select defaultValue="us-east-1a">
                                <option value="no-preference">No preference</option>
                                <option value="us-east-1a">us-east-1a</option>
                                <option value="us-east-1b">us-east-1b</option>
                                <option value="us-east-1c">us-east-1c</option>
                            </Select>
                        </InputGroup>
                        <InputGroup>
                            <Label>Placement Group</Label>
                            <Select defaultValue="none">
                                <option value="none">None</option>
                                <option value="pg-cluster1">Cluster-1</option>
                                <option value="pg-spread1">Spread-1</option>
                            </Select>
                        </InputGroup>
                        <InputGroup>
                            <Label>Kernel ID</Label>
                            <Select defaultValue="default">
                                <option value="default">Use default</option>
                                <option value="aki-12345678">aki-12345678</option>
                            </Select>
                        </InputGroup>
                        <InputGroup>
                            <Label>RAM Disk ID</Label>
                            <Select defaultValue="default">
                                <option value="default">Use default</option>
                                <option value="ari-12345678">ari-12345678</option>
                            </Select>
                        </InputGroup>
                    </Section>

                    <Section>
                        <SectionTitle>Spot Options</SectionTitle>
                        <CheckboxGroup>
                            <Input type="checkbox" id="spot" defaultChecked />
                            <Label htmlFor="spot">Spot</Label>
                            <Input type="checkbox" id="on-demand" />
                            <Label htmlFor="on-demand">On Demand</Label>
                            <Input type="checkbox" id="reserved" />
                            <Label htmlFor="reserved">Reserved</Label>
                            <Input type="checkbox" id="dedicated-host" />
                            <Label htmlFor="dedicated-host">Dedicated Host</Label>
                        </CheckboxGroup>
                        <InputGroup>
                            <Label>Interrupt</Label>
                            <Select defaultValue="terminate">
                                <option value="terminate">Terminate</option>
                                <option value="stop">Stop</option>
                                <option value="hibernate">Hibernate</option>
                            </Select>
                        </InputGroup>
                    </Section>

                    <Section>
                        <SectionTitle>Configure Kafka</SectionTitle>
                        <InputGroup>
                            <Label>Zookeeper</Label>
                            <Select defaultValue="zk-cluster1">
                                <option value="zk-cluster1">Zookeeper Cluster 1</option>
                                <option value="zk-cluster2">Zookeeper Cluster 2</option>
                            </Select>
                        </InputGroup>
                        <KeyValuePair>
                            <Input type="number" placeholder="Broker Count" defaultValue="3" />
                            <Input type="text" placeholder="Storage" defaultValue="100GB" />
                        </KeyValuePair>
                    </Section>

                    <Section>
                        <SectionTitle>Review and Launch</SectionTitle>
                        <Table>
                            <thead>
                            <tr>
                                <TableHeader>Service</TableHeader>
                                <TableHeader>Region</TableHeader>
                                <TableHeader>Instance Type</TableHeader>
                                <TableHeader>Price</TableHeader>
                            </tr>
                            </thead>
                            <tbody>
                            <TableRow>
                                <TableCell>EC2</TableCell>
                                <TableCell>{selectedRegion || 'us-east-1'}</TableCell>
                                <TableCell>{selectedInstanceType || 'm5.large'}</TableCell>
                                <TableCell>$0.1256 per Hour</TableCell>
                            </TableRow>
                            </tbody>
                        </Table>
                    </Section>

                    <Button primary onClick={handleLaunchInstance} disabled={isLoading}>
                        {isLoading ? 'Launching...' : 'Launch Instance'}
                    </Button>
                </Form>
            </Container>
            {isLoading && (
                <LoadingOverlay>
                    <div>
                        <LottieContainer>
                            <Lottie
                                loop
                                animationData={animationData}
                                play
                                style={{ width: 150, height: 150 }}
                            />
                        </LottieContainer>
                        <LoadingText>Creating instance...</LoadingText>
                        <ProgressBarContainer>
                            <ProgressBar />
                        </ProgressBarContainer>
                    </div>
                </LoadingOverlay>
            )}
        </PageWrapper>
    );
};

export default CreateSpotInstancePage;