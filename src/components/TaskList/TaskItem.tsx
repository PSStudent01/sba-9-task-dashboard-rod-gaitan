import type { TaskItemProps, Task } from "../../types";  // Importing the prop interface form 'index.ts'.
import { formatDate } from "../../utils/taskUtils"; //date formatting utility from 'taskUtils.ts'

const TaskItem = ({ task, onDelete, onStatusChange }: TaskItemProps) => { //Defines the component. 
                                                                        // The '{}' is destructuring, extracting 'task', 'onDelete', and 'onStatusChange' from 'TaskItemProps' interface rather than writing props.task, props.onDelete etc. 
                                                                        // ': TaskItemProps' = tells TS what type/shape those props should be.
return (  //returns task data
<div>  {/*diplays task data */}
  <h3>{task.title}</h3>  {/* '{}' in JSX means "evaluate this as JavaScript" ITC grabs the 'title' from 'task' and renders it*/}
  <p>{task.description}</p>   {/* '{}' in JSX means "evaluate this as JavaScript" ITC grabs the 'description' from 'task' and renders it*/}
  <p>Due: {formatDate(task.dueDate)}</p> {/* pulls 'dueDate' from 'task', and then 'formatDate' converts the date string into something readable, appends it to 'Due:' and renders it*/}
  <p>Priority: {task.priority}</p> {/* same logic as above but for priority*/}

  <select
  value={task.status}  // This makes the dropdown <select> a controlled component, meaning dropdown’s selected value is NOT managed by the browser, rather by by React state.
                        // the state lives in 'task.status', which ultimately comes from the Dashboard state. So if....
                        // task.status = "todo" then  dropdown shows "Todo"
                        // task.status = "completed" then dropdown shows "Completed"
                        //React is in control, not the DOM.
  onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])} // Whenever the user selects the dropdown option , React asigns an event object (e).
                                                                              // and that selected option gets stored in 'e.target.value' as a string only
                                                                              // that's where 'Task["status"]' comes in to validate that the string can only be on eof 3 string values ("todo" | "in-progress" | "completed")

>

        <option value="todo">Todo</option> {/*is an HTML element that represents one choice in a dropdown (<select>), in this case that choice is 'todo'. This is what 'e.target.value' will be in the 'onChange' handler.*/}
        <option value="in-progress">In Progress</option> {/* Same logic as above. 'value="in-progress"' = the value that will update the task’s status. */}
        <option value="completed">Completed</option>  {/* Same logic as above. 'value="completed"' = the value that will update the task’s status. */}
      </select>
      <button onClick={() => onDelete(task.id)}>Delete</button> {/* when user clicks 'Delete' button, it fires the 'onClick' handler, which runs a function to the 'task' id. The value is passed in so the parent knows which task to remove. Important, this doesntt delete the task locally in 'TaskItem', the parent does it.*/}
                                                                {/* 'onClick={() => onDelete(task.id)}' = arrow function ran when button is clicked.*/}
                                                                {/* 'onDelete' = is a prop function from the parent (Dashboard). */}
                                                                {/* 'task.id' = is passed in so the parent knows which task to delte.*/}
    </div>
  )
  
};

export default TaskItem;   ///makes this COMPONENT available to be imported to other files






