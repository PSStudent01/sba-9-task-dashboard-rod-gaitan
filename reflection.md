# SBA Reflection — Task Management Dashboard

#
How I Implemented React and TypeScript Features":

One of the first things I did was set up proper TypeScript interfaces in 'types/index.ts'. I  realized that defining the shape of data upfront, like separating 'Task' from 'TaskFormData' made the rest of the project much easier to work through it. Using union types like "todo" | "in-progress" | "completed" instead of plain strings camee in handy because TypeScript was able to catch mistakes early through my entire project.

For React, I relied heavily on 'useState' to manage state across the project. I also used 'useEffect' to sync tasks with localStorage so that data persists across page refreshes. Learning the difference between a controlled and uncontrolled component was something that became clearer as I built the form — every input field needed 2 things 1) a 'value' tied to state and 2) an 'onChange' handler to update that state.

#
Challenges I Encountered:

Learning React and TypeScript at the same time ha been the biggest challenge. Althoght, I am getting used to TypeScript and can appreciate its power, for this project it just added an extra layer of complexity on top of already new React concepts. For example, understanding why 'e.target.value' needed  'type assertion' like 'as Task["status"]' took some time to grasp. I guess it just comes down to understanding that TypeScript sees 'dropdown values' as 'plain strings' by default and needs to be told specifically what type to expect.

Another challenge was understanding where state of the component should live. Early on I couldn't decide between keeping the state for each component local to their files or use a file, in this case 'Dashboard' to hold all of the state. But when I saw how many components were required, I figured having them all in on place (parent component) accessible to all, probably made more sense, for example the filter state needed to be accessible by both 'TaskFilter' and 'TaskList' at the same time.

Comment placement inside JSX was a bit cumbersome because it caused several syntax errors since I heavily relied on comments to keep many of these concept straight in my mind . I learned that regular JavaScript comments '//' work outside JSX but inside JSX you must use '{/* */}' syntax, and they cannot be placed inside opening tags or JavaScript expressions.

# 
My Approach to Component Composition and State Management

Per the file structure provided:

- 'Dashboard' hollding all state
- 'TaskForm', 'TaskFilter', 'TaskItem and 'TaskList' are children that receive data and functions as props

This meant data always went in one direction down through props and back up through callback functions. For example when a user deletes a task, 'TaskItem' calls 'onDelete' which was passed down from 'Dashboard', which then updates the master tasks array in state. 

For utility functions I separated filtering, sorting, validation, and task creation into 'taskUtils.ts'. This kept the components in one place and meant that logic could be reused without duplication. For example, 'filterTasks' and 'sortTasks' are both called inside 'TaskList' rather than duplicating that logic inside the individual components.

Overall this project challenged me to think about React not just as a way to render UI but as a way for managing and communicating data between components.
