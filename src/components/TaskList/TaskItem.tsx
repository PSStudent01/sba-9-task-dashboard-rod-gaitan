import { TaskItemProps } from "../../types";  // Importing the prop interface form 'index.ts'.
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
  onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
>

 <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;






