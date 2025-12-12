/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import type { Task, FilterOptions, SortOptions, TaskFormData, DashboardProps } from '../../types';
import { TaskList } from '../TaskList/TaskList';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { 
  saveTasks, 
  loadTasks, 
  filterTasks, 
  sortTasks, 
  calculateStats,
  exportTasks,
  importTasks
} from '../../utils/taskUtils';

export const Dashboard = ({ theme, onThemeToggle }: DashboardProps) => {
  

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOptions>({
    field: 'dueDate',
    order: 'asc'
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);
  
  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);
  
  // Apply filters and sorting
  const filteredAndSortedTasks = sortTasks(
    filterTasks(tasks, filters),
    sort
  );
  
  // Calculate statistics
  const stats = calculateStats(tasks);
  
  // TASK OPERATIONS
  const handleAddTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };
  
  const handleUpdateTask = (taskData: TaskFormData) => {
    if (!editingTask) return;
    setTasks(prev => prev.map(task =>
      task.id === editingTask.id ? { ...task, ...taskData } : task
    ));
    setEditingTask(null);
  };
  
  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };
  
  const handleDeleteTask = (taskId: string) => {
    if (confirm('🎅 Are you sure you want to remove this?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCancelEdit = () => {
    setEditingTask(null);
  };
  
  // IMPORT/EXPORT
  const handleExport = () => {
    exportTasks(tasks);
  };
  
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    importTasks(file)
      .then(importedTasks => {
        setTasks(importedTasks);
        alert('🎄 Tasks imported successfully!');
      })
      .catch(error => {
        alert('❌ Error importing tasks: ' + error.message);
      });
  };
  
  const bgClass = theme === 'dark' ? 'bg-dark' : 'bg-light';
  
  return (
    <div className={`min-vh-100 ${bgClass}`} style={{
      backgroundImage: theme === 'light' 
        ? 'radial-gradient(circle, #fff5f5 0%, #ffe5e5 100%)' 
        : 'none'
    }}>
      <div className="container-fluid py-4">
        

        <div className="row mb-4">
          <div className="col-12">
            <div className={`card shadow-lg border-success border-3 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white'}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  
                  <div>
                    <h1 className="display-3 mb-2 text-success">
                     Task Dashboard 🎅
                    </h1>
                    <p className="text-danger mb-0 fs-5">
                      ❄️ Manage your holiday tasks with festive cheer! 🎁
                    </p>
                  </div>
                  
                  <div className="d-flex gap-2 align-items-center flex-wrap mt-3 mt-md-0">
                    <button
                      onClick={onThemeToggle}
                      className="btn btn-outline-warning"
                      title="Toggle theme"
                    >
                      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                    
                    <button
                      onClick={handleExport}
                      className="btn btn-success"
                      title="Export tasks"
                    >
                      🎁 Export
                    </button>
                    
                    <label className="btn btn-danger mb-0">
                      🎅 Import
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="d-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    
        <div className="row mb-4">
          
          {/* Total Tasks */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card shadow h-100 border-primary border-3">
              <div className="card-body text-center">
                <div className="display-4 mb-2">🎁</div>
                <h3 className="mb-0 text-primary">{stats.total}</h3>
                <p className="text-muted mb-0 small">Total Tasks</p>
              </div>
            </div>
          </div>
          
          {/* Pending */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card shadow h-100 border-warning border-3">
              <div className="card-body text-center">
                <div className="display-4 mb-2">⏳</div>
                <h3 className="mb-0 text-warning">{stats.pending}</h3>
                <p className="text-muted mb-0 small">Pending</p>
              </div>
            </div>
          </div>
          
          {/* In Progress */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card shadow h-100 border-info border-3">
              <div className="card-body text-center">
                <div className="display-4 mb-2">🔄</div>
                <h3 className="mb-0 text-info">{stats.inProgress}</h3>
                <p className="text-muted mb-0 small">In Progress</p>
              </div>
            </div>
          </div>
          
          {/* Completed */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card shadow h-100 border-success border-3">
              <div className="card-body text-center">
                <div className="display-4 mb-2">✅</div>
                <h3 className="mb-0 text-success">{stats.completed}</h3>
                <p className="text-muted mb-0 small">Completed</p>
              </div>
            </div>
          </div>
          
          {/* High Priority */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card shadow h-100 border-danger border-3">
              <div className="card-body text-center">
                <div className="display-4 mb-2">🔴</div>
                <h3 className="mb-0 text-danger">{stats.highPriority}</h3>
                <p className="text-muted mb-0 small">High Priority</p>
              </div>
            </div>
          </div>
          
          {/* Overdue */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card shadow h-100 border-danger border-3">
              <div className="card-body text-center">
                <div className="display-4 mb-2">⚠️</div>
                <h3 className="mb-0 text-danger">{stats.overdue}</h3>
                <p className="text-muted mb-0 small">Overdue</p>
              </div>
            </div>
          </div>
        </div>
        
    
        <div className="row">
          
          
          <div className="col-lg-4 mb-4">
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              initialData={editingTask || undefined}
              onCancel={editingTask ? handleCancelEdit : undefined}
              theme={theme}
            />
            
            <TaskFilter
              onFilterChange={setFilters}
              onSortChange={setSort}
              currentFilters={filters}
              currentSort={sort}
              theme={theme}
            />
          </div>
          
        
          <div className="col-lg-8">
            <div className={`card shadow-lg border-warning border-3 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white'}`}>
              <div className="card-header bg-warning text-dark">
                <h4 className="mb-0">
                  🎁 Tasks ({filteredAndSortedTasks.length}) 🎄
                </h4>
              </div>
              <div className="card-body">
                <TaskList
                  task={filteredAndSortedTasks}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};