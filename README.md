# SBA - Task Manager Dashboard

## Overview
This  project is to build a real world style React and TypeScript application. It simulates a development task where I created a fully functional Task Management Dashboard.

## Features
1. Task CRUD Operations: Create, read, update, and delete tasks
2. Filtering & Sorting: Filter by status/priority, sort by various fields like due date, priority
3. Form Handling: Controlled form for adding or editing tasks with validation
4. State Management: Proper use of useState and useEffect
5. Component Composition: Well-structured components like TaskList, TaskItem, TaskForm, TaskFilter, Dashboard
6. TypeScript: Full typing with interfaces for tasks, props, filters
7. Data Persistence: Save tasks to localStorage
8. Responsive Layout: Works on mobile and desktop using Bootstrap or similar
9. Task Statistics: Show counts like total, pending, completed, overdue

# How to Use The App

## Adding a Task

1. Fill in the task title What's on your Christmas list?
2. Add a description (optional festive details)
3. Select priority (High/Medium/Low with red/gold/green indicators)
4. Choose due date (When does Santa need it done?)
5. Click "Create Task"

Managing Tasks

1. Start a Task: Click "Start Task" button
2. Complete a Task: Click "Complete" button
3. Edit a Task: Click "Edit" button
4. Delete a Task: Click "Delete" button

## Filtering & Searching

1. Search: Type in search box to filter by title/description
2. Filter by Status: Select Pending, In Progress, or Completed
3. Filter by Priority: Select High, Medium, or Low
4. Sort: Choose sort field and order

## Theme Toggle
1. Click "🌙 Dark Mode" or "☀️ Light Mode" button to switch themes

# Reflection Questions
1. How you implemented React and TypeScript features
- I used React hooks like useState to manage form inputs, tasks list, filters, sorting, and theme (light/dark).
- useEffect was used to load tasks from localStorage when the app starts and save them every time tasks change.

2. The challenges you encountered and how you overcame them
- At first, everything was stuck to the left. I fixed it by using Bootstrap’s row, col, and justify-content-center classes properly in Dashboard and TaskList.
- There was an infinite loop because theme loading and saving were in the same useEffect. I split them into two separate useEffects one for loading on mount, one for saving on change.
- Tasks not saving/loading I fixed by correctly calling loadTasks() and saveTasks() in useEffect

3. Your approach to component composition and state management
I kept state in the Dashboard tasks, filters, sort, editingTask.
Dashboard passes data and functions down to child components via props.

TaskForm only handles input and sends data up when submitted
TaskFilter Only handles filter/sort changes and sends updates up
TaskList just displays tasks and calls functions for status change, edit, delete
TaskItem has display and buttons there is no state inside


# Future Improvements

1. Add drag-and-drop task reordering
2. Export/import tasks as JSON
3. Add due date reminders
