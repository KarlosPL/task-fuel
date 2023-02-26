import React from 'react';

interface MenuItemProps {
  isExpanded?: boolean;
  isSubmenu?: boolean;
  logo?: boolean;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ logo, label, icon, onClick, isExpanded, isSubmenu }) => {
  return (
    <div className="menu-item" onClick={onClick}>
      {icon && <span className="menu-item__icon" id={logo ? 'logo' : undefined}>{icon}</span>}
      {(isExpanded || isSubmenu) && <span className="menu-item__text">{label}</span>}
    </div>
  );
};

export default MenuItem;
