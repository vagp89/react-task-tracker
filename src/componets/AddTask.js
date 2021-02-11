import { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState(new Date());
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
      if(!text) {
        alert('please add task')
        return
      }

      onAdd({text, day, reminder })

      setText('')
      setDay(new Date())
      setReminder(false)

  }


  return (

    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Day & time </label>
        <DatePicker selected={day}
        onChange={day => setDay(day)}
        isClearable
        placeholderText="Add date" />
      </div>
      <div className=' form-control-check'>
        <label>Set Reminder </label>
        <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>
      <input type='submit' value='Save Task' className='btn btn-block'/>
     </form>
  )
}

export default AddTask
