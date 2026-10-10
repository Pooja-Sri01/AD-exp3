import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { isOverdue } from '../utils/taskStorage';

const priorityOrder = { high: 0, medium: 1, low: 2 };

const Tasks = ({ tasks, initialFilter, onAddTask, onEdit, onDelete, onToggleComplete }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(initialFilter || 'all');
  const [sortBy, setSortBy] = useState('recent');

  const filtered = useMemo(() => {
    let result = [...tasks];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q)) ||
          (t.category && t.category.toLowerCase().includes(q))
      );
    }

    // Filter
    if (filter === 'pending') result = result.filter((t) => t.status === 'pending');
    else if (filter === 'in-progress') result = result.filter((t) => t.status === 'in-progress');
    else if (filter === 'completed') result = result.filter((t) => t.status === 'completed');
    else if (filter === 'high') result = result.filter((t) => t.priority === 'high');
    else if (filter === 'medium') result = result.filter((t) => t.priority === 'medium');
    else if (filter === 'low') result = result.filter((t) => t.priority === 'low');

    // Sort
    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'dueDate') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'priority') {
      result.sort((a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3));
    }

    return result;
  }, [tasks, search, filter, sortBy]);

  return (
    <div className="page-content">
      <div className="tasks-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          activeFilter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="task-count">
        <span>{filtered.length} task{filtered.length !== 1 ? 's' : ''} found</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{search ? '🔍' : '📝'}</div>
          <h3 className="empty-title">
            {search ? 'No tasks match your search' : 'No tasks yet!'}
          </h3>
          <p className="empty-subtitle">
            {search
              ? 'Try different keywords or clear the search.'
              : 'Create your first task and stay productive.'}
          </p>
          {!search && (
            <button className="btn btn-primary" onClick={onAddTask}>
              <Plus size={16} />
              Add Task
            </button>
          )}
        </div>
      ) : (
        <div className="task-list">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
