import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className='FormHeader'>
      <h1 className='text-zinc-800'>{title}</h1>
    </div>
  );
};

export default Header;
