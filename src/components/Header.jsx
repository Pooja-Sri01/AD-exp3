import React from 'react';
import { Menu, Sun, Moon, Bell, Plus } from 'lucide-react';

const Header = ({ title, darkMode, onToggleDark, onMenuToggle, onAddTask }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <button className="icon-btn" onClick={onToggleDark} aria-label="Toggle dark mode" title="Toggle dark mode">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="add-task-btn" onClick={onAddTask}>
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
