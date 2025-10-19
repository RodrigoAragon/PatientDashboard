import { useState } from 'react'
import '../styles/card.css'
import { Modal } from './Modal'
import toast from 'react-hot-toast'

export const PatientCard = ({patient, setPatients, favorites, setFavorites}) => {

    const notify = () => toast.success('Patient edited successfully',{
        duration: 2000,
        position: "top-right",
        style:{
            backgroundColor: 'lightgreen',
            color: 'black',
        }
    })

    const notifyError = () => toast.error('An error ocurred during the submitting process',{
        duration: 4000,
        position: "top-right",
        style:{
            backgroundColor: 'coral',
            color: 'black',
        }
    })   
    
    const notifyAddFavorite = () => toast.success('Patient added to Favorites',{
        duration: 2000,
        position: "top-right",
        style:{
            backgroundColor: 'lightyellow',
            color: 'black',
        },
        icon:'🌟'
    })

    const notifyRemoveFavorite = () => toast.success('Patient removed from Favorites',{
        duration: 2000,
        position: "top-right",
        style:{
            backgroundColor: 'lightblue',
            color: 'black',
        },
        icon:'😢'
    })

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenModalEdit, setOpenModalEdit] = useState(false)
    const handleClick = () =>{
        setOpenModalEdit(true)
    }

    const handleClose = () =>{
        setOpenModalEdit(false)
    }

    const toggleCard = () =>{
        setIsOpen(!isOpen)
    }

    const onSubmit = ({id ,name, description, website, createdAt }) =>{

        try {
            const newEditPatient = {
                id: id,
                name: name,
                description: description,
                website: website,
                createdAt: createdAt.toISOString().slice(0,10)
            }

            setPatients(prevPatients => prevPatients.map(
                p => p.id === newEditPatient.id? {...newEditPatient} : p
            ))
            setOpenModalEdit(false)
            notify()
        } catch (error) {
            console.log(error)
            notifyError(error)
        }


    }

    const addToFavorites = () =>{
        setFavorites(fav => [...fav, patient])
        notifyAddFavorite()
    }

    const removeFromFavorites = () =>{
        setFavorites(prevFavorites => prevFavorites.filter(
            fav => fav.id !== patient.id
        ))
        notifyRemoveFavorite()
    }

    const isFavorite = favorites.some(fav => fav.id === patient.id);
    

  return (
    <>
    <div className="card">
        <div className='card-header'>
            <h3>{patient.name}</h3>
            <button onClick={handleClick}>Edit</button>
            <button onClick={toggleCard}>{!isOpen? 'Open' : 'Close'}</button>
        </div>

        {isOpen && (
            <div className='card-content'>
                <p>
                    ID: {patient.id}
                </p>

                <p>
                    Description: {patient.description}
                </p>

                <p>
                    Website: <a href={patient.website}>{patient.website}</a>
                </p>

                <p>
                    Created at: {patient.createdAt}
                </p>

                {
                    isFavorite && <button onClick={removeFromFavorites}>
                                    Remove from Favorites-
                                </button>
                }

                {
                    !isFavorite && <button onClick={addToFavorites}>
                                    Add to Favorites+
                                </button>
                }

                
            </div>
        )}

    </div>
    
        {
            isOpenModalEdit && <Modal show={true} handleClose={handleClose} onSubmit={onSubmit} patient={patient}/>
        }
    </>

  )
}