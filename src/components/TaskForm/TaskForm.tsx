import { useState } from 'react';  import { useState } from 'react';  //Imports the 'useState' hook from React. It allows the component to REMEMBER and TRACK values over time.
import type { TaskFormProps, TaskFormData } from '../../types';  // Importing the a 'prop interface' and a data 'interface'
import { validateTaskForm } from '../../utils/taskUtils';  // imports utility function, that was created in 'taskUtils.ts'

const TaskForm = ({ onAddTask }: TaskFormProps) => {  // a function 'TaskForm' is created that destructures/extracts 'onAddTask' prop from 'TaskFormProps' props
                                                    // and this the function 'Dashboard' component will pass down to handle a'dding tasks'.
