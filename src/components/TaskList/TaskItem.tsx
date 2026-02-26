import type { TaskItemProps, Task } from "../../types"; 
import { formatDate } from "../../utils/taskUtils"; //date formatting utility from 'taskUtils.ts'

const TaskItem = ({ task, onDelete, onStatusChange }: TaskItemProps) => { //Defines the component. 
                                                                        // The '{}' is destructuring, extracting 'task', 'onDelete', and 'onStatusChange' from 'TaskItemProps' interface rather than writing props.task, props.onDelete etc. 
                                                                        // ': TaskItemProps' = tells TS what type/shape those props should be.

return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {formatDate(task.dueDate)}</p>
      <p>Priority: {task.priority}</p>
      <select
        value={task.status}
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

export default TaskItem;   //makes this COMPONENT available to be imported to other files


/* VIP Personal Comments:

return (
  // returns task data, wraps everything in a single parent div
  <div>
    // grabs the 'title' from 'task' and renders it. '{}' in JSX means "evaluate this as JavaScript"
    <h3>{task.title}</h3>
    // grabs the 'description' from 'task' and renders it
    <p>{task.description}</p>
    // pulls 'dueDate' from 'task', 'formatDate' converts it into something readable, appends it to 'Due:'
    <p>Due: {formatDate(task.dueDate)}</p>
    // same logic as above but for priority
    <p>Priority: {task.priority}</p>

    // 'value={task.status}' makes this a controlled component
    // dropdown's selected value is managed by React state not the browser
    // task.status = "todo" → dropdown shows "Todo"
    // task.status = "completed" → dropdown shows "Completed"
    <select
      value={task.status}
      // when user selects an option, React assigns an event object (e)
      // 'e.target.value' captures it as a plain string
      // 'as Task["status"]' asserts it can only be one of 3 valid values
      onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
    >
      // 'value="todo"' is what 'e.target.value' will be in the onChange handler
      <option value="todo">Todo</option>
      // 'value="in-progress"' = the value that will update the task's status
      <option value="in-progress">In Progress</option>
      // 'value="completed"' = the value that will update the task's status
      <option value="completed">Completed</option>
    </select>

    // when user clicks 'Delete', 'onClick' fires passing 'task.id' up to parent via 'onDelete' prop
    // TaskItem does NOT delete the task itself — Dashboard handles the actual deletion
    // 'onDelete' = is a prop function passed down from Dashboard
    // 'task.id' = is passed in so the parent knows which task to delete
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
);


*/

