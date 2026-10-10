import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskModal from './components/TaskModal';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import {
  loadTasks,
  saveTasks,
  loadTheme,
  saveTheme,
  generateId,
  getStats,
} from './utils/taskStorage';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  all: 'All Tasks',
  pending: 'Pending Tasks',
  'in-progress': 'In Progress',
  completed: 'Completed Tasks',
  settings: 'Settings',
};

const VIEW_TO_FILTER = {
  all: 'all',
  pending: 'pending',
  'in-progress': 'in-progress',
  completed: 'completed',
};

// Notification component
const Notification = ({ notifications }) => (
  <div className="notifications-container">
    {notifications.map((n) => (
      <div key={n.id} className={`notification notification-${n.type}`}>
        {n.message}
      </div>
    ))}
  </div>
);

// Delete confirmation dialog
const DeleteDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal-container confirm-dialog">
        <h2 className="modal-title">Delete Task</h2>
        <p className="confirm-desc">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="confirm-dialog-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

let notifCounter = 0;

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [darkMode, setDarkMode] = useState(() => loadTheme() === 'dark');
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    saveTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Persist tasks
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = ++notifCounter;
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  const handleAddTask = useCallback((formData) => {
    const newTask = {
      id: generateId(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setModalOpen(false);
    showNotification('✅ Task added successfully!');
  }, [showNotification]);

  const handleEditTask = useCallback((formData) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id
          ? { ...t, ...formData, updatedAt: new Date().toISOString() }
          : t
      )
    );
    setEditingTask(null);
    setModalOpen(false);
    showNotification('✏️ Task updated successfully!');
  }, [editingTask, showNotification]);

  const handleOpenEdit = useCallback((task) => {
    setEditingTask(task);
    setModalOpen(true);
  }, []);

  const handleOpenAdd = useCallback(() => {
    setEditingTask(null);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleDeleteRequest = useCallback((id) => {
    setDeleteTargetId(id);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setTasks((prev) => prev.filter((t) => t.id !== deleteTargetId));
    setDeleteTargetId(null);
    showNotification('🗑️ Task deleted.', 'info');
  }, [deleteTargetId, showNotification]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTargetId(null);
  }, []);

  const handleToggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const newStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: newStatus, updatedAt: new Date().toISOString() };
      })
    );
    const task = tasks.find((t) => t.id === id);
    if (task?.status !== 'completed') {
      showNotification('🎉 Task completed!');
    }
  }, [tasks, showNotification]);

  const handleClearAll = useCallback(() => {
    setTasks([]);
    showNotification('🗑️ All tasks cleared.', 'info');
  }, [showNotification]);

  const stats = getStats(tasks);
  const title = PAGE_TITLES[activeView] || 'TaskFlow';

  const sharedTaskProps = {
    tasks,
    onEdit: handleOpenEdit,
    onDelete: handleDeleteRequest,
    onToggleComplete: handleToggleComplete,
  };

  const renderPage = () => {
    if (activeView === 'dashboard') {
      return <Dashboard {...sharedTaskProps} stats={stats} onAddTask={handleOpenAdd} />;
    }
    if (activeView === 'settings') {
      return (
        <Settings
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
          tasks={tasks}
          onClearAll={handleClearAll}
        />
      );
    }
    // All task views
    return (
      <Tasks
        {...sharedTaskProps}
        initialFilter={VIEW_TO_FILTER[activeView] || 'all'}
        onAddTask={handleOpenAdd}
      />
    );
  };

  return (
    <div className={`app-layout ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <Header
          title={title}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
          onAddTask={handleOpenAdd}
        />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>

      <TaskModal
        isOpen={modalOpen}
        task={editingTask}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        onClose={handleCloseModal}
      />

      <DeleteDialog
        isOpen={!!deleteTargetId}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <Notification notifications={notifications} />
    </div>
  );
}

export default App;
