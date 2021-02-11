//React icons with npm i react-icons
import { FaTimes } from 'react-icons/fa'

import { format } from 'date-fns'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>{task.text}
      <FaTimes
       style={{ color: 'red', cursor: 'pointer'}}
       onClick={() => onDelete(task.id)}/> </h3>
      <p>{format(new Date(task.day), 'MM/dd/yyyy' )}</p>
    </div>
  )
}

export default Task
