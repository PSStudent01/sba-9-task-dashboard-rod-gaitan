import type { TaskFilterProps, FilterOptions } from '../../types';   // Importing the a 'prop interface' and a data 'interface'

const TaskFilter = ({ filterOptions, onFilterChange }: TaskFilterProps) => {     // a function 'TaskFilter' is created that destructures/extracts 2 props from 'TaskFilterProps':
                                                                                // - 'filter Options' = the current filter state passed DOWN from Dashboard
                                                                                 // - 'onFilterChange' = a function passed DOWN from Dashboard to update the filter state

return (
    <div className="task-filter">

      <div className="filter-group">
        <label>Search:</label>
        <input
          type="text"
          value={filterOptions.searchQuery}
          onChange={(e) => onFilterChange({ ...filterOptions, searchQuery: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <select
          value={filterOptions.status}
          onChange={(e) => onFilterChange({ ...filterOptions, status: e.target.value as FilterOptions["status"] })}
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Priority:</label>
        <select
          value={filterOptions.priority}
          onChange={(e) => onFilterChange({ ...filterOptions, priority: e.target.value as FilterOptions["priority"] })}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

    </div>
  );
 


};

export default TaskFilter; //makes this COMPONENT available to be imported to other files




/*
VIP is that this component owns nothing as it simlpy displays what 'Dashboard' gives it and reports changes back up.
*/

/* VIP Personal Comments:
// component returns JSX wrapped in a single parent element
return (
  <div className="task-filter">

    // Search input section
    <div className="filter-group">
      <label>Search:</label>
      // 'type="text"' = controlled text input, controlled by React not the DOM
      // 'value={filterOptions.searchQuery}' = displays the current search query
      // 'onChange' = when user types, calls 'onFilterChange' passing a copy of all current filters
      // with just 'searchQuery' updated. '...filterOptions' spread keeps other filters intact
      <input
        type="text"
        value={filterOptions.searchQuery}
        onChange={(e) => onFilterChange({ ...filterOptions, searchQuery: e.target.value })}
      />
    </div>

    // Status filter section
    <div className="filter-group">
      <label>Status:</label>
      // 'select' = controlled dropdown, controlled by React not the DOM
      // 'value={filterOptions.status}' = displays the current status filter
      // 'onChange' = when user selects an option, React assigns event object (e)
      // 'e.target.value' captures it as a plain string
      // 'as FilterOptions["status"]' = type assertion limiting value to only valid status strings
      // '...filterOptions' spread keeps other filters intact
      <select
        value={filterOptions.status}
        onChange={(e) => onFilterChange({ ...filterOptions, status: e.target.value as FilterOptions["status"] })}
      >
        // 'value="all"' = user can choose to not filter at all
        <option value="all">All</option>
        // 'value="todo"' = the value that will update the filter's status
        <option value="todo">Todo</option>
        // 'value="in-progress"' = the value that will update the filter's status
        <option value="in-progress">In Progress</option>
        // 'value="completed"' = the value that will update the filter's status
        <option value="completed">Completed</option>
      </select>
    </div>

    // Priority filter section - very similar logic to status filter above but for priority
    <div className="filter-group">
      <label>Priority:</label>
      <select
        value={filterOptions.priority}
        onChange={(e) => onFilterChange({ ...filterOptions, priority: e.target.value as FilterOptions["priority"] })}
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

  </div>
);

*/