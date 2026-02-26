import type { TaskFilterProps, FilterOptions } from '../../types';   // Importing the a 'prop interface' and a data 'interface'

const TaskFilter = ({ filterOptions, onFilterChange }: TaskFilterProps) => {     // a function 'TaskFilter' is created that destructures/extracts 2 props from 'TaskFilterProps':
                                                                                // - 'filter Options' = the current filter state passed DOWN from Dashboard
                                                                                 // - 'onFilterChange' = a function passed DOWN from Dashboard to update the filter state


  return (            // it starts the JSX. 
    <div>               {/* component returns JSX wrapped in a "single PARENT element"*/}
      <h2>Filters</h2>   {/* 'Filters' HTML header*/}

    <div>
        <label>Search:</label>
        <input              
          type="text"  // 'type' = depicts a controlled text input, controlled by React (Not by DOM). 
          value={filterOptions.searchQuery}  // 'value' = displays the current search query. 
          onChange={(e) => onFilterChange({ ...filterOptions, searchQuery: e.target.value })}  // When the user types, 'onChange' calls 'onFilterChange' WHILE passing a COPY of all 'current filters' using the spread with just searchQuery updated. 
                                                                                                // '...filterOptions' =  spread that keeps the other filters intact.
        />
      </div>

    {/* Status Filter */}
      <div>
        <label>Status:</label>
        <select    // 'select' = depicts a controlled text input, controlled by React (Not by DOM). 
          value={filterOptions.status}  // 'value' = displays the current search query.
          onChange={(e) => onFilterChange({ ...filterOptions, status: e.target.value as FilterOptions["status"] })}  // When the user types, 'onChange' calls 'onFilterChange' WHILE passing a COPY of all 'current filters' using the spread with just searchQuery updated. 
                                                                                                // '...filterOptions' =  spread that keeps the other filters intact.
                                                                                                // Whenever the user selects the dropdown option , React asigns an event object (e).
                                                                                                // and that selected option gets stored in 'e.target.value' as a string only
                                                                                                // that's where 'Task["status"]' comes in to validate that the string can only be on eof 3 string values ("todo" | "in-progress" | "completed")
        >
          <option value="all">All</option>  {/*is an HTML element that represents one choice in a dropdown (<select>), in this case that choice is 'all '. This is what 'e.target.value' will be in the 'onChange' handler.
                                            // Note, here the user can the user can choose to not filter at all.*/}
          <option value="todo">Todo</option> {/* Same logic as above. 'value="todo"' = the value that will update the filter’s status. */}
          <option value="in-progress">In Progress</option> {/* Same logic as above. 'value="in-progress"' = the value that will update the filter’s status. */}
          <option value="completed">Completed</option>  {/* Same logic as above. 'completed"' = the value that will update the filter’s status. */}
        </select>
      </div>

      {/* Priority Filter - very similar logic to the above, but for 'Priority */}
      <div>
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