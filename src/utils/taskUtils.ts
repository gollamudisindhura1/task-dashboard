import type {Task, FilterOptions, SortOptions, TaskStats} from "../types";

// Local Storage functions


const STORAGE_KEY = "task-dashboard-tasks"
// save tasks to localStorage
export const saveTasks = (tasks: Task[]): void =>{
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }catch (error){
        console.log("Error saving tasks to localStorage:", error);
    }
}

// Load Tasks from localStorage

export const loadTasks = () : Task[]=>{
    try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// Filtering Functions -based on search, status and priority
export const filterTasks =(tasks: Task[], filters: FilterOptions): Task[] =>{
    return tasks.filter(task =>{
        if (filters.status && task.status !== filters.status)
            return false;
        if(filters.priority && task.priority ! ==filters.priority)
            return false;

    //Filter to search by query like title and description
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription) return false;
    }
    return true;
  });
};

// Sorting 

const priorityRank= {high: 3, medium :2, low: 1}

export const sortTasks= (tasks: Task[], sortOptions: SortOptions): Task[] =>{
     const { field, order } = sortOptions;
  const sorted = [...tasks];
  
  sorted.sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'priority':
        comparison = priorityRank[a.priority] - priorityRank[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};
    
// Validation 

export const validateTaskTitle = (title: string): string | null => {
    if(!title.trim()) return "Title is Required";
    if(title.length<3) return 'Title must be at least 3 characters';
  if (title.length > 100) return 'Title must be less than 100 characters';
  return null;
};

export const validateTaskDueDate = (dueDate: string): string | null => {
  if (!dueDate) return 'Due date is required';
  const selectedDate = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) return 'Due date cannot be in the past';
  return null;
};

// Date Format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isOverdue = (dueDate: string, status: string): boolean => {
  if (status === 'completed') return false;
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
};

export const calculateStats = (tasks: Task[]): TaskStats => {
  const stats: TaskStats = {
    total: tasks.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
    highPriority: 0,
    overdue: 0
  };
  
  tasks.forEach(task => {
    if (task.status === 'pending') stats.pending++;
    if (task.status === 'in-progress') stats.inProgress++;
    if (task.status === 'completed') stats.completed++;
    if (task.priority === 'high') stats.highPriority++;
    if (isOverdue(task.dueDate, task.status)) stats.overdue++;
  });
  
  return stats;
};






