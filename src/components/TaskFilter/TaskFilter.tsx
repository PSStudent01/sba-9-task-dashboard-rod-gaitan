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