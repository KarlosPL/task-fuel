import React from 'react';
import HelloPage from '../components/Dashboard/HelloPage';
import Sidebar from '../components/Sidebar/Sidebar';
import '../assets/styles/pages/Home.scss';

const Home: React.FC = () => {
  return (
    <div className='Home flex'>
      <Sidebar />
      <HelloPage />
    </div>
  )
}

export default Home;