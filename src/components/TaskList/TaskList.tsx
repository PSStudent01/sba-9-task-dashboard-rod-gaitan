import type { TaskListProps } from '../../types'; //Imports the types we need from index.ts
                                                // Again, use 'type' keyword to avoid the error
import TaskItem from './TaskItem'; //Imports the 'TaskItem' component created in 'TaskItem.tsx'
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


 // Apply filters
  const filteredTasks = filterTasks(tasks, filterOptions); // calling utility function  'filterTasks', while passing 'tasks' and the current filter selections 'filterOptions'. 
                                                           // then returns only the TASKS that match the FILTERS and stores them in 'filteredTasks'.

  // Apply sorting to filtered tasks
  const sortedTasks = sortTasks(filteredTasks, sortBy);  // calling utility function  'sortTasks', while passing 'filteredTasks' and 'sortBy'. 
                                                        // then takes the already filtered tasks and sorts them based on the current 'sortBy' value. 
                                                        // Note: must filter 1st then sort 2nd.

  
return (
    <div className="task-list">
      <h2>Tasks</h2>

      <div className="sort-group">
        Sort by:
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "createdAt" | "dueDate" | "priority")
          }
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {sortedTasks.length ? (
        sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))
      ) : (
        <p className="no-tasks">No tasks found.</p>
      )}
    </div>
  );

};

export default TaskList; //makes this COMPONENT available to be imported to other files


/*
return (
  // every component must return JSX wrapped in a single parent element, ITC that parent element is the <div>
  <div>
    <h2>Tasks</h2>

    // using <label> element rather than <div> to wrap the sort dropdown for accessibility
    <label>
      Sort by:
      // '<select' marks the beginning of controlled dropdown whose current value is always whatever 'sortBy' state is set to.
      // 'controlled component', bc dropdown's selected value is NOT managed by the DOM, rather by the state.
      // when the user selects a different option, it gets stored in 'e', then the value of 'e' passed down to 'setSortBy' state.
      // that selected option gets stored in 'e.target.value' as a string only and validated as one of 3 possible 'asserted type' options
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "createdAt" | "dueDate" | "priority")
        }
      >
        // 'value="createdAt"' is what gets stored in state
        <option value="createdAt">Created Date</option>
        // 'value="dueDate"' is what gets stored in state
        <option value="dueDate">Due Date</option>
        // 'value="priority"' is what gets stored in state
        <option value="priority">Priority</option>
      </select>
    </label>

    // 'sortedTasks.length ? (' = ternary operator that checks if there are any tasks to render. 'sortedTasks.length' is 'falsy' when empty, any other number is 'truthy'.
    // 'sortedTasks.map((task) => (' = for each 'task' in 'sortedTasks' array, loop through and render a 'TaskItem' component
    // 'key={task.id}' is required to track list items
    // 'task', 'onDelete', and 'onStatusChange' are passed down as props
    {sortedTasks.length ? (
      sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))
    ) : (
      // if there are no tasks, displays this message instead
      <p>No tasks found.</p>
    )}
  </div>
);
*/

