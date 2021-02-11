
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Header from './componets/Header'
import Tasks from './componets/Tasks'
import AddTask from './componets/AddTask'
import Footer from './componets/Footer'
import About from './componets/About'

function App ()  {
  const[ showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()

  }, [])

  //fetch data form  tasks

  const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

    //fetch data form  tasks

  const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }


  //addTask
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask ={ id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
    })
    setTasks(tasks.filter((tasks) => tasks.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,
      reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/task/${id}`,{
        method: 'PUT',
        headers: {
          'Content-type': 'applications/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      setTasks(
       tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder } : task
     )
   )
  }

  return (
    <Router>
      <div className='container'>
        <Header
        onAdd={() => setShowAddTask
        (!showAddTask)}
        showAdd={showAddTask}/>

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}/>
            ) : (
            'No tasks to show')}

          </>
          ) } />
        <Route path='/about' component={About} />
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

// class App extends React.Component {
//   render() {
//       return <h1>Hello a class</h1>

//   }
// }

// export default App;
