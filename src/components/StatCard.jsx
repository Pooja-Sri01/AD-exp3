import React from 'react';

const StatCard = ({ label, value, icon: Icon, color, onClick }) => {
  return (
    <div
      className={`stat-card stat-card-${color} ${onClick ? 'stat-card-clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-card-body">
        <div className="stat-card-info">
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon stat-icon-${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
