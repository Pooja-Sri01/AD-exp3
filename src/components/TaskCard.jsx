import React from 'react';
import {
  Calendar,
  Tag,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  AlertTriangle,
  Clock,
  Briefcase,
  BookOpen,
  User,
  MoreHorizontal,
} from 'lucide-react';
import { isOverdue } from '../utils/taskStorage';

const priorityConfig = {
  high: { label: 'High', class: 'priority-high' },
  medium: { label: 'Medium', class: 'priority-medium' },
  low: { label: 'Low', class: 'priority-low' },
};

const statusConfig = {
  pending: { label: 'Pending', class: 'status-pending' },
  'in-progress': { label: 'In Progress', class: 'status-inprogress' },
  completed: { label: 'Completed', class: 'status-completed' },
};

const categoryIcons = {
  work: Briefcase,
  study: BookOpen,
  personal: User,
  other: MoreHorizontal,
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const overdue = isOverdue(task);
  const CategoryIcon = categoryIcons[task.category] || MoreHorizontal;

  return (
    <div className={`task-card ${overdue ? 'task-card-overdue' : ''} ${task.status === 'completed' ? 'task-card-completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-card-title-row">
          <button
            className="complete-btn"
            onClick={() => onToggleComplete(task.id)}
            aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed'
              ? <CheckCircle size={22} className="complete-icon-done" />
              : <Circle size={22} className="complete-icon-todo" />
            }
          </button>
          <h3 className={`task-title ${task.status === 'completed' ? 'task-title-done' : ''}`}>
            {task.title}
          </h3>
        </div>
        <div className="task-card-actions">
          <button className="action-btn edit-btn" onClick={() => onEdit(task)} aria-label="Edit task" title="Edit task">
            <Edit2 size={16} />
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(task.id)} aria-label="Delete task" title="Delete task">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <div className="task-badges">
          <span className={`badge ${priorityConfig[task.priority]?.class}`}>
            {priorityConfig[task.priority]?.label}
          </span>
          <span className={`badge ${statusConfig[task.status]?.class}`}>
            {statusConfig[task.status]?.label}
          </span>
          {overdue && (
            <span className="badge badge-overdue">
              <AlertTriangle size={11} />
              Overdue
            </span>
          )}
        </div>

        <div className="task-meta">
          <span className="task-meta-item">
            <CategoryIcon size={13} />
            <span>{task.category ? task.category.charAt(0).toUpperCase() + task.category.slice(1) : 'Other'}</span>
          </span>
          {task.dueDate && (
            <span className={`task-meta-item ${overdue ? 'meta-overdue' : ''}`}>
              <Calendar size={13} />
              <span>{formatDate(task.dueDate)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
