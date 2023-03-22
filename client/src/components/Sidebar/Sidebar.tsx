import React, { useState } from 'react';
import MenuItem from './MenuItem';
import Submenu from './Submenu';
import { IconContext } from 'react-icons';
import {
  RiListSettingsFill,
  RiTaskFill,
  RiCalendarTodoFill,
  RiStarFill,
  RiCheckDoubleFill,
  RiDeleteBin6Fill,
  RiSettings3Fill,
  RiLogoutBoxRLine
} from 'react-icons/ri';
import logout from './Logout';
import '../../assets/styles/Sidebar/Sidebar.scss';

interface SidebarProps {
  handleTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleTabChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTabClick = (tabName: string) => {
    handleTabChange(tabName);
    localStorage.setItem('activeTab', tabName);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`Sidebar bg-blue-700 ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconContext.Provider value={{ color: 'white' }}>
        <MenuItem logo icon={<RiListSettingsFill />} />
        <div className="sidebar-menu-collapse">
          <MenuItem label="Today" icon={<RiTaskFill />} isExpanded={isExpanded} onClick={() => handleTabClick('Today')} />

          <Submenu title="Calendar" icon={<RiCalendarTodoFill /> } isExpanded={isExpanded}>
            <MenuItem label="Show All" isSubmenu onClick={() => handleTabClick('Calendar')}/>
            <MenuItem label="Monthly View" isSubmenu />
            <MenuItem label="Weekly View" isSubmenu />
            <MenuItem label="Daily View" isSubmenu />
          </Submenu>

          <MenuItem label="Important" icon={<RiStarFill />} isExpanded={isExpanded} onClick={() => handleTabClick('Important')} />
          <MenuItem label="Completed" icon={<RiCheckDoubleFill />} isExpanded={isExpanded} onClick={() => handleTabClick('Completed')} />
          <MenuItem label="Rubbish bin" icon={<RiDeleteBin6Fill />} isExpanded={isExpanded} onClick={() => handleTabClick('Deleted')} />
        </div>

        <div className="sidebar-footer-collapse flex flex-col gap-y-1">
          <MenuItem label="Settings" icon={<RiSettings3Fill />} isExpanded={isExpanded} />
          <MenuItem label='Logout' icon={<RiLogoutBoxRLine/>} isExpanded={isExpanded}  onClick={logout} />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
