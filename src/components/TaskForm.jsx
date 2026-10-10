import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

const defaultForm = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  category: 'work',
  status: 'pending',
};

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        priority: task.priority || 'medium',
        category: task.category || 'work',
        status: task.status || 'pending',
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Task title is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="task-title">
          Task Title <span className="required">*</span>
        </label>
        <input
          id="task-title"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          autoFocus
        />
        {errors.title && <p className="error-msg">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          className="form-input form-textarea"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)..."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="task-due-date">Due Date</label>
          <input
            id="task-due-date"
            className="form-input"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="form-input form-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="task-category">Category</label>
          <select
            id="task-category"
            className="form-input form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="form-input form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {task ? <><Save size={16} /> Save Changes</> : <><Plus size={16} /> Add Task</>}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
