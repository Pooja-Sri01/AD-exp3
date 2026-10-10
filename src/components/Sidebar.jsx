import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  Loader,
  CheckCircle,
  Settings,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'all', label: 'All Tasks', icon: CheckSquare },
  { id: 'pending', label: 'Pending', icon: Clock },
  { id: 'in-progress', label: 'In Progress', icon: Loader },
  { id: 'completed', label: 'Completed', icon: CheckCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ activeView, onNavigate, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Zap size={22} />
            <span>TaskFlow</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeView === id ? 'nav-item-active' : ''}`}
              onClick={() => { onNavigate(id); onClose(); }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">TaskFlow v1.0</p>
          <p className="sidebar-footer-sub">Stay organized. Stay productive.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
