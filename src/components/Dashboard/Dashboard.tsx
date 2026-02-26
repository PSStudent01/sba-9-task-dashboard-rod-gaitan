/* This is the most important one since it owns all the state and composes everything together.*/

/* IMPORTS */
import { useState, useEffect } from 'react';
import type { Task, FilterOptions, TaskFormData  } from '../../types';
import { createTask } from '../../utils/taskUtils';  //Imports utility function that builds a 'complete Task object' from form data.
import TaskForm from '../TaskForm/TaskForm';  // child components that Dashboard will need to combine with the other 2.
import TaskFilter from '../TaskFilter/TaskFilter'; // child components that Dashboard will need to combine with the other 2.
import TaskList from '../TaskList/TaskList'; // child components that Dashboard will need to combine with the other 2.

/* STATE DECLARATIONS */
const Dashboard = () => {

    //const [tasks, setTasks] = useState<Task[]>([]); // main list of all tasks that starts as an empty array.
    // for localStorage funcitonality
    const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all', // The current filter selection that starts with everything set to 'all' indicating that no filters are active.
    priority: 'all',  // The current filter selection that starts with everything set to 'all' indicating that no filters are active.
    searchQuery: '', // not a filter selection  
  });

      // for localStorage funcitonality
  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  //darkmode sate declaration
  const [darkMode, setDarkMode] = useState(false);

  // useEffect to apply the dark mode class
  useEffect(() => {
  document.body.classList.toggle('dark', darkMode);
}, [darkMode]);


/* EVENT HANDLERS */
const handleAddTask = (formData: TaskFormData) => {  // function 'handleAddTask 'that takes one param 'formData' of type 'TaskFormData' 
  const newTask = createTask(formData);             // creates a new task 'newTask' from 'form data' using our utility function 'createTask                           
  setTasks([...tasks, newTask]);    // then adds it to the 'tasks' array using 'spread operator' to keep existing tasks.
};

const handleDeleteTask = (id: string) => {  // function 'handleDeleteTask 'that takes one param 'id' of type 'string' 
  setTasks(tasks.filter((task) => task.id !== id)); //calling the array function 'setTasks' that takes 'id' as a param and does the following...
                                                    //  "hey for each and every 'task' in 'tasks', I want you to remove the id that matches task.id "
                                                    // It essentially filters out or extracts the 'task' whose id matches, thereby deleting it
};

const handleStatusChange = (id: string, status: Task["status"]) => { 
  setTasks(tasks.map((task) =>  //it loops through all tasks. 
    task.id === id ? { ...task, status } : task  //IF the 'task id' matches, THEN returns a copy  of the task with the 'new status'. Else returns the task unchanged.
  ));
};

const handleFilterChange = (newFilters: FilterOptions) => {
  setFilterOptions(newFilters);
};


return (
    <div className="dashboard">
      <h1>Task Management Dashboard</h1>
      
      <h1>Task Management Dashboard
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? ' Light Mode' : ' Dark Mode'}
            </button>
        </h1>


      {/* Task Statistics */}
      <div className="stats">
        <div className="stat-card">
          <p>Total Tasks</p>
          <span>{tasks.length}</span>
        </div>
        <div className="stat-card">
          <p>Todo</p>
          <span>{tasks.filter((task) => task.status === 'todo').length}</span>
        </div>
        <div className="stat-card">
          <p>In Progress</p>
          <span>{tasks.filter((task) => task.status === 'in-progress').length}</span>
        </div>
        <div className="stat-card">
          <p>Completed</p>
          <span>{tasks.filter((task) => task.status === 'completed').length}</span>
        </div>
      </div>

      <TaskForm onAddTask={handleAddTask} />
      <TaskFilter filterOptions={filterOptions} onFilterChange={handleFilterChange} />
      <TaskList tasks={tasks} filterOptions={filterOptions} onDelete={handleDeleteTask} onStatusChange={handleStatusChange} />

    </div>
  );
};



export default Dashboard;



/* VIP Personal Cpmments:
// component returns JSX wrapped in a single parent element
return (
  <div className="dashboard">
    <h1>Task Management Dashboard
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? ' Light Mode' : ' Dark Mode'}
      </button>
    </h1>

    // Task Statistics section - these update automatically whenever tasks state changes
    <div className="stats">
      // 'tasks.length' = total number of tasks in state
      <div className="stat-card">
        <p>Total Tasks</p>
        <span>{tasks.length}</span>
      </div>
      // 'tasks.filter((task) => task.status === 'todo').length' = counts only tasks with status 'todo'
      <div className="stat-card">
        <p>Todo</p>
        <span>{tasks.filter((task) => task.status === 'todo').length}</span>
      </div>
      // same logic as above but counts only tasks with status 'in-progress'
      <div className="stat-card">
        <p>In Progress</p>
        <span>{tasks.filter((task) => task.status === 'in-progress').length}</span>
      </div>
      // same logic as above but counts only tasks with status 'completed'
      <div className="stat-card">
        <p>Completed</p>
        <span>{tasks.filter((task) => task.status === 'completed').length}</span>
      </div>
    </div>

    // renders TaskForm component, passes 'handleAddTask' down as 'onAddTask' prop
    <TaskForm onAddTask={handleAddTask} />

    // renders TaskFilter component, passes current 'filterOptions' and 'handleFilterChange' down as props
    <TaskFilter
      filterOptions={filterOptions}
      onFilterChange={handleFilterChange}
    />

    // renders TaskList component, passes 'tasks', 'filterOptions', 'handleDeleteTask' and 'handleStatusChange' down as props
    <TaskList
      tasks={tasks}
      filterOptions={filterOptions}
      onDelete={handleDeleteTask}
      onStatusChange={handleStatusChange}
    />

  </div>
);


*/