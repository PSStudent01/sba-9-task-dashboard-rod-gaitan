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