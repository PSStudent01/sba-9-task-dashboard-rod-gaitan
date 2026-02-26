/* This is the most important one since it owns all the state and composes everything together.*/

/* IMPORTS */
import { useState } from 'react';
import type { Task, FilterOptions } from '../../types';
import { createTask } from '../../utils/taskUtils';  //Imports utility function that builds a 'complete Task object' from form data.
import TaskForm from '../TaskForm/TaskForm';  // child components that Dashboard will need to combine with the other 2.
import TaskFilter from '../TaskFilter/TaskFilter'; // child components that Dashboard will need to combine with the other 2.
import TaskList from '../TaskList/TaskList'; // child components that Dashboard will need to combine with the other 2.

/* STATE DECLARATIONS */
const Dashboard = () => {

    const [tasks, setTasks] = useState<Task[]>([]); // main list of all tasks that starts as an empty array.

    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all', // The current filter selection that starts with everything set to 'all' indicating that no filters are active.
    priority: 'all',  // The current filter selection that starts with everything set to 'all' indicating that no filters are active.
    searchQuery: '', // not a filter selection  
  });

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