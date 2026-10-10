import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskModal = ({ isOpen, task, onSubmit, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <TaskForm task={task} onSubmit={onSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
