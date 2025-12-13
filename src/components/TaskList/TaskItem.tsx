import type { TaskItemProps, TaskStatus } from "../../types";
import {formatDate, isOverdue} from "../../utils/taskUtils"

export const TaskItem = ({task, onStatusChange, onDelete, onEdit, theme}: TaskItemProps) =>{

    const getStatus = (current: TaskStatus): TaskStatus =>{
        if(current === "pending") return "in-progress";
        if(current === "in-progress") return "completed";
        return "pending"
    }
   // Status
    const statusBadgeClass = {
       pending: 'bg-warning text-dark', 
       'in-progress': 'bg-info text-white', 
       completed: 'bg-success text-white'
       }[task.status];

// Priority
    const priorityBadgeClass = {
       low: 'bg-success text-white',  
       medium: 'bg-warning text-dark',
       high: 'bg-danger text-white' 
    }[task.priority];

    //Left border color
    const borderClass = {
    low: 'border-success',
    medium: 'border-warning',
    high: 'border-danger'
  }[task.priority];
  
  // Check if overdue
  const overdueStatus = isOverdue(task.dueDate, task.status);

  //Theme based background
  const cardBgClass = theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white';

    return (
      <div className={`card shadow-sm mb-3 border-start border-5 ${borderClass} ${cardBgClass}`}>
      <div className="card-body">

      <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">
            🎁 {task.title}
          </h5>
          <span className={`badge ${priorityBadgeClass} fs-6`}>
            {task.priority === 'high' && '🔴'}
            {task.priority === 'medium' && '🟡'}
            {task.priority === 'low' && '🟢'}
            {' '}{task.priority.toUpperCase()}
          </span>
        </div>
        {/* Description */}

         <p className="card-text text-muted mb-3">
          ❄️ {task.description}
        </p>
         <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <small className={overdueStatus ? 'text-danger fw-bold' : 'text-muted'}>
              🎅 Due: {formatDate(task.dueDate)}
              {overdueStatus && ' ⚠️ OVERDUE!'}
            </small>
          </div>
          <span className={`badge ${statusBadgeClass} px-3 py-2`}>
            {task.status === 'pending' && '⏳ '}
            {task.status === 'in-progress' && '🔄 '}
            {task.status === 'completed' && '✅ '}
            {task.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        {/* ACTION BUTTONS */}
        <div className="d-flex gap-2 flex-wrap">
          {/* Progress Button */}
          <button
            onClick={() => onStatusChange(task.id, getStatus(task.status))}
            className={`btn btn-lg shadow ${task.status === 'pending' ? 'btn-warning' : task.status === 'in-progress' ? 'btn-primary' : 'btn-success'} text-white fw-bold`}
            style={{ fontFamily: 'cursive' }}
          >
            {task.status === 'pending' && '🎄 Start Task'}
            {task.status === 'in-progress' && '🎁 Complete'}
            {task.status === 'completed' && '🔄 Restart'}
          </button>
          
          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="btn btn-lg btn-outline-primary shadow-sm "
          style={{ fontFamily: 'cursive' }}
          >
        
            ✏️ Edit
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-lg btn-outline-danger shadow-sm"
            style={{ fontFamily: 'cursive' }}
          >
            🗑️ Delete
          </button>
        </div>
      </div> 
    </div>
  );
};
  
