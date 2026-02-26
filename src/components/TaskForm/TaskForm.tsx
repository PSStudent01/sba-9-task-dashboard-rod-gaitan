import { useState } from 'react';  //Imports the 'useState' hook from React. It allows the component to REMEMBER and TRACK values over time.
import type { TaskFormProps, TaskFormData } from '../../types';  // Importing the a 'prop interface' and a data 'interface'
import { validateTaskForm } from '../../utils/taskUtils';  // imports utility function, that was created in 'taskUtils.ts'


const TaskForm = ({ onAddTask }: TaskFormProps) => {  // a function 'TaskForm' is created that destructures/extracts 'onAddTask' prop from 'TaskFormProps' props
                                                    // and this the function 'Dashboard' component will pass down to handle a'dding tasks'.


const [formData, setFormData] = useState<TaskFormData>({       
  title: '',
  description: '',
  status: 'todo',
  priority: 'low',
  dueDate: '',
});

//errors state declaration:
const [errors, setErrors] = useState<string[]>([]); // - 'errors' = current state value, an array of error message strings
                                                    // - 'setErrors' = function to update that state
                                                    // - useState<string[]>([]) = initializes as an empty array

 // - 'const [formData, setFormData]' = this is array destructuring, extracting 'formData' from 'formData' (aka 'types/')
// 'useState' ALWAYS returns 2 things:
//-- the current state value (formData ), ITC the current values of all the form fields
//-- the  the function (setFormData ), to update that state 'formData'   
// - 'useState<TaskFormData>' = TS telling 'useState' what 'shape' the 'state' will be. So TS now knows 'formData' will always look like 'TaskFormData interface' as it will have 
// ....title, description, status, priority, and dueDate  
// initial values when the form first loads. When the user opens the form for the first time:


const handleSubmit = (e: React.FormEvent) => {   //'handleSubmit' = a function that handles 'form submissions'. 
                                                // 'e'=  is the 'form event' and 
                                                // 'React.FormEvent' TS type of 'e'. 
    e.preventDefault();  //prevents the default browser's behavior of refreshing the page when a form is submitted.
    
    const validationErrors = validateTaskForm(formData);  // this is how React calls utility function 'validateTaskForm()' to check if the 'form data is valid' and stores any error messages in 'validationErrors' 
    
     // "hey IF 'validationErrors' contains at least 1 character, THEN display for user to see before moving forward "
    if (validationErrors.length > 0) { // IOWs, If there are errors found in the form data...
      setErrors(validationErrors);  // ...then it stores them in state 'setErrors' to display to the user....
      return;                       // and stops the function from continuing with return.
    }
    
    onAddTask(formData);  // Else If 'validationErrors' passed (validation passed), THEN it calls the function 'onAddTask 'passed down from 'Dashboard' to actually add the task.
    
    setFormData({  // this resets the form back to 'empty or default' values after successful submission.
      title: '',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: '',
    });
    
    setErrors([]);  // Clears any previous error messages.
  };

return (
    <div className="task-form">
      <h2>Add New Task</h2>

      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskFormData["status"] })}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskFormData["priority"] })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        <button type="submit">Add Task</button>

      </form>
    </div>
  );


};

export default TaskForm; //makes this COMPONENT available to be imported to other files



/*  Personal Notes
// component returns JSX wrapped in a single parent element
// displays the add task form and any validation errors
return (
  <div className="task-form">
    <h2>Add New Task</h2>

    // if there are validation errors, map through them and display each one
    {errors.length > 0 && (
      <div className="error-list">
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    )}

    // 'onSubmit={handleSubmit}' = when form is submitted, calls handleSubmit function
    <form onSubmit={handleSubmit}>

      // 'value={formData.title}' = controlled input, value is managed by React state
      // 'onChange' = when user types, updates 'title' in formData state using spread operator to keep other fields intact
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      // same logic as above but for description
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      // controlled dropdown for status
      // 'as TaskFormData["status"]' = type assertion limiting value to only valid status strings
      <div className="form-group">
        <label>Status:</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskFormData["status"] })}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      // same logic as above but for priority
      // 'as TaskFormData["priority"]' = type assertion limiting value to only valid priority strings
      <div className="form-group">
        <label>Priority:</label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskFormData["priority"] })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      // date input, 'type="date"' renders a date picker in the browser
      <div className="form-group">
        <label>Due Date:</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      // 'type="submit"' triggers the form's onSubmit when clicked
      <button type="submit">Add Task</button>

    </form>
  </div>
);

*/