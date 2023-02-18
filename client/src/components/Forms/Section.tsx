import React from 'react';

interface SectionProps {
    id: number;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, children }) => {
  return (
    <div className={'FormSection' + id}>
      {children}
    </div>
  );
};

export default Section;
