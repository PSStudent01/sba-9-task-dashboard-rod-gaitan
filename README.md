# Task Management Dashboard

A task management dashboard built with React and TypeScript.

#
Tech Stack
- React
- TypeScript
- Vite
- Plain CSS

#
Installation
- Clone the repository:
*
git clone https://github.com/PSStudent01/sba-9-task-dashboard-rod-gaitan.git

- Install dependencies:
*
npm install

- Start the development server:
*
npm run dev

- Open your browser at 'http://localhost:5173'

# 
Features
- Adding, deleting, and updating tasks
- Filtering tasks by status, priority, and search query
- Sorting tasks by date, due date, or priority
- Task stats
- localStorage persistence
- Light and dark mode toggle

#
Project Structure
*
sba-9-task-dashboard-rod-gaitan/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList/
    │   │   │   ├── TaskList.tsx
    │   │   │   └── TaskItem.tsx
    │   │   ├── TaskForm/
    │   │   │   └── TaskForm.tsx
    │   │   ├── TaskFilter/
    │   │   │   └── TaskFilter.tsx
    │   │   └── Dashboard/
    │   │       └── Dashboard.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── utils/
    │   │   └── taskUtils.ts
    │   ├── App.tsx
    ├── main.tsx
    └── package.json

#
## Component Props
- TaskItem = receives a single 'task' object, 'onDelete' and 'onStatusChange' callback functions
- TaskList = receives 'tasks' array, 'filterOptions', 'onDelete' and 'onStatusChange'
- TaskForm = receives 'onAddTask' callback function
- TaskFilter = receives 'filterOptions' and 'onFilterChange' callback function
- Dashboard = no props, owns all state
