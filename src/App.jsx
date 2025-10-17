import { useEffect, useState } from 'react'
import { PatientsScreen} from './components/PatientsScreen'
import { getPatients } from './helpers/patientsAPI'
import { LoadingScreen } from './components/LoadingScreen'

function App() {
const [loading, setLoading] = useState(true)
const [patients, setPatients] = useState([])
  
const fetchPatients = async () => {
  try {
    const response = await getPatients()
    setPatients(response)
  } catch (e) {
    // Si hay algún error en el proceso, lo guardamos en el estado 'error'.
    console.log(error)
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchPatients()
}, [])

  return (
    <>
      {
        (loading) ? <LoadingScreen/> : <PatientsScreen patients={patients}/>
      }
    </>
  )
}

export default App
