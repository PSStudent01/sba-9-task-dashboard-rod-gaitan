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

