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






