import { useEffect, useState } from "react"
import "../button.css"
import { PatientCard } from "./PatientCard"
import { Modal } from "./Modal"
import toast, { Toaster } from "react-hot-toast"

export const PatientsScreen = ({patients, setPatients}) => {

    const notify = () => toast.success('New patient added successfully')
    

    const [favorites, setFavorites] = useState(() =>{
        const savedFavorites = localStorage.getItem("favorites")
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    const [viewFavorites, setViewFavorites] = useState(false)

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [buttonShow, setButtonShow] = useState(true)

    const handleClick = () =>{
        setIsOpenModal(true)
        setButtonShow(false)
    }

    const handleClose = () =>{
        setIsOpenModal(false)
        setButtonShow(true)
    }

    const handleClickFavorites = () =>{
        setViewFavorites(!viewFavorites)
    }

    const onSubmit = ({name, description, website, createdAt }) =>{
        const lastId = patients[patients.length-1].id

        const newPatient = {
            id: lastId+1,
            name: name,
            description: description,
            website: website,
            createdAt: createdAt.toISOString().slice(0,10)
        }

        setPatients([...patients,newPatient])
        setIsOpenModal(false)
        setButtonShow(true)
        notify()
    }

    useEffect(() => {
        localStorage.setItem("favorites",JSON.stringify(favorites))
    }, [favorites])
    

  return (
    <>
        <button id="floating-button" onClick={handleClick} hidden = {!buttonShow}>
            Add+
        </button>

        {
           !viewFavorites &&
           <button id="favorite-floating-button" onClick={handleClickFavorites}>
                View only favorites
            </button>
        }

        {
           viewFavorites &&
           <button id="favorite-floating-button" onClick={handleClickFavorites}>
                View all
            </button>
        }


        <Toaster/>

        {
            !viewFavorites &&
            <div className="card-container">
                {patients.map((patient) => (
                    <PatientCard 
                        key={patient.id} 
                        patient={patient}
                        setPatients={setPatients}
                        setFavorites={setFavorites}
                        favorites={favorites}          
                    />
                ))}
            </div>
        }
        
        
        <div>
            {
                isOpenModal && <Modal show={true} handleClose={handleClose} onSubmit={onSubmit}/>
            }
        </div>

        {
            viewFavorites &&
            <div className="card-container">
                {favorites.map((patient) => (
                    <PatientCard 
                        key={patient.id} 
                        patient={patient}
                        setPatients={setFavorites}
                        setFavorites={setFavorites}
                        favorites={favorites}          
                    />
                ))}
            </div>
        }
        
    
    </>
  )
}
