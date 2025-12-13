//Search and Filter Components
import { useState } from "react";
import type { TaskFilterProps, TaskStatus, TaskPriority, SortField, SortOrder } from "../../types";


export const TaskFilter = ({
    onFilterChange,
    onSortChange,
    currentFilters,
    currentSort,
    theme
}: TaskFilterProps) => {

    const [searchQuery, setSearchQuery] = useState(currentFilters.searchQuery || '');
  const [status, setStatus] = useState<TaskStatus | 'all'>(currentFilters.status || 'all');
  const [priority, setPriority] = useState<TaskPriority | 'all'>(currentFilters.priority || 'all');
  const [sortField, setSortField] = useState<SortField>(currentSort.field);
  const [sortOrder, setSortOrder] = useState<SortOrder>(currentSort.order);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    onFilterChange({
      ...currentFilters,
      searchQuery: query || undefined
    });
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus | 'all';
    setStatus(newStatus);
    onFilterChange({
      ...currentFilters,
      status: newStatus === 'all' ? undefined : newStatus,
      searchQuery: currentFilters.searchQuery
    });
  };
  
   // Handle priority filter change
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value as TaskPriority | 'all';
    setPriority(newPriority);
    
    onFilterChange({
      ...currentFilters,
      priority: newPriority === 'all' ? undefined : newPriority,
      searchQuery: currentFilters.searchQuery
    });
  };
  // Handle sort field change
  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = e.target.value as SortField;
    setSortField(newField);
    onSortChange({ field: newField, order: sortOrder });
  };

  // Handle sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value as SortOrder;
    setSortOrder(newOrder);
    onSortChange({ field: sortField, order: newOrder });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatus('all');
    setPriority('all');
    setSortField('dueDate');
    setSortOrder('asc');
    onFilterChange({
      status: undefined,
      priority: undefined,
      searchQuery: undefined
    });
    onSortChange({ field: 'dueDate', order: 'asc' });
  };
  // Check if any filters are active
  const hasActiveFilters = status !== 'all' || priority !== 'all' || !!searchQuery;

  const cardBgClass = theme === 'dark' ? 'bg-dark text-white' : 'bg-white';
  const inputClass = theme === 'dark' 
    ? 'form-control bg-dark text-white border-danger' 
    : 'form-control border-danger';
  const selectClass = theme === 'dark'
    ? 'form-select bg-dark text-white border-danger'
    : 'form-select border-danger';
  return (
    <div className={`card shadow mb-4 border-danger border-3 ${cardBgClass}`}>
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">🔍 Search & Filter 🎁</h5>
        
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="btn btn-sm btn-light"
          >
            ❄️ Clear All
          </button>
        )}
      </div>
      
      <div className="card-body">
        
        {/* SEARCH BAR */}
        <div className="mb-3">
          <label htmlFor="search" className="form-label fw-bold">
            🎅 Search Tasks
          </label>
          <input
            type="text"
            id="search"
            className={inputClass}
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <small className={theme === 'dark' ? 'text-white-50' : 'text-muted'}>
            ❄️ Type to search in real-time
          </small>
        </div>
        
        <hr className={theme === 'dark' ? 'border-secondary' : 'border-danger'} />
        
        {/* FILTERS ROW */}
        <div className="row mb-3">
          
          {/* STATUS FILTER */}
          <div className="col-md-6 mb-3 mb-md-0">
            <label htmlFor="status" className="form-label fw-bold">
              📊 Status Filter
            </label>
            <select
              id="status"
              className={selectClass}
              value={status}
              onChange={handleStatusChange}
            >
              <option value="all">🎄 All Statuses</option>
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
          
          {/* PRIORITY FILTER */}
          <div className="col-md-6">
            <label htmlFor="priority" className="form-label fw-bold">
              🎯 Priority Filter
            </label>
            <select
              id="priority"
              className={selectClass}
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="all">🎁 All Priorities</option>
              <option value="high">🔴 High (Must Do!)</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>
        
        <hr className={theme === 'dark' ? 'border-secondary' : 'border-danger'} />
        
        {/* SORTING ROW */}
        <div className="row">
          
          {/* SORT BY FIELD */}
          <div className="col-md-6 mb-3 mb-md-0">
            <label htmlFor="sortField" className="form-label fw-bold">
              📈 Sort By
            </label>
            <select
              id="sortField"
              className={selectClass}
              value={sortField}
              onChange={handleSortFieldChange}
            >
              <option value="dueDate">🎅 Due Date</option>
              <option value="priority">🎯 Priority</option>
              <option value="createdAt">📅 Created Date</option>
              <option value="title">🎁 Title</option>
            </select>
          </div>
          
          {/* SORT ORDER */}
          <div className="col-md-6">
            <label htmlFor="sortOrder" className="form-label fw-bold">
              🔀 Order
            </label>
            <select
              id="sortOrder"
              className={selectClass}
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="asc">⬆️ Ascending</option>
              <option value="desc">⬇️ Descending</option>
            </select>
          </div>
        </div>
        
        {/* ACTIVE FILTERS INDICATOR */}
        {hasActiveFilters && (
          <div className="alert alert-success mt-3 mb-0 border-success">
            <strong>🎄 Active Filters:</strong>
            {' '}
            {status !== 'all' && (
              <span className="badge bg-primary me-2">
                Status: {status}
              </span>
            )}
            {priority !== 'all' && (
              <span className="badge bg-warning text-dark me-2">
                Priority: {priority}
              </span>
            )}
            {searchQuery && (
              <span className="badge bg-success">
                Search: "{searchQuery}"
              </span>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

    