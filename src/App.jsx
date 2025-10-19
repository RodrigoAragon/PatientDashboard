import { useEffect, useState } from 'react'
import { PatientsScreen} from './components/PatientsScreen'
import { getPatients } from './helpers/patientsAPI'
import { LoadingScreen } from './components/LoadingScreen'
import { ErrorScreen } from './components/ErrorScreen'

function App() {
const [loading, setLoading] = useState(false)
const [fetchError, setFetchError] = useState(false)
const [patients, setPatients] = useState([])
  
const fetchPatients = async (page) => {
  setLoading(true)
  try {
    const response = await getPatients(page)
    setPatients(response)
  } catch (e) {
    console.log(e)
    setFetchError(true)
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchPatients(1)
}, [])

  return (
    <>
      {
        (!loading && fetchError) ? <ErrorScreen/> :

        (loading) ? <LoadingScreen/> : <PatientsScreen patients={patients} setPatients = {setPatients}/>
      }
    </>
  )
}

export default App
