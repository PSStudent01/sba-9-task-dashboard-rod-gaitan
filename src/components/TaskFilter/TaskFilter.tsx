import type { TaskListProps } from '../../types'; //Imports the types we need from index.ts
                                                // Again, use 'type' keyword to avoid the error
import TaskItem from '../TaskItem/TaskItem';  //Imports the 'TaskItem' component created in 'TaskItem.tsx'
import { useState } from 'react';  //Imports the 'useState' hook from React. It allows the component to REMEMBER and TRACk values over time, (ex the current filter selections)
import { filterTasks, sortTasks } from "../../utils/taskUtils"; // Imports 2 utility functions, that were created in 'taskUtils.ts'


function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) { //Defines the TaskList component
                                                                        // '{ tasks, onStatusChange, onDelete }' = destructures the 3 props from 'TaskListProps' interface
                                                                        // ': TaskListProps' = TypeScript checks that prop is of type 'TaskListProps'
const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>(''); // it creates a state variable called 'statusFilter' to track the current status filter
                                                                       // 'setStatusFilter' = a function that updates 'statusFilter'
                                                                       // 'useState<TaskStatus | ''>' = the state can be either of a 'TaskStatus value' or an 'empty string'
                                                                       // '('')' = the initial value is an empty string, activates when no filter is applied yet.

const [priorityFilter, setPriorityFilter] = useState<'low' | 'medium' | 'high' | ''>(''); // it creates a state variable called 'priorityFilter' to track the current priority filter
                                                                       // 'setPriorityFilter' = a function that updates 'priorityFilter'
                                                                       // 'useState<'low' | 'medium' | 'high' | ''>' = the state can be either 'low' | 'medium' | 'high' or an 'empty string'
                                                                       // '('')' = the initial value is an empty string, activates when no filter is applied yet.

const handleFilterChange = (filters: { status?: TaskStatus; priority?: 'low' | 'medium' | 'high' }) => { // Defines a function called 'handleFilterChange'
                                                                                                         //This is the function that gets passed down to child component 'TaskFilter' as 'onFilterChange'
                                                                                                        //It receives a 'filters' object with optional 'status' and optional 'priority' properties.                                                                  
if (filters.status !== undefined) setStatusFilter(filters.status); //Checks if the 'filters' object has a 'status' property VALUE
                                                                // '!== undefined' = checks if filters.status is not null or undefined. IOWs, if it is being provided
                                                               //  so if condition '!== undefined' is false, meaning it is being provided, then update 'statusFilter' with the new value.

if (filters.priority !== undefined) setPriorityFilter(filters.priority); //Checks if the 'filters' object has a 'priority' property VALUE
                                                                // '!== undefined' = checks if filters.priority is not null or undefined. IOWs, if it is being provided
                                                               //  so if condition '!== undefined' is false, meaning it is being provided, then update 'priorityFilter' with the new value.           

};
 const filteredTasks = tasks.filter((task) => {                 // Creates a new array called 'filteredTasks'
                                                                // '.filter()' = is a 'JavaScript array method' that loops through every task and keeps only the ones that pass the test inside                                                   

const matchesStatus = statusFilter === '' || task.status === statusFilter; // creates a condition 'matchesStatus' that tests... 
                                                                           // if ' statusFilter === '' ' (no status filter is applied)
                                                                           // OR if ' task.status === statusFilter ' ('statusFilter' matches "task's status")
                                                                           // FILTER passes if either of these is true, else it fails and won't return anything, becoming a falsy
                                                                           
const matchesPriority = priorityFilter === '' || task.priority === priorityFilter; // creates a condition 'matchesPriority' that tests... 
                                                                           // if ' priorityFilter === '' ' (no priority filter is applied)
                                                                           // OR if ' task.priority === priorityFilter ' ('priorityFilter' matches "priority")
                                                                           // FILTER passes if either of these is true, else it fails and won't return anything, becoming a falsy

return matchesStatus && matchesPriority; // and bc BOTH FILTERs must be true, if any of the two is falsy, it will make this statement false
                                        // and therefore the TASK WILL NOT be included  in 'filteredTasks' array
                                        // The task is only kept in filteredTasks if it matches both the status AND priority filter

 });


return (                                                //Component returns JSX wrapped in a div
  <div>
    <TaskFilter onFilterChange={handleFilterChange} />  
    {/*Renders the TaskFilter component */}
     {/*Passes handleFilterChange as the onFilterChange prop */}
      {/*This is how TaskFilter knows what function to call when the user changes a filter */}
    {filteredTasks.map((task) => (                       
    <TaskItem                                         
    key={task.id}                                                                                     
      task={task}                                    
      onStatusChange={onStatusChange}                   
    onDelete={onDelete}                             

/>
))} 

</div>
  );
}

export default TaskList;  //makes this COMPONENT available to be imported to other files


/*
#
Check my logic here later:
// so if condition '!== undefined' is FALSE, meaning it is being provided
// so if condition '!== undefined' is TRUE, meaning it is being provided 


# Scratchpad
    {filteredTasks.map((task) => (                       