import './App.css'
import './Components/Task_07'
import { useState} from 'react'
import Task_07 from './Components/Task_07'
import Task_08 from './Components/Task_08'
import Task_09 from './Components/Task_09'


function App() {
  const [selectedMonth, setSelectedMonth] = useState('October');
  return (
    <>
      <Task_07/>
      <Task_08/>
      <Task_09  selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
    </>
  )
}

export default App
