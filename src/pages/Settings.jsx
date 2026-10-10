import React, { useState } from 'react';
import { Sun, Moon, Download, Trash2, AlertTriangle } from 'lucide-react';
import { exportTasksAsJSON } from '../utils/taskStorage';

const Settings = ({ darkMode, onToggleDark, tasks, onClearAll }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearAll = () => {
    onClearAll();
    setShowConfirm(false);
  };

  return (
    <div className="page-content">
      <div className="settings-container">

        {/* Appearance */}
        <div className="settings-card">
          <h2 className="settings-section-title">Appearance</h2>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <p className="settings-row-desc">Toggle between light and dark themes</p>
            </div>
            <button
              className={`toggle-btn ${darkMode ? 'toggle-btn-on' : ''}`}
              onClick={onToggleDark}
              aria-label="Toggle dark mode"
            >
              <div className="toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-card">
          <h2 className="settings-section-title">Data Management</h2>

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">
                <Download size={18} />
                <span>Export Tasks</span>
              </div>
              <p className="settings-row-desc">Download all tasks as a JSON file ({tasks.length} tasks)</p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => exportTasksAsJSON(tasks)}
              disabled={tasks.length === 0}
            >
              <Download size={15} />
              Export JSON
            </button>
          </div>

          <div className="settings-divider" />

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label danger-label">
                <Trash2 size={18} />
                <span>Clear All Tasks</span>
              </div>
              <p className="settings-row-desc">Permanently delete all tasks. This cannot be undone.</p>
            </div>
            {!showConfirm ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setShowConfirm(true)}
                disabled={tasks.length === 0}
              >
                <Trash2 size={15} />
                Clear All
              </button>
            ) : (
              <div className="confirm-actions">
                <p className="confirm-text">
                  <AlertTriangle size={14} />
                  Are you sure?
                </p>
                <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
                  Yes, Delete All
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* About */}
        <div className="settings-card">
          <h2 className="settings-section-title">About</h2>
          <div className="about-content">
            <p className="about-text">
              <strong>TaskFlow</strong> — A modern task management application built with React + Vite.
            </p>
            <p className="about-text">Version 1.0.0 &nbsp;|&nbsp; Data stored locally in your browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
