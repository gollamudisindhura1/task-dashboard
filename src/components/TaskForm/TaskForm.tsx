/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import type { TaskFormProps, TaskFormData } from '../../types';
import { validateTaskTitle, validateTaskDueDate } from '../../utils/taskUtils';

export const TaskForm = ({ onSubmit, initialData, onCancel, theme }: TaskFormProps) => {
  
  // Form field state
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    dueDate?: string;
  }>({});
  
  // for validation display
  const [touched, setTouched] = useState<{
    title?: boolean;
    dueDate?: boolean;
  }>({});
  
  // Load initial data when editing
  useEffect(() => {
    if (initialData) {

      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        dueDate: initialData.dueDate
      });
      setErrors({});
      setTouched({});
    }
  }, [initialData]);
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };
  
  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  
  // Validate individual field
  const validateField = (name: string, value: string) => {
    let error: string | null = null;
    
    if (name === 'title') {
      error = validateTaskTitle(value);
    } else if (name === 'dueDate') {
      error = validateTaskDueDate(value);
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
  };
  
  // Validate all fields
  const validateAll = (): boolean => {
    const titleError = validateTaskTitle(formData.title);
    const dueDateError = validateTaskDueDate(formData.dueDate);
    
    setErrors({
      title: titleError || undefined,
      dueDate: dueDateError || undefined
    });
    
    setTouched({
      title: true,
      dueDate: true
    });
    
    return !titleError && !dueDateError;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateAll()) {
      onSubmit(formData);
      
      if (!initialData) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: ''
        });
        setErrors({});
        setTouched({});
      }
    }
  };
  
  // 🎄 CHRISTMAS THEMED STYLING 🎄
  const cardBgClass = theme === 'dark' ? 'bg-dark text-white' : 'bg-white';
  const inputClass = theme === 'dark' 
    ? 'form-control bg-dark text-white border-success' 
    : 'form-control border-success';
  
  return (
    <div className={`card shadow mb-4 border-success border-3 ${cardBgClass}`}>
     
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          {initialData ? '✏️ Edit Task 🎁' : '➕ Add Task 🎄'}
        </h5>
      </div>
      
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          
          {/* TITLE FIELD */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              🎁 Task Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`${inputClass} ${errors.title && touched.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What's on your  list?"
            />
            {touched.title && errors.title && (
              <div className="invalid-feedback d-block">
                ❄️ {errors.title}
              </div>
            )}
          </div>
          
          {/* DESCRIPTION FIELD */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              📝 Description
            </label>
            <textarea
              id="description"
              name="description"
              className={inputClass}
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Add  details..."
            />
          </div>
          
          {/* PRIORITY AND DUE DATE ROW */}
          <div className="row mb-3">
            
            {/* PRIORITY FIELD */}
            <div className="col-md-6">
              <label htmlFor="priority" className="form-label fw-bold">
                🎯 Priority <span className="text-danger">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                className={inputClass}
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">🟢 Low (Nice to Have)</option>
                <option value="medium">🟡 Medium (Important)</option>
                <option value="high">🔴 High (Must Do!)</option>
              </select>
            </div>
            
            {/* DUE DATE FIELD */}
            <div className="col-md-6">
              <label htmlFor="dueDate" className="form-label fw-bold">
                🎅 Due Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className={`${inputClass} ${errors.dueDate && touched.dueDate ? 'is-invalid' : ''}`}
                value={formData.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.dueDate && errors.dueDate && (
                <div className="invalid-feedback d-block">
                  ❄️ {errors.dueDate}
                </div>
              )}
            </div>
          </div>
          
          {/* FORM BUTTONS */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-success"
            >
              {initialData ? 'Update Task 🎁' : '➕ Create Task 🎄'}
            </button>
            
            {initialData && onCancel && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onCancel}
              >
                ❌ Cancel
              </button>
            )}
          </div>
          
        </form>
      </div>
    </div>
  );
};