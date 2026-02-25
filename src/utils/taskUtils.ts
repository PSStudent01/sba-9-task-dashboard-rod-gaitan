
import { Task, FilterOptions, TaskFormData } from "../types";  //importing only 'data interfaces' and not 'prop interfaces'


export const formatDate = (dateString: string): string => { // function converts the default date string into a more readable format like "Jan 01, 2025"
    const date = new Date(dateString);  // above 'dateString' gets passed here to Date()' and gets coverted into a 'new' date format by the 'Date()' constructor and stored into 'date' 
    return date.toLocaleDateString("en-US", {  // then takes 'date', applies method (toLocaleDateString) to it, resulting in readable format like 1-12-2026
        year: "numeric", //value here is predefined format by JavaScript
        month: "short", //value here is predefined format by JavaScript
        day: "2-digit", //value here is predefined format by JavaScript
    });
};

export const validateTaskForm = (formData: TaskFormData): string[] => { // Validates form data before a task is submitted, returns an array of error messages when necessary
    const errors: string[] = []; // an empty array that will hold any error messages that may pop up
    if (!formData.title.trim()) errors.push("Title is required"); //it says "hey, if 'title' is not entered in 'formData', then push 'Title is required' string to 'errors' array and return 'errors' " .  So if someone just types spaces it still counts as empty.
    if (!formData.description.trim()) errors.push("Description is required"); //it says "hey, if 'description' is not entered in 'formData', then push 'Description is required' string to 'errors' array and return 'errors' ".  So if someone just types spaces it still counts as empty.
    if (!formData.dueDate) errors.push("Due date is required"); //it says "hey, if 'dueDate' is not entered in 'formData', then push 'Due date is required' string to 'errors' array and return 'errors' ",  So if someone just types spaces it still counts as empty.
    return errors;  //retursn errors array
                    //if it's empty that means the form is valid. 
                    // If it has error string items, they are displayed to the user.
                    //So the component using this function just needs to check if the returned array is EMPTY or NOT to know if the form is valid.
};


export const filterTasks = (tasks: Task[], filterOptions: FilterOptions): Task[] => {  // Filters tasks based on 'status', 'priority', and 'search query' props of 'FilterOptions'
  return tasks.filter((task) => {           //JavaScript's built in filter method loops through every task and keeps only the ones that return true.
                                            // says hey " for each and every 'task' item in 'tasks' array loop through and keep only the ones that are true"
    const matchesStatus = filterOptions.status === "all" || task.status === filterOptions.status;
    const matchesPriority = filterOptions.priority === "all" || task.priority === filterOptions.priority;
    const matchesSearch = task.title.toLowerCase().includes(filterOptions.searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });
};