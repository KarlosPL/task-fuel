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

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <MenuItem label="Today" icon={<RiTaskFill />} isExpanded={isExpanded} />

          <Submenu title="Calendar" icon={<RiCalendarTodoFill /> } isExpanded={isExpanded}>
            <MenuItem label="Monthly View" isSubmenu />
            <MenuItem label="Weekly View" isSubmenu />
            <MenuItem label="Daily View" isSubmenu />
          </Submenu>

          <MenuItem label="Important" icon={<RiStarFill />} isExpanded={isExpanded} />
          <MenuItem label="Completed" icon={<RiCheckDoubleFill />} isExpanded={isExpanded} />
          <MenuItem label="Rubbish bin" icon={<RiDeleteBin6Fill />} isExpanded={isExpanded} />
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
