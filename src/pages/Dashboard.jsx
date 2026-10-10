import React from 'react';
import {
  CheckSquare,
  Clock,
  Loader,
  CheckCircle,
  AlertTriangle,
  Plus,
  TrendingUp,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import { isOverdue } from '../utils/taskStorage';

const Dashboard = ({ tasks, stats, onAddTask, onEdit, onDelete, onToggleComplete }) => {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const overdueTasks = tasks.filter(isOverdue);

  return (
    <div className="page-content">
      <div className="stats-grid">
        <StatCard label="Total Tasks" value={stats.total} icon={CheckSquare} color="purple" />
        <StatCard label="Pending" value={stats.pending} icon={Clock} color="yellow" />
        <StatCard label="In Progress" value={stats.inProgress} icon={Loader} color="blue" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle} color="green" />
        <StatCard label="Overdue" value={stats.overdue} icon={AlertTriangle} color="red" />
      </div>

      {overdueTasks.length > 0 && (
        <div className="dashboard-section">
          <div className="section-header">
            <AlertTriangle size={18} className="overdue-icon" />
            <h2 className="section-title">Overdue Tasks</h2>
            <span className="section-count">{overdueTasks.length}</span>
          </div>
          <div className="task-list">
            {overdueTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <TrendingUp size={18} />
          <h2 className="section-title">Recent Tasks</h2>
          {recentTasks.length > 0 && <span className="section-count">{recentTasks.length}</span>}
        </div>
        {recentTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No tasks yet!</h3>
            <p className="empty-subtitle">Create your first task and stay productive.</p>
            <button className="btn btn-primary" onClick={onAddTask}>
              <Plus size={16} />
              Add Task
            </button>
          </div>
        ) : (
          <div className="task-list">
            {recentTasks.map((task) => (
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
    </div>
  );
};

export default Dashboard;
