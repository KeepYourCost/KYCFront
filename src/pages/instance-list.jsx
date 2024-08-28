import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/color';
import Container from '../components/container';
import { Search, List, Grid, Filter, Download } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';

const PageWrapper = styled.div`
  background-color: #1E1E1E;
  min-height: 100vh;
  color: ${Colors.text};
`;

const Content = styled.main`
  padding: 2rem 0;
  margin-top: 40px;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 1rem;
`;

const StatusItem = styled.span`
  color: ${props => props.active ? '#3ABFF8' : Colors.secondaryText};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #262B3D;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: ${Colors.text};
  width: 100%;
  padding: 0.5rem;
  margin-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: #262B3D;
  border-radius: 4px;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? '#3ABFF8' : 'none'};
  border: none;
  color: ${Colors.text};
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const ActionButton = styled.button`
  background-color: #262B3D;
  border: none;
  color: ${Colors.text};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  svg{
    margin-right: .25rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.0em;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #262B3D;
  color: ${Colors.secondaryText};
  font-weight: normal;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const TableRow = styled.tr`
  
  &:nth-child(odd){
    background: rgba(38,43,61, 0.75);
  }
  &:nth-child(even){
    background: rgba(38,43,61, 0.3);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  a{
    color: white;
  }
`;

const DiskCell = styled.div`
  display: flex;
  align-items: center;
  
`



const Status = styled.span`
  color: ${props => props.status === 'Healthy' ? '#4CAF50' : props.status === 'Unhealthy' ? '#F44336' : '#9E9E9E'};
  display: flex;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.status === 'Healthy' ? '#4CAF50' : props.status === 'Unhealthy' ? '#F44336' : '#9E9E9E'};
    margin-right: 0.5rem;
  }
`;

const BarGraph = styled.div`
  min-width: 70px;
  height: 8px;
  background-color: #1A1D2B;
  border-radius: 4px;
  overflow: hidden;
  //margin-left: .5rem;
`;

const BarFill = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: #3ABFF8;
`;

const InstancesList = () => {
    const [activeStatus, setActiveStatus] = useState('All');
    const [viewMode, setViewMode] = useState('list');
    const [instances, setInstances] = useState([
        // { name: 'verona.test.co', status: 'Healthy', ip: '10.250.14.109', services: 4, disks: 24, cpu: 87, ram: 547 },
        // { name: 'web01.prd.nyc.com', status: 'Healthy', ip: '10.250.14.109', services: 6, disks: 8, cpu: 76, ram: 389 },
        // { name: 'cfg01.prd.nyc.TBD.com', status: 'Unhealthy', ip: '10.250.14.109', services: 3, disks: 24, cpu: 34, ram: 400 },
        // { name: 'abr-126983-wr-210', status: 'Healthy', ip: '10.250.14.109', services: 1, disks: 8, cpu: 45, ram: 563 },
        // { name: 'banjo.tre.com', status: 'Offline', ip: '10.250.14.109', services: 1, disks: 0, cpu: 0, ram: 0 },
    ]);

    useEffect(() => {
        const fetchSpotInstances = async () => {
            try {
                const response = await axios.get('http://3.39.229.45:8080/terraform/spot-info');
                const spotInstances = response.data.data.map(spot => ({
                    name: spot.spotId,
                    status: 'Healthy', // Assuming all API instances are healthy
                    ip: spot.publicIp || '10.250.14.109', // Use publicIp if available, otherwise use dummy IP
                    services: Math.floor(Math.random() * 6) + 1, // Random number of services (1-6)
                    disks: Math.floor(Math.random() * 24) + 1, // Random number of disks (1-24)
                    cpu: Math.floor(Math.random() * 100), // Random CPU usage (0-100%)
                    ram: Math.floor(Math.random() * 500) + 100, // Random RAM usage (100-600 GB)
                }));
                setInstances(prevInstances => [...prevInstances, ...spotInstances]);
            } catch (error) {
                console.error('Error fetching spot instances:', error);
            }
        };

        fetchSpotInstances();
    }, []);

    return (
        <PageWrapper>
            <Container>
                <Content>
                    <StatusBar>
                        <StatusItem active={activeStatus === 'All'} onClick={() => setActiveStatus('All')}>All {instances.length}</StatusItem>
                        <StatusItem active={activeStatus === 'Healthy'} onClick={() => setActiveStatus('Healthy')}>
                            Healthy {instances.filter(i => i.status === 'Healthy').length}
                        </StatusItem>
                        <StatusItem active={activeStatus === 'Unhealthy'} onClick={() => setActiveStatus('Unhealthy')}>
                            Unhealthy {instances.filter(i => i.status === 'Unhealthy').length}
                        </StatusItem>
                    </StatusBar>
                    <SearchBar>
                        <Search size={20} color={Colors.secondaryText} />
                        <SearchInput type="text" placeholder="Search" />
                    </SearchBar>
                    <ControlBar>
                        <ViewToggle>
                            <ViewButton active={viewMode === 'list'} onClick={() => setViewMode('list')}><List size={20} /></ViewButton>
                            <ViewButton active={viewMode === 'grid'} onClick={() => setViewMode('grid')}><Grid size={20} /></ViewButton>
                        </ViewToggle>
                        <div style={{display: 'flex'}}>
                            <ActionButton><Filter size={20} /> Filter</ActionButton>
                            <ActionButton><Download size={20} /> Export</ActionButton>
                        </div>
                    </ControlBar>
                    <Table>
                        <thead>
                        <tr>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>IP address</TableHeader>
                            <TableHeader>Services</TableHeader>
                            <TableHeader>Disks</TableHeader>
                            <TableHeader>CPU</TableHeader>
                            <TableHeader>RAM</TableHeader>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            instances.length === 0 && <div>
                                No Instance.
                            </div>
                        }

                        {instances.map((instance, index) => (
                            <TableRow key={index}>
                                <TableCell><Link to={`/instance/${instance.name}`}>{instance.name}</Link></TableCell>
                                {index === 1 ? <TableCell><Status status={"Shutdown"}>{"Shutdown"}</Status></TableCell> : <TableCell><Status status={instance.status}>{instance.status}</Status></TableCell>}
                                <TableCell>{instance.ip}</TableCell>
                                <TableCell>{instance.services}</TableCell>
                                <TableCell>
                                    <DiskCell>
                                        <div style={{minWidth: '30px'}}>
                                            {instance.disks}
                                        </div>
                                        <BarGraph>
                                            <BarFill percentage={(instance.disks / 24) * 100} />
                                        </BarGraph>
                                    </DiskCell>
                                </TableCell>
                                <TableCell>{instance.cpu}%</TableCell>
                                <TableCell>{instance.ram} GB</TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                </Content>
            </Container>
        </PageWrapper>
    );
};

export default InstancesList