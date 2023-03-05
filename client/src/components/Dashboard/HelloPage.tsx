import React from 'react'
import Tasks from './Tasks';
import '../../assets/styles/pages/Home.scss';

const HelloPage: React.FC = () => {
  return (
    <div className='HelloPage flex justify-center items-center'>
      <Tasks />
    </div>
  )
}

export default HelloPage;