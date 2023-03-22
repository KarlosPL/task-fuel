import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import HelloPage from '../components/Dashboard/HelloPage';
import Sidebar from '../components/Sidebar/Sidebar';
import '../assets/styles/pages/Home.scss';

const Home: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const authorizationToken = localStorage.getItem('authorizationToken');
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'Today');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const autoGetRequest = async () => {
      try {
        const axiosInstance = axios.create({
          headers: { Authorization: `Bearer ${authorizationToken}` }
        });

        const response = await axiosInstance.get('/api/dashboard');

        if (!response.data.success) navigate('/login');
        
      } catch (err) {
        navigate('/login');
      }
    };

    autoGetRequest();
  });

  return (
    <div className='Home flex bg-zinc-200'>
      <Sidebar handleTabChange={handleTabChange} />
      <HelloPage activeTab={activeTab} />
    </div>
  )
}

export default Home;