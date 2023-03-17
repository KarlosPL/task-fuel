import React from 'react';

interface Props {
  error: string;
}

const DisplayError: React.FC <Props> = ({ error }) => {
  return (
    <span className='text-red-600'>{error}</span>
  )
}

export default DisplayError;