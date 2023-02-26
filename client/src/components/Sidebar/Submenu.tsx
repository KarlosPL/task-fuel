import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface SubmenuProps {
  isExpanded?: boolean;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Submenu: React.FC<SubmenuProps> = ({ title, icon, children, isExpanded }) => {
  const [isExpanded2, setIsExpanded2] = useState(false);

  const toggleExpansion = () => setIsExpanded2(!isExpanded2);

  return (
    <div className="submenu">
      <div className="submenu__header" onClick={toggleExpansion}>
        {icon && <span className="submenu__icon">{icon}</span>}
        {isExpanded && <><span className="submenu__title">{title}</span>
        <FaAngleDown
          className={`submenu__icon ${isExpanded2 && isExpanded ? 'expanded' : ''}`}
          /></>}
          </div>
      {isExpanded2 && isExpanded && <div className="submenu__content">{children}</div>}
    </div>
  );
};

export default Submenu;
