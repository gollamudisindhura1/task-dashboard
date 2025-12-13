
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
} from '../../utils/taskUtils';

export const Dashboard = ({ theme}: DashboardProps) => {
  

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
  }
  
 // const bgClass = theme === 'dark' ? 'bg-dark' : 'bg-light';
  
  return (
    <>
   
                  <div className="text-center mb-5">
                    <h1 className="display-3 mb-2 text-success">
                     Task Dashboard 🎅
                    </h1>
                    <p className="text-danger mb-0 fs-5">
                      ❄️ Manage your tasks with festive cheer! 🎁
                    </p>
                  </div>
                  
                 {/* Statistics Grid */}
      <div className="row g-4 mb-5 justify-content-center">
        {/* Total Tasks */}
        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className="card shadow h-100 text-center border-primary">
            <div className="card-body">
              <div className="display-4 mb-2">🎁</div>
              <h3 className="mb-0 text-primary">{stats.total}</h3>
              <p className="text-muted mb-0 small">Total Tasks</p>
            </div>
          </div>
        </div>
        {/* Pending */}
        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className="card shadow h-100 text-center border-warning">
            <div className="card-body">
              <div className="display-4 mb-2">⏳</div>
              <h3 className="mb-0 text-warning">{stats.pending}</h3>
              <p className="text-muted mb-0 small">Pending</p>
            </div>
          </div>
        </div>
        {/* In Progress */}
        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className="card shadow h-100 text-center border-info">
            <div className="card-body">
              <div className="display-4 mb-2">🔄</div>
              <h3 className="mb-0 text-info">{stats.inProgress}</h3>
              <p className="text-muted mb-0 small">In Progress</p>
            </div>
          </div>
        </div>
        {/* Completed */}
        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className="card shadow h-100 text-center border-success">
            <div className="card-body">
              <div className="display-4 mb-2">✅</div>
              <h3 className="mb-0 text-success">{stats.completed}</h3>
              <p className="text-muted mb-0 small">Completed</p>
            </div>
          </div>
        </div>
        {/* High Priority */}
        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className="card shadow h-100 text-center border-danger">
            <div className="card-body">
              <div className="display-4 mb-2">🔴</div>
              <h3 className="mb-0 text-danger">{stats.highPriority}</h3>
              <p className="text-muted mb-0 small">High Priority</p>
            </div>
          </div>
        </div>
        {/* Overdue */}
        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className="card shadow h-100 text-center border-dark">
            <div className="card-body">
              <div className="display-4 mb-2">⚠️</div>
              <h3 className="mb-0 text-danger">{stats.overdue}</h3>
              <p className="text-muted mb-0 small">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout - Form/Filter on left, Tasks on right */}
      <div className="row g-5">
        <div className="col-lg-4">
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
                tasks={filteredAndSortedTasks}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};