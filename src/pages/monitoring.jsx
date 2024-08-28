import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PageWrapper = styled.div`
  background-color: ${Colors.background};
  color: ${Colors.text};
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const ConnectButton = styled.button`
  background-color: ${Colors.primary};
  color: ${Colors.text};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${Colors.secondaryText};
  background-color: ${Colors.background};
  color: ${Colors.text};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: ${Colors.secondaryBackground};
  color: ${Colors.secondaryText};
`;

const TableRow = styled.tr`
  background-color: ${Colors.secondaryBackground};
`;

const TableCell = styled.td`
  padding: 1rem;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 2rem;
`;

const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AlertItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const fakeData = [
    { time: '5 AM', price: 0.015 },
    { time: '6 AM', price: 0.018 },
    { time: '7 AM', price: 0.016 },
    { time: '8 AM', price: 0.017 },
    { time: '9 AM', price: 0.019 },
    { time: '10 AM', price: 0.016 },
];

const InstancePricingMonitoringPage = () => {
    const [activeTab, setActiveTab] = useState('table');

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <div>
                        <Title>production-api</Title>
                        <small>acme-co/production-api</small>
                    </div>
                    <ConnectButton>Connect</ConnectButton>
                </Header>

                <SubTitle>Spot Instance Pricing</SubTitle>

                <TabContainer>
                    <Tab active={activeTab === 'table'} onClick={() => setActiveTab('table')}>Table</Tab>
                    <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>History</Tab>
                    <Tab active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')}>Alerts</Tab>
                </TabContainer>

                <FilterContainer>
                    <Select>
                        <option>Region</option>
                    </Select>
                    <Select>
                        <option>Instance Type</option>
                    </Select>
                </FilterContainer>

                {activeTab === 'table' && (
                    <Table>
                        <thead>
                        <tr>
                            <TableHeader>Region</TableHeader>
                            <TableHeader>Availability Zone</TableHeader>
                            <TableHeader>Price</TableHeader>
                        </tr>
                        </thead>
                        <tbody>
                        <TableRow>
                            <TableCell>us-west-2</TableCell>
                            <TableCell>us-west-2a</TableCell>
                            <TableCell>$0.012</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>us-west-2</TableCell>
                            <TableCell>us-west-2b</TableCell>
                            <TableCell>$0.015</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>us-west-2</TableCell>
                            <TableCell>us-west-2c</TableCell>
                            <TableCell>$0.014</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>us-west-2</TableCell>
                            <TableCell>us-west-2d</TableCell>
                            <TableCell>$0.015</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>us-west-2</TableCell>
                            <TableCell>us-west-2e</TableCell>
                            <TableCell>$0.016</TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                )}

                {activeTab === 'history' && (
                    <>
                        <SubTitle>History</SubTitle>
                        <ChartContainer>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={fakeData}>
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="price" stroke={Colors.primary} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </>
                )}

                {activeTab === 'alerts' && (
                    <AlertsContainer>
                        <AlertItem>
                            <input type="checkbox" id="alert1" />
                            <span>Send me an email when the price exceeds $0.02</span>
                        </AlertItem>
                        <AlertItem>
                            <input type="checkbox" id="alert2" />
                            <span>Send me a text message when the price exceeds $0.03</span>
                        </AlertItem>
                        <AlertItem>
                            <input type="checkbox" id="alert3" />
                            <span>Pause my instances when the price exceeds $0.04</span>
                        </AlertItem>
                    </AlertsContainer>
                )}
            </Container>
        </PageWrapper>
    );
};

export default InstancePricingMonitoringPage;