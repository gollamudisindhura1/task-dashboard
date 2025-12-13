// Task Data Structure
// This defines what a task looks like in my application 
export type TaskPriority ="low" | "medium" | "high";
export type TaskStatus = "pending" | "in-progress" | "completed";
export interface Task{
    id : string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    dueDate: string
    createdAt: string
}

// This defines the shape of the data when creating a task
export interface TaskFormData{
    title : string
    description : string
    priority: TaskPriority
    dueDate: string
}

//This defines what filters can be applied to the task list 

export interface FilterOptions{
    status? : TaskStatus
    priority?: TaskPriority
    searchQuery?: string

}

//This defines how tasks can be sorted
export type SortField = "dueDate" | "priority" | "createdAt" | "title"
export type SortOrder = "asc" | "desc"
export interface SortOptions{
    field : SortField
    order : SortOrder
}

export type Theme = "light" | "dark"

//This defines the task statistics data
export interface TaskStats{
    total : number
    pending: number
    inProgress: number
    completed: number
    highPriority: number
    overdue: number
}

// Props for the TaskList Component

export interface TaskListProps{
    tasks : Task[]
    onStatusChange : (taskId:string, newStatus: TaskStatus) => void
    onDelete : (taskId:string) => void
    onEdit: (task: Task) => void
    theme: Theme
}

// Props for the TaskItem Component
export interface TaskItemProps {
    task : Task
    onStatusChange : (taskId:string, newStatus: TaskStatus) => void
    onDelete : (taskId:string) => void
    onEdit: (task: Task) => void
    theme: Theme
}
// Props for the TaskForm Component

export interface TaskFormProps{
    onSubmit: (taskData: TaskFormData) => void
    initialData? : Task
    onCancel? : ()=> void
    theme: Theme
}
// Props for the TaskFilter Component
export interface TaskFilterProps{
    onFilterChange: (filters:FilterOptions) =>void
    onSortChange : (sort:SortOptions) => void

    currentFilters: FilterOptions
    currentSort : SortOptions
    theme: Theme
}

 //Props for the Dashboard Component

 export interface DashboardProps{
    theme: Theme
    onThemeToggle : () => void
 }