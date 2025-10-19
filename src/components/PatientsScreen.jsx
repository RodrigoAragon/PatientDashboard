import { useCallback, useEffect, useRef, useState } from "react"
import "../styles/button.css"
import { PatientCard } from "./PatientCard"
import { Modal } from "./Modal"
import toast, { Toaster } from "react-hot-toast"
import { getPatients } from "../helpers/patientsAPI"

export const PatientsScreen = ({patients, setPatients}) => {

    const notify = () => toast.success('New patient added successfully',{
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

    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [favorites, setFavorites] = useState(() =>{
        const savedFavorites = localStorage.getItem("favorites")
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    const [viewFavorites, setViewFavorites] = useState(false)

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [buttonShow, setButtonShow] = useState(true)

    const observer = useRef()


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
        try {
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
        } catch (error) {
            notifyError(error)
        }
    }

    useEffect(() => {
        localStorage.setItem("favorites",JSON.stringify(favorites))
    }, [favorites])
    

    const fetchPatients = async (page) => {
      setLoading(true)
      try {
        const response = await getPatients(page)

        if(response.length === 0){
            setHasMore(false)
        }
        else{
            setPatients(prevPatientes => [...prevPatientes, ...response])
        }

      } catch (e) {
        console.log(e)
        setHasMore(false)
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      if(page > 1 && hasMore){
        fetchPatients(page)
      }
    }, [page, hasMore])

    const lastElementRef = useCallback(
      (node) => {
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore && !loading){
                setPage(prevPage => prevPage+1)
            }
        })

        if(node) observer.current.observe(node)
      },
      [loading, hasMore],
    )
    

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

            <>

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

            <div ref={lastElementRef}/>
            
            </div>

            {
                loading && (
                    <div className="loader-container-patients">
                        <div className="loader-patients"></div>
                    </div>
                )
            }

            {
                !hasMore && !loading && <p className="end-message">No hay más pacientes para mostrar</p>
            }
        
            </>
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
