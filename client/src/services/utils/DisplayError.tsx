import React from 'react';

const DisplayError: React.FC <{ error: string }> = ({ error }) => {
  return (
    <span className='text-red-600'>{error}</span>
  )
}

export default DisplayError;