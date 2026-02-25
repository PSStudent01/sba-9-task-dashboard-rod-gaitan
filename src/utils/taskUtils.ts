// TASK UTILITIES


import type { Task, FilterOptions, TaskFormData } from "../types";  //importing only 'data interfaces' and not 'prop interfaces'


export const formatDate = (dateString: string): string => { // function converts the default date string into a more readable format like "Jan 01, 2025"
    const date = new Date(dateString);  // above 'dateString' gets passed here to Date()' and gets coverted into a 'new' date format by the 'Date()' constructor and stored into 'date' 
    return date.toLocaleDateString("en-US", {  // then takes 'date', applies method (toLocaleDateString) to it, resulting in readable format like 1-12-2026
        year: "numeric", //value here is predefined format by JavaScript
        month: "short", //value here is predefined format by JavaScript
        day: "2-digit", //value here is predefined format by JavaScript
    });
};

export const validateTaskForm = (formData: TaskFormData): string[] => { // Validates form data before a task is submitted, returns an array of error messages when necessary
    const errors: string[] = []; // an empty string array that will hold any error messages that may pop up
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
                                            // says hey " for each and every 'task' item in 'tasks' array, loop through and keep only the ones that are true"
    const matchesStatus = filterOptions.status === "all" || task.status === filterOptions.status; // says hey "IF the value selected for 'status' of 'filterOptions' is equal to 'all', THEN it's TRUE... 
                                                                                                  // OR "IF the value selected for 'status' of 'task' is equal to the value selected for 'status' of 'filterOptions' THEN it's TRUE.       
    const matchesPriority = filterOptions.priority === "all" || task.priority === filterOptions.priority; // says hey "IF the value selected for 'priority' of 'filterOptions' is equal to 'all', THEN it's TRUE... 
                                                                                                  // OR "IF the value selected for 'priority' of 'task' is equal to the value selected for 'priority' of 'filterOptions' THEN it's TRUE.       
    const matchesSearch = task.title.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()); // 'task.title.toLowerCase()' = Takes the task's title and converts it to all lowercase. Ex. "Buy Groceries" becomes "buy groceries".
                                                                                                      // 'filterOptions.searchQuery.toLowerCase()' = Takes whatever the user input types in the search box and converts it to all lowercase. So if they typed "BUY" it becomes "buy".
                                                                                                      // So the reason for doing this is so that the format of the "user's input" ALWAYS matches the format of the "status tilte" regardless of how the user types it ("bUy", "BUY", etc)
                                                                                                      // This is bc JavaScript strings are case sensitive by default due to ASCII codes and so uppercase and lowercase letters have different codes.  
    return matchesStatus && matchesPriority && matchesSearch; // So the filter method loops through every task one by one and for each task it evaluates that line. 
                                                              // If all 3 variables are TRUE then the whole expression is TRUE and that task gets KEPT. 
                                                              // If any one of them is FALSE then the whole expression is FALSE and that task gets THROWN OUT.
  });
};

export const sortTasks = (tasks: Task[], sortBy: "createdAt" | "dueDate" | "priority"): Task[] => { // it sorts tasks by 'creation date', 'due date', or 'priority'
                                                                                                    // does this by creating a function 'sortTasks' that takes 2 params:
                                                                                                    // 'tasks' as an array of Task objects.
                                                                                                    // 'sortBy' of 'union type' 'string' that uses only those 3 exact values from the 'Task' interface
                                                                                                    // ': Task[]' = This is the return type fo TS to say "this function will return an array of Task objects".  
  const priorityOrder = { low: 1, medium: 2, high: 3 }; // Creates a lookup object that converts priority strings into numbers so we can compare them mathematically. Makes code much cleaner         
  return [...tasks].sort((a, b) => { //  '...' spread operator = creates a copy of the 'tasks' array before sorting. this is so we dont alter the original array directly as that could cause later issues in React.
                                    // '.sort((a, b)' = The way sort decides the order is based on what number your function returns:
                                    // if negative number then 'a' comes before 'b'
                                    // if positive number then ''b' comes before 'a'
                                    // if zero then they stay in the same order
                                    // so in this case
    if (sortBy === "priority") {                                        // if the sort filter selected is 'priority'
      return priorityOrder[b.priority] - priorityOrder[a.priority];   // then we do priorityOrder[b.priority] - priorityOrder[a.priority];
                                                                    //  thus 'a' is 'high(3)' and 'b' is 'low(1)':
                                                                     // 1 - 3 = -2 IS negative and therefore  'a' comes first   
    }
    return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime(); // same logic here but or sorting by dates specifically
                                                                          // also converts data in to milliseconds using .getTime() so they can be compared mathematically
  });
};


export const createTask = (formData: TaskFormData): Task => { // it generates a new Task object from 'form data'  
                                                              // A utility function 'createTask' that receives form data param and creates a new task from it, based on object shape 'TaskFormData' that it takes as argument.
  return {
    ...formData,    //The spread operator copies all the properties from formData into the new object so that title, description, status, priority, and dueDate all get copied over automatically.
    id: crypto.randomUUID(),  // * See comments below Alternative to 'id: crypto.randomUUID(),'
    createdAt: new Date().toISOString(),  // Takes the exact 'current date and time' and converts it to a standard string format like "2025-01-15T10:30:00.000Z". 
                                        // Again this is why TaskFormData didn't need a createdAt field, bc it gets created here realtime
  };
};


/*
Alternative to 'id: crypto.randomUUID(),'
- you'd have to write the following logic EVERY TIME you wanted to add a new task. For example in my Dashboard component I'd have to write:
*
const newTask = {
  ...formData,
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
};
*/



/*
FOLLOW UP ON:
"export const sortTasks = (tasks: Task[], sortBy: "createdAt" | "dueDate" | "priority"): Task[] => { "
*/