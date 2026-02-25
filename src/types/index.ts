
// Starting with the TypeScript interfaces in 
export interface Task {  // 'interface' defines the shape of an object n TS. 'export' makes the component available for other files to import it and use it.
    id: string;  //Every task needs a unique ID. It's a string because it be alphanumeric
    title: string;
    description: string;
    status: "todo" | "in-progress" | "completed"; //prop 'status' can ONLY be one of these 3 strings. Forcing any value other than these 3 will cause Ts to throw an error
                                                  // alternative is 'status: string', but less safer than the current one.
    priority: "low" | "medium" | "high";
    dueDate: string;
    createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface FilterOptions {
  status: "all" | "todo" | "in-progress" | "completed";
  priority: "all" | "low" | "medium" | "high";
  searchQuery: string;
}

// 'Dashboard' designated as teh parent component
// while the rest are designated children components: TaskList, TaskItem, TaskForm, TaskFilter

export interface TaskItemProps {
  task: Task;   // The TaskItem component will receive one task object to display. 'task' takes 'Task' interface as value
  onDelete: (id: string) => void;   // prop 'onDelete' is a function that when called, takes the task's 'id' and deletes it. Function returns nothing
  onStatusChange: (id: string, status: Task["status"]) => void; // prop 'onStatusChange' is function that takes an id and a new status and updates that task's status. 
                                                                // 'Task["status"]' = borrows the 'status' prop from 'Task' interface, whose value can only be "todo", "in-progress", or "completed".
                                                                //  We barrow that rule from the 'Task' interface rather than retyping it.
}

export interface TaskListProps {
  tasks: Task[];    // 'tasks' prop holds an array of objects from interface 'Task'
  filterOptions: FilterOptions;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export interface TaskFormProps {
  onAddTask: (formData: TaskFormData) => void;
}

export interface TaskFilterProps {
  filterOptions: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
}