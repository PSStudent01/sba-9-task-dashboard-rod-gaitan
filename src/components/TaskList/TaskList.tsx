import type { TaskListProps } from '../../types'; //Imports the types we need from index.ts
                                                // Again, use 'type' keyword to avoid the error
import TaskItem from '../TaskItem/TaskItem';  //Imports the 'TaskItem' component created in 'TaskItem.tsx'
import { useState } from 'react';  //Imports the 'useState' hook from React. It allows the component to REMEMBER and TRACk values over time, (ex the current filter selections)
import { filterTasks, sortTasks } from "../../utils/taskUtils"; // Imports 2 utility functions, that were created in 'taskUtils.ts'

                                                
const TaskList = ({  // declares function component. This is now a function you can use in JSX:
  tasks,         //destruturing of props object 'TaskListProps'
  filterOptions,  // ''         ''          ''          ''
  onDelete,       // ''         ''          ''          ''
  onStatusChange,  // ''         ''          ''          ''
}: TaskListProps) => {   // This is TS type annotation for the function parameter. It tells TS:
                        // ...the object being destructured must conform to the 'TaskListProps' interface. IOWs TS now knows:
                        // 'tasks' is 'Task[]'
                        // 'filterOptions' is 'FilterOptions'
                        // 'onDelete' is '(id: string) => void'
                        // 'onStatusChange' is '(id: string, status: Task["status"]) => void'        
                        // This prevents errors, like passing the wrong type from Dashboard.


  // Local state for sorting
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "priority">(  // 'const [sortBy, setSortBy]' = array destructuring,'useState' returns 2 things in an array:
        "createdAt"                                                            // - 'sortBy' = the current state value
                                                                               // - 'setSortBy' = function to update that state
  );






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