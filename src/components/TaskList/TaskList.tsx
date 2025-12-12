import type {Task, TaskListProps} from "../../types";

import { TaskItem } from "./TaskItem";


export const TaskList = ({ task, onStatusChange, onDelete, onEdit, theme }: TaskListProps) => {
  
  // Empty state 
  if (task.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-3" style={{ fontSize: '5rem' }}>
          🎄
        </div>
        <h3 className={theme === 'dark' ? 'text-white' : 'text-success'}>
          🎅 No tasks found! 🎅
        </h3>
        <p className={theme === 'dark' ? 'text-white-50' : 'text-muted'}>
          ❄️ Create a new task or adjust your filters ❄️
        </p>
        <p className="text-muted">
          🎁 Make your Christmas list and check it twice! 🎁
        </p>
      </div>
    );
  }
   // Render all tasks
  return (
    <div>
    <h2 className="text-center mb-5" style={{ fontFamily: 'cursive', fontSize: '2.5rem', color: '#c41e3a' }}>
        My Tasks 🎄
      </h2>
    <div className="row justify-content-center g-4">
      {task.map((task: Task) => (
        <div key={task.id} className="col-12 col-md-8 col-lg-6">
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
          theme={theme}
        />
        </div>
      ))}
    </div>
    </div>
  );
};

  

