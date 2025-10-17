import { useState } from "react"
import "../button.css"
import { PatientCard } from "./PatientCard"
import { Modal } from "./Modal"

export const PatientsScreen = ({patients}) => {

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

  return (
    <>
        <button id="floating-button" onClick={handleClick} hidden = {!buttonShow}>
            Add+
        </button>
        <div className="card-container">
            {patients.map((patient) => (
                <PatientCard 
                    key={patient.id} 
                    id={patient.id} 
                    name={patient.name} 
                    avatar={patient.avatar}
                    createdAt={patient.createdAt}
                    description={patient.description}
                    website={patient.website}                
                />
            ))}
        </div>
        
        <div>

        {
            isOpenModal && <Modal show={true} handleClose={handleClose}/>
        }
        
        </div>
    
    </>
  )
}
